import family from "../assets/family.webp";
import haldi from "../assets/haldi.webp";
import mehndi from "../assets/mehndi.webp";
import sangeet from "../assets/sangeet.webp";
import wedding from "../assets/wedding.webp";
import reception from "../assets/reception.webp";
import firstMeeting from '../assets/first-meeting.webp'
import weddingDay from '../assets/wedding-day.webp'
import palace from '../assets/mahal.webp'
import royal from '../assets/royal-palace.webp'
import camel from '../assets/camel.webp'
import gift from '../assets/blessings.webp'
import Mulaqat from '../assets/story-1.webp'
import Dosti from '../assets/story-2.webp'
import Izhaar from '../assets/story-3.webp'
import Aashirwad from '../assets/story-4.webp'
import Mandap from '../assets/story-5.webp'
import gallery1 from '../assets/gallery-1.webp'
import gallery2 from '../assets/gallery-2.webp'
import gallery3 from '../assets/gallery-3.webp'
import gallery4 from '../assets/gallery-4.webp'
import gallery5 from '../assets/gallery-5.webp'
import gallery6 from '../assets/gallery-6.webp'
import map from '../assets/map.png'


export const images = {
  hawaMahal: null,
  hawaMahalZoomOrigin: { x: 50, y: 48 },

  heroHaveli: "/images/hero/haveli.jpg",
  family,

  journey: {
    Mulaqat: Mulaqat,
    Dosti: Dosti,
    Izhaar: Izhaar,
    Aashirwad: Aashirwad,
    Mandap: Mandap,
  },

  events: {
    haldi,
    mehndi,
    sangeet,
    wedding,
    reception,
  },

  venue: royal,
  camel: camel,
  map: map,

  story: [firstMeeting, weddingDay],
  palaceSketch: palace,

  gallery: [
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery6,
  ],

  gift: gift,
};
