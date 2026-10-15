// ═══════════════════════════════════════════════
//  SAARA MAIN CONTENT YAHIN SE BADLEGA
// ═══════════════════════════════════════════════
export const wedding = {
  title: 'Shubh Vivaah',
  tagline: 'With the blessings of our families',
  bride: 'Gayatri',
  groom: 'Jaivardhan',

  // Countdown isi se chalta hai (ISO format, +05:30 = IST)
  dateISO: '2027-02-18T19:00:00+05:30',
  dateDisplay: '18 FEBRUARY 2027',

  family: {
    heading: 'Family Invitation',
    lead: 'Humare pariwar ki taraf se',
    photoCaption: 'Humara Parivar',
    paragraphs: [
      'With immense joy and the blessings of our elders, we invite you to celebrate the sacred union of our beloved Gayatri and Jaivardhan.',
      'A warm welcome to our dear family and friends. Your presence will make our celebration even more special.',
    ],
    signoff: {
      line: 'With love & blessings',
      families: 'Sharma Parivar & Verma Parivar', 
    },
  },

  journey: {
    heading: 'Our Wedding Journey',
    subheading: 'A journey of love, traditions and togetherness',
  },

  venue: {
    heading: 'Venue & Location',
    name: 'Royal Palace, Jaipur',
    address: 'Jaipur, Rajasthan 302001, India',
    date: '18 February 2027',
    time: '07:00 PM',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jaipur+Rajasthan',
    // Key-free embed. Exact venue ke liye Google Maps > Share > Embed a map ka src yahan paste kar do.
    mapEmbed: 'https://www.google.com/maps?q=Jaipur,Rajasthan&output=embed',
  },

  story: {
    heading: 'Our Story',
    items: [
      { title: 'The First Meeting', text: 'It all began with a simple conversation...' },
      { title: 'The Wedding Day', text: 'A new chapter, same beautiful us.' },
    ],
  },

  gallery: { heading: 'Gallery' },

  rsvp: {
    heading: 'RSVP',
    subheading: 'Kindly let us know if you can join us.',
    deadline: 'Please reply by 1 February 2027',
  },

  gift: {
    heading: 'Gift & Blessings',
    lines: [
      'Your blessings are the most precious gift of all.',
      'If you wish to honor us, we welcome your kind blessings and good wishes for our new journey together.',
    ],
  },

  footer: { note: 'Made with love, in the Pink City.' },
}
