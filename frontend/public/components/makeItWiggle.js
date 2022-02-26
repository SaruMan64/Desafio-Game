function makeWiggle() {
  var card = $(".order");

  // Sigmoid function
  var sigmoid = function (x) {
    return x / (1 + Math.abs(x));
  };

  // Stores X and Y coordinates of Mouse
  var MousePosition = {
    x: 0,
    y: 0,
  };

  // Stores X and Y Coordinates of the Card
  var CardPosition = {
    x: 0,
    y: 0,
  };

  var xVelocity = 0;
  var rotation = 0;

  var update = function () {
    xVelocity = MousePosition.x - CardPosition.x;
    /* 
  CardPosition.x = MousePosition.x;
  CardPosition.y = MousePosition.y; */

    rotation = rotation * 0.9 + sigmoid(xVelocity) * 1.5;

    // Update the position of card
    card.style.top = CardPosition.y + "px";
    // Subtract (Width of card / 2 = 125) to centre cursor on top
    card.style.left = CardPosition.x - 125 + "px";

    if (Math.abs(rotation) < 0.01) rotation = 0;

    card.style.transform = `rotate(${rotation}deg)`;

    requestAnimationFrame(update);
  };

  update();

  document.addEventListener("mousemove", function (e) {
    MousePosition.x = e.clientX;
    MousePosition.y = e.clientY;
  });
}

export {makeWiggle};