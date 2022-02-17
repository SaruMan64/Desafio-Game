$(function () {
  $('#btn').click(function () {
    $(this).prop('disabled', true);

    setTimeout(() => {
      $("#frontopening").html("");
      const audiott = new Audio("./sonds/Sound-Button-Effect-Sliding.wav");
      audiott.play();

      const animationDoor = " 2800ms cubic-bezier(1,0,.5,1)"
      const animationBrownser = ["-webkit-animation", "-moz-animation", "-o-animation", "animation"]
      animationBrownser.forEach(el => {
        $(".L").css(el, "doorL" + animationDoor);
        $(".R").css(el, "doorR" + animationDoor);
      });
    }, 500)

    setTimeout(() => {
      $(".L").css("left", "-50%")
      $(".R").css("left", "100%")
      //$("#doors").remove();
    }, 2800);
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