$("#send").on("click", function () {
    $.ajax({
        type: "GET",
        url: `http://localhost:4444/register?nickname=${$("#nickname").val()}`,
        success: function (response) {
            if(response === true) {
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
        success: function(response) {
            console.log(response);
        },
        error: function(error) {
            console.log(error);
        }
    });
});

$("#ranking").on("click", function () {
    $.ajax({
        type: "GET",
        url: `http://localhost:4444/ranking`,
        success: function(response) {
            console.log(response);
        },
        error: function(error) {
            console.log(error);
        }
    })
});