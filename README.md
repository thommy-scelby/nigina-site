# Sito di Nigina Rabimkulova

Sito portfolio in React (Vite), pagina unica, solo in inglese, mobile first.

## Avvio in locale

Serve Node.js 18 o più recente.

```bash
npm install
npm run dev      # apre il sito su http://localhost:5173
npm run build    # crea la cartella dist/ da pubblicare
```

## Dove si modifica cosa

| Cosa | Dove |
|---|---|
| Testi, misure, email, Instagram, crediti dei book, link | `src/data/site.js` (unico file) |
| Foto | cartella `public/img/` (vedi sotto) |
| Colori, font, larghezza della pagina | inizio di `src/styles.css` |
| Titolo e anteprima del link condiviso | `index.html` |

### Sezioni che si accendono da sole

In `src/data/site.js` queste tre sezioni compaiono solo quando il valore è compilato.
Se lo lasci vuoto (`''`) la sezione e la sua voce di menu spariscono.

- `reel.videoUrl`: sezione **Reel**
- `compCard.pdfUrl`: sezione **Comp card**
- `booking.calUrl`: sezione **Book a call** (Cal.com)

### Foto

Ogni foto ha due file in `public/img/`: quello grande (`nome.jpg`, circa 1600 px di larghezza, sotto i 500 KB)
e una miniatura (`t-nome.jpg`, circa 800 px). Per aggiungere una foto:

1. Crea i due file con lo stesso nome (la miniatura con il prefisso `t-`).
2. In `src/data/site.js`, aggiungi una riga in `photos`, per esempio `nuova: photo('nome', 'Descrizione della foto')`.
3. Usala in `hero`, `books`, `about` e così via.

La descrizione serve ai lettori di schermo e a Google, quindi va scritta con attenzione.
Prima di pubblicare, controlla di avere il permesso dei fotografi e di indicare i crediti nei book.

### Form di contatto

1. Crea un form gratuito su Formspree o Web3Forms, che inoltra i messaggi alla tua email.
2. In `contact.formEndpoint` incolla l'indirizzo del form.
   - Formspree: `https://formspree.io/f/xxxxxxx`
   - Web3Forms: `https://api.web3forms.com/submit`, e in `contact.formExtraFields` aggiungi `{ access_key: 'la-tua-chiave' }`
3. Prova a inviare un messaggio dal sito pubblicato.

Finché `formEndpoint` è vuoto, il form chiede ai visitatori di scrivere direttamente all'email.

### Cal.com (da fare dopo)

1. Su Cal.com collega Google Calendar, crea un evento da 30 minuti con **Google Meet** come luogo e imposta le disponibilità.
2. Incolla il link pubblico in `booking.calUrl`.
3. Controlla che il calendario si veda dentro la pagina. Se non si carica, togli l'`<iframe>` da `src/components/Booking.jsx`
   e lascia solo il link "Open the booking page in a new tab".

### Reel e comp card

- **Reel**: metti il video in `public/video/reel.mp4` e scrivi `'/video/reel.mp4'` in `reel.videoUrl`.
  In alternativa usa l'indirizzo di incorporamento di Vimeo, per esempio `https://player.vimeo.com/video/123456789`.
- **Comp card**: metti il PDF in `public/`, per esempio `public/comp-card-nigina-rabimkulova.pdf`,
  e scrivi `'/comp-card-nigina-rabimkulova.pdf'` in `compCard.pdfUrl`.

## Pubblicazione su GitHub Pages

Il progetto è pronto per GitHub Pages: la cartella `.github/workflows/deploy.yml` costruisce e pubblica il sito
da sola a ogni modifica sul ramo `main`.

**Prima volta**
1. Crea un account su github.com e un nuovo repository **pubblico** (con il piano gratuito GitHub Pages funziona
   solo con repository pubblici, quindi codice e foto del sito saranno visibili a chiunque).
2. Carica il contenuto di questa cartella nel repository (da "Add file > Upload files" oppure con `git push`).
   La cartella `.github` è nascosta: assicurati che venga caricata anche lei.
3. Nel repository vai su **Settings > Pages** e, in "Build and deployment > Source", scegli **GitHub Actions**.
4. Fai una piccola modifica o apri la scheda **Actions** e lancia "Deploy to GitHub Pages". Dopo uno o due minuti
   il sito è online su `https://TUO-UTENTE.github.io/NOME-REPOSITORY/`.

**Ogni modifica successiva**
Cambia i file (per esempio `src/data/site.js`) e salva su GitHub: il sito si aggiorna da solo in uno o due minuti.

**Condizioni d'uso**
GitHub Pages non può essere usato come hosting gratuito per gestire un'attività online (vendite, transazioni).
Un portfolio con un form di contatto è un uso normale. Il sito ha un limite di 1 GB e circa 100 GB di traffico al mese.

### Quando avete il dominio

1. In **Settings > Pages > Custom domain** scrivi il dominio. GitHub indica i record DNS da inserire presso chi ha venduto
   il dominio (di solito quattro record `A` per il dominio principale e un `CNAME` per `www`). Attiva poi "Enforce HTTPS".
2. Nel repository vai su **Settings > Secrets and variables > Actions > Variables** e crea la variabile `SITE_BASE`
   con valore `/`. Serve a costruire il sito per il dominio e non per l'indirizzo `github.io/NOME-REPOSITORY/`.
   Poi rilancia il deploy dalla scheda Actions.
3. In `index.html` sostituisci i due indirizzi `/img/og.jpg` con quello completo, per esempio
   `https://www.tuodominio.com/img/og.jpg`. Senza indirizzo completo l'anteprima con foto non compare su WhatsApp e social.

### Altri hosting

Il sito è composto da file statici. Con `npm run build` si crea la cartella `dist/`, che si può caricare su qualsiasi
hosting (Netlify, Cloudflare Pages, Vercel o un hosting tradizionale via FTP). In quel caso lascia `SITE_BASE` non impostata
e costruisci il sito con la base `/`, che è il valore predefinito.

## Da fare prima di andare online

- [ ] Misure, presentazione, email, Instagram e agenzia in `src/data/site.js`
- [ ] Crediti dei fotografi nei book e permesso di pubblicazione
- [ ] Form di contatto collegato e provato
- [ ] Informativa privacy breve (il form raccoglie dati personali)
- [ ] Controllo da telefono, che è da dove guarderanno la maggior parte dei casting
