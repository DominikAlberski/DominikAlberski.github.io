function activateGallery() {
  let thumbanails = document
    .querySelector("#gallery-thumbs")
    .querySelectorAll("img");
    // querySelectorAll("#gallery-thumbs > div > img")
  let mainImg = document.querySelector("#gallery-photo img")

  let title = document.querySelector("#gallery-info .title")
  let description = document.querySelector("#gallery-info .description")

  thumbanails.forEach(function(thumbanail) {

    let newImageSrc  = thumbnail.dataset.largeVersion;
    let largeVersion = new Image();
    largeVersion.src = newImageSrc;

    thumbanail.addEventListener("click", function() {
      mainImg.setAttribute("src", thumbanail.dataset.largeVersion);
      mainImg.setAttribute("alt", thumbanail.alt);

      title.textContent = thumbanail.dataset.title;
      description.textContent = thumbanail.dataset.description;

      document.querySelector('.current').classList.remove("current");
      thumbanail.parentNode.classList.add("current");
    })
  })
}
