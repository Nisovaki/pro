document.addEventListener("DOMContentLoaded", () => {
  // --- 1. МОБИЛЬНОЕ МЕНЮ (Бургер) ---
  const burger = document.querySelector(".header-burger");
  const menu = document.querySelector(".header-nav");
  const body = document.body;

  if (burger && menu) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("active"); // Нужно добавить стили для .active
      menu.classList.toggle("open"); // Нужно добавить стили для .open
      body.classList.toggle("noscroll"); // Запрет прокрутки при открытом меню
    });

    // Закрытие меню при клике на ссылку
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        burger.classList.remove("active");
        menu.classList.remove("open");
        body.classList.remove("noscroll");
      });
    });
  }

  // --- 2. СЛАЙДЕР ПРЕИМУЩЕСТВ (About) ---
  const sliderContainer = document.querySelector(".about-slider");

  // Функция инициализации слайдера
  function initAboutSlider() {
    if (!sliderContainer) return;

    const slides = sliderContainer.querySelectorAll(".about-slider-item");
    const prevButton = sliderContainer.querySelector(".about-slider-prev");
    const nextButton = sliderContainer.querySelector(".about-slider-next");
    let currentSlide = 0;

    if (slides.length === 0) return;

    function showSlide(index) {
      slides.forEach((slide) => {
        slide.style.display = "none"; // Скрываем все
        slide.classList.remove("active");
      });
      slides[index].style.display = "block"; // Показываем нужный
      slides[index].classList.add("active");
    }

    // Листалка назад
    prevButton.onclick = (e) => {
      e.preventDefault();
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    };

    // Листалка вперед
    nextButton.onclick = (e) => {
      e.preventDefault();
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    };

    // Запуск первого слайда
    showSlide(currentSlide);
  }

  // Запускаем слайдер
  initAboutSlider();

  // --- 3. МАСКА ТЕЛЕФОНА (FAQ) ---
  // Ищем поле по типу tel или по селектору
  const phoneInput =
    document.querySelector('input[type="tel"]') ||
    document.querySelector('.faq-inp[placeholder*="тел"]');

  if (phoneInput) {
    IMask(phoneInput, {
      mask: "+{7} (000) 000-00-00",
    });
  }

  // --- 4. ВАЛИДАЦИЯ ФОРМЫ (FAQ) ---
  const faqForm = document.querySelector(".faq-form");

  if (faqForm) {
    faqForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let hasError = false;

      // Поля
      const inputs = this.querySelectorAll(".faq-inp");
      const emailInput = Array.from(inputs).find(
        (i) => i.type === "email" || i.classList.contains("faq-email")
      );

      // Базовая очистка ошибок
      inputs.forEach((input) => {
        input.style.borderColor = "var(--line-btn)";
        if (!input.value.trim()) {
          input.style.borderColor = "red";
          hasError = true;
        }
      });

      // Валидация Email (регулярное выражение)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailInput && !emailRegex.test(emailInput.value)) {
        emailInput.style.borderColor = "red";
        hasError = true;
        alert("Пожалуйста, введите корректный адрес почты");
      }

      if (!hasError) {
        // Имитация успешной отправки
        alert("Спасибо! Ваша заявка принята.");
        faqForm.reset();
      }
    });
  }
});
