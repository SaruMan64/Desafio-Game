const btn = document.querySelector("#btn");
btn.onclick = () => {
  const portas = document.querySelector("#portas");
  setTimeout(() => {
	portas.remove();
  }, 2000);
  toggleDoor();
  portas.style.transform = "scale(4)";
  portas.style.opacity = "0";
  portas.style.transition = "transform 1.7s, opacity 2s";
}

function toggleDoor() {
  const doors = document.querySelectorAll(".door");
  doors.forEach((el, id) => {
    switch (id) {
      case 0:
        el.classList.toggle("doorOpenL");
        return true;
      case 1:
        el.classList.toggle("doorOpenR");
        return true;
    }
  });
}
