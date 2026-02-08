// api/log.js
import { ipAddress } from '@vercel/edge';

// Diese Konfiguration sagt Vercel, dass es eine Edge Function ist.
export const config = {
  runtime: 'edge',
};

export default function handler(request) {
  // Hole die IP-Adresse des Anfragers. Vercel macht das schwer für uns ^1,9.
  const ip = ipAddress(request) || 'unknown';

  // Hole den User-Agent, um mehr Infos über das Gerät zu bekommen.
  const userAgent = request.headers.get('user-agent') || 'unknown';

  // Erstelle eine Log-Nachricht.
  const logMessage = `New Hit - IP: ${ip}, Device: ${userAgent}, Time: ${new Date().toISOString()}`;

  // Gib die Nachricht in den Vercel Logs aus. Das ist der einfachste Weg, sie zu speichern.
  // Du kannst die Logs später im Vercel-Dashboard einsehen.
  console.log(logMessage);

  // Leite den Nutzer auf eine andere Seite weiter (der Köder!).
  // Ersetze die URL durch etwas, das dein Bruder anklicken würde.
  const redirectUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // Rick-Roll ist ein Klassiker

  return Response.redirect(redirectUrl, 302);
}
