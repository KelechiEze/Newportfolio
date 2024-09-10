// rain.js
const nbDrop = 858; // Number of raindrops

function randRange(minNum, maxNum) {
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

function createRain() {
    for (let i = 0; i < nbDrop; i++) {
        let dropLeft = randRange(0, window.innerWidth);  // Random horizontal start point
        let dropTop = randRange(-1000, 0);  // Drops start slightly above the screen

        // Create the drop element
        document.querySelector('.rain').insertAdjacentHTML('beforeend', `<div class="drop" id="drop${i}"></div>`);

        let drop = document.getElementById(`drop${i}`);

        // Set position and size for each drop
        drop.style.left = `${dropLeft}px`;
        drop.style.top = `${dropTop}px`;

        // Randomize drop height (rain intensity)
        let dropHeight = randRange(50, 120); // Randomize drop height
        drop.style.height = `${dropHeight}px`;

        // Randomize animation speed for each drop
        let speed = randRange(3, 6); // Smooth, variable speeds between 3 to 6 seconds
        drop.style.animationDuration = `${speed}s`;

        // Randomize opacity for a varied effect
        let opacity = randRange(6, 10) / 10; // Opacity between 0.6 to 1
        drop.style.opacity = `${opacity}`;

        // Randomize start time for staggered drops
        let delay = randRange(0, 5); // Random delay up to 5 seconds
        drop.style.animationDelay = `${delay}s`;

        // Subtle wind effect (horizontal movement variation)
        let wind = randRange(-20, 20); // Small left-right movement to simulate wind
        drop.style.transform = `translateX(${wind}px)`;

        // Cubic-bezier for smooth fall effect
        drop.style.animationTimingFunction = 'cubic-bezier(0.4, 0.0, 0.2, 1)';
    }
}

window.onload = createRain;
