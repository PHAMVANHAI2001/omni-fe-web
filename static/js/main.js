$(document).ready(function() {
  ezPlus();
  var href = window.location.href;
  var href1 = window.location.href;
  setInterval(() => {
    href1 = window.location.href;
    if (href1 !== href) {
      href = href1;
      $('.zoomContainer').remove();
      setTimeout(() => {
        ezPlus();
      },100);
    }
  }, 2000);
});

function ezPlus() {
  setTimeout(() => {
    $("#img_01").ezPlus({
      gallery: "gal1",
      cursor: "pointer",
      galleryActiveClass: "active"
    });
  }, 1500);
}
