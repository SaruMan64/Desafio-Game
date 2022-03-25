import { sound } from "./audio.js";
/* Functions */
//opening
//Prepend HTML in to body
function openingHTML() {
  $("body").prepend(`
    <section id="doors">
      <div id="frontopening">
        <form id="register" onsubmit="return false">
          <input id="inputName" type="text" placeholder="Insira seu nome..." minlength="1" maxlength="15" pattern="^[a-zA-Zà-ýÀ-Ý0-9]{0,15}" required />
        </form>
        <button type="submit" form="register" id="btn">INICIAR</button>
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
    //sound.playMusic('openingDoor')

    const animationDoor = " 2800ms cubic-bezier(1,0,.5,1)"
    const animationBrownser = ["-webkit-animation", "-moz-animation", "-o-animation", "animation"]
    animationBrownser.forEach(el => {
      $(".L").css(el, "doorL" + animationDoor);
      $(".R").css(el, "doorR" + animationDoor);
      $("#doors").css(el, "zoomFadeOut 3s cubic-bezier(.64,0,.4,.39)");
      $("#game").show();
    });

  }, 500)

  setTimeout(() => {
    $(".L").css("left", "-50%")
    $(".R").css("left", "100%")
    $("#doors").remove();

  }, 2800);
}

//AJAX opening
function openingAJAX() {
  if (document.getElementById("register").checkValidity()) {
    $.ajax({
      type: "GET",
      url: `http://localhost:4444/register?nickname=${$("#inputName").val()}`,
      success: function (response) {
        if (response === true) {
          //$name = $("#inputName").val();;
          openingAnimationDoors();
        } else {
          alert(response);
        }
      },
      error: function (error) {
        console.log(error);
      }
    });
  }
}

export { openingHTML, openingAJAX };