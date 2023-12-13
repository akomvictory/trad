function getFormValues(form, ...inputNames) {
  const values = {};

  inputNames.forEach((name) => {
    const input = form.querySelector(`[name="${name}"]`);
    if (input) {
      values[name] = input.value;
    }
  });

  return values;
}

const apis = ["http://127.0.0.1:8000/api", "https://api/komeat.com/api"];


const form = document.getElementById("registerForm");
if (form != null)
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values for specific inputs
    const formData = getFormValues(
      form,
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
    fetch(apis[1]+"/auth/register", {
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

const loginForm = document.getElementById("loginForm");
if (loginForm != null)
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Get form values for specific inputs
    const formData = getFormValues(loginForm, "email", "password");

    // Fetch API request
    fetch(apis[1]+"/auth/login", {
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
        //save login token to localstorage
        console.log(data);
        alert(data.message);

        if (data.user) {
          localStorage.setItem(
            "token",
            data.access_token.original.access_token
          );
          localStorage.setItem("user", JSON.stringify(data.user));

          window.location.assign("/dashboard/dashboard.html");
        }
      })
      .catch((error) => {
        // Handle errors
        console.log("Error:", error + " try again");
        alert(error);
      });
  });
