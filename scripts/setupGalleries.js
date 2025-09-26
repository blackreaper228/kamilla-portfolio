/**
 * 🔧 Скрипт для автоматического добавления галерей ко всем страницам фото
 * Запуск: node scripts/setupGalleries.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

// Список всех категорий фото
const photoCategories = [
  "fashion",
  "e-commerce",
  "events",
  "magazine",
  "reportage",
  "personal",
  "interior",
  "food",
  "product",
  "bts",
];

// HTML код для добавления в каждую страницу
const galleryHTML = `
    <!-- Стили для фотогалереи -->
    <link rel="stylesheet" href="/src/stylesheets/photoGallery.css" />
  </head>
  <body>
    <script type="module" src="/src/javascript/main.jsx"></script>
    
    <!-- 📸 Контейнер для автоматической фотогалереи -->
    <div id="gallery-container"></div>
    
    <!-- Подключаем скрипт галереи -->
    <script type="module">
      import { autoLoadGallery } from '/src/javascript/photoGallery.js';
      autoLoadGallery();
    </script>`;

/**
 * Обновляет HTML файл, добавляя галерею
 */
function updateHTMLFile(filePath, category) {
  try {
    let content = fs.readFileSync(filePath, "utf-8");

    // Проверяем, уже ли добавлена галерея
    if (content.includes("gallery-container")) {
      console.log(`✅ ${category}: галерея уже добавлена`);
      return false;
    }

    // Находим закрывающий тег </head> и тег <body>
    const headEndIndex = content.indexOf("</head>");
    const bodyStartIndex = content.indexOf("<body>");

    if (headEndIndex === -1 || bodyStartIndex === -1) {
      console.error(`❌ ${category}: не найдены теги </head> или <body>`);
      return false;
    }

    // Вставляем CSS в head
    const beforeHead = content.substring(0, headEndIndex);
    const afterBody = content.substring(bodyStartIndex + 6); // +6 для <body>

    // Формируем новый контент
    const newContent = beforeHead + galleryHTML + afterBody;

    // Записываем обновленный файл
    fs.writeFileSync(filePath, newContent, "utf-8");
    console.log(`✅ ${category}: галерея успешно добавлена`);
    return true;
  } catch (error) {
    console.error(`❌ ${category}: ошибка обновления файла`, error.message);
    return false;
  }
}

/**
 * Создает папки для изображений, если их нет
 */
function createImageFolders() {
  const imagesDir = path.join(projectRoot, "public", "images");

  for (const category of photoCategories) {
    const categoryDir = path.join(imagesDir, category);

    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
      console.log(`📁 Создана папка: /images/${category}/`);

      // Создаем README с инструкциями
      const readmePath = path.join(categoryDir, "README.md");
      const readmeContent = `# ${
        category.charAt(0).toUpperCase() + category.slice(1)
      } Photos

Добавьте сюда фотографии в формате:
- ${category}_01.jpg, ${category}_02.jpg, ${category}_03.jpg...
- Или: ${category}01.jpg, ${category}02.jpg...
- Или: img_01.jpg, img_02.jpg...

Поддерживаемые форматы: .jpg, .jpeg, .png, .webp, .gif

Фотографии будут автоматически загружены на странице /${category}.html
`;

      fs.writeFileSync(readmePath, readmeContent, "utf-8");
    }
  }
}

/**
 * Основная функция
 */
function setupGalleries() {
  console.log("🚀 Настройка автоматических фотогалерей...\n");

  // Создаем папки для изображений
  createImageFolders();
  console.log("");

  let updatedCount = 0;

  // Обновляем каждую HTML страницу
  for (const category of photoCategories) {
    const htmlPath = path.join(
      projectRoot,
      "pages",
      "photos",
      `${category}.html`
    );

    if (fs.existsSync(htmlPath)) {
      const wasUpdated = updateHTMLFile(htmlPath, category);
      if (wasUpdated) updatedCount++;
    } else {
      console.log(`⚠️ ${category}: файл ${htmlPath} не найден`);
    }
  }

  console.log(`\n🎉 Готово! Обновлено ${updatedCount} страниц`);
  console.log("\n📋 Инструкции:");
  console.log("1. Добавьте фотографии в папки /public/images/{category}/");
  console.log(
    "2. Используйте формат именования: {category}_01.jpg, {category}_02.jpg..."
  );
  console.log(
    "3. Фотографии будут автоматически загружены на соответствующих страницах"
  );
  console.log("\n🔗 Примеры ссылок:");
  console.log("   /photos/fashion.html - покажет фото из /images/fashion/");
  console.log(
    "   /photos/e-commerce.html - покажет фото из /images/e-commerce/"
  );
}

// Запускаем скрипт
setupGalleries();
