const fs = require('fs');
const path = require('path');
(async () => {
  const filePath = path.join(process.cwd(), 'public/futuristic/head.png');
  const file = fs.readFileSync(filePath);
  const form = new FormData();
  form.append('image', new Blob([file], { type: 'image/png' }), 'head.png');
  form.append('description', 'test image');
  const res = await fetch('http://localhost:3000/api/analyze', { method: 'POST', body: form });
  console.log('STATUS', res.status);
  console.log('BODY', await res.text());
})().catch(err => { console.error(err); process.exit(1); });
