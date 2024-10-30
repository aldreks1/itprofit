import "../styles/main.scss";
import "../styles/modal.scss";
import "./modal.js";

import IMask from "imask";
import {
  validateForm,
  displayErrors,
  clearErrorForField,
  clearErrors,
} from "./formValidator.js";
import { submitFormData } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".feedback-form");

  const telInput = document.getElementById("tel");
  const maskOptions = {
    mask: "+{375}(00)000-00-00",
    lazy: false,
  };
  const mask = IMask(telInput, maskOptions);

  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      clearErrorForField(form, input.name);
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearErrors(form);

    const errors = validateForm(form);
    if (Object.keys(errors).length > 0) {
      displayErrors(form, errors);
      return;
    }

    const formData = {
      name: form.elements["name"].value.trim(),
      email: form.elements["email"].value.trim(),
      tel: form.elements["tel"].value.trim(),
      message: form.elements["message"].value.trim(),
    };

    const result = await submitFormData(formData);

    if (result.success) {
      console.log("Форма успешно отправлена:", result.message);
      alert("Ваша заявка успешно отправлена!");
      form.reset();
    } else {
      console.error("Ошибка при отправке формы:", result.message);
      alert(
        "Произошла ошибка при отправке формы. Пожалуйста, попробуйте снова."
      );
    }
  });
});
