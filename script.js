const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
ctx.canvas.height = window.innerHeight;
ctx.canvas.window = window.innerWidth;
let particleArray;

function Particle(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
}

Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
}

Particle.prototype.update = function() {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
        this.directionX = -this.directionX;
    }

    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
        this.directionY = -this.directionY;
    }

    this.x += this.directionX;
    this.y += this.directionY;

    this.draw();
}

function init () {
    particleArray = [];
    for (let i=0; i<750; i++) {
        let size = Math.random() * 20;
        let x = Math.random() * (innerWidth - size * 2);
        let y = Math.random() * (innerHeight - size * 2);
        let directionX = (Math.random() * .4) - .2;
        let directionY = (Math.random() * .4) - .2;
        let colorArray = ['white', 'red', 'blue', 'green', 'pink', 'purple', 'yellow', 'black']
        let color = colorArray[Math.floor(Math.random() * colorArray.length)];

        particleArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function animate () {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerHeight, innerWidth);

    for (let i=0;i<particleArray.length; i++) {
        particleArray[i].update();
    }
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
})
