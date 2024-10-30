import axios from "axios";

export async function submitFormData(formData) {
  try {
    const response = await axios.post(
      "http://127.0.0.1:9090/api/registration",
      formData
    );
    if (response.data.status === "success") {
      return { success: true, message: response.data.message };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("Ошибка при отправке данных на сервер:", error);
    return { success: false, message: "Произошла ошибка при отправке данных" };
  }
}
