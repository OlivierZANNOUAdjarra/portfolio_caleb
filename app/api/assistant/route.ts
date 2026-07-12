import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_CONTEXT = `Tu es l'assistant virtuel du site "Caleb Creative", le portfolio de Caleb Jesugnon AGBAKOU, basé à Abomey au Bénin.

À PROPOS :
Caleb met la puissance de l'intelligence artificielle au service de la créativité depuis près de deux ans. Il transforme les idées en réalisations visuelles d'exception (images, vidéos, designs, identités visuelles) pour particuliers, entreprises et organisations.

SERVICES PROPOSÉS :
Création de contenu IA, création d'images IA, création de vidéos IA, motion design, montage vidéo professionnel, création d'affiches, création de logos, retouche photo avec IA, prompt engineering, conseil en solutions créatives IA.

OUTILS MAÎTRISÉS :
Logiciels : Adobe Photoshop, Adobe Premiere Pro, Adobe After Effects, CapCut, Canva.
IA : ChatGPT, Midjourney, Flux, Kling AI, Runway, Veo, Leonardo AI, Gemini, Ideogram.

FAQ :
- Durée d'un projet : variable selon la complexité, définie au premier échange.
- Travail à distance : oui, entièrement possible.
- Commande : contacter Caleb via WhatsApp, le formulaire de contact ou email.
- Paiement : Mobile Money, virement, espèces (à confirmer selon la commande).

CONTACT :
Email : calebagbakou@gmail.com — WhatsApp : +229 01 48 13 53 95 — Localisation : Abomey, Bénin.

TON RÔLE :
Guide les visiteurs sur le site, réponds à leurs questions sur les services, oriente-les vers la bonne section ou vers WhatsApp/le formulaire de contact pour une demande de devis. Réponds dans la langue du visiteur (français ou anglais selon sa question). Sois chaleureux, concis (3-4 phrases maximum), professionnel et enthousiaste sur l'univers créatif IA de Caleb. Ne réponds jamais à des questions hors-sujet (rien à voir avec Caleb Creative) — recentre poliment la conversation.`;

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Assistant momentanément indisponible." },
      { status: 500 }
    );
  }

  try {
    const { messages } = await request.json();

    const contents = messages.map((m: { role: string; text: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.text }],
    }));

    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_CONTEXT }] },
          contents,
          generationConfig: { maxOutputTokens: 300, temperature: 0.7 },
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Erreur de l'assistant. Réessayez." },
        { status: 500 }
      );
    }

    const data = await response.json();
    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Désolé, je n'ai pas pu répondre. Contactez Caleb directement sur WhatsApp !";

    return NextResponse.json({ text });
  } catch (error) {
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 }
    );
  }
}