import React, { useState, useEffect, useRef } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { Plus, Trash2, Edit2, Star, Check, Bold, Italic, Upload, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Workshop {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    price: string;
    duration: string;
    level: string;
    audience: string;
    description: string; // Short description (visible)
    moreInfo: string;    // Collapsible content
    imageUrl: string;
    isUpcoming: boolean;
}

const RichTextEditor = ({ label, value, onChange, height = "h-32" }: { label: string, value: string, onChange: (val: string) => void, height?: string }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const insertFormat = (startTag: string, endTag: string) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const before = text.substring(0, start);
        const selection = text.substring(start, end);
        const after = text.substring(end);

        const newText = `${before}${startTag}${selection}${endTag}${after} `;
        onChange(newText);

        // Restore focus and selection
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + startTag.length, end + startTag.length);
        }, 0);
    };

    return (
        <div className="flex flex-col gap-1">
            <label className="block text-sm font-bold mb-1">{label}</label>
            <div className="border border-gray-300 rounded-md bg-white overflow-hidden">
                <div className="flex items-center gap-2 p-2 border-b border-gray-100 bg-gray-50">
                    <button type="button" onClick={() => insertFormat('**', '**')} className="p-1 hover:bg-gray-200 rounded" title="Gras">
                        <Bold size={16} className="text-gray-700" />
                    </button>
                    <button type="button" onClick={() => insertFormat('*', '*')} className="p-1 hover:bg-gray-200 rounded" title="Italique">
                        <Italic size={16} className="text-gray-700" />
                    </button>
                    <span className="text-xs text-gray-400 ml-auto">Markdown supporté</span>
                </div>
                <textarea
                    ref={textareaRef}
                    className={`w-full p-3 bg-white text-gray-900 focus:outline-none ${height} `}
                    value={value || ''}
                    onChange={e => onChange(e.target.value)}
                />
            </div>
        </div>
    );
};

// ⚠️ À REMPLACER PAR VOS INFOS CLOUDINARY ⚠️
const CLOUDINARY_CLOUD_NAME = "djc2oexox"; // Confirmé via capture d'écran
const CLOUDINARY_UPLOAD_PRESET = "karaz_hana_preset"; // Confirmé via votre capture d'écran

