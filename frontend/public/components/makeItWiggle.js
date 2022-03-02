let rotation = 0;
let xVelocity = 0;
var sigmoid = function (x) {
  return x / (1 + Math.abs(x));
};

var MousePosition = { x: 0, y: 0 };
var CardPosition = { x: 0, y: 0 };

$(document).mousemove(function (event) {
  MousePosition.x = event.pageX;
  MousePosition.y = event.pageY;
});

function makeWiggle($card) {
  xVelocity = MousePosition.x - CardPosition.x;

  CardPosition.x = MousePosition.x;
  CardPosition.y = MousePosition.y;

  rotation = rotation * 0.9 + sigmoid(xVelocity) * 1.5;
  $card.style.top = CardPosition.y + "px";
  $card.style.left = MousePosition.x - 25 + "px";
  if (Math.abs(rotation) < 0.01) rotation = 0;
  $card.style.transform = `rotate(${rotation}deg)`;
}
function dropWiggle($card){
  console.log("parei");
  $card.style.transform = `rotate(0deg)`;
}

export { makeWiggle, dropWiggle };
