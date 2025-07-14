export function createSvgElement(tag, attributes = {}, classNames = []) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
  
    for (const [key, value] of Object.entries(attributes)) {
      el.setAttribute(key, value);
    }
  
    classNames.forEach(cls => el.classList.add(cls));
  
    return el;
  }
  