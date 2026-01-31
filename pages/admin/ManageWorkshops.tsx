import React, { useState, useEffect, useRef, useCallback } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { Plus, Trash2, Edit2, Star, Check, Bold, Italic, Underline, List, ArrowLeft, Calendar, Clock, Upload, ChevronLeft, ChevronRight, X, Sparkles, Save, ImageIcon, Sun, Moon, Hourglass } from 'lucide-react';
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
    description: string;
    moreInfo: string;
    imageUrl: string;
    isUpcoming: boolean;
    quote?: string;
}

// French month names
const MONTHS_FR = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const DAYS_FR = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

// Time options
const TIME_OPTIONS = [
    '8h00', '8h30', '9h00', '9h30', '10h00', '10h30', '11h00', '11h30',
    '12h00', '12h30', '13h00', '13h30', '14h00', '14h30', '15h00', '15h30',
    '16h00', '16h30', '17h00', '17h30', '18h00', '18h30', '19h00', '19h30', '20h00'
];

// Duration options
const DURATION_OPTIONS = [
    '1 heure', '1h30', '2 heures', '2h30', '3 heures', '3h30', '4 heures', 'Demi-journée', 'Journée complète'
];

// Styled Calendar Picker Component
const CalendarPicker = ({ value, onChange, onClose }: { value: string; onChange: (date: string) => void; onClose: () => void }) => {
    const [currentDate, setCurrentDate] = useState(() => {
        if (value) {
            // Try to parse existing date
            const parts = value.split(' ');
            if (parts.length >= 3) {
                const day = parseInt(parts[0]);
                const monthIndex = MONTHS_FR.findIndex(m => m.toLowerCase() === parts[1].toLowerCase());
                const year = parseInt(parts[2]);
                if (!isNaN(day) && monthIndex !== -1 && !isNaN(year)) {
                    return new Date(year, monthIndex, 1);
                }
            }
        }
        return new Date();
    });

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    const selectDate = (day: number) => {
        const formatted = `${day} ${MONTHS_FR[month]} ${year}`;
        onChange(formatted);
        onClose();
    };

    const isSelected = (day: number) => {
        return value === `${day} ${MONTHS_FR[month]} ${year}`;
    };

    const isToday = (day: number) => {
        const today = new Date();
        return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
    };

    return (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-charcoal/10 p-4 z-50 w-80">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <button type="button" onClick={prevMonth} className="p-2 hover:bg-cream rounded-full transition-colors">
                    <ChevronLeft size={18} className="text-charcoal/60" />
                </button>
                <h3 className="font-serif text-lg text-charcoal">
                    {MONTHS_FR[month]} {year}
                </h3>
                <button type="button" onClick={nextMonth} className="p-2 hover:bg-cream rounded-full transition-colors">
                    <ChevronRight size={18} className="text-charcoal/60" />
                </button>
            </div>

            {/* Days header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {DAYS_FR.map(day => (
                    <div key={day} className="text-center text-xs font-medium text-charcoal/40 py-1">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => (
                    <div key={index} className="aspect-square">
                        {day && (
                            <button
                                type="button"
                                onClick={() => selectDate(day)}
                                className={`w-full h-full rounded-full flex items-center justify-center text-sm transition-all
                                    ${isSelected(day) ? 'bg-terracotta text-white' : 'hover:bg-terracotta/10'}
                                    ${isToday(day) && !isSelected(day) ? 'border-2 border-terracotta/30' : ''}
                                `}
                            >
                                {day}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

};

// Styled Time Picker Component
const TimePicker = ({ value, onChange, onClose }: { value: string; onChange: (time: string) => void; onClose: () => void }) => {
    // Grouping times
    const morning = TIME_OPTIONS.filter(t => parseInt(t) < 12);
    const afternoon = TIME_OPTIONS.filter(t => parseInt(t) >= 12 && parseInt(t) < 18);
    const evening = TIME_OPTIONS.filter(t => parseInt(t) >= 18);

    const renderTimeGroup = (title: string, times: string[], icon: React.ReactNode) => (
        <div className="mb-4 last:mb-0">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-terracotta uppercase tracking-wider">
                {icon} {title}
            </div>
            <div className="grid grid-cols-4 gap-2">
                {times.map(time => (
                    <button
                        key={time}
                        type="button"
                        onClick={() => { onChange(time); onClose(); }}
                        className={`px-2 py-2 rounded-lg text-sm transition-all border
                            ${value === time
                                ? 'bg-terracotta text-white border-terracotta shadow-md'
                                : 'bg-white text-charcoal/80 border-charcoal/5 hover:border-terracotta/30 hover:bg-cream'
                            }
                        `}
                    >
                        {time}
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-charcoal/10 p-5 z-50 w-72 md:w-80 max-h-[400px] overflow-y-auto">
            {renderTimeGroup('Matin', morning, <Sun size={14} />)}
            {renderTimeGroup('Après-midi', afternoon, <Sun size={14} className="text-orange-500" />)}
            {renderTimeGroup('Soir', evening, <Moon size={14} />)}
        </div>
    );
};

// Styled Duration Selector Component
const DurationSelector = ({ value, onChange }: { value: string; onChange: (d: string) => void }) => {
    return (
        <div className="flex flex-wrap gap-3">
            {DURATION_OPTIONS.map(duration => (
                <button
                    key={duration}
                    type="button"
                    onClick={() => onChange(duration)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all transform flex items-center gap-2 border
                        ${value === duration
                            ? 'bg-terracotta text-white border-terracotta shadow-md scale-105'
                            : 'bg-white text-charcoal/70 border-charcoal/5 hover:border-terracotta/30 hover:bg-cream hover:-translate-y-0.5'
                        }
                    `}
                >
                    <Hourglass size={14} className={value === duration ? 'text-white' : 'text-terracotta/50'} />
                    {duration}
                </button>
            ))}
        </div>
    );
};

// Visual Rich Text Editor Component
const VisualEditor = ({ label, value, onChange, placeholder, minHeight = "150px" }: {
    label: string;
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
    minHeight?: string;
}) => {
    const editorRef = useRef<HTMLDivElement>(null);

    const execCommand = (command: string, value: string | undefined = undefined) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
        // Trigger onChange with new content
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    // Set initial content
    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value || '';
        }
    }, []);

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-charcoal/80">{label}</label>
            <div className="border border-charcoal/10 rounded-xl overflow-hidden bg-white shadow-sm">
                {/* Toolbar */}
                <div className="flex items-center gap-1 px-3 py-2 border-b border-charcoal/5 bg-cream/50">
                    <button
                        type="button"
                        onClick={() => execCommand('bold')}
                        className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors group"
                        title="Gras"
                    >
                        <Bold size={16} className="text-charcoal/60 group-hover:text-terracotta" />
                    </button>
                    <button
                        type="button"
                        onClick={() => execCommand('italic')}
                        className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors group"
                        title="Italique"
                    >
                        <Italic size={16} className="text-charcoal/60 group-hover:text-terracotta" />
                    </button>
                    <button
                        type="button"
                        onClick={() => execCommand('underline')}
                        className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors group"
                        title="Souligné"
                    >
                        <Underline size={16} className="text-charcoal/60 group-hover:text-terracotta" />
                    </button>
                    <div className="w-px h-5 bg-charcoal/10 mx-1"></div>
                    <button
                        type="button"
                        onClick={() => execCommand('insertUnorderedList')}
                        className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors group"
                        title="Liste à puces"
                    >
                        <List size={16} className="text-charcoal/60 group-hover:text-terracotta" />
                    </button>
                </div>

                {/* Editor area */}
                <div
                    ref={editorRef}
                    contentEditable
                    onInput={handleInput}
                    className="p-4 focus:outline-none prose prose-sm max-w-none"
                    style={{ minHeight }}
                    data-placeholder={placeholder}
                />
            </div>
        </div>
    );
};

