# simply-note-app (In Entwicklung. Genauere angaben folgen. Es können Fehler aufträten!)

Eine Desktop-Notiz-App mit Angular als Frontend und Tauri als Desktop-Anwendung. Das Projekt enthält außerdem ein separates Rust-Backend-Verzeichnis.

## Plattform-Kompatibilität

Das Projekt ist grundsätzlich für macOS, Linux und Windows vorbereitet:

| Plattform | Startskript | Hinweis |
| --- | --- | --- |
| macOS | `./worspace.sh` | Bash ist normalerweise vorhanden. |
| Linux | `./worspace.sh` | Bash und die Tauri-Systemabhängigkeiten müssen installiert sein. |
| Windows | `worspace.cmd` | Startet die PowerShell-Module automatisch. |

Die Projektdateien und Startskripte sind damit plattformübergreifend angelegt. Für einen erfolgreichen Tauri-Build müssen zusätzlich die jeweiligen Systemvoraussetzungen des Betriebssystems erfüllt sein.

## Voraussetzungen

Vor dem ersten Start müssen folgende Werkzeuge installiert sein:

| Werkzeug | Zweck | Download |
| --- | --- | --- |
| Node.js inklusive npm | Angular, npm-Pakete und Tauri-CLI | [Node.js herunterladen](https://nodejs.org/en/download) |
| Rust inklusive Cargo und rustc | Tauri-Anwendung und Rust-Code kompilieren | [Rust installieren](https://www.rust-lang.org/tools/install) |

Das Startskript prüft `node`, `npm`, `cargo` und `rustc` automatisch. Fehlen Werkzeuge, wird der Start mit einer entsprechenden Meldung beendet.

### Optionale Werkzeuge

| Werkzeug | Zweck | Download |
| --- | --- | --- |
| Visual Studio Code | Projekt oder einzelne Ordner öffnen | [VS Code herunterladen](https://code.visualstudio.com/download) |
| PowerShell | Windows-Skript ausführen; unter aktuellen Windows-Versionen meist vorhanden | [PowerShell installieren](https://learn.microsoft.com/powershell/scripting/install/installing-powershell) |

Für Tauri können je nach Betriebssystem weitere Systemkomponenten erforderlich sein:

- [Tauri-Voraussetzungen für Windows, macOS und Linux](https://v2.tauri.app/start/prerequisites/)
- Windows: [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) und [WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)
- macOS: [Xcode und Command Line Tools](https://developer.apple.com/xcode/)

## Installation

1. Repository herunterladen oder klonen.
2. In das Projektverzeichnis wechseln.
3. Das Startskript ausführen.

Die npm-Pakete werden beim ersten Start automatisch im Ordner `frontend` installiert. Eine manuelle Installation ist ebenfalls möglich:

```bash
cd frontend
npm install
```

## Starten

### macOS und Linux

```bash
./worspace.sh
```

Falls die Datei noch nicht ausführbar ist:

```bash
chmod +x worspace.sh
./worspace.sh
```

### Windows

Doppelklick auf:

```text
worspace.cmd
```

Oder in `cmd` beziehungsweise PowerShell aus dem Projektverzeichnis:

```powershell
.\worspace.cmd
```

Der Windows-Starter ruft das PowerShell-Modul `@shell/windows/start.ps1` auf. Die Ausführung erfolgt für diesen Aufruf mit einer temporären `ExecutionPolicy`, damit keine separate Richtlinienanpassung notwendig ist.

## Menü

Nach der Werkzeug- und Paketprüfung bietet das Skript an:

1. Visual Studio Code zu öffnen oder ohne IDE fortzufahren.
2. Das gesamte Projekt oder einen einzelnen Bereich in VS Code zu öffnen:
   - gesamtes Verzeichnis
   - `app` für Tauri
   - `backend` für Rust
   - `frontend` für Angular
3. Einen Entwicklungsbefehl auszufuehren:
   - `ng serve`
   - `tauri dev`
   - Beenden

`tauri dev` startet den Angular-Dev-Server über die vorhandene Tauri-Konfiguration automatisch. Deshalb sollte nicht gleichzeitig ein separates `ng serve` gestartet werden.

## Manuelle Befehle

Angular-Entwicklung:

```bash
cd frontend
npm run start
```

Angular-Build:

```bash
cd frontend
npm run build
```

Tauri-Entwicklung:

```bash
cd app
npm run dev
```

Tauri-Desktop-Build:

```bash
cd app
npm run build
```

### Android und iOS

Die Mobile-Projekte werden einmalig initialisiert:

```bash
cd app
npm run android:init
npm run ios:init
```

Verfügbare Simulatoren und Geräte anzeigen:

```bash
npm run android:devices
npm run ios:devices
```

Zum Starten einen Gerätenamen beziehungsweise die Android-Seriennummer aus der Liste übergeben:

```bash
npm run android:run -- emulator-5554
npm run ios:run -- "iPhone 17"
```

Für ein physisches Gerät:

```bash
npm run android:run:device -- <ANDROID-SERIENNUMMER> --host
npm run ios:run:device -- "iPhone-Name" --host
```

Die Android-Seriennummer steht in der Ausgabe von `npm run android:devices`. Das Handy muss verbunden und entsperrt sein; Android muss USB-Debugging erlauben. Ohne das Geräteargument kann Tauri weiterhin den Emulator auswählen. `--host` sorgt nur für die Netzwerkverbindung zum Dev-Server, es wählt kein Gerät aus.

Alternativ kann der volle Tauri-Befehl verwendet werden:

```bash
npm run tauri -- android dev emulator-5554 --host
npm run tauri -- ios dev "Blue's iPhone" --host
```

`--host` verbindet die App über das Netzwerk mit dem Angular-Dev-Server. Handy und Entwicklungsrechner müssen einander erreichen können. Der Dev-Server lauscht dafür auf allen Netzwerkschnittstellen; nur in vertrauenswürdigen Netzwerken entwickeln.

Mobile Builds:

```bash
npm run android:build
npm run ios:build:simulator
npm run ios:build:device
```

`dev` und `run` starten die Desktop-App im Entwicklungsmodus. Für Android und iOS sind `*:dev` und `*:run` Startbefehle; `*:build` erstellt den jeweiligen Build. iOS-Geräte-Builds benötigen eine passende Xcode-Signierung.

### Docker und Podman

Die Dateien für Container liegen im Ordner `containers/`, der neben `app/`, `backend/` und `frontend/` liegt. Docker und Podman verwenden dieselbe Compose-Datei. Auf macOS muss bei Podman zuerst die VM gestartet werden (`podman machine start`); für `podman compose` muss ein Compose-Provider installiert sein.

Podman:

```bash
podman compose -f containers/compose.yaml up --build
```

Docker:

```bash
docker compose -f containers/compose.yaml up --build
```

Danach ist das Web-Frontend unter `http://localhost:8080` erreichbar. Nginx liefert Angular aus und leitet `/api/` an das Rust-Backend weiter. Das Backend ist nicht direkt nach außen veröffentlicht.

Die Datenbank bleibt SQLite. SQLite ist eine Datei und kein eigener Datenbankserver, daher läuft dafür kein separater Container. Compose bindet ein benanntes Volume ein, damit `/data/simply-note.db` Neustarts überlebt. Das Schema wird beim Backend-Start erstellt; die Dummy-Migration wird absichtlich nicht ausgeführt.

Beenden:

```bash
podman compose -f containers/compose.yaml down
```

Für Docker den Befehl mit `docker compose` ausführen. Das Volume nicht mit `down --volumes` entfernen, außer die gespeicherten Notizen sollen gelöscht werden.

Rust-Backend separat prüfen:

```bash
cd backend
cargo check
```

## Projektstruktur

```text
.
|-- @shell/
|   |-- init.sh
|   |-- commands.sh
|   |-- options.sh
|   `-- windows/
|       |-- init.ps1
|       |-- commands.ps1
|       |-- options.ps1
|       `-- start.ps1
|-- containers/       Container-Konfiguration für Docker und Podman
|   |-- backend.Dockerfile
|   |-- backend-entrypoint.sh
|   |-- compose.yaml
|   |-- frontend.Dockerfile
|   `-- frontend.nginx.conf
|-- app/              Tauri-Anwendung
|-- backend/          separates Rust-Backend
|-- frontend/         Angular-Anwendung
|-- worspace.sh       Startskript für macOS und Linux
|-- worspace.cmd      Startskript für Windows
`-- README.md
```

## Aktueller Projektstand

- Frontend: Angular 22
- Desktop-App: Tauri 2
- Backend: Rust, Axum und SQLite
- Container: Web-Frontend und Backend; SQLite-Daten bleiben in einem Volume erhalten
- Frontend-Abhängigkeiten: `frontend/package.json` und `frontend/package-lock.json`  
- Rust-Code: Tauri-Code unter `app/src` sowie ein separates Backend unter `backend`

## Was noch offen ist

- Die aktuelle Notes-API hat noch keine Benutzerkonten oder Authentifizierung.
- Backups und Wiederherstellung des SQLite-Volumes sind noch nicht automatisiert.
- `npm ci` meldet derzeit fünf Abhängigkeitsschwachstellen (zwei moderate, eine hohe, zwei kritische); sie müssen geprüft und gezielt behoben werden.
- Für einen öffentlichen Produktivbetrieb fehlen HTTPS/TLS, ein abgesichertes Deployment und ein dokumentierter Upgrade-/Migrationsablauf.
- Android- und iOS-Builds müssen noch auf echten Zielgeräten inklusive Signierung abschließend getestet werden.
