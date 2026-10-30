# Aschke Foto-Booth

Selfie-Booth für den Messestand der Pflegeschule Aschke (Variante A: Rahmen mit Logo, Spruch und Stickern). Läuft komplett im Browser, auf dem iPad im Hoch- und Querformat. Es wird nichts hochgeladen, die Fotos bleiben auf dem iPad. Als Web-App auf dem Home-Bildschirm installierbar und danach auch ohne Netz nutzbar.

- Testseite: https://greenframes.github.io/photobooth/
- Die App ist `index.html` (eine Datei, Logo ist eingebettet). `aschke-foto-booth.html` leitet nur auf die Startseite weiter, damit ältere Links weiter funktionieren.

## Dateien

| Datei | Zweck |
| --- | --- |
| `index.html` | die komplette App |
| `manifest.webmanifest` | Name, Icons und Startverhalten der installierten App |
| `sw.js` | Service Worker, speichert die App für den Offline-Betrieb |
| `icons/` | Icons für den Home-Bildschirm (aus dem Logo-Symbol) |
| `vendor/face-api.js`, `models/` | Gesichtserkennung für die Sonnenbrille (face-api, MIT-Lizenz, rund 1,7 MB), läuft komplett im Browser |
| `aschke-foto-booth.html` | Weiterleitung für alte Links |

Alle Dateien müssen im selben Ordner liegen, Pfade sind relativ. Die App läuft dadurch unter jedem Unterordner (GitHub Pages, eigener Server).

## Ablauf am Stand

1. Besucher wählt zuerst „Ich allein“ oder „Wir (zu zweit oder mehr)“, dann Spruch und Sticker (Sprechblase, Herzchen, EKG-Linie, Sonnenbrille). Der Schalter stellt Sprüche und Sprechblasen zwischen Einzahl und Mehrzahl um („Zukünftige Pflegefachkraft“ / „Zukünftige Pflegefachkräfte“).
2. „Foto machen“ startet einen Countdown von 3 Sekunden, danach erscheint das fertige Bild (1080 × 1350 px, JPG).
3. „Teilen / Sichern“ öffnet das iPad-Share-Sheet (AirDrop, Nachrichten, Bild sichern), alternativ Download als Datei.
4. Jedes Foto wird automatisch auf dem iPad in der App gespeichert (siehe „Lokale Ablage“). Besucher können ihr Foto über „Mein Foto vom iPad löschen“ sofort wieder entfernen.
5. Nach 75 Sekunden ohne Bedienung springt die App auf die Live-Ansicht zurück, alle Einstellungen gehen auf „Ich allein“ und den Startzustand. Gespeicherte Fotos bleiben erhalten. Das gilt auch auf der Live-Ansicht, wenn jemand etwas verstellt und dann weggegangen ist.

## Halloween-Modus

Im Mitarbeiter-Bereich (5× aufs Logo tippen, PIN) gibt es oben den Schalter **„Halloween: aus / an“**. Im Halloween-Modus erscheinen andere Sprüche („Schaurig gute Pflegefachkraft“, „Pflegefachassistenz mit Biss“ …), andere Sprechblasen („Buh! Ich werde Pflegeprofi!“, „Pflege ist kein Hexenwerk!“ …) und statt der Herzchen Halloween-Deko (Spinnennetz, Spinne, Fledermäuse, Geist, Kürbisse). Rahmen, Logo, Farbe und Hashtag bleiben gleich, der Schalter Einzahl/Mehrzahl funktioniert weiter.

Die Einstellung gilt für das jeweilige iPad und bleibt nach einem Neustart erhalten. Alternativ schaltet die Adresse `…/photobooth/?halloween=1` den Modus ein, `?halloween=0` aus. Die Texte stehen im Block `CONFIG.halloween` in `index.html`.

## Sonnenbrille

