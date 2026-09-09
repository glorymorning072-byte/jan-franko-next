const fs = require('fs');
const path = require('path');

async function downloadWpImages() {
  const ids = [612, 915, 629, 637, 898, 687, 573, 595];
  const imgUrls = new Set();

  for (const id of ids) {
    try {
      const r = await fetch('https://janfranko.com/wp-json/wp/v2/pages/' + id);
      const data = await r.json();
      const html = data.content?.rendered || '';
      const matches = html.match(/https:\/\/janfranko\.com\/wp-content\/uploads\/[^\s"']+/gi) || [];
      matches.forEach(u => imgUrls.add(u.replace(/["'>]+$/, '')));
    } catch(e) {
      console.error(e);
    }
  }

  console.log('Found image URLs:', Array.from(imgUrls));

  const targetDir = path.join(process.cwd(), 'public', 'images', 'wp-assets');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  for (const url of imgUrls) {
    try {
      const filename = path.basename(url);
      const destPath = path.join(targetDir, filename);
      console.log('Downloading:', url, '->', destPath);
      const res = await fetch(url);
      if (res.ok) {
        const arrayBuffer = await res.arrayBuffer();
        fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
        console.log('Saved:', filename);
      } else {
        console.error('Failed to download:', url, res.status);
      }
    } catch(e) {
      console.error('Error downloading:', url, e.message);
    }
  }
}

downloadWpImages();
