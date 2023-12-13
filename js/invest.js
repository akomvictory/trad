const user = JSON.parse(localStorage.getItem("user"));
const token = "Bearer " + localStorage.getItem("token");

const apis = ["http://127.0.0.1:8000/api", "https://api/komeat.com/api"];

fetch(apis[0] + "/user/auth", {
  method: "GET",
  headers: {
    "Content-account_stage": "application/json",
    Accept: "application/json",
    Authorization: token,
  },
})
  .then((response) => response.json())
  .then((data) => {})
  .catch((error) => {
    window.location.assign("/index.html");
  });

fetch(`${apis[0]}/user/${user.id}`, {
  method: "GET",
  headers: {
    "Content-account_stage": "application/json",
    Accept: "application/json",
    Authorization: token,
  },
})
  .then((response) => response.json())
  .then((data) => {
    // Handle the response data
    document.getElementById(
      "modalEarning"
    ).textContent += `$${data.account.earning}`;
    document.getElementById(
      "modalBalance"
    ).textContent += `$${data.account.balance}`;
  })
  .catch((error) => {
    // Handle errors
    console.log("Error:", error);
    alert("refreash browser");
  });
  
//update plan and enable trade
document.getElementById("register").addEventListener("submit", (e) => {
  e.preventDefault();
  if (user.account.balance <= 500) {
    return window.location.assign("/dashboard/deposit.html");
  }
  const amount = document.getElementById("fixedAmount").value;

  let account_stage = ""; // Initialize the account_stage variable

  if (amount !== null && amount >= 500) {
    const parsedAmount = parseFloat(amount); // Convert amount to a numeric value

    if (parsedAmount >= 500 && parsedAmount < 1000) {
      account_stage = "bronze";
    } else if (parsedAmount >= 1000 && parsedAmount < 5000) {
      account_stage = "silver";
    } else if (parsedAmount >= 5000 && parsedAmount < 10000) {
      account_stage = "gold";
    } else if (parsedAmount >= 10000 && parsedAmount <= 1000000) {
      account_stage = "premium";
    }
  } else {
    // If amount is null, do nothing
    return;
  }

  const formData = {
    user_id: user.account.id,
    account_stage,
    trade: 1,
    balance: user.account.balance,
    earning: user.account.earning,
    bonus: user.account.bonus,
    account_type: user.account.account_type,
  };
  fetch(`${apis[0]}/account/${user.account.id}`, {
    method: "PUT",
    headers: {
      "Content-account_stage": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("investment succesful");
    })
    .catch((error) => {
      // Handle errors
      console.log("Error:", error);
      //   alert("refreash browser");
    });
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

