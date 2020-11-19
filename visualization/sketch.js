let ws = new WebSocket("ws://localhost:1880/ws/receive")

let hum = '';

let temp = '';

let gas = '';

ws.onopen = function (event){
  console.log(event);
}

ws.onmessage = (msg) => {
  const data = JSON.parse(msg.data);
  hum = data.humidity*5;
  temp = data.temperature;
  gas = data.gas*3;
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
  
  const tempMin = 25;
  const tempMax = 30;
  let tempColor = temp < tempMin ? 0 : temp > tempMax ? color(255, 0, 0) : color(`hsb(311, 100%, ${map(temp, tempMin, tempMax, 0, 100)}%)`);

  background(tempColor);

  if (hum < gas) {
    stroke(51, 24, 46);
    strokeWeight(6);
    fill(99, 73, 94);
    ellipse(x, y, gas, gas);
    stroke(99, 31, 120);
    strokeWeight(6);
    fill(178, 92, 204);
    ellipse(x, y, hum, hum);
  } else {
    stroke(99, 31, 120);
    strokeWeight(6);
    fill(178, 92, 204);
    ellipse(x, y, hum, hum);
    stroke(51, 24, 46);
    strokeWeight(6);
    fill(99, 73, 94);
    ellipse(x, y, gas, gas);
  }
}