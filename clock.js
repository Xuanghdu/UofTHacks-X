var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
let dim = Math.min(window.innerWidth, window.innerHeight);
ctx.canvas.width = dim;
ctx.canvas.height = dim;
var radius = dim / 2;
ctx.translate(radius, radius);
radius = radius * 0.9;

// animation = true;
animation = false;

draw(animation);

function draw(animation = false) {
  drawClockFaceWithNumber();
  if (animation) {
    let [hour, minute, second] = calcTime();
    // explainErrors(hour/2);
    explainErrors(0.06, Math.PI / 2 - 0.08, Math.PI, (Math.PI / 2) * 3);
  } else {
    window.requestAnimationFrame(clock);
  }
}

function calcTime() {
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  var millisecond = now.getMilliseconds();
  //hour
  hour = hour % 12;
  hour =
    (hour * Math.PI) / 6 +
    (minute * Math.PI) / (6 * 60) +
    (second * Math.PI) / (360 * 60) +
    (millisecond * Math.PI) / (360 * 60 * 1000);
  //minute
  minute =
    (minute * Math.PI) / 30 +
    (second * Math.PI) / (30 * 60) +
    (millisecond * Math.PI) / (30 * 60 * 1000);
  // second
  second = (second * Math.PI) / 30 + (millisecond * Math.PI) / (30 * 1000);
  return [hour, minute, second];
}

function drawClockFaceWithNumber() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);

  function drawFace(ctx, radius) {
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, "#333");
    grad.addColorStop(0.5, "white");
    grad.addColorStop(1, "#333");
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = "#333";
    ctx.fill();
  }

  function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num <= 12; num++) {
      ang = (num * Math.PI) / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.85);
      ctx.rotate(-ang);
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius * 0.85);
      ctx.rotate(-ang);
    }
  }
}

function clock() {
  ctx.clearRect(-dim / 2, -dim / 2, dim, dim);
  drawClockFaceWithNumber();

  let [hour, minute, second] = calcTime();

  drawTime(ctx, radius, hour, minute, second);

  window.requestAnimationFrame(clock);

  function drawTime(ctx, radius, hour, minute, second) {
    drawHand(ctx, hour, radius * 0.5, radius * 0.07);
    drawHand(ctx, minute, radius * 0.8, radius * 0.07);
    drawHand(ctx, second, radius * 0.9, radius * 0.02);

    if (clockPageIDs.slice(1).includes(currentPageName)) {
      // draw the dotted line to 12 o'clock
      drawHand(ctx, 0, radius, radius * 0.01, "square", true);
      // draw the line bisecting 12 o'clock and hour hand
      drawHand(ctx, hour / 2, radius * 2, radius * 0.02, "square");
    }
  }
}

function drawHand(ctx, pos, length, width, lineCap = "round", dotted = false) {
  if (dotted) {
    ctx.setLineDash([20, 15]);
  }
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = lineCap;
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
  if (dotted) {
    ctx.setLineDash([]);
  }
}

function explainErrors(
  compass_measured,
  compass_sun_direction,
  compass_local_time,
  compass_true
) {
  var now = new Date();
  var second = now.getSeconds() + now.getMilliseconds() / 1000;

  // drawClockFaceWithNumber();
  requestAnimationFrame(() => {
    explainError(second, compass_measured, compass_sun_direction);
  });
  // // drawClockFaceWithNumber();
  // requestAnimationFrame(() => {
  //   explainError(millisecond, compass_sun_direction, compass_local_time);
  // });
  // // drawClockFaceWithNumber();
  // requestAnimationFrame(() => {
  //   explainError(millisecond, compass_local_time, compass_true);
  // });
}

function explainError(old_second, compass1, compass2, speed = 1 / 6) {
  ctx.clearRect(-dim / 2, -dim / 2, dim, dim);
  drawClockFaceWithNumber();

  var now = new Date();
  var new_second = now.getSeconds() + now.getMilliseconds() / 1000;
  var second =
    new_second - old_second < 0
      ? 60 + new_second - old_second
      : new_second - old_second;

  drawHand(ctx, compass1, radius, radius * 0.07, "square", true);

  ctx.beginPath();
  ctx.arc(
    0,
    0,
    radius * 0.95,
    compass1 - Math.PI / 2,
    compass1 + second * Math.PI * speed - Math.PI / 2
  );
  ctx.lineTo(0, 0);
  ctx.fillStyle = "blue";
  ctx.fill();

  drawHand(
    ctx,
    compass1 + second * Math.PI * speed,
    radius,
    radius * 0.07,
    "square",
    true
  );

  if (compass1 + second * Math.PI * speed < compass2) {
    requestAnimationFrame(() => {
      explainError(old_second, compass1, compass2);
    });
  }
}
