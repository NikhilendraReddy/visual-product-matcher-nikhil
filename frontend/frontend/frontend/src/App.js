const app = document.getElementById("app");

app.innerHTML = `
  <input type="text" id="imageUrl" placeholder="Paste image URL..." />
  <button id="searchBtn">Find Similar</button>
  <div id="preview"></div>
  <div id="results"></div>
`;

document.getElementById("searchBtn").addEventListener("click", async () => {
  const imageUrl = document.getElementById("imageUrl").value;
  if (!imageUrl) return alert("Please enter an image URL.");

  document.getElementById("preview").innerHTML = `<p><strong>Your Image:</strong></p><img src="${imageUrl}" style="max-height:200px"/>`;

  const res = await fetch("https://your-backend-url.onrender.com/api/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageUrl })
  });

  const data = await res.json();
  const resultDiv = document.getElementById("results");
  resultDiv.innerHTML = "";

  data.forEach(p => {
    resultDiv.innerHTML += `
      <div class="card">
        <img src="${p.image}" alt="${p.name}" />
        <h3>${p.name}</h3>
        <p>${p.category}</p>
        <p><b>Similarity:</b> ${p.similarity}</p>
      </div>
    `;
  });
});

