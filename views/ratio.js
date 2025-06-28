export function handle_user_ratio(ratio) {
    let audit_ratio = Math.round(ratio.auditRatio * 100) / 100;
 


    let ratio_container = document.getElementById("svg_ratio");
    ratio_container.innerHTML = ""; // Clear previous SVG if any

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100");
    svg.setAttribute("height", "100");
    svg.setAttribute("viewBox", "0 0 100 100");

    // Constants for the circle
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - audit_ratio);

    // Choose color based on ratio
    const color = audit_ratio < 0.5 ? "red" : audit_ratio < 0.75 ? "orange" : "green";
    const stroke_color = audit_ratio < 0.5 ? "white" : audit_ratio < 0.75 ? "green" : "white";

  
    // Foreground progress circle
    const progressCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    progressCircle.setAttribute("cx", "50");
    progressCircle.setAttribute("cy", "50");
    progressCircle.setAttribute("r", radius);
    progressCircle.setAttribute("fill", color);
    progressCircle.setAttribute("stroke", stroke_color);


    // Text in the middle
    const content = document.createElementNS("http://www.w3.org/2000/svg", "text");
    content.setAttribute("x", "50");
    content.setAttribute("y", "55");
    content.setAttribute("text-anchor", "middle");
    content.setAttribute("font-size", "16");
    content.setAttribute("fill", "white");
    content.textContent = `${audit_ratio}`;

    let text = document.createElement("div")
    text.setAttribute("id", "ratio_message")
    text.textContent = audit_ratio < 0.5 ? "Do more audits!" : audit_ratio < 0.75 ? "you can do better!" : "you are perfect";
    text.style.color = color

    svg.appendChild(progressCircle);
    svg.appendChild(content);
    ratio_container.appendChild(svg);
    ratio_container.appendChild(text)
}


// Handle given and taken ratios:
// Handle given and taken XP visualization
export function handle_given_taken_xps(ratio) {
  const container = document.getElementById("given_taken");
  if (!container) return;

  const total_xp = ratio.totalUp + ratio.totalDown;

  if (total_xp === 0) {
    console.warn("Total XP is zero, cannot create bars.");
    return;
  }

  const up_percentage = ratio.totalUp / total_xp;
  const down_percentage = ratio.totalDown / total_xp;

  console.log(
    "Total XP:", total_xp,
    "Given %:", (down_percentage * 100).toFixed(2),
    "Taken %:", (up_percentage * 100).toFixed(2)
  );

  const svgNS = "http://www.w3.org/2000/svg";
  const fallbackWidth = 300; // Fallback if container has no width yet
  const totalWidth = container.clientWidth || fallbackWidth;

  const rectHeight = 15;
  const gap = 5;
  const svgHeight = rectHeight * 2 + gap;

  const receivedWidth = up_percentage * totalWidth;
  const givenWidth = down_percentage * totalWidth;

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", totalWidth);
  svg.setAttribute("height", svgHeight);

  const receivedRect = document.createElementNS(svgNS, "rect");
  receivedRect.setAttribute("x", 0);
  receivedRect.setAttribute("y", 0);
  receivedRect.setAttribute("width", receivedWidth);
  receivedRect.setAttribute("height", rectHeight);
  receivedRect.setAttribute("fill", "green");

  const givenRect = document.createElementNS(svgNS, "rect");
  givenRect.setAttribute("x", 0);
  givenRect.setAttribute("y", rectHeight + gap);
  givenRect.setAttribute("width", givenWidth);
  givenRect.setAttribute("height", rectHeight);
  givenRect.setAttribute("fill", "red");

  svg.appendChild(receivedRect);
  svg.appendChild(givenRect);

  container.innerHTML = ""; // Clear previous content
  container.appendChild(svg);
}
