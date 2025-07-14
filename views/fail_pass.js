let lastUsedData = null;

export function handle_failed_passed_projects(data) {
  lastUsedData = data;

  let data_xps = data.xps.map(item => ({
    name: item.path.split("/").pop(),
    amount: Math.round((item.amount / 1000) * 10) / 10
  }));

  let container = document.getElementById("failed_passed_container");
  container.innerHTML = "";

  const svgWrapper = document.createElement("div");
  svgWrapper.classList.add("svg-wrapper");
  container.appendChild(svgWrapper);

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("id", "xps_svg");
  svg.setAttribute("viewBox", "0 0 1000 300");
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  svgWrapper.appendChild(svg);

  let width = 1000;
  let height = 300;
  let padding = 40;

  let total_projetcs = data_xps.length;
  const max_amount = Math.max(...data_xps.map(item => item.amount));

  const gap_ratio = 0.15;
  const available_width = width * (1 - gap_ratio);
  const total_gap = width * gap_ratio;

  const bar_width = available_width / total_projetcs;
  const gap = total_gap / (total_projetcs + 1);

  data_xps.forEach((element, index) => {
    let bar_hight = (element.amount / max_amount) * (height - (padding * 2));
    let x = gap + (index * (bar_width + gap));
    let y = height - padding - bar_hight;

    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", bar_width);
    rect.setAttribute("height", bar_hight);
    rect.classList.add("xp-bar");

    const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
    title.textContent = element.name;
    rect.appendChild(title);
    svg.appendChild(rect);

    const scoreText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    scoreText.setAttribute("x", x + bar_width / 2);
    scoreText.setAttribute("y", y - 5);
    scoreText.textContent = element.amount;
    scoreText.classList.add("score-text");
    svg.appendChild(scoreText);

    const labelText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    labelText.setAttribute("x", x + bar_width / 2);
    labelText.setAttribute("y", height - padding + 12);
    labelText.textContent = element.name.length > 3 ? element.name.slice(0, 3) + "…" : element.name;
    labelText.classList.add("label-text");
    svg.appendChild(labelText);
  });

}