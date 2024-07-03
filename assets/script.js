function smoothScroll(target, duration, offset = 0) {
  const targetPosition =
    target.getBoundingClientRect().top + window.pageYOffset - offset;
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
//
// document.addEventListener("DOMContentLoaded", function() {
//   const sections = document.querySelectorAll(".body_info > div");
//   const navItems = document.querySelectorAll(".tableContents li");
//
//   const observerOptions = {
//     root: null,
//     rootMargin: "0px",
//     threshold: 0.5, // Adjust this value based on when you want to trigger the active state
//   };
//
//   const observerCallback = (entries) => {
//     entries.forEach((entry) => {
//       const navItem = document.querySelector(
//         `.tableContents li[data-target="${entry.target.id}"]`,
//       );
//       if (entry.isIntersecting) {
//         navItems.forEach((item) => item.classList.remove("active"));
//         navItem.classList.add("active");
//       }
//     });
//   };
//
//   const observer = new IntersectionObserver(observerCallback, observerOptions);
//   sections.forEach((section) => observer.observe(section));
// });
//
document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll(".body_info > div");
  const navItems = document.querySelectorAll(".tableContents li");

  // Function to get threshold based on screen size
  const getObserverOptions = () => {
    const screenWidth = window.innerWidth;
    let threshold = 0.5; // Default threshold

    if (screenWidth <= 1300) {
      threshold = 0.3; // Adjust threshold for smaller screens
    }

    return {
      root: null,
      rootMargin: "0px",
      threshold: threshold,
    };
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      const navItem = document.querySelector(
        `.tableContents li[data-target="${entry.target.id}"]`,
      );
      if (entry.isIntersecting) {
        navItems.forEach((item) => item.classList.remove("active"));
        navItem.classList.add("active");
      }
    });
  };

  const observerOptions = getObserverOptions();
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  sections.forEach((section) => observer.observe(section));

  // Recreate observer on window resize
  window.addEventListener("resize", () => {
    const newObserverOptions = getObserverOptions();
    observer.disconnect();
    sections.forEach((section) => observer.observe(section));
  });
});
const projectSquares = document.querySelectorAll(".projectSquare");

projectSquares.forEach((project) => {
  project.addEventListener("mouseover", () => {
    projectSquares.forEach((p) => {
      if (p !== project) {
        p.classList.add("dim");
      }
    });
  });

  project.addEventListener("mouseout", () => {
    projectSquares.forEach((p) => {
      p.classList.remove("dim");
    });
  });
});
