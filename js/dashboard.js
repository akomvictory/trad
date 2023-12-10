const user = JSON.parse(localStorage.getItem("user"));
const token = "Bearer 1|" + localStorage.getItem("token");
console.log(token);
document.getElementById(
  "referralURL"
).value = `https://localHostcom/register/${user.name}`;

fetch(`http://127.0.0.1:8000/api/user/${user.id}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token,
  },
})
  .then((response) => response.json())
  .then((data) => {
    // Handle the response data
    console.log(data);
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
  });
