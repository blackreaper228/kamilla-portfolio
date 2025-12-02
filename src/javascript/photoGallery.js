/**
 * 🖼️ Автоматическая загрузка фотографий из папок
 * Использование: loadPhotoGallery('fashion') - загрузит фотки из /images/fashion/
 */

class PhotoGallery {
  constructor() {
    this.imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
    this.galleries = new Map(); // Кэш для загруженных галерей
  }

  /**
   * Очищает кэш галереи
   */
  clearCache(category = null) {
    if (category) {
      this.galleries.delete(category);
      console.log(`🗑️ Кэш галереи ${category} очищен`);
    } else {
      this.galleries.clear();
      console.log(`🗑️ Весь кэш галерей очищен`);
    }
  }

  /**
   * Автоматически определяет фотки в папке
   * @param {string} category - название категории (fashion, e-commerce, etc.)
   * @returns {Promise<string[]>} - массив путей к изображениям
   */
  async discoverImages(category) {
    try {
      // Сначала пробуем получить список файлов через API
      const images = await this.getImageListFromServer(category);
      if (images.length > 0) {
        return images;
      }
    } catch (error) {
      // Тихо переходим к паттернам
    }

    // Фаллбэк: проверяем по паттернам
    const imagePaths = await this.discoverByPatterns(category);

    // Дополнительная проверка: убеждаемся, что все файлы действительно существуют
    const validImages = [];
    for (const imagePath of imagePaths) {
      if (await this.imageExists(imagePath)) {
        validImages.push(imagePath);
      }
    }

    return validImages;
  }

  /**
   * Получает список изображений через API/сервер
   */
  async getImageListFromServer(category) {
    try {
      // Пробуем получить список файлов (работает в dev режиме с Vite)
      const response = await fetch(`/images/${category}/`, {
        method: "GET",
        headers: { Accept: "application/json, text/html" },
      });

      if (response.ok && response.status === 200) {
        const text = await response.text();

        // Парсим HTML ответ (Vite показывает список файлов в dev режиме)
        if (
          text.includes("<a href=") &&
          text.includes(".jpg" || ".jpeg" || ".png")
        ) {
          const images = this.parseFileListFromHTML(text, category);
          if (images.length > 0) {
            return images;
          }
        }
      }
    } catch (error) {
      // Тихо игнорируем ошибки
    }

    return [];
  }

