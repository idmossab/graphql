import { createSvgElement } from "../utils/svg.js";

function createDivWithText(id, text, color) {
  const div = document.createElement("div");
  div.setAttribute("id", id);
  div.textContent = text;
  div.style.color = color;
  return div;
}

// === Ratio Circle === //
export function handle_user_ratio(ratio) {

  const audit_ratio = Math.round(ratio.auditRatio * 100) / 100;
  const radius = 45;
  const ratio_container = document.getElementById("svg_ratio");
  ratio_container.innerHTML = "";

  const color = audit_ratio < 0.5 ? "#f43f5e" : audit_ratio < 0.75 ? "#f59e0b" : "#667eea";
  const stroke_color = audit_ratio < 0.5 ? "#fff" : audit_ratio < 0.75 ? "#764ba2" : "#fff";

  const svg = createSvgElement("svg", {}, ["ratio-svg"]);
  const circle = createSvgElement("circle", { cx: 50, cy: 50, r: radius, fill: color, stroke: stroke_color, });
  const text = createSvgElement("text", { x: 50, y: 55, }, ["ratio-text"]);

  text.textContent = audit_ratio;
  const messageText = audit_ratio < 0.5 ? "Do more audits!" : audit_ratio < 0.75 ? "You can do better!" : "You are perfect";
  const messageDiv = createDivWithText("ratio_message", messageText, color);

  svg.append(circle, text);
  ratio_container.append(svg, messageDiv);
}

// === Given & Taken Bars === //
export function handle_given_taken_xps(ratio) {

  const container = document.getElementById("given_taken");
  const definition = document.getElementById("definition");
  if (!container || !definition) return;

  const total_xp = ratio.totalUp + ratio.totalDown;
  if (total_xp === 0) return;

  const up_percentage = ratio.totalUp / total_xp;
  const down_percentage = ratio.totalDown / total_xp;

  const formatSize = size => `${Math.round((size / 1_000_000) * 100) / 100} mb`;

  // Create definition section
  const createDefinitionBlock = (id, label, text) => {
    const div = document.createElement("div");
    div.classList.add("give_take");
    const quad = document.createElement("div");
    quad.setAttribute("id", id);
    const small = document.createElement("small");
    small.setAttribute("id", id + "_text");
    small.textContent = `${label} ${text}`;
    div.append(quad, small);
    return div;
  };

  definition.innerHTML = "";
  definition.append(
    createDefinitionBlock("given_quad", "Taken", formatSize(ratio.totalDown)),
    createDefinitionBlock("taken_quad", "Received", formatSize(ratio.totalUp))
  );

  // Function to create the SVG bars
  const createBars = () => {
    const fallbackWidth = 300;
    const totalWidth = container.clientWidth || fallbackWidth;

    const rectHeight = 10;
    const gap = 5;
    const svgHeight = rectHeight * 2 + gap;

    const receivedWidth = up_percentage * totalWidth;
    const givenWidth = down_percentage * totalWidth;

    const existingSvg = container.querySelector('.bars-svg');
    if (existingSvg) existingSvg.remove();

    const svg = createSvgElement("svg", { width: totalWidth, height: svgHeight }, ["bars-svg"]);

    const receivedRect = createSvgElement("rect", { x: 0, y: 0, width: receivedWidth, height: rectHeight }, ["received-bar"]);

    const givenRect = createSvgElement("rect", { x: 0, y: rectHeight + gap, width: givenWidth, height: rectHeight }, ["given-bar"]);

    svg.append(receivedRect, givenRect);
    container.appendChild(svg);
  };

  // Create initial bars
  createBars();

  // Handle window resize
  window.removeEventListener("resize", window.ratioResizeHandler);
  window.ratioResizeHandler = () => createBars();
  window.addEventListener("resize", window.ratioResizeHandler);
}
