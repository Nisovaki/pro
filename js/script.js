document.addEventListener("DOMContentLoaded", () => {
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

      const inputs = this.querySelectorAll(".faq-inp");
      const emailInput =
        this.querySelector('input[type="email"].faq-inp') ||
        this.querySelector(".faq-email");

      let hasEmpty = false;
      let hasError = false;

      // сброс бордеров + проверка на пустоту
      inputs.forEach((input) => {
        input.style.borderColor = "var(--line-btn)";

        if (!input.value.trim()) {
          input.style.borderColor = "red";
          hasEmpty = true;
          hasError = true;
        }
      });

      // проверка email только если поле НЕ пустое
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (
        emailInput &&
        emailInput.value.trim() &&
        !emailRegex.test(emailInput.value.trim())
      ) {
        emailInput.style.borderColor = "red";
        hasError = true;

        // alert показываем только если нет пустых полей,
        // чтобы не мешать пользователю сначала заполнить форму
        if (!hasEmpty) {
          alert("Пожалуйста, введите корректный адрес почты");
        }
      }

      if (!hasError) {
        alert("Спасибо! Ваша заявка принята.");
        faqForm.reset();
      }
    });
  }
});
