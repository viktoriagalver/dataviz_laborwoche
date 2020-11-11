let ws = new WebSocket("ws://localhost:1880/ws/receive")

let hum = '';

ws.onopen = function (event){
  console.log(event);
}

ws.onmessage = (msg) => {
  const data = JSON.parse(msg.data);
  hum = data.humidity*5;
  //if (data.length > 100){
    //data.shift();
    console.log(data);
  }

function setup() {
  createCanvas(displayWidth, displayHeight);
    x = 700;
    y = 500;
}


function draw() {
  background(0);
  stroke(0, 153, 255)
  fill(88, 187, 237)
  strokeWeight(6)
  ellipse(x, y, hum, hum)
}