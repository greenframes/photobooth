# Aschke Foto-Booth

Selfie-Booth für den Messestand der Pflegeschule Aschke (Variante A: Rahmen mit Logo, Spruch und Stickern). Läuft komplett im Browser, auf dem iPad im Hoch- und Querformat. Es wird nichts hochgeladen.

- Testseite: https://greenframes.github.io/photobooth/
- Datei: `aschke-foto-booth.html` (einzelne Datei, Logo ist eingebettet). `index.html` leitet nur dorthin weiter.

## Ablauf am Stand

1. Besucher wählt Spruch und Sticker (Namensschild, Sprechblase, Herzchen, EKG-Linie) und tippt optional den Vornamen ein.
2. „Foto machen“ startet einen Countdown von 3 Sekunden, danach erscheint das fertige Bild (1080 × 1350 px, JPG).
3. „Teilen / Sichern“ öffnet das iPad-Share-Sheet (AirDrop, Nachrichten, Bild sichern), alternativ Download als Datei.
4. Nach 75 Sekunden ohne Bedienung werden Foto und Name gelöscht und die Booth springt zurück in den Startzustand.

## Einstellungen

Oben im Skript im Block `CONFIG`: Sprüche, Sprechblasen-Texte, Hashtag, Countdown, Zeit bis zum Auto-Reset, Dateiname. Die Schrift steht in der Konstante `FONT` (aktuell Systemschrift des Geräts).

## Einbindung auf dem eigenen Server

Die Kamera funktioniert nur über HTTPS. Datei auf den Server legen und per iframe einbinden:

```html
<iframe src="https://example.de/foto-booth/aschke-foto-booth.html"
        allow="camera" style="border:0;width:100%;height:100vh"></iframe>
```

`allow="camera"` ist Pflicht, sonst blockiert der Browser die Kamera im iframe. HTML-Dateien lassen sich in der WordPress-Mediathek meist nicht hochladen, deshalb per FTP in einen Ordner legen.

Am Stand empfiehlt sich der „Geführte Zugriff“ von iPadOS, damit Besucher die Seite nicht verlassen können.

## Testcheckliste (echtes iPad)

- [ ] Kamera startet nach der Berechtigungsabfrage (Frontkamera, gespiegelte Vorschau)
- [ ] Hochformat und Querformat: Bild und Bedienelemente vollständig sichtbar, Auslöser nicht abgeschnitten
- [ ] Namensschild mit langem Vornamen (z. B. 14 Zeichen) passt, Handschrift-Schrift wird angezeigt
- [ ] Alle vier Sprüche und alle Sticker lassen sich schalten, Sprechblase wechselt durch die drei Texte
- [ ] Countdown und Foto, Blitz-Effekt, Ergebnis im Format 4:5
- [ ] „Teilen / Sichern“: Share-Sheet erscheint, AirDrop und „Bild sichern“ funktionieren
- [ ] „Als Datei herunterladen“ speichert `aschke-pflege-selfie.jpg`
- [ ] „Nochmal“ führt zurück zur Live-Ansicht
- [ ] Auto-Reset nach 75 Sekunden löscht Foto und Namen
- [ ] Verhalten bei verweigerter Kamera-Berechtigung: Hinweis und „Erneut versuchen“
- [ ] Dauerbetrieb: Seite bleibt über längere Zeit flüssig, Kamera läuft nach Bildschirmsperre wieder an

## Offen

- Schrift der Website eintragen (Name oder Font-Datei nötig)
- Optional: QR-Code-Abholung mit kurzzeitigem Upload (WordPress-Endpunkt, automatische Löschung nach 24 Stunden, Einwilligungshinweis)
