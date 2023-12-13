const user = JSON.parse(localStorage.getItem("user"));
const token = "Bearer " + localStorage.getItem("token");

const apis = ["http://127.0.0.1:8000/api", "https://api/komeat.com/api"];

fetch(apis[0] + "/user/auth", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token,
  },
})
  .then((response) => response.json())
  .then((data) => {})
  .catch((error) => {
    window.location.assign("/index.html");
  });

document.getElementById("referralURL").value = `${apis[0]}/${user.name}`;

fetch(`${apis[0]}/user/${user.id}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token,
  },
})
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("balance").textContent = `$${data.account.balance}`;
    document.getElementById("earning").textContent = `$${data.account.earning}`;
    document.getElementById("bonus").textContent = `$${data.account.bonus}`;
    document.getElementById("asset").textContent = `${data.assets.length}`;
    document.getElementById("deposit").textContent = `${data.deposit.length}`;
    document.getElementById(
      "withdraw"
    ).textContent = `${data.withdraws.length}`;
    document.getElementById("date").textContent = new Date(user.updated_at);
  })
  .catch((error) => {
    // Handle errors
    console.log("Error:", error);
    alert("refreash browser");
  });

document.getElementById("logout").addEventListener("click", () => {
  fetch(`${apis[0]}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.clear();
      window.location.assign("../index.html");
    })
    .catch((error) => {
      // Handle errors
      console.log("Error:", error);
      // alert("unsuccessful");
    });
});