export const ManageWorkshops: React.FC = () => {
    const [workshops, setWorkshops] = useState<Workshop[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentWorkshop, setCurrentWorkshop] = useState<Partial<Workshop>>({});
    const [uploading, setUploading] = useState(false);

    const fetchWorkshops = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, 'workshops'), orderBy('date', 'desc'));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Workshop));
            setWorkshops(data);
        } catch (error) {
            console.error("Error fetching workshops:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkshops();
    }, []);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            const data = await response.json();

            if (data.secure_url) {
                // Ajout automatique de l'optimisation (WebP + compression qualité)
                const optimizedUrl = data.secure_url.replace('/upload/', '/upload/f_auto,q_auto/');
                setCurrentWorkshop(prev => ({ ...prev, imageUrl: optimizedUrl }));
            } else {
                console.error("Cloudinary Error:", data);
                alert("Erreur Cloudinary: Vérifiez votre Cloud Name et Upload Preset.");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Erreur lors de l'upload. Vérifiez votre connexion.");
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const workshopData = {
                title: currentWorkshop.title || '',
                date: currentWorkshop.date || '',
                time: currentWorkshop.time || '',
                location: currentWorkshop.location || '',
                price: currentWorkshop.price || '',
                duration: currentWorkshop.duration || '',
                level: currentWorkshop.level || '',
                audience: currentWorkshop.audience || '',
                quote: currentWorkshop.quote || '',
                description: currentWorkshop.description || '',
                moreInfo: currentWorkshop.moreInfo || '',
                imageUrl: currentWorkshop.imageUrl || '/vision-board-workshop.png',
                isUpcoming: currentWorkshop.isUpcoming || false
            };

            if (currentWorkshop.id) {
                await updateDoc(doc(db, 'workshops', currentWorkshop.id), workshopData);
            } else {
                await addDoc(collection(db, 'workshops'), workshopData);

                // Trigger email notification for new workshops
                try {
                    await fetch('/api/notify-users', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ workshop: workshopData })
                    });
                    alert("Atelier créé et notification envoyée !");
                } catch (emailErr) {
                    console.error("Failed to send notifications:", emailErr);
                    alert("Atelier créé, mais échec de l'envoi des emails.");
                }
            }

            setIsEditing(false);
            setCurrentWorkshop({});
            fetchWorkshops();
        } catch (error) {
            console.error("Error saving workshop:", error);
            alert("Erreur lors de l'enregistrement");
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet atelier ?')) {
            await deleteDoc(doc(db, 'workshops', id));
            fetchWorkshops();
        }
    };

    const handleSetUpcoming = async (id: string) => {
        setLoading(true);
        try {
            const updates = workshops.map(w => {
                if (w.id === id) {
                    return updateDoc(doc(db, 'workshops', w.id), { isUpcoming: true });
                } else if (w.isUpcoming) {
                    return updateDoc(doc(db, 'workshops', w.id), { isUpcoming: false });
                }
                return Promise.resolve();
            });
            await Promise.all(updates);
            fetchWorkshops();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    if (isEditing) {
        return (
            <div className="min-h-screen bg-cream p-8">
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="font-serif text-2xl mb-6">{currentWorkshop.id ? 'Modifier' : 'Créer'} un atelier</h2>
                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold mb-1">Titre</label>
                                <input className="w-full border border-gray-300 bg-white text-gray-900 p-2 rounded" value={currentWorkshop.title || ''} onChange={e => setCurrentWorkshop({ ...currentWorkshop, title: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Date</label>
                                <input className="w-full border border-gray-300 bg-white text-gray-900 p-2 rounded" placeholder="ex: 7 février 2026" value={currentWorkshop.date || ''} onChange={e => setCurrentWorkshop({ ...currentWorkshop, date: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Horaire</label>
                                <input className="w-full border border-gray-300 bg-white text-gray-900 p-2 rounded" placeholder="ex: 9h30" value={currentWorkshop.time || ''} onChange={e => setCurrentWorkshop({ ...currentWorkshop, time: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Durée (ex: 3 heures)</label>
                                <input className="w-full border border-gray-300 bg-white text-gray-900 p-2 rounded" value={currentWorkshop.duration || ''} onChange={e => setCurrentWorkshop({ ...currentWorkshop, duration: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Lieu</label>
                                <input className="w-full border border-gray-300 bg-white text-gray-900 p-2 rounded" value={currentWorkshop.location || ''} onChange={e => setCurrentWorkshop({ ...currentWorkshop, location: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Prix</label>
                                <input className="w-full border border-gray-300 bg-white text-gray-900 p-2 rounded" placeholder="ex: 1 200 DA" value={currentWorkshop.price || ''} onChange={e => setCurrentWorkshop({ ...currentWorkshop, price: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Public Cible</label>
                                <input className="w-full border border-gray-300 bg-white text-gray-900 p-2 rounded" placeholder="ex: Adultes et ados dès 16 ans" value={currentWorkshop.audience || ''} onChange={e => setCurrentWorkshop({ ...currentWorkshop, audience: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Niveau</label>
                                <input className="w-full border border-gray-300 bg-white text-gray-900 p-2 rounded" placeholder="ex: Débutants bienvenus" value={currentWorkshop.level || ''} onChange={e => setCurrentWorkshop({ ...currentWorkshop, level: e.target.value })} />
                            </div>

                            {/* Image Upload Section */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold mb-1">Image de l'atelier</label>
                                <div className="flex items-start gap-4">
                                    <div className="flex-grow">
                                        <div className="border border-gray-300 rounded-md bg-white p-2 flex items-center gap-2">
                                            <input
                                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-terracotta/10 file:text-terracotta hover:file:bg-terracotta/20"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                disabled={uploading}
                                            />
                                            {uploading && <span className="text-xs text-terracotta animate-pulse">Upload en cours...</span>}
                                        </div>

                                    </div>
                                    {currentWorkshop.imageUrl && (
                                        <div className="shrink-0 w-24 h-24 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 relative group">
                                            <img src={currentWorkshop.imageUrl} alt="Aperçu" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => setCurrentWorkshop({ ...currentWorkshop, imageUrl: '' })}
                                                className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold mb-1">Citation (Mise en avant)</label>
                                <textarea
                                    className="w-full border border-gray-300 bg-white text-gray-900 p-2 rounded h-24"
                                    placeholder="Une phrase inspirante qui s'affichera en évidence..."
                                    value={currentWorkshop.quote || ''}
                                    onChange={e => setCurrentWorkshop({ ...currentWorkshop, quote: e.target.value })}
                                />
                            </div>

                            <RichTextEditor
                                label="Description Courte (visible directement)"
                                value={currentWorkshop.description || ''}
                                onChange={val => setCurrentWorkshop({ ...currentWorkshop, description: val })}
                                height="h-32"
                            />

                            <RichTextEditor
                                label="Informations Détaillées (visible après clic sur 'En savoir plus')"
                                value={currentWorkshop.moreInfo || ''}
                                onChange={val => setCurrentWorkshop({ ...currentWorkshop, moreInfo: val })}
                                height="h-64"
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button type="button" onClick={() => { setIsEditing(false); setCurrentWorkshop({}); }} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Annuler</button>
                            <button type="submit" className="px-6 py-2 bg-terracotta text-white rounded hover:bg-terracotta/90">Enregistrer</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <Link to="/gestion" className="text-gray-500 hover:text-terracotta">← Retour</Link>
                        <h1 className="font-serif text-3xl text-charcoal">Gérer les Ateliers</h1>
                    </div>
                    <button
                        onClick={() => { setCurrentWorkshop({}); setIsEditing(true); }}
                        className="bg-terracotta text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-terracotta/90 transition-colors"
                    >
                        <Plus size={20} /> Nouvel Atelier
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-10">Chargement...</div>
                ) : (
                    <div className="space-y-4">
                        {workshops.map(workshop => (
                            <div key={workshop.id} className={`bg-white p-6 rounded-lg shadow border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${workshop.isUpcoming ? 'border-terracotta ring-1 ring-terracotta/20' : 'border-gray-100'} `}>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="font-bold text-lg text-charcoal">{workshop.title}</h3>
                                        {workshop.isUpcoming && (
                                            <span className="bg-terracotta/10 text-terracotta text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                                                <Star size={12} fill="currentColor" /> Mis en avant
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-500">{workshop.date} à {workshop.time} • {workshop.location}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    {!workshop.isUpcoming && (
                                        <button
                                            onClick={() => handleSetUpcoming(workshop.id)}
                                            className="text-gray-400 hover:text-terracotta text-sm flex items-center gap-1 px-3 py-1.5 rounded hover:bg-gray-50 transition-colors"
                                            title="Mettre en avant ce prochain atelier"
                                        >
                                            <Check size={16} /> Mettre en avant
                                        </button>
                                    )}
                                    <button
                                        onClick={() => { setCurrentWorkshop(workshop); setIsEditing(true); }}
                                        className="text-blue-600 hover:bg-blue-50 p-2 rounded-full transition-colors"
                                        title="Modifier"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(workshop.id)}
                                        className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                                        title="Supprimer"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {workshops.length === 0 && (
                            <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                                Aucun atelier trouvé. Créez-en un nouveau !
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
