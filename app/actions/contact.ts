'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactResult = { success: boolean; message: string };

export async function sendContactMessage(
  formData: FormData
): Promise<ContactResult> {
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const message = String(formData.get('message') || '').trim();

  // Protection anti-spam basique : champ "piège" invisible pour les humains
  const honeypot = String(formData.get('company') || '').trim();
  if (honeypot) {
    return { success: true, message: 'Message envoyé.' };
  }

  if (!name || !email || !message) {
    return { success: false, message: 'Merci de remplir tous les champs.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: 'Adresse email invalide.' };
  }

  try {
    await resend.emails.send({
      from: 'Caleb Creative <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL_TO || 'calebagbakou@gmail.com',
      reply_to: email, // <-- Correction ici
      subject: `Nouveau message de ${name} — Caleb Creative`,
      text: `Nom : ${name}\nEmail : ${email}\n\nMessage :\n${message}`,
    });
    return { success: true, message: 'Message envoyé avec succès !' };
  } catch (error) {
    return {
      success: false,
      message: "Une erreur est survenue. Réessayez ou contactez-moi directement.",
    };
  }
}
