import { Jimp } from 'jimp';
import fs from 'fs';

async function run() {
  try {
    console.log('Downloading and processing image...');
    const image = await Jimp.read('https://i.postimg.cc/WbtXHs5y/512x512.png');
    
    // Iterate over all pixels
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      // The background is pure black (0, 0, 0)
      if (r < 20 && g < 20 && b < 20) {
        // Pure black or very dark -> fully transparent
        this.bitmap.data[idx + 3] = 0;
      } else if (r < 45 && g < 45 && b < 45) {
        // Edge pixels -> partial transparency to smooth edges
        const maxVal = Math.max(r, g, b);
        const alpha = Math.floor(((maxVal - 20) / 25) * 255);
        this.bitmap.data[idx + 3] = alpha;
      }
    });

    // Resize to a standard favicon size (192x192 is good for modern web)
    image.resize({ w: 192, h: 192 });
    
    await image.write('public/favicon.png');
    fs.renameSync('public/favicon.png', 'public/favicon.ico');
    console.log('Icon processed and saved to public/favicon.ico');
  } catch (err) {
    console.error('Error processing image:', err);
  }
}

run();
