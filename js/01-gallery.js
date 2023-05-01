import { galleryItems } from "./gallery-items.js";
// Change code below this line

// console.log(galleryItems);

// Створи галерею з можливістю кліку по її елементах і перегляду повнорозмірного зображення у модальному вікні.
// 1. Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
// 2. Реалізація делегування на ul.gallery і отримання url великого зображення.
// 3. Підключення скрипту і стилів бібліотеки модального вікна basicLightbox. Використовуй CDN сервіс jsdelivr і додай у проект посилання на мініфіковані (.min) файли бібліотеки.
// 4. Відкриття модального вікна по кліку на елементі галереї. Для цього ознайомся з документацією і прикладами.
// 5. Заміна значення атрибута src елемента <img> в модальному вікні перед відкриттям. Використовуй готову розмітку модального вікна із зображенням з прикладів бібліотеки basicLightbox.
// 6. Посилання на оригінальне зображення повинно зберігатися в data-атрибуті source на елементі <img>, і вказуватися в href посилання. Не додавай інші HTML теги або CSS класи, крім тих, що містяться в цьому шаблоні.
// 7. Зверни увагу на те, що зображення обгорнуте посиланням, отже по кліку за замовчуванням користувач буде перенаправлений на іншу сторінку. Заборони цю поведінку за замовчуванням.
// 8. Додай закриття модального вікна після натискання клавіші Escape. Зроби так, щоб прослуховування клавіатури було тільки доти, доки відкрите модальне вікно. Бібліотека basicLightbox містить метод для програмного закриття модального вікна.

const imagesList = galleryItems
  .map(
    (element) =>
      `<li class="gallery__item">
      <a class="gallery__link" href="${element.original}" onclick="event.preventDefault()">
      <img class="gallery__image"
      src="${element.preview}"
      data-source="${element.original}"
      alt="${element.description}"          
    />
  </a>
</li>`
  )
  .join(""); // cтворення розмітки галереї

const imagesGallery = document.querySelector(".gallery");

imagesGallery.insertAdjacentHTML("afterbegin", imagesList); // рендер розмітки галереї (додати в DOM за одну операцію)

// // Варіант 1 (без використання бібліотеки basiclightbox) ----------------------------------------------------

// imagesGallery.insertAdjacentHTML(
//   "afterend",
//   `<div class="modal-backdrop" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; background-color: rgba(46, 47, 66, 0.4); opacity: 0;"></div>`
// ); // cтворення фону модального вікна

// const modalBackdropLink = document.querySelector(".modal-backdrop");

// // прослуховування події "click" на галереї зображень
// imagesGallery.addEventListener("click", (e) => {
//   e.preventDefault(); // блокування дій за "замовчуванням" у браузері
//   modalBackdropLink.style.opacity = "1"; // не прозорість фону модального вікна
//   modalBackdropLink.style.pointerEvents = "auto"; // не "прозорість"єлемента для миші

//   modalBackdropLink.insertAdjacentHTML(
//     "afterbegin",
//     `<img class="modal-window-img" src="${e.target.getAttribute(
//       "data-source"
//     )}" alt="${e.target.getAttribute(
//       "alt"
//     )}" style="width: 100%; height: 100%; display: block; padding: 20px; object-fit: contain;">`
//   ); // додавання розмітки великого малюнку в модальному вікні

//   const modalImg = modalBackdropLink.querySelector(".modal-window-img");

//   modalImg.addEventListener("click", closeModal); // прослуховування події "click" на модальному вікні

//   const closeModalWindow = {
//     handleEvent: function (e) {
//       if (e.key === "Escape") {
//         window.removeEventListener("keydown", closeModalWindow); // видалення прослуховування події "keydown"
//         closeModal();
//       }
//     },
//   }; // функціональний вираз функції закриття модального вікна клавішею "Escape"

//   window.addEventListener("keydown", closeModalWindow); // прослуховування події "keydown"

//   function closeModal() {
//     modalBackdropLink.style.opacity = "0"; //  прозорість фону модального вікна
//     modalBackdropLink.style.pointerEvents = "none"; // "прозорість"єлемента для миші
//     modalBackdropLink.querySelector(".modal-window-img").remove(); // видалення розмітки з великим малюнком
//     window.removeEventListener("keydown", closeModalWindow); // видалення прослуховування події "keydown"
//   } // функція закриття модального вікна
// });

// Варіант 2 (з використання бібліотеки basiclightbox) ----------------------------------------------------

imagesGallery.addEventListener("click", (e) => {
  e.preventDefault(); // блокування дій за "замовчуванням" у браузері

  const lightboxGallery = basicLightbox.create(
    `<img class="modal-window-img" src="${e.target.getAttribute(
      "data-source"
    )}" alt="${e.target.getAttribute("alt")}">`, // додавання розмітки великого малюнку в лайтбоксі
    {
      onShow: (lightboxGallery) => {
        window.addEventListener("keydown", closeLightbox); // створення прослуховування події "keydown"
      },
      onClose: (lightboxGallery) => {
        window.removeEventListener("keydown", closeLightbox); // видалення прослуховування події "keydown"
      },
    }
  ); // створення лайтбоксу

  lightboxGallery.show(); //показує екземпляр лайтбоксу

  function closeLightbox(e) {
    if (e.key === "Escape") {
      lightboxGallery.close();
    }
  } // функція закриття лайтбоксу клавішею "Escape"
});
