var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

class Component {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    this.x_vel = 0;
    this.y_vel = 0;
    this.gravity_vel = 1.0;
    this.bounce = -0.6;
    this.drag = 0.9995;
  }

  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  getPhysics() {
    this.movePosition();
    this.getBounce();
  }

  movePosition() {
    this.x += this.x_vel;
    this.y += this.y_vel;
    this.y_vel += this.gravity_vel;

    this.x *= this.drag;
    this.y *= this.drag;
  }

  getBounce() {
    if (this.x < 0) {
      this.x = 0;
      this.x_vel *= this.bounce;
    } else if (this.x + this.width > canvas.width) {
      this.x = canvas.width - this.width;
      this.x_vel *= this.bounce;
    }

    if (this.y < 0) {
      this.y = 0;
      this.y_vel *= this.bounce;
    } else if (this.y + this.height > canvas.height) {
      this.y = canvas.height - this.height;
      this.y_vel *= this.bounce;
    }
  }
}

var component = new Component(100, 100, 100, 100, "#FF0000");

setInterval(() => {
  context.fillStyle = "#000000";
  context.fillRect(0, 0, canvas.width, canvas.height);

  component.draw(context);
  component.getPhysics();
}, 20);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    component.x_vel += 5;
  } else if (event.key === "ArrowLeft") {
    component.x_vel -= 5;
  } else if (event.key === "ArrowUp") {
    component.y_vel -= 5;
  } else if (event.key === "ArrowDown") {
    component.y_vel += 5;
  }
});
