const fetch = require('node-fetch'); // wait we have fetch natively in Node 18+

async function test() {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + (process.env.OPENROUTER_KEY || "YOUR_KEY"),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "google/gemini-2.0-flash-lite-preview-02-05:free",
      messages: [{role: "user", content: "hello"}]
    })
  });
  console.log(await res.json());
}
test();
