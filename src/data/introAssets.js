import hawaMahalSrc from '../assets/hawa-mahal.webp'        // ⚠️ real filename
import jharokhaSrc from '../assets/central-jharokha.webp'   // ⚠️ real filename (jharokha wali image)
import villageSrc from '../assets/village-scene.webp'       // ⚠️ real filename
import cartSrc from '../assets/bullock-cart.webp'           // ⚠️ real filename
import musiciansSrc from '../assets/folk-musicians.webp'    // ⚠️ real filename

export const introAssets = {
  hawaMahal: {
    src: hawaMahalSrc,
    width: 1448,
    height: 1086,
    focal: { x: 50, y: 38 }, // ⚠️ jharokha ka center, neeche calibrate karna hai
    bottomCrop: 3,
    // jharokhaSrc,
  },
  village: { src: villageSrc, width: 1672, height: 941, mobilePosition: '50% 50%' },
  cart: { src: cartSrc, width: 900, height: 600 },           // ⚠️ real pixels
  musicians: { src: musiciansSrc, width: 700, height: 600 }, // ⚠️ real pixels
}