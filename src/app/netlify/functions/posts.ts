import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import type { Handler } from '@netlify/functions';

const privateKey = process.env['FIREBASE_PRIVATE_KEY']?.replace(/\\n/g, '\n');


const adminApp = getApps().length
  ? getApps()[0]
  : initializeApp({
      credential: cert({
        projectId: process.env['FIREBASE_PROJECT_ID'],
        clientEmail: process.env['FIREBASE_CLIENT_EMAIL'],
        privateKey,
      }),
    });

export const handler: Handler = async () => {
  try {
    const db = getFirestore(adminApp);
    const snap = await db.collection('posts').limit(10).get();
    const posts = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return {
      statusCode: 200,
      body: JSON.stringify(posts),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (e: any) {
    console.error('posts function error:', e);
    return { statusCode: 500, body: 'Internal Server Error' };
  }
};
