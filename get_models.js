const https = require('https');

https.get('https://openrouter.ai/api/v1/models', (resp) => {
  let data = '';
  resp.on('data', (chunk) => { data += chunk; });
  resp.on('end', () => {
    const models = JSON.parse(data).data;
    const freeGemini = models.filter(m => m.id.toLowerCase().includes('gemini') && m.id.toLowerCase().includes('free')).map(m => m.id);
    console.log(JSON.stringify(freeGemini, null, 2));
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
