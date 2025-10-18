# 🌟 Der kleine Prinz und die Schatten der Erde - Website

Eine interaktive, slide-basierte Website für die moderne Adaption des kleinen Prinzen.

## 🚀 Live Demo

Die Website ist über GitHub Pages verfügbar: `https://[dein-username].github.io/sucht`

## ✨ Features

### 📱 **Responsive Design**
- Funktioniert perfekt auf Desktop, Tablet und Smartphone
- Touch/Swipe-Unterstützung für mobile Geräte
- Optimiert für alle Bildschirmgrößen

### 🎯 **Navigation**
- **Slide-System**: Jedes Kapitel als separate Slide
- **Mehrere Navigationsmöglichkeiten**:
  - Pfeiltasten (← →)
  - Zahlen 1-7 für direkte Kapitelauswahl
  - Touch/Swipe-Gesten
  - Navigation-Buttons
  - Kapitel-Menü

### 🎨 **Design**
- **Poetische Atmosphäre** mit Sternen-Hintergrund
- **Moderne Typografie** (Crimson Text + Inter)
- **Sanfte Animationen** und Übergänge
- **Glasmorphism-Effekte**
- **Dunkles Theme** mit warmen Akzenten

### 🔧 **Technische Features**
- **Progressive Web App** Eigenschaften
- **Lokaler Speicher** für Lesefortschritt
- **Barrierefreiheit** (ARIA-Labels, Keyboard-Navigation)
- **Performance-Optimierung** (Lazy Loading, Preloading)
- **SEO-optimiert**

### 📊 **Tracking**
- Automatisches Speichern des Lesefortschritts
- Lesezeit-Tracking pro Kapitel
- Fortschrittsbalken

## 🛠 Installation & Setup

### Für GitHub Pages:

1. **Repository erstellen**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Der kleine Prinz Website"
   git branch -M main
   git remote add origin https://github.com/[dein-username]/sucht.git
   git push -u origin main
   ```

2. **GitHub Pages aktivieren**:
   - Gehe zu Repository Settings
   - Scrolle zu "Pages"
   - Wähle "Deploy from a branch"
   - Wähle "main" branch
   - Wähle "/ (root)"
   - Klicke "Save"

3. **Website ist live** unter: `https://[dein-username].github.io/sucht`

### Für lokale Entwicklung:

```bash
# Einfacher HTTP-Server
python -m http.server 8000
# oder
npx serve .

# Dann öffne: http://localhost:8000
```

## 📁 Dateistruktur

```
/
├── index.html          # Haupt-HTML-Datei
├── styles.css          # CSS-Styling
├── script.js           # JavaScript-Funktionalität
├── _config.yml         # GitHub Pages Konfiguration
├── illustrations/      # Bilder
│   └── png/           # Kapitel-Illustrationen
│       ├── 01.png     # Die ersten Schritte
│       ├── 02.png     # Süßes Gift
│       ├── 03.png     # Abgleiten
│       ├── 04.png     # Dunkelster Punkt
│       ├── 05.png     # Wiederfinden
│       └── 06.png     # Neuer Blick
└── README.md          # Original Geschichte
```

## 🎮 Bedienung

### Keyboard Shortcuts:
- `←` / `→` : Vorherige/Nächste Slide
- `1-7` : Direkt zu Kapitel springen
- `Tab` : Navigation durch interaktive Elemente

### Touch/Mobile:
- **Swipe links/rechts** für Navigation
- **Tap** auf Navigation-Buttons
- **Scroll** innerhalb der Slides

### Maus:
- **Klick** auf Pfeile oder Kapitel-Buttons
- **Scroll** innerhalb der Slide-Inhalte

## 🎨 Anpassungen

### Farben ändern:
Bearbeite die CSS-Variablen in `styles.css`:
```css
:root {
    --primary-color: #2c3e50;
    --accent-color: #f39c12;
    --star-color: #ffd700;
    /* ... weitere Farben */
}
```

### Neue Kapitel hinzufügen:
1. Füge neue `<section class="slide">` in `index.html` hinzu
2. Aktualisiere `totalSlides` im JavaScript
3. Füge entsprechende Illustration hinzu

### Styling anpassen:
- **Schriftarten**: Ändere Google Fonts Links
- **Layout**: Modifiziere CSS Grid in `.slide-content`
- **Animationen**: Anpasse Transition-Eigenschaften

## 🔧 Technische Details

### Browser-Unterstützung:
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile Browser (iOS Safari, Chrome Mobile)

### Performance:
- **Lazy Loading** für Bilder
- **Preloading** für nächste Slides
- **CSS-Optimierung** mit komprimiertem Output
- **JavaScript-Optimierung** mit Event-Delegation

### Barrierefreiheit:
- **ARIA-Labels** für Screen Reader
- **Keyboard-Navigation** vollständig unterstützt
- **Focus-Management** bei Slide-Wechseln
- **Reduced Motion** Support

## 📱 Progressive Web App

Die Website kann als App installiert werden:
1. Öffne die Website im Browser
2. Klicke auf "Zur Startseite hinzufügen" (Mobile)
3. Oder verwende "App installieren" (Desktop)

## 🐛 Troubleshooting

### Bilder werden nicht angezeigt:
- Überprüfe Pfade in `illustrations/png/`
- Stelle sicher, dass alle PNG-Dateien vorhanden sind

### Navigation funktioniert nicht:
- Überprüfe JavaScript-Konsole auf Fehler
- Stelle sicher, dass `script.js` geladen wird

### GitHub Pages zeigt 404:
- Überprüfe Repository-Namen in `_config.yml`
- Stelle sicher, dass `index.html` im Root-Verzeichnis liegt

## 📄 Lizenz

Diese moderne Adaption ist inspiriert von Antoine de Saint-Exupérys "Der kleine Prinz" und behandelt zeitgemäße Themen wie digitale Sucht und Heilung.

## 🌟 Credits

- **Original**: Antoine de Saint-Exupéry - "Der kleine Prinz"
- **Moderne Adaption**: Zeitgemäße Interpretation
- **Technische Umsetzung**: Responsive Web-Technologien
- **Design**: Poetische Benutzeroberfläche mit Sternen-Thema
