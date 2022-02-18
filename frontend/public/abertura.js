$(document).ready(function () {

  $(function () {
    $("body").prepend(`
    <section id="doors">
      <div id="frontopening">
        <input id="inputName" type="text" placeholder="Insira seu nome..." />
        <button id="btn">INICIAR</button>
      </div>
      <div id="backDoor">
        <img
          class="door L"
          src="./images/opening/Door.svg"
          alt=""
          srcset="./images/opening/Door.svg"
        />
        <img
          class="door R"
          src="./images/opening/Door.svg"
          alt=""
          srcset="./images/opening/Door.svg"
        />
      </div>
    </section>
        `);

    $('#btn').click(function () {
      $(this).prop('disabled', true);

      $("#doors").css("animation", "zoomFadeOut 3s cubic-bezier(.64,0,.4,.39)");
      $("main").attr("hidden", false);
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

})