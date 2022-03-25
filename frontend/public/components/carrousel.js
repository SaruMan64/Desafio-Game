let slideIndex = 1;

function plusSlides(n) {
    showSlides((slideIndex += n));
}

function currentSlide(n) {
    showSlides((slideIndex = n));
}

function addCarrousel() {
    let div = $(
        `<div id="instructions-modal" class="modal-bigger" style="position: fixed;">
            <div class="line-head">
                <h1>TUTORIAL</h1>
                <button class="close-modal"></button>
            </div>
            <div>
                <div class="slideshow-container">
                    <div class="mySlides fade">
                        <div class="numbertext">1 / 6</div>
                        <img src="../images/carousel/pedidospage.gif" style="width:100%">
                        <div class="text">MOVIMENTAÇÃO DOS PEDIDOS</div>
                    </div>

                    <div class="mySlides fade">
                        <div class="numbertext">2 / 6</div>
                        <img src="../images/carousel/lamemmove.gif" style="width:100%">
                        <div class="text">COZIMENTO</div>
                    </div>

                    <div class="mySlides fade">
                        <div class="numbertext">3 / 6</div>
                        <img src="../images/carousel/selecionandomolho.gif" style="width:100%">
                        <div class="text">SELEÇÃO DE MOLHOS</div>
                    </div>

                    <div class="mySlides fade">
                        <div class="numbertext">4 / 6</div>
                        <img src="../images/carousel/ingredientes.gif" style="width:100%">
                        <div class="text">INGREDIENTES</div>
                    </div>

                    <div class="mySlides fade">
                        <div class="numbertext">5 / 6</div>
                        <img src="../images/carousel/entregadepedido.gif" style="width:100%">
                        <div class="text">FINALIZAÇÃO DE PEDIDO</div>
                    </div>

                    <div class="mySlides fade">
                        <div class="numbertext">6 / 6</div>
                        <img src="../images/carousel/spiderattack.gif" style="width:100%">
                        <div class="text">PEGUE A ARANHA</div>
                    </div>

                    <a class="prev"">&#10094;</a>
                    <a class="next">&#10095;</a>
                </div>

                <div id="all-dots" style="text-align:center">
                    <span class="dot" level="1"></span>
                    <span class="dot" level="2"></span>
                    <span class="dot" level="3"></span>
                    <span class="dot" level="4"></span>
                    <span class="dot" level="5"></span>
                    <span class="dot" level="6"></span>
                </div>
            </div>
        </div>`
    );
    $(".popup-overlay").append(div[0]);
    showSlides(slideIndex);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

$(document).on("click", ".prev", function () {
    plusSlides(-1);
});

$(document).on("click", ".next", function () {
    plusSlides(1);
});

$(document).on("click", ".dot", function (event) {
    let num = $(event.target).attr("level");
    currentSlide(num);
});

export { addCarrousel };