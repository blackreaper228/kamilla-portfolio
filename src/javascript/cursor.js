export const cursor = () => {
  const cursors = document.querySelectorAll(".cursor");

  window.addEventListener("mousemove", (e) => {
    let x = e.pageX;
    let y = e.pageY;

    cursors.forEach((el) => {
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    });
  });

  // Элементы, при наведении на которые курсор увеличивается
  const hoverElements = document.querySelectorAll("a, button, .hoverable");

  hoverElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursors.forEach((cursor) => {
        cursor.classList.add("cursor-large");
      });
    });

    element.addEventListener("mouseleave", () => {
      cursors.forEach((cursor) => {
        cursor.classList.remove("cursor-large");
      });
    });
  });
};
