$(document).ready(function () {
    // Get the modal
    var modal = $("#myModal");
    // console.log(modal[0]);
    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function () {
        modal.css("display", "block");
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.css("display", "none");
    }

    // When the user clicks anywhere outside of the modal, close it
    $(window).on("click", (function (event) {
        // console.log(event.target);
        if (event.target == modal[0]) {
            modal.css("display", "none");
        }
    }));

    function compare(current) {
        $("#match").empty();
        $.get("/api/friends").then(function (data) {
            var friend = data[0];
            var lowest = 0;
            for (var i = 0; i < data[0].scores.length; i++) {
                lowest += Math.abs(current.scores[i] - data[0].scores[i])
            }
            for (var j = 0; j < data.length; j++) {
                var scores = data[j].scores;
                var score = 0;
                for (var i = 0; i < scores.length; i++) {
                    score += Math.abs(current.scores[i] - scores[i]);
                }
                if (score < lowest) {
                    lowest = score;
                    friend = data[j];
                }
            }
            console.log(lowest);
            console.log(friend);
            $("#myBtn").css("display", "block");
            $("#match").append(`<p>${friend.name}</p></p><img src ='${friend.photo}'></p>`);
            modal.css("display", "block");
            return friend;
        });
    }

    $(document).on("submit", "#addFriend", function (e) {
        e.preventDefault();
        $("#survey").css("display", "none");
        var current = {
            name: $("#name").val().trim(),
            photo: $("#photoLink").val().trim(),
            scores: [$("#q1answer").val(), $("#q2answer").val(), $("#q3answer").val(), $("#q4answer").val(), $("#q5answer").val(), $("#q6answer").val(), $("#q7answer").val(), $("#q8answer").val(), $("#q9answer").val(), $("#q10answer").val()]
        };
        console.log(current);
        compare(current);
        $.post("/api/friends", current).then(function (data) {
            console.log(data);
        });
    });


});