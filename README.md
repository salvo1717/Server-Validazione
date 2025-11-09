# 🚀 Server-Validazione Form (Node.js)

Questo progetto implementa un semplice server HTTP con Node.js per servire un form HTML e gestire la **validazione dei dati** inviati tramite query string (metodo GET).

La validazione è eseguita **lato server** (nel file `server.js`) per garantire la sicurezza e l'integrità dei dati, anche se la validazione lato client è disabilitata (`novalidate` su `index.html`).

---

## ✨ Caratteristiche Principali

* **Server HTTP Puro:** Utilizza il modulo `http` integrato di Node.js.
* **Validazione Lato Server:** Controlli di base per Nome, Email, Età, Numero di Telefono e accettazione delle Condizioni.
* **Gestione Risorse:** Server in grado di servire file HTML, CSS, JS e immagini da cartelle dedicate (`html`, `css`, `js`, `img`).
* **Animazione Bottone:** Utilizzo della libreria CDN **Hover.css** (`hvr-shutter-out-horizontal`) per un effetto hover elegante sul pulsante di invio.
* **Gestione Errori:** Restituisce un codice di stato **400 (Bad Request)** e una stringa di errori chiara in caso di fallimento della validazione.

---

## 🛠️ Requisiti

* [Node.js](https://nodejs.org/) (versione LTS consigliata).

---

## 💻 Avvio del Progetto

1.  **Clona il Repository:**
    ```bash
    git clone [https://github.com/salvo1717/Server-Validazione.git](https://github.com/salvo1717/Server-Validazione.git)
    cd Server-Validazione
    ```

2.  **Avvia il Server:**
    Non sono necessarie dipendenze esterne (`npm install`). Esegui direttamente il file `server.js`:
    ```bash
    node server.js
    ```

3.  **Accesso:**
    Apri il tuo browser e naviga all'indirizzo:
    ```
    [http://127.0.0.1:3000/](http://127.0.0.1:3000/)
    ```

---

## 📋 Endpoint e Logica di Validazione

| Percorso | Metodo | Scopo | Risposta in Caso di Successo | Risposta in Caso di Errore |
| :--- | :--- | :--- | :--- | :--- |
| `/` | GET | Serve la pagina `index.html`. | Status 200, Content-Type `text/html`. | Status 404 (se file non trovato). |
| `/submit` | GET | Gestisce la sottomissione del form e valida i dati passati in query. | Status 200, `text/plain` ("Form inviato con successo!"). | Status 400, `text/plain` (elenco degli errori). |

### Regole di Validazione Server (`server.js`)

| Campo | Regola di Controllo |
| :--- | :--- |
| **Nome** | Non vuoto (`!== ""`) E deve contenere solo lettere e spazi (`/^[a-zA-Z ]+$/gm`). |
| **Email** | Non vuota (`!== ""`) E deve seguire il formato standard (regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`). |
| **Età** | Non vuota (`!== ""`), è un numero (`!isNaN`), ed è compresa tra 0 e 120. |
| **Numero** | Corrisponde al formato internazionale di base (tra 7 e 15 cifre con `+` iniziale opzionale: `/^\+?[0-9]{7,15}$/`). |
| **Condizioni** | Il valore deve essere la stringa `'on'` (selezionato). |