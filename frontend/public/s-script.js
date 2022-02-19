// const apiUrl = "http://localhost:4444";

// $("#send").on("click", function () {
//     const name = document.getElementById("nickname").value;

//     fetch(`${apiUrl}/register?nickname=${name}`)
//         .then(res => res.text())
//         .then(data => {
//             console.log(JSON.stringify(data));
//         })
// });

// $("#score").on("click", function () {
//     const name = document.getElementById("player-name").value;
//     const score = document.getElementById("player-score").value;

//     fetch(`${apiUrl}score?${name}=${score}`)
//         .then(res => res.text())
//         .then(data => {
//             console.log(data);
//         })
// });

// $("#ranking").on("click", function () {
//     fetch(`${apiUrl}/ranking`)
//         .then(res => res.text())
//         .then(data => {
//             console.log(data);
//         })
// });

$("#send").on("click", function () {
    $.ajax({
        type: "POST",
        url: `http://localhost:4444/register?nickname=${$("#nickname").val()}`,
        success: function (response) {
            console.log(response);
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