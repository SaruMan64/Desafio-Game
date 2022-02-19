$(function () {
  $('#btn').click(function () {
    $(this).prop('disabled', true);

    $("#doors").css("animation", "zoomFadeOut 3s cubic-bezier(.64,0,.4,.39)");

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
      $("#doors").remove();
    }, 2800);

    
  })
});

function registerPlayer() {
  const player = {
    "name": $("#inputName").val(),
  };
  $.ajax({
      url: 'http://localhost:4444/register',
      method: "POST",
      contentType: "application/json; charset=utf-8",
      crossDomain: true,
      data: player
  })
  .done(function (data) {
      console.log(data);
  });
}