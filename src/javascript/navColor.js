// Защита от множественных инициализаций
let navColorInitialized = false;

export const navColor = () => {
  if (navColorInitialized) {
    console.log("🔄 navColor already initialized, skipping...");
    return;
  }

  const navElement = document.querySelector(
    "nav:not(.navBG):not(.navTransparent)"
  );
  const dropDownPhotosID = document.getElementById("dropDownPhotosID");
  const navBG = document.querySelector(".navBG");
  const dropDownPhotosActive = document.getElementById("dropDownPhotosActive");

  console.log("🔍 navColor - Elements found:", {
    navElement: !!navElement,
    dropDownPhotosID: !!dropDownPhotosID,
    navBG: !!navBG,
    dropDownPhotosActive: !!dropDownPhotosActive,
  });

  // Проверяем, что все необходимые элементы существуют
  if (!navElement || !navBG) {
    console.warn("❌ navColor - Missing required elements");
    return;
  }

  navColorInitialized = true;

  const showNavBG = () => {
    navBG.classList.add("BGactive");
  };

  const hideNavBG = () => {
    setTimeout(() => {
      const isHoveringNavbar = navElement.matches(":hover");
      const isHoveringPhotosDropdown =
        dropDownPhotosActive?.matches(":hover") || false;

      if (
        !isHoveringNavbar &&
        !isHoveringPhotosDropdown
      ) {
        navBG.classList.remove("BGactive");
      }
    }, 50);
  };

  const showPhotosDropdown = () => {
    if (dropDownPhotosActive) {
      dropDownPhotosActive.classList.add("dropDownActive");
    }
  };

  const hidePhotosDropdown = () => {
    if (dropDownPhotosActive) {
      dropDownPhotosActive.classList.remove("dropDownActive");
    }
  };

  // Обработчики для всего navbar - показывать белый фон
  navElement.addEventListener("mouseenter", showNavBG);
  navElement.addEventListener("mouseleave", hideNavBG);

  // Обработчики для Photos dropdown
  if (dropDownPhotosID) {
    dropDownPhotosID.addEventListener("mouseenter", showPhotosDropdown);

    dropDownPhotosID.addEventListener("mouseleave", () => {
      setTimeout(() => {
        if (
          !dropDownPhotosActive?.matches(":hover") &&
          !dropDownPhotosID.matches(":hover")
        ) {
          hidePhotosDropdown();
        }
      }, 100);
    });
  }

  if (dropDownPhotosActive) {
    dropDownPhotosActive.addEventListener("mouseenter", () => {
      showNavBG(); // Поддерживаем белый фон
      showPhotosDropdown();
    });

    dropDownPhotosActive.addEventListener("mouseleave", () => {
      setTimeout(() => {
        if (
          !dropDownPhotosActive.matches(":hover") &&
          !dropDownPhotosID?.matches(":hover")
        ) {
          hidePhotosDropdown();
        }
      }, 100);
      hideNavBG(); // Проверяем, нужно ли скрыть фон
    });
  }
};
