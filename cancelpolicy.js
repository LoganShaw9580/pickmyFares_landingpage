window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  loader.style.opacity = "0";

  setTimeout(() => {
    loader.style.display = "none";
    document.getElementById("content").style.display = "block";
  }, 500);
});


document.getElementById("cancelPolicy").onclick = function () {
  window.location.href = "CancelationPolicy.html";
};


document.getElementById("about-us").onclick = function () {
  window.location.href = "about.html";
};