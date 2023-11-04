/**
 *
 * @param {string} message
 * @param {string} color
 * @param {HTMLElement} messageElement
 * @param {boolean} reset
 */
function setMessage(message, color, messageElement, reset) {
  messageElement.innerHTML = message;
  messageElement.style.color = color;
  if (!reset) return;
  setTimeout(() => {
    messageElement.innerHTML = "";
    messageElement.style.color = "";
  }, 5000);
}

function handleSubmit(event) {
  event.preventDefault();
  const message = document.querySelector("#message");
  const password = event.target.password.value;
  console.log(`Password submitted: ${password}`);

  setMessage("Loading...", "blue", message);

  if (!password) {
    setMessage("Error: password cannot be blank", "red", message, true);
    return;
  }

  setTimeout(() => {
    setMessage("Success!", "green", message, true);
  }, 2000);
}
