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
  let tempColor = map(temp*25, 0, width, 0, 255);
  background(tempColor, 0, 0);

blendMode(HARD_LIGHT)

stroke(34, 128, 27)
strokeWeight(6)
fill(70, 179, 62)
ellipse(x, y, gas, gas)

stroke(0, 153, 255)
fill(88, 187, 237)
strokeWeight(6)
ellipse(x, y, hum, hum)



  

  
}