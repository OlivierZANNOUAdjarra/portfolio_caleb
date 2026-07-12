'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { checkCredentials, createSessionToken } from '@/lib/auth';

const COOKIE_NAME = 'cc_session';

export async function login(
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const email = String(formData.get('email') || '').trim();
  const password = String(formData.get('password') || '');

  if (!checkCredentials(email, password)) {
    return { success: false, message: 'Email ou mot de passe incorrect.' };
  }

  // Corrigé : ajout de await car la fonction est asynchrone maintenant
  const token = await createSessionToken();
  
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect('/dashboard');
}

export async function logout() {
  cookies().delete('cc_session');
  redirect('/dashboard/login');
}
