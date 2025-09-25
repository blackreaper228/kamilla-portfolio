export const navColor = () => {
  const navElement = document.querySelector(
    "nav:not(.navBG):not(.navTransparent)"
  );
  const dropDownPhotosID = document.getElementById("dropDownPhotosID");
  const dropDownVideosID = document.getElementById("dropDownVideosID");
  const navBG = document.querySelector(".navBG");
  const dropDownPhotosActive = document.getElementById("dropDownPhotosActive");
  const dropDownPhotosActiveVideos = document.getElementById(
    "dropDownPhotosActiveVideos"
  );

  const showNavBG = () => {
    navBG.classList.add("BGactive");
  };

  const hideNavBG = () => {
    // Проверяем, не находится ли курсор в любом из navbar элементов или dropdown элементов
    setTimeout(() => {
      const isHoveringNavbar = navElement.matches(":hover");
      const isHoveringPhotosDropdown = dropDownPhotosActive.matches(":hover");
      const isHoveringVideosDropdown =
        dropDownPhotosActiveVideos.matches(":hover");

      if (
        !isHoveringNavbar &&
        !isHoveringPhotosDropdown &&
        !isHoveringVideosDropdown
      ) {
        navBG.classList.remove("BGactive");
      }
    }, 50);
  };

  const showPhotosDropdown = () => {
    dropDownPhotosActive.classList.add("dropDownActive");
  };

  const hidePhotosDropdown = () => {
    dropDownPhotosActive.classList.remove("dropDownActive");
  };

  const showVideosDropdown = () => {
    dropDownPhotosActiveVideos.classList.add("dropDownActive");
  };

  const hideVideosDropdown = () => {
    dropDownPhotosActiveVideos.classList.remove("dropDownActive");
  };

  // Обработчики для всего navbar - показывать белый фон
  navElement.addEventListener("mouseenter", showNavBG);
  navElement.addEventListener("mouseleave", hideNavBG);

  // Обработчики для Photos dropdown
  dropDownPhotosID.addEventListener("mouseenter", showPhotosDropdown);

  dropDownPhotosID.addEventListener("mouseleave", () => {
    setTimeout(() => {
      if (
        !dropDownPhotosActive.matches(":hover") &&
        !dropDownPhotosID.matches(":hover")
      ) {
        hidePhotosDropdown();
      }
    }, 100);
  });

  dropDownPhotosActive.addEventListener("mouseenter", () => {
    showNavBG(); // Поддерживаем белый фон
    showPhotosDropdown();
  });

  dropDownPhotosActive.addEventListener("mouseleave", () => {
    setTimeout(() => {
      if (
        !dropDownPhotosActive.matches(":hover") &&
        !dropDownPhotosID.matches(":hover")
      ) {
        hidePhotosDropdown();
      }
    }, 100);
    hideNavBG(); // Проверяем, нужно ли скрыть фон
  });

  // Обработчики для Videos dropdown
  dropDownVideosID.addEventListener("mouseenter", showVideosDropdown);

  dropDownVideosID.addEventListener("mouseleave", () => {
    setTimeout(() => {
      if (
        !dropDownPhotosActiveVideos.matches(":hover") &&
        !dropDownVideosID.matches(":hover")
      ) {
        hideVideosDropdown();
      }
    }, 100);
  });

  dropDownPhotosActiveVideos.addEventListener("mouseenter", () => {
    showNavBG(); // Поддерживаем белый фон
    showVideosDropdown();
  });

  dropDownPhotosActiveVideos.addEventListener("mouseleave", () => {
    setTimeout(() => {
      if (
        !dropDownPhotosActiveVideos.matches(":hover") &&
        !dropDownVideosID.matches(":hover")
      ) {
        hideVideosDropdown();
      }
    }, 100);
    hideNavBG(); // Проверяем, нужно ли скрыть фон
  });
};