Der Sticker „Sonnenbrille“ setzt die pinke Merch-Brille auf jedes erkannte Gesicht (Position, Größe und Neigung folgen den Augen, schon in der Live-Vorschau). Die Erkennung läuft im Browser auf dem iPad, es wird nichts übertragen, und sie funktioniert auch offline. Die Brille ist das Foto der echten Merch-Brille, freigestellt (`icons/glasses.png`, Funktion `drawGlasses` in `index.html`) und passend zu den Augen skaliert, gedreht und gesetzt. Für eine andere Brille das Bild austauschen und die Glasmitten in `GLASSES` anpassen. Beim ersten Einschalten wird die Erkennung geladen, das dauert einen kurzen Moment („Sonnenbrille lädt …“). Beim Foto wird die Erkennung noch einmal auf dem Bild selbst ausgeführt. Bei starker Kopfdrehung wirkt die flache Brille unnatürlich, Haare oder Hände vor dem Gesicht liegen unter der Brille.

## Lokale Ablage und Mitarbeiter-Galerie

- Jedes Foto wird beim Aufnehmen in der App-Datenbank des iPads (IndexedDB) gespeichert. Es wird nichts übertragen. Die Fotos bleiben, bis Mitarbeiter sie löschen.
- **Galerie öffnen:** 5× schnell (innerhalb von 3 Sekunden) auf das Logo oben links tippen, dann die PIN eingeben. Die Standard-PIN ist `1234` und steht in `CONFIG.staffPin`. **Vor der Messe ändern.**
- In der Galerie: Fotos ansehen, einzeln teilen oder löschen, **„Alle als ZIP“** zum Sichern (per Teilen-Menü an AirDrop, Dateien-App oder Mac) und **„Alle löschen“**. Nach 75 Sekunden Inaktivität schließt sich die Galerie von selbst.
- Der Platz reicht für mehrere tausend Fotos (ca. 100 bis 150 KB pro Foto).

Wichtig zu wissen:

- Die Fotos liegen nur im Speicher dieser installierten App. Wird die App oder die Website-Daten des iPads gelöscht oder lange nicht benutzt (Safari räumt Speicher gelegentlich auf), sind sie weg. **Am Messetag abends und nach der Messe das ZIP sichern.**
- Die App fragt iPadOS um dauerhaften Speicher an. Auf dem Home-Bildschirm installierte Apps werden dabei deutlich besser behandelt als Safari-Tabs.
- Das iPad am besten mit Code sperren, Geführter Zugriff an. Auf dem Gerät liegen Fotos von Besuchern, deshalb nach der Messe das ZIP sichern und danach „Alle löschen“.
- Datenschutz: Besucher sollten am Stand einen kurzen Hinweis sehen, dass Fotos auf dem iPad gespeichert werden und auf Wunsch gelöscht werden. Die Abstimmung (Einwilligung, Aufbewahrungsdauer, Verwendung in der Galerie) liegt bei euch bzw. dem Datenschutzbeauftragten.

## Auf dem iPad installieren (Home-Bildschirm)

1. Die Seite in **Safari** über HTTPS öffnen und die Kamera erlauben.
2. Teilen-Symbol, dann „Zum Home-Bildschirm“, dann „Hinzufügen“.
3. Die App einmal **mit Netz** über das neue Icon starten, damit alles gespeichert wird. Danach läuft sie auch im Flugmodus.

Empfehlung für den Stand: Einstellungen, Anzeige & Helligkeit, Automatische Sperre auf „Nie“, dazu der „Geführte Zugriff“ von iPadOS, damit Besucher die App nicht verlassen können. Das iPad am Strom lassen.

### Updates

Der Service Worker liefert die gespeicherte Version sofort aus und holt im Hintergrund die neue. Nach einer Änderung die App also einmal schließen und **zweimal** öffnen. Wer sicher gehen will, erhöht bei jeder Änderung die Version in `sw.js` (`CACHE = "aschke-booth-v1"` auf `v2` usw.). Vor der Messe am Stand-iPad mit Netz öffnen und prüfen, dass die richtige Version läuft.