  /**
   * Парсит список файлов из HTML ответа сервера
   */
  parseFileListFromHTML(html, category) {
    const images = [];
    const baseUrl = `/images/${category}/`;

    // Ищем ссылки на файлы
    const linkRegex = /<a href="([^"]+)"/g;
    let match;

    while ((match = linkRegex.exec(html)) !== null) {
      const filename = match[1];

      // Проверяем, что это изображение
      if (this.isImageFile(filename) && !filename.includes("README")) {
        images.push(baseUrl + filename);
      }
    }

    // Сортируем файлы естественным образом
    return images.sort(this.naturalSort);
  }

  /**
   * Проверяет, является ли файл изображением
   */
  isImageFile(filename) {
    const ext = filename.toLowerCase().split(".").pop();
    return this.imageExtensions.some((imgExt) => imgExt.slice(1) === ext);
  }

  /**
   * Естественная сортировка (1, 2, 10 вместо 1, 10, 2)
   */
  naturalSort(a, b) {
    return a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  }

  /**
   * Фаллбэк: поиск по паттернам (улучшенный)
   */
  async discoverByPatterns(category) {
    const imagePaths = [];
    const baseUrl = `/images/${category}/`;

    // Сначала пробуем самые частые паттерны
    const commonPatterns = [
      { name: (i) => `${category}_${String(i).padStart(2, "0")}`, ext: ".jpg" }, // fashion_01.jpg
      { name: (i) => `${category}${String(i).padStart(2, "0")}`, ext: ".jpg" }, // fashion01.jpg
      { name: (i) => `${i}`, ext: ".jpg" }, // 1.jpg
    ];

    // Быстрая проверка самых популярных паттернов
    for (const pattern of commonPatterns) {
      const fullPattern = (i) => pattern.name(i) + pattern.ext;
      const foundImages = await this.checkPatternSmart(
        baseUrl,
        fullPattern,
        category
      );

      if (foundImages.length > 0) {
        return foundImages;
      }
    }

    // Если быстрая проверка не сработала, пробуем все варианты
    const namePatterns = [
      (i) => `${category}_${i}`, // fashion_1
      (i) => `${category}${i}`, // fashion1
      (i) => `img_${String(i).padStart(2, "0")}`, // img_01
      (i) => `${String(i).padStart(2, "0")}`, // 01
    ];

    for (const namePattern of namePatterns) {
      for (const ext of this.imageExtensions) {
        const fullPattern = (i) => namePattern(i) + ext;
        const foundImages = await this.checkPatternSmart(
          baseUrl,
          fullPattern,
          category
        );

        if (foundImages.length > 0) {
          return foundImages;
        }
      }
    }

    return imagePaths;
  }

  /**
   * Получает лимит изображений для категории
   */
  getCategoryLimit(category) {
    const limits = {
      fashion: 9,
      "e-commerce": 10,
      events: 10,
      magazine: 10,
      reportage: 10,
      personal: 10,
      interior: 10,
      food: 10,
      product: 10,
      bts: 10,
    };

    return limits[category] || 10; // По умолчанию 10
  }

  /**
   * Умная проверка паттерна - останавливается при первом пропуске или лимите
   */
  async checkPatternSmart(baseUrl, pattern, category) {
    const images = [];
    let i = 1;
    const limit = this.getCategoryLimit(category);

    // Проверяем последовательно, пока находим файлы
    while (i <= limit) {
      const imagePath = baseUrl + pattern(i);

      if (await this.imageExists(imagePath)) {
        images.push(imagePath);
      } else {
        // Файл не найден - останавливаемся
        break;
      }

      i++;
    }

    return images;
  }

  /**
   * Проверяет существование изображения
   */
  async imageExists(url) {
    try {
      const response = await fetch(url, { method: "HEAD" });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Получает отображаемое название категории
   */
  getCategoryDisplayName(category) {
    const displayNames = {
      fashion: "photos",
      "e-commerce": "photos",
      events: "photos",
      magazine: "photos",
      reportage: "photos",
      personal: "photos",
      interior: "photos",
      food: "photos",
      product: "photos",
      bts: "photos",
    };

    return (
      displayNames[category] ||
      category.charAt(0).toUpperCase() + category.slice(1)
    );
  }

  /**
   * Создает дропдаун для выбора категории
   */
  createCategoryDropdown(currentCategory) {
    const categories = [
      { key: "fashion", label: "fashion" },
      { key: "e-commerce", label: "e-commerce" },
      { key: "events", label: "events" },
      { key: "magazine", label: "magazine" },
      { key: "reportage", label: "reportage" },
      { key: "personal", label: "personal" },
      { key: "interior", label: "interior" },
      { key: "food", label: "food" },
      { key: "product", label: "product" },
      { key: "bts", label: "bts" },
    ];

    const dropdownWrapper = document.createElement("div");
    dropdownWrapper.className = "dropdown-wrapper";

    // Убираем нативный select. Используем только кастомный дропдаун

    // Кастомный дропдаун для единых шрифтов в списке
    const custom = document.createElement("div");
    custom.className = "custom-dropdown";
    const customButton = document.createElement("button");
    customButton.type = "button";
    customButton.className = "custom-dropdown-button";
    customButton.setAttribute("aria-haspopup", "listbox");
    customButton.setAttribute("aria-expanded", "false");
    const current = categories.find((c) => c.key === currentCategory);
    customButton.textContent = current ? current.label : currentCategory;
    const customArrow = document.createElement("span");
    customArrow.className = "custom-dropdown-arrow";
    customArrow.textContent = "↓";
    customButton.appendChild(customArrow);
    const customList = document.createElement("ul");
    customList.className = "custom-dropdown-list";
    customList.setAttribute("role", "listbox");

    categories.forEach((cat) => {
      const li = document.createElement("li");
      li.className = "custom-dropdown-item";
      li.setAttribute("role", "option");
      if (cat.key === currentCategory) li.setAttribute("aria-selected", "true");
      li.textContent = cat.label;
      li.addEventListener("click", (e) => {
        e.stopPropagation();
        window.location.href = `/pages/photos/${cat.key}.html`;
      });
      customList.appendChild(li);
    });

    // Логика кастомного дропдауна
    const toggleCustom = () => {
      const isOpen = custom.classList.toggle("open");
      customButton.setAttribute("aria-expanded", String(isOpen));
    };
    customButton.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleCustom();
    });
    document.addEventListener("click", () => {
      custom.classList.remove("open");
      customButton.setAttribute("aria-expanded", "false");
    });

    custom.appendChild(customButton);
    custom.appendChild(customList);
    dropdownWrapper.appendChild(custom);
    return dropdownWrapper;
  }

  /**
   * Создает HTML для галереи
   */
  createGalleryHTML(imagePaths, category) {
    // Убираем дубликаты
    const uniqueImages = [...new Set(imagePaths)];

    const galleryContainer = document.createElement("div");
    galleryContainer.className = "photo-gallery";
    galleryContainer.setAttribute("data-category", category);

    // Хедер с заголовком и дропдауном
    const header = document.createElement("div");
    header.className = "gallery-header";

    // Заголовок категории
    const title = document.createElement("h1");
    title.className = "gallery-title";
    title.textContent = this.getCategoryDisplayName(category);
    header.appendChild(title);

    // Дропдаун для выбора категории
    const dropdown = this.createCategoryDropdown(category);
    header.appendChild(dropdown);

    galleryContainer.appendChild(header);

    // Контейнер для фото
    const photosContainer = document.createElement("div");
    photosContainer.className = "photos-grid";

    uniqueImages.forEach((imagePath, index) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.className = "photo-item";

      const img = document.createElement("img");
      img.src = imagePath;
      img.alt = `${category} photo ${index + 1}`;
      img.loading = "lazy";
      img.className = "gallery-image";

      // Обработка ошибки загрузки
      img.addEventListener("error", () => {
        imageWrapper.style.display = "none"; // Скрываем сломанные изображения
      });

      // Добавляем клик для увеличения
      img.addEventListener("click", () =>
        this.openLightbox(imagePath, uniqueImages, index)
      );

      imageWrapper.appendChild(img);
      photosContainer.appendChild(imageWrapper);
    });

    galleryContainer.appendChild(photosContainer);
    return galleryContainer;
  }

  /**
   * Открывает лайтбокс с изображением
   */
  openLightbox(imagePath, allImages, currentIndex) {
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";

    // Создаем структуру лайтбокса
    const lightboxContent = document.createElement("div");
    lightboxContent.className = "lightbox-content";

    const closeButton = document.createElement("span");
    closeButton.className = "lightbox-close";
    closeButton.innerHTML = "&times;";

    const image = document.createElement("img");
    image.className = "lightbox-image";
    image.src = imagePath;
    image.alt = "Enlarged photo";

    const nav = document.createElement("div");
    nav.className = "lightbox-nav";

    const prevButton = document.createElement("button");
    prevButton.className = "lightbox-prev";
    prevButton.innerHTML = "‹";

    const nextButton = document.createElement("button");
    nextButton.className = "lightbox-next";
    nextButton.innerHTML = "›";

    nav.appendChild(prevButton);
    nav.appendChild(nextButton);

    // Крестик располагаем на всем оверлее, а не внутри контента
    lightbox.appendChild(closeButton);
    lightboxContent.appendChild(image);
    lightboxContent.appendChild(nav);
    lightbox.appendChild(lightboxContent);

    // Функция обновления изображения
    const updateImage = (newIndex) => {
      if (newIndex >= 0 && newIndex < allImages.length) {
        currentIndex = newIndex;
        image.src = allImages[currentIndex];
        // обновление счётчика удалено

        // Показываем/скрываем кнопки на границах
        prevButton.style.opacity = currentIndex > 0 ? "1" : "0.3";
        nextButton.style.opacity =
          currentIndex < allImages.length - 1 ? "1" : "0.3";
        prevButton.style.pointerEvents = currentIndex > 0 ? "auto" : "none";
        nextButton.style.pointerEvents =
          currentIndex < allImages.length - 1 ? "auto" : "none";
      }
    };

    // Инициализируем состояние кнопок
    updateImage(currentIndex);

    // Навигация по стрелкам
    prevButton.addEventListener("click", (e) => {
      e.stopPropagation();
      updateImage(currentIndex - 1);
    });

    nextButton.addEventListener("click", (e) => {
      e.stopPropagation();
      updateImage(currentIndex + 1);
    });

    // Навигация клавишами
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") {
        updateImage(currentIndex - 1);
      } else if (e.key === "ArrowRight") {
        updateImage(currentIndex + 1);
      } else if (e.key === "Escape") {
        lightbox.remove();
        document.removeEventListener("keydown", handleKeyPress);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    // Закрытие лайтбокса
    closeButton.addEventListener("click", () => {
      lightbox.remove();
      document.removeEventListener("keydown", handleKeyPress);
    });

    // Закрытие по клику на фон
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.remove();
        document.removeEventListener("keydown", handleKeyPress);
      }
    });

    document.body.appendChild(lightbox);
  }

  /**
   * Основная функция для загрузки галереи
   */
  async loadGallery(category, containerId = "gallery-container") {
    console.log(`Loading: ${category}`);

    // В dev режиме пропускаем кэш для актуальных данных
    const useCache =
      !window.location.hostname.includes("localhost") &&
      !window.location.hostname.includes("127.0.0.1");

    if (useCache && this.galleries.has(category)) {
      console.log(`📦 Используем кэшированную галерею для ${category}`);
      return this.galleries.get(category);
    }

    try {
      // Находим контейнер
      const container = document.getElementById(containerId);
      if (!container) {
        console.error(`❌ Контейнер с ID "${containerId}" не найден`);
        return;
      }

      // Показываем лоадер
      container.innerHTML = '<div class="gallery-loader">Loading...</div>';

      // Получаем список изображений
      const imagePaths = await this.discoverImages(category);

      if (imagePaths.length === 0) {
        container.innerHTML =
          '<div class="gallery-empty">📷 Фотографии не найдены</div>';
        return;
      }

      // Создаем HTML галереи
      const galleryHTML = this.createGalleryHTML(imagePaths, category);

      // Очищаем контейнер и добавляем галерею
      container.innerHTML = "";
      container.appendChild(galleryHTML);

      // Сохраняем в кэш
      this.galleries.set(category, imagePaths);

      console.log(`✅ Галерея "${category}" успешно загружена!`);
      return imagePaths;
    } catch (error) {
      console.error(`❌ Ошибка загрузки галереи ${category}:`, error);
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML =
          '<div class="gallery-error">⚠️ Ошибка загрузки фотографий</div>';
      }
    }
  }
}

