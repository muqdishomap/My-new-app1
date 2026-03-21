import fs from 'fs';
import https from 'https';

const download = (url: string, dest: string) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

async function run() {
  await download('https://i.postimg.cc/NM4pWFqc/192x192.png', 'public/pwa-192x192.png');
  await download('https://i.postimg.cc/WbtXHs5y/512x512.png', 'public/pwa-512x512.png');
  console.log('Downloaded icons');
}

run();
