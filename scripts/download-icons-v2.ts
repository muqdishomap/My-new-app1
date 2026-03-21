import fs from 'fs';

async function download(url: string, dest: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(dest, buffer);
  console.log(`Downloaded ${url} to ${dest} (${buffer.length} bytes)`);
}

async function run() {
  try {
    await download('https://i.postimg.cc/NM4pWFqc/192x192.png', 'public/pwa-192x192.png');
    await download('https://i.postimg.cc/WbtXHs5y/512x512.png', 'public/pwa-512x512.png');
    
    // Copy the 192x192 png to favicon.ico to replace the old SVG
    fs.copyFileSync('public/pwa-192x192.png', 'public/favicon.ico');
    console.log('Copied pwa-192x192.png to favicon.ico');
  } catch (err) {
    console.error(err);
  }
}

run();
