import { createSvgElement } from "../utils/svg.js";

let lastUsedData = null;

export function handle_failed_passed_projects(data) {
  lastUsedData = data;

  const container = document.getElementById("failed_passed_container");
  container.innerHTML = "";

  const svgWrapper = document.createElement("div");
  svgWrapper.classList.add("svg-wrapper");
  container.appendChild(svgWrapper);

  const svg = createSvgElement("svg", { id: "xps_svg", viewBox: "0 0 1000 300", preserveAspectRatio: "xMidYMid meet" });
  svgWrapper.appendChild(svg);

  const width = 1000;
  const height = 300;
  const padding = 40;

  const data_xps = data.xps.map(item => ({
    name: item.path.split("/").pop(),
    amount: Math.round(item.amount / 100) / 10 // e.g. 12345 → 1.2
  }));

  const totalProjects = data_xps.length;
  const maxAmount = Math.max(...data_xps.map(d => d.amount));

  const gapRatio = 0.15;
  const availableWidth = width * (1 - gapRatio);
  const totalGap = width * gapRatio;

  const barWidth = availableWidth / totalProjects;
  const gap = totalGap / (totalProjects + 1);

  data_xps.forEach((item, i) => {
    const barHeight = (item.amount / maxAmount) * (height - padding * 2);
    const x = gap + i * (barWidth + gap);
    const y = height - padding - barHeight;

    // === Bar Rectangle ===
    const rect = createSvgElement("rect", { x, y, width: barWidth, height: barHeight }, ["xp-bar"]);

    const tooltip = createSvgElement("title");
    tooltip.textContent = item.name;
    rect.appendChild(tooltip);

    // === Score Text ===
    const scoreText = createSvgElement("text", { x: x + barWidth / 2, y: y - 5 }, ["score-text"]);
    scoreText.textContent = item.amount;

    // === Label Text ===
    const labelText = createSvgElement("text", { x: x + barWidth / 2, y: height - padding + 12 }, ["label-text"]);
    labelText.textContent = item.name.length > 3 ? item.name.slice(0, 3) + "…" : item.name;

    svg.append(rect, scoreText, labelText);
  });
}
