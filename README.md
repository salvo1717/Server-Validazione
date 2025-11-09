# 🚀 Server Web Semplice con Gestione Form

Questo è un server web di base sviluppato in **Node.js** utilizzando il modulo `http` integrato. Gestisce la **servizione di file statici** (HTML, CSS, JS, immagini) e l'**elaborazione di un form** inviato tramite metodo POST, inclusa la gestione del caricamento di file e una convalida di base dei dati.

---

## 🛠️ Requisiti

Per eseguire questo progetto, devi avere installato:

* **Node.js** (versione consigliata: 12.x o successiva)

### 📦 Installazione delle Dipendenze

Il progetto utilizza la libreria `formidable` per l'elaborazione dei dati dei form `multipart/form-data` e i caricamenti di file.

1.  Apri il terminale nella directory del progetto.
2.  Installa la dipendenza necessaria:
    ```bash
    npm install formidable
    ```

---

## 📂 Struttura del Progetto

Il server è configurato per cercare le risorse statiche in cartelle specifiche. Assicurati di avere la seguente struttura:
├── server.js
├── package.json
├── node_modules
├── html/
│   ├── index.html
│   └── 404.html (pagina di errore)
├── css/
    ├──index.css
    └──404.css
└── uploads/

## ▶️ Avvio del Server

1.  Assicurati che la dipendenza `formidable` sia installata.
2.  Avvia il server dal terminale:

    ```bash
    node server.js
    ```

3.  Apri il tuo browser e naviga verso l'indirizzo:
    **`http://127.0.0.1:3000/`**

    Il terminale confermerà l'avvio:
    ```
    Server running at [http://127.0.0.1:3000/](http://127.0.0.1:3000/)
    ```

---

## ✨ Funzionalità

### 🌐 Servizio di Contenuti Statici

Il server gestisce automaticamente la distribuzione di file basandosi sull'estensione dell'URL:

| Estensione | Tipo MIME | Cartella di Ricerca |
| :---: | :---: | :---: |
| `.html` | `text/html` | `html` |
| `.css` | `text/css` | `css` |
| `.js` | `application/javascript` | `js` |
| `.jpg`, `.png` | `image/jpeg`, `image/png` | `img` |

* Se l'URL non ha estensione (es. `/`), cerca `index.html` nella cartella `html`.
* Se un file non viene trovato, risponde con `404 Not Found` e serve il file `404.html`.

### 📝 Gestione e Convalida Form

L'endpoint **POST** su `/submit` elabora i dati inviati da un form HTML:

* **Caricamento File:** Gestisce i file caricati (`foto_profilo`) salvandoli nella cartella **`uploads`**.
* **Convalida:** Effettua una serie di controlli sui campi inviati:
    * **Formato Immagine:** Verifica che la foto profilo sia un'immagine valida (`.jpg`, `.jpeg`, `.png`, `.gif`).
    * **Validazione Dati:** Controlli su nome, cognome (solo lettere), data (non nel futuro), sesso, email (formato base), password (min. 8 caratteri, con maiuscole, minuscole e numeri), selezione di patente, scuola e commenti.
* **Risposta:**
    * **Successo (200):** Se tutti i campi sono validi.
    * **Errore (400):** Se la convalida fallisce, restituisce un messaggio che elenca tutti gli errori riscontrati.