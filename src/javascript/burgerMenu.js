// Защита от множественных инициализаций
let burgerMenuInitialized = false;

export function burgerMenu() {
  if (burgerMenuInitialized) {
    console.log("🔄 burgerMenu already initialized, skipping...");
    return;
  }

  const burgerIcon = document.querySelector(".burgerIcon");
  const burgerMenu = document.querySelector(".burgerMenu");
  const navMobile = document.querySelector(".navMobile");

  console.log("🔍 burgerMenu - Elements found:", {
    burgerIcon: !!burgerIcon,
    burgerMenu: !!burgerMenu,
    navMobile: !!navMobile,
  });

  if (!burgerIcon || !burgerMenu) {
    console.warn(
      "❌ burgerMenu - Missing required elements, retrying in 100ms..."
    );
    // Повторная попытка через 100ms
    setTimeout(() => {
      burgerMenu();
    }, 100);
    return;
  }

  burgerMenuInitialized = true;

  const toggle = (e) => {
    e.preventDefault();
    console.log("🔄 Toggling burger menu");
    burgerMenu.classList.toggle("Active");
    if (navMobile) navMobile.classList.toggle("ActiveNav");
  };

  burgerIcon.addEventListener("click", toggle);
  console.log("✅ Burger menu toggle event listener added");

  // Dropdown toggles inside burger menu
  const addDropdownToggle = (btnSelector, panelSelector) => {
    const btn = document.querySelector(btnSelector);
    const panel = document.querySelector(panelSelector);
    const icon = btn ? btn.querySelector(".burgerDropDown") : null;

    console.log(`🔍 Dropdown ${btnSelector}:`, {
      btn: !!btn,
      panel: !!panel,
      icon: !!icon,
    });

    if (!btn || !panel) {
      console.warn(`❌ Missing dropdown elements for ${btnSelector}`);
      return;
    }

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(`🔄 Toggling dropdown ${btnSelector}`);
      panel.classList.toggle("Active");
      if (icon) {
        // Тогглим поворот иконки: 0deg <-> исходное состояние
        const current = icon.style.transform || "";
        icon.style.transform = current === "rotate(0deg)" ? "" : "rotate(0deg)";
      }
    });
  };

  addDropdownToggle("#photosBurgerDropDownBtn", "#photosBurgerDropDown");
}
