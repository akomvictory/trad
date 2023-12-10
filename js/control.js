const form = document.getElementById("registerForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values for specific inputs
  const formData = getFormValues(
    "firstname",
    "lastname",
    "email",
    "mobile",
    "country",
    "state",
    "city",
    "street",
    "zip_code",
    "password",
    "password_confirmation"
  );

  formData.phone_number = formData.mobile;
  formData.name = formData.lastname + " " + formData.firstname;

  // Fetch API request
  fetch("http://127.0.0.1:8000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data
      alert(data.message);
      if (data.user) {
        window.location.assign("/login.html");
      }
    })
    .catch((error) => {
      // Handle errors
      alert("Error:", error);
      return error.text();
    });
});

function getFormValues(...inputNames) {
  const values = {};

  inputNames.forEach((name) => {
    const input = form.querySelector(`[name="${name}"]`);
    if (input) {
      values[name] = input.value;
    }
  });

  return values;
}