// Создаем глобальный экземпляр
const photoGallery = new PhotoGallery();

/**
 * 🎯 Главная функция для использования в HTML
 * @param {string} category - категория фото (fashion, e-commerce, etc.)
 * @param {string} containerId - ID контейнера (по умолчанию 'gallery-container')
 */
async function loadPhotoGallery(category, containerId = "gallery-container") {
  return await photoGallery.loadGallery(category, containerId);
}

// Автоматическая загрузка на основе URL
function autoLoadGallery() {
  const path = window.location.pathname;
  const categoryMatch = path.match(/\/photos\/([^/]+)\.html/);

  if (categoryMatch) {
    const category = categoryMatch[1];
    console.log(`🎯 Автозагрузка галереи для категории: ${category}`);

    // Ждем загрузки DOM
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () =>
        loadPhotoGallery(category)
      );
    } else {
      loadPhotoGallery(category);
    }
  }
}

/**
 * Очищает кэш галереи (доступно глобально)
 */
function clearGalleryCache(category = null) {
  return photoGallery.clearCache(category);
}

// Глобальные функции для отладки
window.clearGalleryCache = clearGalleryCache;
window.photoGallery = photoGallery;

// Экспортируем функции
export { photoGallery, loadPhotoGallery, autoLoadGallery, clearGalleryCache };
