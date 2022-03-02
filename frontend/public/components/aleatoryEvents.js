let width = window.innerWidth;
let height = window.innerHeight;

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

function linearSpiderKenji(num) {
    let div = document.createElement("div");
    div.setAttribute("id", "card");
    $("body").append(div);

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

    $("#card").toggle(
        $("#card").animate(
            {
                left: end.x,
                top: end.y,
            },
            2000
        ),
        $("#card").animate(
            {
                left: start.x,
                top: start.y,
            },
            8000,
            function () {
                if ($("#card").length !== 0) {
                    $("#card").remove();
                    ifItNotWorks();
                }
            }
        )
    );
}

const radialRouts = {
    route0: { rx: width, ry: height, cx: width, cy: height },
    route1: { rx: 1000, ry: 1000, cx: 0, cy: 0 },
};

function radialSpiderKenji(num) {
    let div = document.createElement("div");
    div.setAttribute("id", "card");
    $("body").append(div);
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

function aleatoryChance(num) {
    let chance = Math.round(Math.random() * 100);
    if(chance <= num){
        let whatFunction = Math.round(Math.random());
        let whatRoute = Math.round(Math.random());
        switch(whatFunction){
            case 0:
                linearSpiderKenji(whatRoute);
                break;
            case 1:
                radialSpiderKenji(whatRoute);
                break;
            default:
                console.log("Como chegamos aqui");
        }
        
    }
}

function ifItWorks() {
    console.log("Removido a tempo");
}

function ifItNotWorks() {
    console.log("LA LA LA");
}