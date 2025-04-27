document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    }),
  });
  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("token", data.token);
    window.location.href = "blogs";
  } else {
    alert("Login Failed");
  }
});
