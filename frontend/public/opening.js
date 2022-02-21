$(document).ready(function () {

  // Opening
  openingHTML();
  $('#btn').click(function () {
    $.ajax({
      type: "GET",
      url: `http://localhost:4444/register?nickname=${$("#inputName").val()}`,
      success: function (response) {
        if(response === true) {
          openingAnimationDoors();
        } else {
          alert(response);
        }
      },
      error: function (error) {
        console.log(error);
      }
    });
  });

})

/* Functions */
//Prepend HTML in to body
function openingHTML() {
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
}

//Animation body opening
function openingAnimationDoors() {
  $(this).prop('disabled', true);

  setTimeout(() => {
    $("#frontopening").html("");
    const audiott = new Audio("./sounds/Sound-Button-Effect-Sliding.wav");
    audiott.play();

    const animationDoor = " 2800ms cubic-bezier(1,0,.5,1)"
    const animationBrownser = ["-webkit-animation", "-moz-animation", "-o-animation", "animation"]
    animationBrownser.forEach(el => {
      $(".L").css(el, "doorL" + animationDoor);
      $(".R").css(el, "doorR" + animationDoor);
      $("#doors").css(el, "zoomFadeOut 3s cubic-bezier(.64,0,.4,.39)");
    });

  }, 500)

  setTimeout(() => {
    $(".L").css("left", "-50%")
    $(".R").css("left", "100%")
    $("#doors").remove();
  }, 2800);
}