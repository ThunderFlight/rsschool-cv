let btn = document.querySelector(".contact");
btn.addEventListener("click", () => {
  navigator.clipboard.writeText("peng_gentleman");
  btn.innerHTML = "copied";
  setTimeout(() => {
    btn.innerHTML = "Copy my Discord";
  }, 1000);
});
