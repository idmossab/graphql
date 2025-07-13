export function handle_user_ratio(ratio) {
  console.log("ratio : ", ratio);

  let audit_ratio = Math.round(ratio.auditRatio * 100) / 100;

  let ratio_container = document.getElementById("svg_ratio");
  ratio_container.innerHTML = ""; // Clear previous SVG if any

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add("ratio-svg");

  // Constants for the circle
  const radius = 45;

  // Choose color based on ratio
  const color =
    audit_ratio < 0.5 ? "#f43f5e" : // rose
      audit_ratio < 0.75 ? "#f59e0b" : // amber
        "#667eea"; // elegant blue-violet

  const stroke_color =
    audit_ratio < 0.5 ? "#fff" :
      audit_ratio < 0.75 ? "#764ba2" : // violet border
        "#fff";

  // Foreground progress circle
  const progressCircle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  progressCircle.setAttribute("cx", "50");
  progressCircle.setAttribute("cy", "50");
  progressCircle.setAttribute("r", radius);
  progressCircle.setAttribute("fill", color);
  progressCircle.setAttribute("stroke", stroke_color);

  // Text in the middle
  const content = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );
  content.setAttribute("x", "50");
  content.setAttribute("y", "55");
  content.textContent = `${audit_ratio}`;
  content.classList.add("ratio-text");

  let text = document.createElement("div");
  text.setAttribute("id", "ratio_message");
  text.textContent =
    audit_ratio < 0.5
      ? "Do more audits!"
      : audit_ratio < 0.75
        ? "you can do better!"
        : "you are perfect";
  text.style.color = color;

  svg.appendChild(progressCircle);
  svg.appendChild(content);
  ratio_container.appendChild(svg);
  ratio_container.appendChild(text);
}

// Handle given and taken ratios:
// Handle given and taken XP visualization
export function handle_given_taken_xps(ratio) {
  const container = document.getElementById("given_taken");
  const definition = document.getElementById("definition");

  if (!container) return;

  const total_xp = ratio.totalUp + ratio.totalDown;

  if (total_xp === 0) {
    console.warn("Total XP is zero, cannot create bars.");
    return;
  }

  const up_percentage = ratio.totalUp / total_xp;
  const down_percentage = ratio.totalDown / total_xp;

  const svgNS = "http://www.w3.org/2000/svg";
  const fallbackWidth = 300; // Fallback if container has no width yet
  const totalWidth = container.clientWidth || fallbackWidth;

  const rectHeight = 10;
  const gap = 5;
  const svgHeight = rectHeight * 2 + gap;

  const receivedWidth = up_percentage * totalWidth;
  const givenWidth = down_percentage * totalWidth;

  // define the chart:
  let given = document.createElement("div");
  given.classList.add("give_take");
  let given_quad = document.createElement("div");
  given_quad.setAttribute("id", "given_quad");
  let given_text = document.createElement("small");
  given_text.setAttribute("id", "given_text");
  given_text.textContent = `taken ${Math.round((ratio.totalDown / 1000000) * 100) / 100
    } mb`;

  given.append(given_quad, given_text);

  let taken = document.createElement("div");
  taken.classList.add("give_take");
  let taken_quad = document.createElement("div");
  taken_quad.setAttribute("id", "taken_quad");
  let taken_text = document.createElement("small");
  taken_text.setAttribute("id", "taken_text");
  taken_text.textContent = `Received ${Math.round((ratio.totalUp / 1000000) * 100) / 100
    } mb`;

  taken.append(taken_quad, taken_text);

  definition.append(given, taken);

  const svg = document.createElementNS(svgNS, "svg");
  svg.classList.add("bars-svg");
  svg.style.width = totalWidth + "px";
  svg.style.height = svgHeight + "px";

  const receivedRect = document.createElementNS(svgNS, "rect");
  receivedRect.setAttribute("x", 0);
  receivedRect.setAttribute("y", 0);
  receivedRect.setAttribute("width", receivedWidth);
  receivedRect.setAttribute("height", rectHeight);
  receivedRect.classList.add("received-bar");

  const givenRect = document.createElementNS(svgNS, "rect");
  givenRect.setAttribute("x", 0);
  givenRect.setAttribute("y", rectHeight + gap);
  givenRect.setAttribute("width", givenWidth);
  givenRect.setAttribute("height", rectHeight);
  givenRect.classList.add("given-bar");

  svg.appendChild(receivedRect);
  svg.appendChild(givenRect);
  container.appendChild(svg);
}