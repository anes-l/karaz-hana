
import { createTransport } from 'nodemailer';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin (only once)
if (!getApps().length) {
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
        try {
            const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
            initializeApp({
                credential: cert(serviceAccount)
            });
        } catch (error) {
            console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY', error);
        }
    } else {
        console.warn('FIREBASE_SERVICE_ACCOUNT_KEY is missing. Email notifications will fail.');
    }
}

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method not allowed' });
    }

    const { workshop } = request.body;

    if (!workshop) {
        return response.status(400).json({ error: 'Missing workshop data' });
    }

    // Check for email credentials
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
        console.warn('Missing Gmail credentials. Skipping email send.');
        return response.status(200).json({ message: 'Email configuration missing, skipped.' });
    }

    try {
        const db = getFirestore();

        // Fetch all users
        const usersSnapshot = await db.collection('users').get();
        const emails = [];
        usersSnapshot.forEach(doc => {
            const data = doc.data();
            if (data.email) {
                emails.push(data.email);
            }
        });

        if (emails.length === 0) {
            return response.status(200).json({ message: 'No users to notify.' });
        }

        // Configure Nodemailer
        const transporter = createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER, // Your email
                pass: process.env.GMAIL_PASS  // Your App Password
            }
        });

        // Email Template (using site design)
        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F9F7F2; color: #333; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
                .header { background-color: #C88D83; padding: 40px 20px; text-align: center; }
                .header h1 { color: #ffffff; margin: 0; font-family: 'Times New Roman', serif; text-transform: uppercase; letter-spacing: 2px; }
                .content { padding: 40px 30px; }
                .tag { display: inline-block; background-color: #C88D83; color: white; padding: 5px 15px; border-radius: 20px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px; }
                .h2 { font-family: 'Times New Roman', serif; font-size: 28px; color: #333; margin-top: 0; margin-bottom: 15px; }
                .image-container { margin: 20px 0; border-radius: 8px; overflow: hidden; }
                .image { width: 100%; height: auto; display: block; }
                .details { background-color: #F9F7F2; padding: 20px; border-radius: 8px; margin: 30px 0; }
                .detail-row { display: flex; margin-bottom: 10px; }
                .detail-label { font-weight: bold; width: 80px; color: #C88D83; }
                .btn { display: inline-block; background-color: #C88D83; color: white; text-decoration: none; padding: 15px 30px; border-radius: 30px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-top: 20px; }
                .footer { background-color: #333; color: #ffffff; padding: 30px 20px; text-align: center; font-size: 12px; }
                .footer a { color: #C88D83; text-decoration: none; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Karaz Hana</h1>
                </div>
                <div class="content">
                    <span class="tag">Nouvel Atelier</span>
                    <h2 class="h2">${workshop.title}</h2>
                    <p>Bonjour,</p>
                    <p>J'ai le plaisir de vous annoncer l'ouverture des inscriptions pour mon prochain atelier d'aquarelle !</p>
                    
                    ${workshop.imageUrl ? `<div class="image-container"><img src="${workshop.imageUrl}" alt="${workshop.title}" class="image"/></div>` : ''}
                    
                    <div class="details">
                        <div class="detail-row">
                            <span class="detail-label">Date :</span>
                            <span>${workshop.date}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Heure :</span>
                            <span>${workshop.time}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Lieu :</span>
                            <span>${workshop.location}</span>
                        </div>
                    </div>
                    
                    <p>${workshop.description || "Un moment de créativité et de partage vous attend."}</p>
                    
                    <div style="text-align: center;">
                        <a href="https://karazhana.vercel.app/ateliers" class="btn">Réserver ma place</a>
                    </div>
                </div>
                <div class="footer">
                    <p>© 2026 Karaz Hana - Aquarelle</p>
                    <p><a href="https://karazhana.vercel.app">Visiter le site web</a></p>
                </div>
            </div>
        </body>
        </html>
        `;

        // Send emails (using BCC to hide recipients from each other)
        await transporter.sendMail({
            from: `"Karaz Hana" <${process.env.GMAIL_USER}>`,
            bcc: emails, // Use BCC for privacy
            subject: `Nouvel Atelier : ${workshop.title} 🎨`,
            html: htmlContent
        });

        return response.status(200).json({ success: true, count: emails.length });

    } catch (error) {
        console.error('Email notification error:', error);
        return response.status(500).json({ error: error.message });
    }
}
