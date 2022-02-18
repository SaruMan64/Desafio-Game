$(function () {
  $('#btn').click(function () {
    $(this).prop('disabled', true);
    $(this).remove();
    $(".L").css("animation", "doorL 2500ms cubic-bezier(1,0,.5,1)")
    $(".R").css("animation", "doorR 2500ms cubic-bezier(1,0,.5,1)")
    setTimeout(() => {
      $(".L").css("left", "-50%")
      $(".R").css("left", "100%")
      //$("#doors").remove();
    }, 2400);
    const audiott = new Audio("./sonds/Sound-Button-Effect-Sliding.wav");
    audiott.play();
    //$("#doors").css("scale", "4 4");
    /* $("#doors").css("opacity", "0");
    $("#doors").css("position", "absolute");
    $("#doors").css("top", "-62.41%");
    $("#doors").css("transition", "opacity 2s, bottom 2.6s ease "); */
  })
});
/* 
const btn = document.querySelector("#btn");
btn.onclick = () => {
  setTimeout(() => {
    portas.remove();
  }, 2300);
  toggleDoor();
  portas.style.transform = "scale(4)";
  portas.style.opacity = "0";
  portas.style.transition = "transform 1.7s, opacity 2s";
}

function toggleDoor() {
  const doors = document.querySelectorAll(".door");
  doors.forEach((el, id) => {
    switch (id) {
      case 0:
        el.classList.toggle("doorOpenL");
        return true;
      case 1:
        el.classList.toggle("doorOpenR");
        return true;
    }
  });
}
 */