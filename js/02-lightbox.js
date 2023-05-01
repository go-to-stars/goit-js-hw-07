import { galleryItems } from "./gallery-items.js";
// Change code below this line

// console.log(galleryItems);

// Зроби таку саму галерею як в першому завданні, але використовуючи бібліотеку SimpleLightbox, яка візьме на себе обробку кліків по зображеннях, відкриття і закриття модального вікна, а також гортання зображень за допомогою клавіатури.
// 1. Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї. Використовуй готовий код з першого завдання.
// 2. Підключення скрипту і стилів бібліотеки, використовуючи CDN сервіс cdnjs. Необхідно додати посилання на два файли: simple-lightbox.min.js і simple-lightbox.min.css.
// 3. Ініціалізація бібліотеки після створення і додання елементів галереї у ul.gallery. Для цього ознайомся з документацією SimpleLightbox - насамперед секції «Usage» і «Markup».
// 4. Подивися в документації секцію «Options» і додай відображення підписів до зображень з атрибута alt. Нехай підпис буде знизу і з'являється через 250 мілісекунд після відкриття зображення.

const imagesList = galleryItems
  .map(
    (element) =>
      `<li class="gallery__item">
      <a class="gallery__link" href="${element.original}" onclick="event.preventDefault()">
      <img class="gallery__image"
      src="${element.preview}"      
      alt="${element.description}"          
    />
  </a>
</li>`
  )
  .join(""); // cтворення розмітки галереї

const imagesGallery = document.querySelector(".gallery");

imagesGallery.insertAdjacentHTML("afterbegin", imagesList); // рендер розмітки галереї (додати в DOM за одну операцію)

var lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt", // підпис малюнку
  captionPosition: "bottom", // місце виведення підпису малюнку
  captionDelay: 250, // затримка виведення підпису малюнку
}); // робота з галереєю через бібліотеку "lightbox"
