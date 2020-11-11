let data;
let popy = [];
let rects = [];

let isDrawn = true;

function setup() {
    createCanvas(1200, 1200);
    colorMode(HSB, 360, 100, 100);
};

function Bulle(x, y) {
    this.x = x;
    this.y = y;
    this.diameter = 50;
    this.speed = Math.random() + 1;
    this.color = 'rgba(40,170,255,0.5)';
    // this.colorRed = random(0, 255);
    // this.colorGreen = random(0, 255);
    // this.colorBlue = random(0, 255);
    this.display = function () {
        return ellipse(this.x, this.y, this.diameter, this.diameter)
    }
}

function Rect(x, y) {
    this.x = x;
    this.y = y;
    this.height = 200;
    this.width = 200;
    this.speed = Math.random() + 1;
    this.color = 'rgba(40,170,255,0.5)';
    // this.colorRed = random(0, 255);
    // this.colorGreen = random(0, 255);
    // this.colorBlue = random(0, 255);
    this.display = function () {
        return rect(this.x, this.y, this.height, this.width)
    }
}

function draw() {
    background(0);

    // generating rectss showing humidity
    for (let i = 0; i < popy.length; i++) {
        // fill(popy[i].colorRed, popy[i].colorGreen, popy[i].colorBlue);
        fill(popy[i].color);

        popy[i].display();


        if (i % 2 == 0) {
            popy[i].y += popy[i].speed;
            popy[i].x += popy[i].speed;
        } else {
            popy[i].y += popy[i].speed;
            popy[i].x -= popy[i].speed;
        }

        if (i < 10) {
            popy[i].y += popy[i].speed;
            popy[i].x += popy[i].speed;
            popy[i].color = 'rgba(224, 176, 148, 1)';
        } else if (10 >= i && i <= 20) {
            popy[i].y -= popy[i].speed;
            popy[i].x -= popy[i].speed;
            popy[i].color = 'rgba(71, 148, 230, 1)';
        } else if (21 >= i && i <= 30) {
            popy[i].y += popy[i].speed;
            popy[i].x += popy[i].speed;
            popy[i].color = 'rgba(148, 121, 105, 1)';
        } else if (31 >= i && i <= 40) {
            popy[i].y -= popy[i].speed;
            popy[i].x += popy[i].speed;
            popy[i].color = 'rgba(106, 138, 173, 1)';
        } else if (41 >= i && i <= 50) {
            popy[i].y += popy[i].speed;
            popy[i].x -= popy[i].speed;
            popy[i].color = 'rgba(30, 62, 97, 1)';
        } else if (51 >= i && i <= 70) {
            popy[i].y += popy[i].speed;
            popy[i].x -= popy[i].speed;
            popy[i].color = 'rgba(137, 179, 224, 1)';
        } else {
            popy[i].y -= popy[i].speed;
            popy[i].x += popy[i].speed;
            popy[i].color = 'rgba(59, 77, 97, 1)';
        }
    }

    // generating rectangles for temperaturevisualization
    for (let i = 0; i < rects.length; i++) {
        // fill(popy[i].colorRed, popy[i].colorGreen, popy[i].colorBlue);
        fill(rects[i].color);

        rects[i].display();

        if(isDrawn == false) {
            let rectColors = ['RGBA(214,144,139,0.3)', 'RGBA(214,84,75,0.3)', 'rgba(138,54,48,0.3)', 'RGBA(87,34,30,0.3)', 'rgba(157,106,102,0.3)', 'RGBA(214,144,139,0.3)', 'RGBA(214,84,75,0.3)', 'rgba(138,54,48,0.3)', 'RGBA(87,34,30,0.3)', 'rgba(157,106,102,0.3)'];
            rects[i].color = rectColors[Math.floor(Math.random() * 10)];
        }
    }
    isDrawn = true;


}

let ws = new WebSocket("ws://localhost:1880/ws/receive")

ws.onopen = function (event) {
    console.log(event);
};


ws.onmessage = function (msg) {
    data = JSON.parse(msg.data);
    popy = [];
    rects = [];
    // if (data.length > 10) {
    //     data.shift();
    // }
    console.log(data);
    let humidityPopy = data.humidity;
    let temperaturerects = data.temperature;

    for (let index = 0; index < humidityPopy; index++) {
        popy.push(new Bulle(Math.random() * 800 + index, Math.random() * 800 + index));
    };

    let newRowCounter = 0;
    let multiplier = 0;
    

    for (let index = 0; index < temperaturerects; index++) {
        let rectSpaceX = 200 * multiplier;
        let rectSpaceY = 200 * newRowCounter;
        multiplier++;
        
            if (index % 6 == 0 && index != 0) {
                newRowCounter++;
                multiplier = 0;
            }
            // console.log("rectSpaceX" + rectSpaceX);
        

        rects.push(new Rect(rectSpaceX, rectSpaceY));
    };
    isDrawn = false;
    draw();

    // let humidityPopy = msg.humidity;
};