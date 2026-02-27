document.addEventListener("DOMContentLoaded", () => {
  // --- 2. СЛАЙДЕР ПРЕИМУЩЕСТВ (About) ---
  const sliderContainer = document.querySelector(".about-slider");

  function initAboutSlider() {
    if (!sliderContainer) return;

    const slides = sliderContainer.querySelectorAll(".about-slider-item");
    const prevButton = sliderContainer.querySelector(".about-slider-prev");
    const nextButton = sliderContainer.querySelector(".about-slider-next");
    let currentSlide = 0;

    if (slides.length === 0) return;

    function showSlide(index) {
      slides.forEach((slide) => {
        slide.style.display = "none";
        slide.classList.remove("active");
      });
      if (slides[index]) {
        slides[index].style.display = "block";
        slides[index].classList.add("active");
      }
    }

    // Безопасное назначение кликов
    if (prevButton) {
      prevButton.addEventListener('click', (e) => {
        e.preventDefault();
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      });
    }

    showSlide(currentSlide);
  }

  initAboutSlider();

  // --- 3. МАСКА ТЕЛЕФОНА (FAQ) ---
  const phoneInput =
    document.querySelector('input[type="tel"]') ||
    document.querySelector('.faq-inp[placeholder*="тел"]');

  // Проверяем наличие библиотеки IMask и самого инпута
  if (phoneInput && typeof IMask !== 'undefined') {
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
        this.querySelector('input[type="email"]') ||
        this.querySelector(".faq-email");

      let hasEmpty = false;
      let hasError = false;

      inputs.forEach((input) => {
        // Сбрасываем стили (лучше через класс, но можно и так)
        input.style.borderColor = "";

        if (!input.value.trim()) {
          input.style.borderColor = "red";
          hasEmpty = true;
          hasError = true;
        }
      });

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (
        emailInput &&
        emailInput.value.trim() &&
        !emailRegex.test(emailInput.value.trim())
      ) {
        emailInput.style.borderColor = "red";
        hasError = true;

        if (!hasEmpty) {
          alert("Пожалуйста, введите корректный адрес почты");
        }
      }

      if (!hasError) {
        alert("Спасибо! Ваша заявка принята.");
        faqForm.reset();
        // Сбрасываем бордеры после успешной отправки
        inputs.forEach(inp => inp.style.borderColor = "");
      }
    });
  }
});
