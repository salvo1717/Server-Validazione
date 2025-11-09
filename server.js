const http = require('http');
const path = require('path');
const { readFile } = require('fs').promises;
const fs = require('fs');
const url = require('url');
const { formidable } = require('formidable');

const hostname = '127.0.0.1';
const port = 3000;
const tipi = {
    '.html': { type: 'text/html', folder: 'html' },
    '.css': { type: 'text/css', folder: 'css' },
    '.js': { type: 'application/javascript', folder: 'js' },
    '.jpg': { type: 'image/jpeg', folder: 'img' },
    '.png': { type: 'image/png', folder: 'img' }
};
async function requestHandler(req, res) {
    let estensione = path.extname(req.url) || '.html';
    let nome = path.basename(req.url, estensione) || 'index';
    let tipo = tipi[estensione.toLowerCase()];
    let oggettourl = url.parse(req.url, true);
    const perc = oggettourl.pathname;
    if (perc === '/submit' && req.method === 'POST') {
        const form = formidable({
            multiples: true,
            uploadDir: path.join(__dirname, 'uploads'),
            keepExtensions: true,
            allowEmptyFiles: true,
            minFileSize: 0
        });
        form.parse(req, (err, fields, files) => {
            if (err) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
                res.end('Errore nel caricamento del file: ' + err.message);
                return;
            }
            let stringaerrore = '';
            const nome = fields['nome'] ? fields['nome'][0] : undefined;
            const cognome = fields['cognome'] ? fields['cognome'][0] : undefined;
            const data = fields['data'] ? fields['data'][0] : undefined;
            const sesso = fields['sesso'] ? fields['sesso'][0] : undefined;
            const email = fields['email'] ? fields['email'][0] : undefined;
            const password = fields['password'] ? fields['password'][0] : undefined;
            const patenti = fields.patenti;
            const scuola = fields['scuola'] ? fields['scuola'][0] : undefined;
            const commenti = fields['commenti'] ? fields['commenti'][0] : undefined;
            const fotoProfilo = files.foto_profilo ? files.foto_profilo[0] : null;
            if (fotoProfilo) {
                const estensioneFile = path.extname(fotoProfilo.originalFilename).toLowerCase();
                const tipiValidi = ['.jpg', '.jpeg', '.png', '.gif'];
                if (!tipiValidi.includes(estensioneFile)) {
                    stringaerrore += 'Formato foto profilo non valido. ';
                }
            }
            if (nome == undefined || nome === "" || !/^[a-zA-Z ]+$/gm.test(nome)) {
                stringaerrore += 'Nome non valido. ';
            }
            if (cognome == undefined || cognome === "" || !/^[a-zA-Z ]+$/gm.test(cognome)) {
                stringaerrore += 'Cognome non valido. ';
            }
            if (data == undefined || data === "" || isNaN(Date.parse(data)) || new Date(data) > new Date()) {
                stringaerrore += 'Data non valida. ';
            }
            if (!sesso || sesso === "") {
                stringaerrore += 'Seleziona un genere valido. ';
            }
            if (email == undefined || email === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                stringaerrore += 'Email non valida. ';
            }
            if (password == undefined || password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
                stringaerrore += 'Password non valida. ';
            }
            if (!patenti) {
                stringaerrore += 'Seleziona almeno una patente. ';
            }
            if (scuola == undefined || scuola === "") {
                stringaerrore += 'Seleziona una scuola. ';
            }
            if (commenti == undefined || commenti.length === 0) {
                stringaerrore += 'Inserisci dei commenti. ';
            }
            if (stringaerrore === '') {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
                res.end('Form inviato con successo!');
            }
            else {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
                res.end('Errore nel modulo: ' + stringaerrore);
            }
        });
    }
    else if (tipo) {
        let percorso = path.join(__dirname, tipo.folder, nome + estensione);
        try {
            let data = await readFile(percorso);
            res.statusCode = 200;
            res.setHeader('Content-Type', tipo.type);
            res.end(data);
        }
        catch (err) {
            try {
                let data = await readFile(path.join(__dirname, 'html', '404.html'));
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
            catch (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Errore interno del server');
            }
        }

    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Risorsa non trovata');
    }

}
var server = http.createServer(requestHandler);
server.listen(port, hostname, function () {

    console.log(`Server running at http://${hostname}:${port}/`);

});