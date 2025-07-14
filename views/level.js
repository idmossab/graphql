import { createSvgElement } from "../utils/svg.js";

export function handle_user_level(level, totalXp = 0) {
  const user_level = document.getElementById("user_level");
  user_level.innerHTML = "";

  const radius = 45;
  const ratio = level / 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - ratio);

  // Create SVG container
  const svg = createSvgElement("svg", {}, ["level-svg"]);

  // Background circle
  const bgCircle = createSvgElement("circle", {
    cx: 50,
    cy: 50,
    r: radius
  }, ["bg"]);

  // Progress circle
  const progressCircle = createSvgElement("circle", {
    cx: 50,
    cy: 50,
    r: radius,
    transform: "rotate(-90 50 50)"
  }, ["progress"]);
  progressCircle.style.strokeDasharray = circumference;
  progressCircle.style.strokeDashoffset = offset;

  // Level text
  const text = createSvgElement("text", {
    x: 50,
    y: 55
  }, ["level-value"]);
  text.textContent = `${level}`;

  // Description
  const level_description = document.createElement("p");
  level_description.classList.add("level-description");
  level_description.textContent =
    level <= 10 ? "Beginner" :
    level <= 20 ? "Novice" :
    level <= 30 ? "Intermediate" :
    level <= 40 ? "Advanced" :
    level <= 50 ? "Expert" : "Master";

  // XP Label
  const xpLabel = document.createElement("label");
  xpLabel.classList.add("level-xp");
  xpLabel.textContent = `Total XP: ${(totalXp / 1000).toFixed(1)} kB`;

  svg.append(bgCircle, progressCircle, text);
  user_level.append(svg, level_description, xpLabel);
}
