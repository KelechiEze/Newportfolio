let nbDrop = 400; // Reduced number of raindrops for better performance

function randRange(minNum, maxNum) {
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

function createRain() {
    let fragment = document.createDocumentFragment(); // Batch DOM updates using a document fragment

    for (let i = 0; i < nbDrop; i++) {
        let dropLeft = randRange(0, window.innerWidth);
        let dropTop = randRange(-1000, 0);

        let drop = document.createElement('div');
        drop.classList.add('drop');
        drop.style.left = `${dropLeft}px`;
        drop.style.top = `${dropTop}px`;

        let dropHeight = randRange(50, 120);
        drop.style.height = `${dropHeight}px`;

        let speed = randRange(3, 6); 
        drop.style.animationDuration = `${speed}s`;

        let opacity = randRange(6, 10) / 10;
        drop.style.opacity = `${opacity}`;

        let delay = randRange(0, 5);
        drop.style.animationDelay = `${delay}s`;

        let wind = randRange(-20, 20);
        drop.style.transform = `translateX(${wind}px)`;

        fragment.appendChild(drop);
    }

    document.querySelector('.rain').appendChild(fragment); // Append the batch of drops at once
}

function updateRainPositions() {
    let drops = document.querySelectorAll('.drop');

    drops.forEach(drop => {
        let speed = randRange(3, 6); 
        let delay = randRange(0, 5); 
        let wind = randRange(-20, 20);

        drop.style.animationDuration = `${speed}s`;
        drop.style.animationDelay = `${delay}s`;
        drop.style.transform = `translateX(${wind}px)`;
    });

    requestAnimationFrame(updateRainPositions); // Re-run for smooth animation control
}

window.onload = function () {
    createRain();
    requestAnimationFrame(updateRainPositions);
};
