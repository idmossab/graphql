export function handle_failed_passed_projects(data) {
  let data_xps = data.xps.map(item => ({
    name: item.path.split("/").pop(),
    amount: Math.round((item.amount / 1000) * 10) / 10
  }));

  let container = document.getElementById("failed_passed_container")
  // Clear previous content
  container.innerHTML = "";

  // Check if data exists and has xps array
  if (!data || !data.xps || !Array.isArray(data.xps) || data.xps.length === 0) {
    container.innerHTML = `
        <div class="no-data-message">
          <p>No project data available</p>
          <small>Complete some projects to see your progress chart</small>
        </div>
      `;
    return;
  }
  console.log(container);
  // Create the SVG element
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "1000");
  svg.setAttribute("height", "300");
  svg.setAttribute("id", "xps_svg")


  container.appendChild(svg)

  let width = svg.clientWidth
  let height = svg.clientHeight
  let padding = 40

  console.log(width, height)
  let total_projetcs = data_xps.length
  const max_amount = Math.max(...data_xps.map(item => item.amount))

  const gap_ratio = 0.15
  const available_width = width * (1 - gap_ratio)
  const total_gap = width * gap_ratio

  const bar_width = available_width / total_projetcs
  const gap = total_gap / (total_projetcs + 1)

  console.log("the total projects :", total_projetcs);
  console.log("The maximum amount is: ", max_amount);
  console.log("Available space: ", available_width);
  console.log("The total gap is: ", total_gap);
  console.log("the bar width: ", bar_width);
  console.log("The gap is : ", gap);


  data_xps.forEach((element, index) => {
    let bar_hight = (element.amount / max_amount) * (height - (padding * 2))
    console.log(`The elment: ${element.name} bar height is: ${bar_hight}`);
    let x = gap + (index * (bar_width + gap))
    let y = height - padding - bar_hight
    console.log(`The x is: ${x} and the y is: ${y}`)

    // Create the chart that will visually represent the xp of a specific project
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", bar_width);
    rect.setAttribute("height", bar_hight);
    rect.setAttribute("fill", "#4caf50");

    const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
    title.textContent = element.name;
    rect.appendChild(title);
    svg.appendChild(rect);
    const scoreText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    scoreText.setAttribute("x", x + bar_width / 2);
    scoreText.setAttribute("y", y - 5);
    scoreText.setAttribute("text-anchor", "middle");
    scoreText.textContent = element.amount;
    svg.appendChild(scoreText);
  });
}