import { createSvgElement } from "../utils/svg.js";

let lastUsedData = null;

export function handle_failed_passed_projects(data) {
  lastUsedData = data;

  const container = document.getElementById("failed_passed_container");
  container.innerHTML = "";

  const width = container.offsetWidth || 1000;
  const height = 180;
  const padding = 25;
  const barGap = 7;

  const data_xps = data.xps.map(item => ({
    name: item.path.split("/").pop(),
    amount: Math.round(item.amount / 100) / 10
  }));

  const totalProjects = data_xps.length;
  const maxAmount = Math.max(...data_xps.map(d => d.amount)) || 1;

  const barWidth = Math.max(18, (width - 2 * padding - (totalProjects - 1) * barGap) / totalProjects);

  // Create SVG
  const svg = createSvgElement("svg", {
    id: "xps_svg",
    width: width,
    height: height,
    viewBox: `0 0 ${width} ${height}`,
    preserveAspectRatio: "none"
  });

  data_xps.forEach((item, i) => {
    const rawHeight = (item.amount / maxAmount) * (height - padding - 30);
    const barHeight = Math.max(rawHeight, 3); 
    const x = padding + i * (barWidth + barGap);
    const y = height - padding - barHeight;
  
    const fillColor = item.amount === 0 ? "#e94c4c" : "#3498db";

    const rect = createSvgElement("rect", { x, y, width: barWidth, height: barHeight }, ["xp-bar"]);
    const tooltip = createSvgElement("title");
    tooltip.textContent = item.name;
    rect.appendChild(tooltip);
  
    // Score Text
    const scoreText = createSvgElement("text", { x: x + barWidth / 2, y: y - 5, "text-anchor": "middle" }, ["score-text"]);
    scoreText.textContent = item.amount;
  
    // Label Text
    const labelText = createSvgElement("text", { x: x + barWidth / 2, y: height - padding + 16, "text-anchor": "middle" }, ["label-text"]);
    labelText.textContent = item.name.length > 3 ? item.name.slice(0, 3) + "…" : item.name;
  
    svg.append(rect, scoreText, labelText);
  });
  
  // Wrap SVG
  const svgWrapper = document.createElement("div");
  svgWrapper.classList.add("svg-wrapper");
  svgWrapper.appendChild(svg);
  container.appendChild(svgWrapper);
}
