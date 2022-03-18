$("#send").on("click", function () {
    $.ajax({
        type: "GET",
        url: `http://localhost:4444/register?nickname=${$("#nickname").val()}`,
        success: function (response) {
            if (response === true) {
                console.log(response);
            } else {
                alert(response);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
});

$("#score").on("click", function () {
    $.ajax({
        type: "POST",
        url: `http://localhost:4444/score?${$("#player-name").val()}=${$("#player-score").val()}`,
        success: function (response) {
            console.log(response);
        },
        error: function (error) {
            console.log(error);
        }
    });
});

$("#ranking").on("click", function () {
    $.ajax({
        type: "GET",
        url: `http://localhost:4444/ranking`,
        success: function (response) {
            showRanking(response);
        },
        error: function (error) {
            console.log(error);
        }
    })
});

function showRanking(players) {
    $("#show-ranking").html("");
    $("#show-ranking").append(`<table>
        <tr>
            <th>Posição</th>
            <th>Usuário</th>
            <th>Pontuação</th>
        </tr>
    </table>`);
    for (let i = 0; i < 10; i++) {
        $("table").append(`<tr>
            <td>${i+1}</td>
            <td>${players[i].name}</td>
            <td>${players[i].score.final}</td>
        </tr>`);
    }
}

//appends an "active" class to .popup and .popup-content when the "Open" button is clicked
$(".open").on("click", function () {
    $(".popup-overlay, .popup-content").addClass("active");
});

//removes the "active" class to .popup and .popup-content when the "Close" button is clicked 
$(".next").on("click", function () {
    alert("next");
    $(".popup-overlay, .popup-content").removeClass("active");
});

$(".end, .popup-overlay").on("click", function () {
    alert("end");
    $(".popup-overlay, .popup-content").removeClass("active");
});

$(document).ready(function () {
    $("#abacate").load("./images/order/pedido.svg");
    setTimeout(() => {
        $("#clothespin").css("display", "inherit")
        $("#cook").attr("href", "./images/chashu.png");
        $("#broth").attr("href", "./images/chashu.png");
    }, 400)
})