// Cloudinary config
const CLOUDINARY_CLOUD_NAME = "djc2oexox";
const CLOUDINARY_UPLOAD_PRESET = "karaz_hana_preset";

export const ManageWorkshops: React.FC = () => {
    const [workshops, setWorkshops] = useState<Workshop[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentWorkshop, setCurrentWorkshop] = useState<Partial<Workshop>>({});
    const [uploading, setUploading] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

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
                { method: "POST", body: formData }
            );
            const data = await response.json();

            if (data.secure_url) {
                const optimizedUrl = data.secure_url.replace('/upload/', '/upload/f_auto,q_auto/');
                setCurrentWorkshop(prev => ({ ...prev, imageUrl: optimizedUrl }));
            } else {
                alert("Erreur lors de l'upload de l'image.");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Erreur lors de l'upload.");
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
                alert("Atelier mis à jour !");
            } else {
                await addDoc(collection(db, 'workshops'), workshopData);
                try {
                    await fetch('/api/notify-users', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ workshop: workshopData })
                    });
                    alert("Atelier créé et notification envoyée !");
                } catch {
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

    // ===== EDIT FORM UI =====
    if (isEditing) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-cream via-dusty-pink/5 to-cream">
                {/* Header */}
                <div className="bg-white/80 backdrop-blur-sm border-b border-charcoal/5 sticky top-0 z-40">
                    <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={() => { setIsEditing(false); setCurrentWorkshop({}); }}
                                className="w-10 h-10 rounded-full bg-cream hover:bg-terracotta/10 flex items-center justify-center text-charcoal/60 hover:text-terracotta transition-all group"
                            >
                                <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                            </button>
                            <div>
                                <h1 className="font-serif text-2xl text-charcoal">
                                    {currentWorkshop.id ? 'Modifier l\'atelier' : 'Nouvel atelier'}
                                </h1>
                                <p className="text-sm text-charcoal/50">Remplis les détails de ton atelier</p>
                            </div>
                        </div>
                        <button
                            form="workshop-form"
                            type="submit"
                            className="px-6 py-2.5 bg-terracotta text-white rounded-full flex items-center gap-2 hover:bg-terracotta/90 transition-colors shadow-lg"
                        >
                            <Save size={18} />
                            Enregistrer
                        </button>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-6 py-8">
                    <form id="workshop-form" onSubmit={handleSave} className="space-y-8">

                        {/* Section: Informations principales */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-charcoal/5">
                            <h2 className="font-serif text-xl text-charcoal mb-6 flex items-center gap-2">
                                <Sparkles size={20} className="text-terracotta" />
                                Informations principales
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Titre */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-charcoal/80 mb-2">Titre de l'atelier</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-charcoal/10 rounded-xl bg-cream/30 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all text-charcoal"
                                        placeholder="Ex: Initiation à l'aquarelle florale"
                                        value={currentWorkshop.title || ''}
                                        onChange={e => setCurrentWorkshop({ ...currentWorkshop, title: e.target.value })}
                                        required
                                    />
                                </div>

                                {/* Date avec calendrier */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-charcoal/80 mb-2">Date</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 pr-12 border border-charcoal/10 rounded-xl bg-cream/30 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all text-charcoal cursor-pointer"
                                            placeholder="Sélectionner une date"
                                            value={currentWorkshop.date || ''}
                                            onClick={() => setShowCalendar(true)}
                                            readOnly
                                            required
                                        />
                                        <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/40 pointer-events-none" />
                                    </div>
                                    {showCalendar && (
                                        <>
                                            <div className="fixed inset-0 z-40" onClick={() => setShowCalendar(false)} />
                                            <CalendarPicker
                                                value={currentWorkshop.date || ''}
                                                onChange={(date) => setCurrentWorkshop({ ...currentWorkshop, date })}
                                                onClose={() => setShowCalendar(false)}
                                            />
                                        </>
                                    )}
                                </div>

                                {/* Horaire */}
                                <div>
                                    <label className="block text-sm font-medium text-charcoal/80 mb-2">Horaire</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 pr-10 border border-charcoal/10 rounded-xl bg-cream/30 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all text-charcoal cursor-pointer"
                                            placeholder="Choisir l'heure"
                                            value={currentWorkshop.time || ''}
                                            onClick={() => setShowTimePicker(true)}
                                            readOnly
                                            required
                                        />
                                        <Clock size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/40 pointer-events-none" />

                                        {showTimePicker && (
                                            <>
                                                <div className="fixed inset-0 z-40" onClick={() => setShowTimePicker(false)} />
                                                <TimePicker
                                                    value={currentWorkshop.time || ''}
                                                    onChange={(time) => setCurrentWorkshop({ ...currentWorkshop, time })}
                                                    onClose={() => setShowTimePicker(false)}
                                                />
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Durée */}
                                <div>
                                    <label className="block text-sm font-medium text-charcoal/80 mb-2">Durée</label>
                                    <DurationSelector
                                        value={currentWorkshop.duration || ''}
                                        onChange={(duration) => setCurrentWorkshop({ ...currentWorkshop, duration })}
                                    />
                                </div>

                                {/* Prix */}
                                <div>
                                    <label className="block text-sm font-medium text-charcoal/80 mb-2">Prix</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            min="0"
                                            step="100"
                                            className="w-full px-4 py-3 pr-16 border border-charcoal/10 rounded-xl bg-cream/30 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all text-charcoal"
                                            placeholder="1500"
                                            value={currentWorkshop.price?.replace(/[^\d]/g, '') || ''}
                                            onChange={e => setCurrentWorkshop({ ...currentWorkshop, price: e.target.value })}
                                            required
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/50 font-medium">DA</span>
                                    </div>
                                </div>

                                {/* Lieu */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-charcoal/80 mb-2">Lieu</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-charcoal/10 rounded-xl bg-cream/30 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all text-charcoal"
                                        placeholder="Ex: Atelier Karaz Hana, Alger"
                                        value={currentWorkshop.location || ''}
                                        onChange={e => setCurrentWorkshop({ ...currentWorkshop, location: e.target.value })}
                                        required
                                    />
                                </div>

                                {/* Public cible */}
                                <div>
                                    <label className="block text-sm font-medium text-charcoal/80 mb-2">Public cible</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-charcoal/10 rounded-xl bg-cream/30 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all text-charcoal"
                                        placeholder="Ex: Adultes et ados dès 16 ans"
                                        value={currentWorkshop.audience || ''}
                                        onChange={e => setCurrentWorkshop({ ...currentWorkshop, audience: e.target.value })}
                                    />
                                </div>

                                {/* Niveau */}
                                <div>
                                    <label className="block text-sm font-medium text-charcoal/80 mb-2">Niveau</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-charcoal/10 rounded-xl bg-cream/30 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all text-charcoal"
                                        placeholder="Ex: Débutants bienvenus"
                                        value={currentWorkshop.level || ''}
                                        onChange={e => setCurrentWorkshop({ ...currentWorkshop, level: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section: Image */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-charcoal/5">
                            <h2 className="font-serif text-xl text-charcoal mb-6">Image de l'atelier</h2>

                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Upload zone */}
                                <label className="flex-1 border-2 border-dashed border-charcoal/10 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-terracotta/30 hover:bg-terracotta/5 transition-all">
                                    <Upload size={32} className="text-charcoal/30 mb-3" />
                                    <span className="text-charcoal/60 text-sm mb-1">Glisser une image ou cliquer</span>
                                    <span className="text-charcoal/40 text-xs">PNG, JPG jusqu'à 5MB</span>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={uploading}
                                    />
                                    {uploading && <span className="mt-3 text-terracotta text-sm animate-pulse">Upload en cours...</span>}
                                </label>

                                {/* Preview */}
                                {currentWorkshop.imageUrl && (
                                    <div className="relative w-full md:w-48 h-48 rounded-2xl overflow-hidden group">
                                        <img
                                            src={currentWorkshop.imageUrl}
                                            alt="Aperçu"
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setCurrentWorkshop({ ...currentWorkshop, imageUrl: '' })}
                                            className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                                        >
                                            <X size={16} className="text-red-500" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Section: Contenu */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-charcoal/5">
                            <h2 className="font-serif text-xl text-charcoal mb-6">Contenu de l'atelier</h2>

                            <div className="space-y-6">
                                {/* Citation */}
                                <div>
                                    <label className="block text-sm font-medium text-charcoal/80 mb-2">Citation / Accroche</label>
                                    <textarea
                                        className="w-full px-4 py-3 border border-charcoal/10 rounded-xl bg-cream/30 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all text-charcoal resize-none h-24"
                                        placeholder="Une phrase inspirante qui s'affichera en évidence..."
                                        value={currentWorkshop.quote || ''}
                                        onChange={e => setCurrentWorkshop({ ...currentWorkshop, quote: e.target.value })}
                                    />
                                </div>

                                {/* Description courte */}
                                <VisualEditor
                                    label="Description courte (visible directement)"
                                    value={currentWorkshop.description || ''}
                                    onChange={val => setCurrentWorkshop({ ...currentWorkshop, description: val })}
                                    placeholder="Décris brièvement ton atelier..."
                                    minHeight="120px"
                                />

                                {/* Informations détaillées */}
                                <VisualEditor
                                    label="Informations détaillées (visible après 'En savoir plus')"
                                    value={currentWorkshop.moreInfo || ''}
                                    onChange={val => setCurrentWorkshop({ ...currentWorkshop, moreInfo: val })}
                                    placeholder="Ajoute tous les détails (programme, ce que les participants repartiront avec...)"
                                    minHeight="200px"
                                />
                            </div>
                        </div>

                        {/* Mobile save button */}
                        <div className="md:hidden">
                            <button
                                type="submit"
                                className="w-full py-4 bg-terracotta text-white rounded-2xl flex items-center justify-center gap-2 hover:bg-terracotta/90 transition-colors shadow-lg font-medium"
                            >
                                <Save size={20} />
                                Enregistrer l'atelier
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    // ===== LIST VIEW UI =====
    return (
        <div className="min-h-screen bg-cream p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <Link
                            to="/gestion"
                            className="w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-charcoal/60 hover:text-terracotta hover:bg-terracotta/5 transition-all group"
                        >
                            <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                        </Link>
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
                            <div key={workshop.id} className={`bg-white p-6 rounded-lg shadow border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${workshop.isUpcoming ? 'border-terracotta ring-1 ring-terracotta/20' : 'border-gray-100'}`}>
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
