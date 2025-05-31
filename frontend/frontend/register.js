async function register() {
  const errorEl = document.getElementById("error");
  const successEl = document.getElementById("success");
  errorEl.style.display = "none";
  successEl.style.display = "none";

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;

  if (!username || !password || !password2) {
    errorEl.textContent = "所有欄位皆為必填";
    errorEl.style.display = "block";
    return;
  }
  if (password !== password2) {
    errorEl.textContent = "兩次密碼輸入不一致";
    errorEl.style.display = "block";
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({username, password}),
    });
    const data = await res.json();

    if (res.ok) {
      successEl.style.display = "block";
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    } else {
      errorEl.textContent = data.message || "註冊失敗";
      errorEl.style.display = "block";
    }
  } catch (err) {
    errorEl.textContent = "伺服器錯誤，請稍後再試";
    errorEl.style.display = "block";
  }
}
