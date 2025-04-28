document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    }),
  });
  if (res.ok) {
    alert("Signup Successful");
    window.location.href = "login";
  } else {
    alert("Signup Failed");
  }
});
