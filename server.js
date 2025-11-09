const http = require('http');
const path = require('path');
const { readFile } = require('fs').promises;
const url = require('url');

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
    if (perc === '/submit') {
        let stringaerrore = '';
        const nome = oggettourl.query.nome;
        const email = oggettourl.query.email;
        const eta = oggettourl.query.eta;
        const numero = oggettourl.query.numero;
        const condizioni = oggettourl.query.condizioni;
        if  (nome==="" || !/^[a-zA-Z ]+$/gm.test(nome)) {
            stringaerrore += 'Nome non valido. ';
        }
        if (email === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            stringaerrore += 'Email non valida. ';
        }
        if (isNaN(eta) || eta < 0 || eta > 120 || eta === "") {
            stringaerrore += 'Età non valida. ';
        }
        if (!/^\+?[0-9]{7,15}$/.test(numero)) {
            stringaerrore += 'Numero di telefono non valido. ';
        }
        if (condizioni !== 'on') {
            stringaerrore += 'Devi accettare le condizioni. ';
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