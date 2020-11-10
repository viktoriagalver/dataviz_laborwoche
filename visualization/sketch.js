let data = [];

function setup() {
  createCanvas(displayWidth, displayHeight);
    colorMode(HSB, 360, 100, 100);
    tempColor = 
}

function draw() {
  background(tempColor);
 
}



let ws = new WebSocket("ws://localhost:1880/ws/receive")

ws.onopen = function (event){
  console.log(event);
}

ws.onmessage = function (msg){
  data.push(JSON.parse(msg.data));
  if (data.length > 100){
    data.shift();
  }
  console.log(msg);
}