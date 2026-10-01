// Instituto Patas que Transformam - JavaScript puro
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    });
  }

  document.querySelectorAll(".donation-options button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".donation-options button").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      const value = Number(button.dataset.donation);
      const feedback = button.closest(".donation-box")?.querySelector(".donation-feedback");
      if (feedback) {
        feedback.textContent = `Você selecionou uma contribuição de R$ ${value.toFixed(2).replace(".", ",")}. Obrigado por apoiar a causa!`;
      }
    });
  });

  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-item");
  const emptyFilter = document.querySelector("#emptyFilter");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;
      let visible = 0;

      projectItems.forEach((project) => {
        const show = filter === "todos" || project.dataset.category === filter;
        project.hidden = !show;
        if (show) visible++;
      });

      if (emptyFilter) emptyFilter.hidden = visible !== 0;
    });
  });

  const cpfInput = document.querySelector("#cpf");
  const phoneInput = document.querySelector("#phone");
  const cepInput = document.querySelector("#cep");

  const onlyDigits = (value) => value.replace(/\D/g, "");

  if (cpfInput) {
    cpfInput.addEventListener("input", (event) => {
      let value = onlyDigits(event.target.value).slice(0, 11);
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      event.target.value = value;
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener("input", (event) => {
      let value = onlyDigits(event.target.value).slice(0, 11);
      if (value.length > 10) {
        value = value.replace(/(\d{2})(\d{5})(\d{1,4})/, "($1) $2-$3");
      } else {
        value = value.replace(/(\d{2})(\d{4})(\d{1,4})/, "($1) $2-$3");
      }
      event.target.value = value;
    });
  }

  if (cepInput) {
    cepInput.addEventListener("input", (event) => {
      let value = onlyDigits(event.target.value).slice(0, 8);
      if (value.length > 5) value = value.replace(/(\d{5})(\d+)/, "$1-$2");
      event.target.value = value;
    });
  }

  function validateCPF(cpf) {
    const digits = onlyDigits(cpf);
    if (digits.length !== 11 || /^([0-9])\1+$/.test(digits)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) sum += Number(digits[i]) * (10 - i);
    let remainder = (sum * 10) % 11;
    if (remainder === 10) remainder = 0;
    if (remainder !== Number(digits[9])) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) sum += Number(digits[i]) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10) remainder = 0;

    return remainder === Number(digits[10]);
  }

  const registrationForm = document.querySelector("#registrationForm");
  if (registrationForm) {
    registrationForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const feedback = document.querySelector("#registrationFeedback");
      const success = document.querySelector("#registrationSuccess");
      const cpf = document.querySelector("#cpf");
      const interests = document.querySelectorAll('input[name="interest"]:checked');

      feedback.className = "form-feedback";
      success.hidden = true;

      if (!registrationForm.checkValidity()) {
        registrationForm.reportValidity();
        feedback.textContent = "Revise os campos obrigatórios antes de enviar.";
        feedback.classList.add("error");
        return;
      }

      if (!validateCPF(cpf.value)) {
        cpf.setCustomValidity("Informe um CPF válido.");
        cpf.reportValidity();
        cpf.setCustomValidity("");
        feedback.textContent = "O CPF informado não é válido.";
        feedback.classList.add("error");
        return;
      }

      if (interests.length === 0) {
        feedback.textContent = "Selecione pelo menos uma forma de ajudar.";
        feedback.classList.add("error");
        return;
      }

      feedback.textContent = "";
      success.hidden = false;
      registrationForm.reset();
      window.scrollTo({ top: success.offsetTop - 100, behavior: "smooth" });
    });
  }

  const contactForm = document.querySelector("#contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const feedback = document.querySelector("#contactFeedback");
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      feedback.textContent = "Mensagem registrada para esta demonstração. Obrigado!";
      feedback.className = "form-feedback success";
      contactForm.reset();
    });
  }
});
