// ---------------------------------------------------------------------------
// ALL EDITABLE CONTENT LIVES IN THIS FILE.
// Text, measures, contacts, photos and links are changed here, nowhere else.
//
// Optional sections switch themselves on when their value is filled in:
//   reel.videoUrl      -> shows the "Reel" section
//   compCard.pdfUrl    -> shows the "Comp card" section
//   booking.calUrl     -> shows the "Book a call" section (Cal.com)
// Leave a value as '' and that section is hidden, with its menu link.
// ---------------------------------------------------------------------------

const img = (file) => `${import.meta.env.BASE_URL}img/${file}`

// Turns '/video/reel.mp4' into the right address for wherever the site is published
// (the root of a domain, or a sub-folder such as GitHub Pages without a domain).
// Full addresses (https://...) are left as they are.
export const asset = (path) =>
  !path || /^https?:\/\//i.test(path) ? path : `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

// A photo is a pair of files in public/img: the full-size one and a smaller "t-" thumbnail.
const photo = (name, alt) => ({ src: img(`${name}.jpg`), thumb: img(`t-${name}.jpg`), alt })

const photos = {
  shoulder: photo('studio-shoulder', 'Studio portrait looking over the shoulder, striped halter dress'),
  tennis: photo('tennis', 'Close portrait on a tennis court, racket shadow across the face'),
  fur: photo('fur-portrait', 'Close portrait with curly hair and a brown fur collar'),
  street: photo('street-bw', 'Black and white street portrait in a fur coat and hat'),
  leather: photo('leather', 'Portrait leaning on a sofa in a black leather dress'),
  night: photo('night-street', 'Full-length look over the shoulder on a lit street at night, white tweed set'),
  smile: photo('studio-smile', 'Smiling studio portrait, hand behind the neck'),
  hand: photo('studio-hand', 'Studio portrait with hand on chest and a heart pendant'),
}

export const site = {
  name: 'Nigina Rabimkulova',
  firstName: 'Nigina',
  lastName: 'Rabimkulova',
  tagline: 'Model · Editorial · Beauty · Commercial',

  // Contacts
  email: 'hello@your-domain.com',
  instagram: { url: 'https://www.instagram.com/r.nigina.r/', handle: '@r.nigina.r' },
  representation: 'Agency name and contact, if any', // '' hides this line

  // Home: slideshow. `position` is the focus point of the crop (x% y%) on wide screens.
  hero: [
    { photo: photos.tennis, position: '50% 30%' },
    { photo: photos.fur, position: '50% 38%' },
    { photo: photos.street, position: '50% 30%' },
    { photo: photos.smile, position: '50% 38%' },
  ],

  about: {
    heading: 'Hello, I am Nigina.',
    paragraphs: [
      'I am a model working across editorial, beauty and commercial projects. I am available for shoots, campaigns and long-term collaborations.',
      'Tell me about your project, or book a short call to talk it through.',
    ],
    photo: photos.smile,
    position: '50% 28%',
  },

  // Measures: [label, value]. Add, remove or reorder rows freely.
  specs: [
    ['Height', '— cm'],
    ['Bust', '— cm'],
    ['Waist', '— cm'],
    ['Hips', '— cm'],
    ['Shoes', '— EU'],
    ['Hair', '—'],
    ['Eyes', '—'],
    ['Based in', '—'],
  ],

  // Shooting: each book has a cover (its first frame), a title, a credit line and its frames.
  books: [
    { title: 'Studio', credit: 'Photographer name · 2026', frames: [photos.hand, photos.smile, photos.shoulder] },
    { title: 'Street', credit: 'Photographer name · 2026', frames: [photos.street, photos.fur, photos.night] },
    { title: 'Portraits', credit: 'Photographer name · 2025', frames: [photos.tennis, photos.leather] },
  ],

  // Reel. videoUrl is either an MP4/WebM file (put it in public/video/ and use '/video/reel.mp4')
  // or a Vimeo/YouTube EMBED address such as 'https://player.vimeo.com/video/123456789'.
  reel: {
    videoUrl: '',
    cover: photos.fur,
    coverPosition: '50% 40%',
    duration: '0:45',
  },

  // Comp card. pdfUrl is the file in public/, for example '/comp-card-nigina-rabimkulova.pdf'.
  compCard: {
    pdfUrl: '',
    images: [photos.hand, photos.tennis, photos.street],
  },

  // Booking with Cal.com. calUrl is the public link, for example 'https://cal.com/your-username/intro-call'.
  booking: {
    calUrl: '',
    title: 'Intro call',
    duration: '30 minutes, video call',
  },

  contact: {
    // Address that receives the form, from Formspree ('https://formspree.io/f/xxxx') or
    // Web3Forms ('https://api.web3forms.com/submit'). Empty = the form asks visitors to write by email.
    formEndpoint: '',
    // Extra fields the service needs. Web3Forms: { access_key: 'your-key' }. Formspree: leave empty.
    formExtraFields: {},
    projectTypes: ['Editorial', 'Campaign', 'Beauty', 'Runway or show', 'Commercial', 'Other'],
  },
}
