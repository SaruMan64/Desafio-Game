let hasSpiderOnScreen = false;
let width = window.innerWidth;
let height = window.innerHeight;

$(document).on("click", ".spider-web", function () {
    $(this).remove();
});

const linearRoutes = {
    route0: {
        start: { x: -500, y: -500 },
        end: { x: width + 100, y: height + 100 },
    },
    route1: {
        start: { x: -500, y: height + 500 },
        end: { x: width + 500, y: -height - 500 },
    },
};

const radialRouts = {
    route0: { rx: width, ry: height, cx: width, cy: height },
    route1: { rx: 1000, ry: 1000, cx: 0, cy: 0 },
};

function linearSpiderKenji(num, time1, time2) {

    const start = {
        x: linearRoutes["route" + num].start.x,
        y: linearRoutes["route" + num].start.y,
    };
    const end = {
        x: linearRoutes["route" + num].end.x,
        y: linearRoutes["route" + num].end.y,
    };

    $("#card").css({
        left: start.x,
        top: start.y,
    });

    $("#card").click(function () {
        $("#card").remove();
        ifItWorks();
    });

    $("#card").animate(
        {
            left: end.x,
            top: end.y,
        },
        time1
    );
    setTimeout(() => {
        $("#card").animate(
            {
                left: start.x,
                top: start.y,
            },
            time2,
            function () {
                if ($("#card").length !== 0) {
                    $("#card").remove();
                    ifItNotWorks();
                }
            }
        );
    }, time1);
}

function radialSpiderKenji(num) {
    /* let div = document.createElement("div");
    div.setAttribute("id", "card");
    $("body").append(div); */
    let angle = 90;

    var timer = setInterval(function () {
        var rad = angle * (Math.PI / 180);
        $("#card").css({
            left:
                radialRouts["route" + num].cx +
                Math.cos(rad) * radialRouts["route" + num].rx +
                "px",
            top:
                radialRouts["route" + num].cy +
                radialRouts["route" + num].ry * (1 - Math.sin(rad)) -
                radialRouts["route" + num].ry +
                "px",
        });
        angle--;
        if (Math.floor((angle + 180) / 360) == -2) {
            clearInterval(timer);
            $("#card").remove();
            ifItNotWorks();
        }
    }, 17);

    $("#card").click(function () {
        clearInterval(timer);
        $("#card").remove();
        ifItWorks();
    });
}

function addWebs() {
    const img1 = new Image();
    img1.src = "../images/others/web-1.png";
    let imgWidth, imgHeight;
    img1.onload = function () {
        imgWidth = this.width;
        imgHeight = this.height;
        console.log(`width: ${imgWidth} - height: ${imgHeight}`);

        $("body").append(img1);

        let img = $(img1);
        img.css({
            width: String(imgWidth * 0.2) + "px",
        });

        img.addClass("spider-web");
        imgWidth = this.width;
        imgHeight = this.height;
        console.log(`width: ${imgWidth} - height: ${imgHeight}`);

        img.css({
            position: "absolute",
            left:
                String(Math.abs(Math.floor(Math.random() * width - imgWidth))) +
                "px",
            top:
                String(
                    Math.abs(Math.floor(Math.random() * height - imgHeight))
                ) + "px",
        });
        console.log(img);
    };
}

function aleatoryChance(num) {
    addWebs();
    if (!hasSpiderOnScreen) {
        let chance = Math.round(Math.random() * 100);
        let changeSkin = Math.round(Math.random() * 100);

        if (chance <= num) {
            hasSpiderOnScreen = true;
            let div = document.createElement("div");
            div.setAttribute("id", "card");
            div.setAttribute("class", "normal-spider");
            div.setAttribute("z-index", "15");

            if (changeSkin <= num * 0.1) {
                div.removeClass("normal-spider");
                div.addClass("kenji-spider");
            }

            $("body").append(div);
            addWebs();

            let whatFunction = Math.round(Math.random());
            let whatRoute = Math.round(Math.random());
            switch (whatFunction) {
                case 0:
                    linearSpiderKenji(whatRoute, 8000, 8000);
                    break;
                case 1:
                    radialSpiderKenji(whatRoute);
                    break;
                default:
                    console.log("Como chegamos aqui");
            }
        }
    }
}

function ifItWorks() {
    // Se a aranha for pega
    hasSpiderOnScreen = false;
    console.log("Removido a tempo");
}

function ifItNotWorks() {
    // Se a aranha não for pega
    hasSpiderOnScreen = false;
    console.log("LA LA LA");
}

export { aleatoryChance };
