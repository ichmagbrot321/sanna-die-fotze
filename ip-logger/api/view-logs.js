// api/view-logs.js
export const config = {
  runtime: 'edge',
};

// Wir simulieren eine Datei, indem wir den Inhalt in einer Variable speichern.
// In einer echten Anwendung würdest du eine Datenbank wie KV oder D1 verwenden.
// Für diesen einfachen Fall ist das aber ausreichend und funktioniert zuverlässig.
let logFileContent = '';

export default async function handler(request) {
  // Wenn die Funktion mit POST aufgerufen wird (von log.js)
  if (request.method === 'POST') {
    const newLogEntry = await request.text();
    logFileContent += newLogEntry;
    return new Response('Log saved.', { status: 200 });
  }

  // Wenn die Funktion mit GET aufgerufen wird (von dir im Browser)
  if (request.method === 'GET') {
    // Gib die gesammelten Logs als formatierte HTML-Seite aus.
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>IP Logger Logs</title>
          <style>
            body { font-family: monospace; background-color: #1e1e1e; color: #d4d4d4; padding: 20px; }
            pre { white-space: pre-wrap; word-wrap: break-word; }
          </style>
        </head>
        <body>
          <h1>IP-Logger Logs</h1>
          <hr>
          <pre>${logFileContent || 'Keine Logs vorhanden.'}</pre>
        </body>
      </html>
    `;
    return new Response(htmlContent, {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });
  }

  // Bei allen anderen Methoden
  return new Response('Method Not Allowed', { status: 405 });
}
