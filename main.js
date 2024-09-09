const canvas = document.getElementById('shapesCanvas');
const ctx = canvas.getContext('2d');

// Set canvas to take full width and a fixed height (adjust height as needed)
canvas.style.width = '100%';
canvas.style.height = '300px';  // Adjust the height value as desired

// Ensure canvas drawing context is properly scaled based on actual width and height
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const shapes = [];
const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#F1C40F'];

class Shape {
    constructor(x, y, size, type, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.type = type;
        this.color = color;
        this.dx = Math.random() * 4 + 1;
        this.dy = Math.random() * 4 + 1;
        this.angle = Math.random() * Math.PI * 2;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();

        if (this.type === 'circle') {
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        } else if (this.type === 'square') {
            ctx.rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        } else if (this.type === 'triangle') {
            ctx.moveTo(this.x, this.y - this.size);
            ctx.lineTo(this.x - this.size, this.y + this.size);
            ctx.lineTo(this.x + this.size, this.y + this.size);
            ctx.closePath();
        }
        
        ctx.fill();
    }

    update() {
        // Reverse direction if the shape hits the boundary
        if (this.x + this.size > canvas.width || this.x - this.size < 0) this.dx *= -1;
        if (this.y + this.size > canvas.height || this.y - this.size < 0) this.dy *= -1;

        this.x += this.dx;
        this.y += this.dy;

        // Apply rotation for square and triangle
        if (this.type === 'square' || this.type === 'triangle') {
            ctx.save();
            ctx.translate(this.x, this.y);
            this.angle += 0.05;
            ctx.rotate(this.angle);
            ctx.translate(-this.x, -this.y);

            this.draw();
            ctx.restore();
        } else {
            this.draw();
        }
    }
}

function createShapes(numShapes) {
    for (let i = 0; i < numShapes; i++) {
        const size = Math.random() * 50 + 20;
        const x = Math.random() * (canvas.width - size * 2) + size;
        const y = Math.random() * (canvas.height - size * 2) + size;
        const type = ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        shapes.push(new Shape(x, y, size, type, color));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    shapes.forEach(shape => {
        shape.update();
    });

    requestAnimationFrame(animate);
}

createShapes(15);
animate();

// Handle window resizing
window.addEventListener('resize', () => {
    // Recalculate canvas width and height
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    shapes.length = 0;  // Clear the shapes array
    createShapes(15);    // Recreate shapes for the new canvas size
});
