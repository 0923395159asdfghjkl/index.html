async function login() {
  const errorEl = document.getElementById("error");
  errorEl.style.display = "none";

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !password) {
    errorEl.textContent = "請輸入帳號和密碼";
    errorEl.style.display = "block";
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username);
      window.location.href = "main.html";
    } else {
      errorEl.textContent = data.message || "登入失敗";
      errorEl.style.display = "block";
    }
  } catch (err) {
    errorEl.textContent = "伺服器錯誤，請稍後再試";
    errorEl.style.display = "block";
  }
}
