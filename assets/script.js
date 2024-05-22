function smoothScroll(target, duration, offset = 0) {
  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

document.querySelectorAll(".tableContents li").forEach((item, index) => {
  item.addEventListener("click", (event) => {
    const sectionId = event.target.textContent.toLowerCase();
    const section = document.getElementById(sectionId);
    if (section) {
      if (index === 0) {
        smoothScroll(section, 350, 70); // No offset for the first item
      } else {
        smoothScroll(section, 350, 0); // Adjust the offset as needed for other sections
      }
    }
  });
});
