let token = localStorage.getItem("token");

if (!token) {
  window.location.href =
    "https://e-learning-3ewwv8v2o-cristian1534.vercel.app/auth/login";
}
