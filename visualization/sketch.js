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
  let tempColor = temp < tempMin ? 0 : temp > tempMax ? color(255, 0, 0) : color(`hsb(0, 100%, ${map(temp, tempMin, tempMax, 0, 100)}%)`);

  background(tempColor);

  if (hum < gas) {
    stroke(34, 128, 27);
    strokeWeight(6);
    fill(70, 179, 62);
    ellipse(x, y, gas, gas);
    stroke(0, 153, 255);
    strokeWeight(6);
    fill(88, 187, 237);
    ellipse(x, y, hum, hum);
  } else {
    stroke(0, 153, 255);
    strokeWeight(6);
    fill(88, 187, 237);
    ellipse(x, y, hum, hum);
    stroke(34, 128, 27);
    strokeWeight(6);
    fill(70, 179, 62);
    ellipse(x, y, gas, gas);
  }
}