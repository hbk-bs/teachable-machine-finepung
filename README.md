# teachable-machine-finepung

__Ist das eine Beere?__
Dieses Projekt zeigt, wie eine Website mit einem Teachable Machine Bildmodell erstellt und integriert werden kann. Im Folgenden wird kurz beschrieben, wie die Website technisch aufgebaut ist und funktioniert.

## Technischer Aufbau

Die Website besteht hauptsächlich aus HTML und JavaScript und ist folgendermaßen strukturiert:

1. **index.html**  
   - Einstiegspunkt der Anwendung  
   - Enthält das Grundgerüst der Seite, z.B. Überschrift, Upload-Feld für Bilder und einen Bereich für die Ergebnisanzeige  
   - Bindet die nötigen JavaScript-Dateien ein

2. **JavaScript (z.B. in `/src/` oder direkt im HTML)**  
   - Verantwortlich für die Einbindung des Teachable Machine Modells  
   - Lädt das exportierte Modell (meist als `.json` und zugehörige Dateien)  
   - Reagiert auf User-Interaktionen, z.B. wenn ein Bild hochgeladen wird  
   - Übergibt das Bild an das Modell, wertet die Klassifizierung aus und zeigt das Ergebnis auf der Website an  
   - Beispiel:  
     ```js
     // Modell laden und Bild klassifizieren
     const classifier = await tmImage.load(modelURL, metadataURL);
     const prediction = await classifier.predict(uploadedImage);
     // Ausgabe des Ergebnisses im HTML
     ```

3. **Modell-Dateien (`/model/` oder externer Link)**  
   - Enthalten das trainierte Teachable Machine Modell  
   - Werden beim Laden der Seite vom JavaScript eingebunden

## Funktionsweise

- Nutzer:innen laden ein Bild hoch.
- Das Bild wird an das Teachable Machine Modell übergeben.
- Das Modell klassifiziert das Bild (z.B. "Sammelnussfrucht", "echte Beere", etc.).
- Das Ergebnis wird im Browser angezeigt, oft mit einem kurzen Infotext oder einem humorvollen Hinweis.

---

_Ein Projekt von Josefine Unger @ HBK Braunschweig 2025_



