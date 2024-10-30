function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function isValidPhone(tel) {
  const telRegex = /^\+375\(\d{2}\)\d{3}-\d{2}-\d{2}$/;
  return telRegex.test(tel);
}

let errors = {};
export function validateForm(form) {
  errors = {};
  const name = form.elements["name"].value.trim();
  const email = form.elements["email"].value.trim();
  const tel = form.elements["tel"].value.trim();
  const message = form.elements["message"].value.trim();
  if (!name) {
    errors.name = "Имя обязательно для заполнения";
  }
  if (!email) {
    errors.email = "Email обязателен для заполнения";
  } else if (!isValidEmail(email)) {
    errors.email = "Некорректный email";
  }
  if (!tel) {
    errors.tel = "Телефон обязателен для заполнения";
  } else if (!isValidPhone(tel)) {
    errors.tel = "Некорректный телефон";
  }
  if (!message) {
    errors.message = "Сообщение обязательно для заполнения";
  }
  return errors;
}
export function displayErrors(form, errors) {
  clearErrors(form);

  Object.keys(errors).forEach((fieldName) => {
    const field = form.elements[fieldName];
    const errorText = document.createElement("div");
    errorText.className = "error-message";
    errorText.innerText = errors[fieldName];
    field.classList.add("error");
    field.parentNode.appendChild(errorText);
  });
}

export function clearErrors(form) {
  form.querySelectorAll(".error-message").forEach((el) => el.remove());
  form
    .querySelectorAll("input, textarea")
    .forEach((el) => el.classList.remove("error"));
}

export function clearErrorForField(form, fieldName) {
  const input = form.querySelector(`[name="${fieldName}"]`);

  if (input) {
    const errorElement = input.nextElementSibling;
    if (
      fieldName === "email" &&
      !isValidEmail(input.value.trim()) &&
      errors.email == "Некорректный email"
    ) {
      return;
    }

    if (errorElement && errorElement.classList.contains("error-message")) {
      errorElement.remove();
    }
    input.classList.remove("error");
  }
}