## Einstellungen

Oben im Skript in `index.html`, Block `CONFIG` (der QR-Code ist als Grafik fest eingebettet, bei geänderter `galleryUrl` muss er neu erzeugt werden): Sprüche und Sprechblasen-Texte (jeweils als Paar [Einzahl, Mehrzahl]), Hashtag, Countdown, Zeit bis zum Auto-Reset, Dateiname. Die Schrift steht in der Konstante `FONT` (aktuell Systemschrift des Geräts).

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
- [ ] Alle fünf Sprüche und alle Sticker lassen sich schalten, Sprechblase wechselt durch alle fünf Texte
- [ ] Schalter „Ich allein / Wir“ stellt Spruchauswahl, Vorschau und Sprechblase sofort auf Einzahl bzw. Mehrzahl um
- [ ] Nach einem Foto und 75 Sekunden Pause steht der Schalter wieder auf „Ich allein“
- [ ] Foto wird gespeichert (Hinweis unter dem Foto), „Mein Foto vom iPad löschen“ entfernt es
- [ ] Galerie: 5× auf Logo tippen, PIN, Fotos erscheinen, Ansehen/Teilen/Löschen funktioniert
- [ ] ZIP: „Alle als ZIP“ erzeugt Datei, Teilen an AirDrop/Mac, ZIP lässt sich öffnen
- [ ] QR-Code auf dem Ergebnis-Bildschirm lässt sich mit einem Handy scannen (Abstand ca. 50 cm) und öffnet die Veranstaltungsseite
- [ ] Halloween-Modus im Mitarbeiter-Bereich ein- und ausschalten: Sprüche, Sprechblasen und Deko wechseln, Modus bleibt nach App-Neustart
- [ ] Sonnenbrille: sitzt in der Live-Vorschau auf den Augen, folgt dem Kopf flüssig (sonst Erkennung seltener laufen lassen), auch bei zwei bis drei Personen, und ist auf dem fertigen Foto an derselben Stelle
- [ ] Sonnenbrille im Flugmodus nach vorherigem Laden mit Netz
- [ ] Fotos sind nach App-Neustart und im Flugmodus noch da
- [ ] Countdown und Foto, Blitz-Effekt, Ergebnis im Format 4:5
- [ ] „Teilen / Sichern“: Share-Sheet erscheint, AirDrop und „Bild sichern“ funktionieren
- [ ] „Als Datei herunterladen“ speichert `aschke-pflege-selfie.jpg`
- [ ] „Nochmal“ führt zurück zur Live-Ansicht
- [ ] Auto-Reset nach 75 Sekunden löscht das Foto
- [ ] Verhalten bei verweigerter Kamera-Berechtigung: Hinweis und „Erneut versuchen“
- [ ] Dauerbetrieb: Seite bleibt über längere Zeit flüssig, Kamera läuft nach Bildschirmsperre wieder an
- [ ] Home-Bildschirm: Icon und Name „Foto-Booth“ stimmen, App startet im Vollbild ohne Safari-Leiste
- [ ] Kamera funktioniert auch in der installierten App (Berechtigung wird dort ggf. erneut abgefragt)
- [ ] Flugmodus: App startet über das Icon, Foto machen und Teilen funktionieren
- [ ] Nach einem Update (Version in `sw.js` erhöht) läuft nach zweimaligem Öffnen die neue Version

## Offen

- Schrift der Website eintragen (Name oder Font-Datei nötig)
- Nach der Messe die Fotos aus dem ZIP auf https://aschke-seminare.de/unsere-veranstaltungen-2/ einstellen (nur Fotos, mit denen die Besucher einverstanden sind). Der QR-Code auf dem Ergebnis-Bildschirm führt schon dorthin.
- Optional: Kasack-Anprobe, vorerst verworfen
