# Aschke Foto-Booth

Selfie-Booth für den Messestand der Pflegeschule Aschke (Variante A: Rahmen mit Logo, Spruch und Stickern). Läuft komplett im Browser, auf dem iPad im Hoch- und Querformat. Es wird nichts hochgeladen. Als Web-App auf dem Home-Bildschirm installierbar und danach auch ohne Netz nutzbar.

- Testseite: https://greenframes.github.io/photobooth/
- Die App ist `index.html` (eine Datei, Logo ist eingebettet). `aschke-foto-booth.html` leitet nur auf die Startseite weiter, damit ältere Links weiter funktionieren.

## Dateien

| Datei | Zweck |
| --- | --- |
| `index.html` | die komplette App |
| `manifest.webmanifest` | Name, Icons und Startverhalten der installierten App |
| `sw.js` | Service Worker, speichert die App für den Offline-Betrieb |
| `icons/` | Icons für den Home-Bildschirm (aus dem Logo-Symbol) |
| `aschke-foto-booth.html` | Weiterleitung für alte Links |

Alle Dateien müssen im selben Ordner liegen, Pfade sind relativ. Die App läuft dadurch unter jedem Unterordner (GitHub Pages, eigener Server).

## Ablauf am Stand

1. Besucher wählt Spruch und Sticker (Namensschild, Sprechblase, Herzchen, EKG-Linie) und tippt optional den Vornamen ein.
2. „Foto machen“ startet einen Countdown von 3 Sekunden, danach erscheint das fertige Bild (1080 × 1350 px, JPG).
3. „Teilen / Sichern“ öffnet das iPad-Share-Sheet (AirDrop, Nachrichten, Bild sichern), alternativ Download als Datei.
4. Nach 75 Sekunden ohne Bedienung werden Foto und Name gelöscht und die Booth springt zurück in den Startzustand.

## Auf dem iPad installieren (Home-Bildschirm)

1. Die Seite in **Safari** über HTTPS öffnen und die Kamera erlauben.
2. Teilen-Symbol, dann „Zum Home-Bildschirm“, dann „Hinzufügen“.
3. Die App einmal **mit Netz** über das neue Icon starten, damit alles gespeichert wird. Danach läuft sie auch im Flugmodus.

Empfehlung für den Stand: Einstellungen, Anzeige & Helligkeit, Automatische Sperre auf „Nie“, dazu der „Geführte Zugriff“ von iPadOS, damit Besucher die App nicht verlassen können. Das iPad am Strom lassen.

### Updates

Der Service Worker liefert die gespeicherte Version sofort aus und holt im Hintergrund die neue. Nach einer Änderung die App also einmal schließen und **zweimal** öffnen. Wer sicher gehen will, erhöht bei jeder Änderung die Version in `sw.js` (`CACHE = "aschke-booth-v1"` auf `v2` usw.). Vor der Messe am Stand-iPad mit Netz öffnen und prüfen, dass die richtige Version läuft.

## Einstellungen

Oben im Skript in `index.html`, Block `CONFIG`: Sprüche, Sprechblasen-Texte, Hashtag, Countdown, Zeit bis zum Auto-Reset, Dateiname. Die Schrift steht in der Konstante `FONT` (aktuell Systemschrift des Geräts).

## Einbindung auf dem eigenen Server

Die Kamera und der Offline-Modus funktionieren nur über HTTPS. Den Ordner mit allen Dateien auf den Server legen (per FTP, HTML-Dateien lassen sich in der WordPress-Mediathek meist nicht hochladen), zum Beispiel nach `https://example.de/foto-booth/`.

Für die Installation auf dem iPad die Adresse **direkt in Safari** öffnen. Wer die Booth zusätzlich in eine Seite einbetten will:

```html
<iframe src="https://example.de/foto-booth/"
        allow="camera" style="border:0;width:100%;height:100vh"></iframe>
```

`allow="camera"` ist Pflicht, sonst blockiert der Browser die Kamera im iframe.

## Testcheckliste (echtes iPad)

- [ ] Kamera startet nach der Berechtigungsabfrage (Frontkamera, gespiegelte Vorschau)
- [ ] Hochformat und Querformat: Bild und Bedienelemente vollständig sichtbar, Auslöser nicht abgeschnitten
- [ ] Namensschild mit langem Vornamen (z. B. 14 Zeichen) passt, Handschrift-Schrift wird angezeigt
- [ ] Alle fünf Sprüche und alle Sticker lassen sich schalten, Sprechblase wechselt durch alle fünf Texte
- [ ] Countdown und Foto, Blitz-Effekt, Ergebnis im Format 4:5
- [ ] „Teilen / Sichern“: Share-Sheet erscheint, AirDrop und „Bild sichern“ funktionieren
- [ ] „Als Datei herunterladen“ speichert `aschke-pflege-selfie.jpg`
- [ ] „Nochmal“ führt zurück zur Live-Ansicht
- [ ] Auto-Reset nach 75 Sekunden löscht Foto und Namen
- [ ] Verhalten bei verweigerter Kamera-Berechtigung: Hinweis und „Erneut versuchen“
- [ ] Dauerbetrieb: Seite bleibt über längere Zeit flüssig, Kamera läuft nach Bildschirmsperre wieder an
- [ ] Home-Bildschirm: Icon und Name „Foto-Booth“ stimmen, App startet im Vollbild ohne Safari-Leiste
- [ ] Kamera funktioniert auch in der installierten App (Berechtigung wird dort ggf. erneut abgefragt)
- [ ] Flugmodus: App startet über das Icon, Foto machen und Teilen funktionieren
- [ ] Nach einem Update (Version in `sw.js` erhöht) läuft nach zweimaligem Öffnen die neue Version

## Offen

- Schrift der Website eintragen (Name oder Font-Datei nötig)
- Optional: QR-Code-Abholung mit kurzzeitigem Upload (WordPress-Endpunkt, automatische Löschung nach 24 Stunden, Einwilligungshinweis). Dafür wird beim Teilen Netz benötigt.
