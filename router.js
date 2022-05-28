let routes = {
  home: document.getElementById("home-logged-template"),
  "about-us": document.getElementById("aboutUs-template"),
  contact: document.getElementById("contact-template"),
  gallery: document.getElementById("gallery-template"),
  catalog: document.getElementById("catalog-template"),
  info: document.getElementById("info-template"),
};
function show(...componentsToBeShown) {
  for (const key in routes) {
    if (componentsToBeShown.includes(key)) {
      routes[key].style.display = "block";
    } else {
      routes[key].style.display = "none";
    }
  }
}
function navigateHandler(event) {
  event.preventDefault();
  let url = new URL(event.target.href);
  const path = url.pathname.slice(1);

  // window.history.replaceState({}, "", "/" + path);
  show(path);
  //That returns us only the patch word
}
