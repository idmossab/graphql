export function render_error_page(status, message) {
    const app = document.getElementById("app") || document.body;
    
    app.innerHTML = `
      <div class="error-page">
        <h1>Error ${status}</h1>
        <p>${message}</p>
        <button onclick="window.location.href='/'">Go Home</button>
      </div>
    `;
  }