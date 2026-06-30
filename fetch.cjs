const https = require('https');
https.get('https://nondebi.netlify.app', (res) => {
  let data = '';
  res.on('data', (c) => data += c);
  res.on('end', () => console.log(data));
}).on('error', (e) => console.error(e));
