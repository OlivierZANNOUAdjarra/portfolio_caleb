'use server';

import { sql } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { verifySessionToken } from '@/lib/auth';

export type Comment = {
  id: number;
  name: string;
  message: string;
  approved: boolean;
  created_at: string;
};

function assertAdmin() {
  const token = cookies().get('cc_session')?.value;
  if (!verifySessionToken(token)) {
    throw new Error('Non autorisé.');
  }
}

export async function getApprovedComments(): Promise<Comment[]> {
  const rows = await sql`
    SELECT id, name, message, approved, created_at
    FROM comments
    WHERE approved = TRUE
    ORDER BY created_at DESC
    LIMIT 20
  `;
  return rows as Comment[];
}

export async function submitComment(
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const name = String(formData.get('name') || '').trim();
  const message = String(formData.get('message') || '').trim();

  const honeypot = String(formData.get('company') || '').trim();
  if (honeypot) {
    return { success: true, message: 'Merci pour votre commentaire.' };
  }

  if (!name || !message) {
    return { success: false, message: 'Merci de remplir tous les champs.' };
  }

  if (name.length > 80 || message.length > 500) {
    return { success: false, message: 'Texte trop long.' };
  }

  try {
    await sql`
      INSERT INTO comments (name, message, approved)
      VALUES (${name}, ${message}, FALSE)
    `;
    revalidatePath('/');
    return {
      success: true,
      message: 'Merci ! Votre commentaire sera visible après validation.',
    };
  } catch (error) {
    return { success: false, message: 'Une erreur est survenue.' };
  }
}

// ── Fonctions admin (dashboard) ─────────────────────────────────────────

export async function getAllComments(): Promise<Comment[]> {
  assertAdmin();
  const rows = await sql`
    SELECT id, name, message, approved, created_at
    FROM comments
    ORDER BY created_at DESC
  `;
  return rows as Comment[];
}

export async function approveComment(id: number): Promise<void> {
  assertAdmin();
  await sql`UPDATE comments SET approved = TRUE WHERE id = ${id}`;
  revalidatePath('/');
  revalidatePath('/dashboard');
}

export async function deleteComment(id: number): Promise<void> {
  assertAdmin();
  await sql`DELETE FROM comments WHERE id = ${id}`;
  revalidatePath('/');
  revalidatePath('/dashboard');
}