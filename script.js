
const balloonContainer = document.getElementById('balloon-container');
const card = document.getElementById('card');
const popSound = document.getElementById('pop-sound');

const balloonImages = ['images/1.png', 'images/2.png'];
let balloons = [];
let poppedCount = 0;
const totalNormalBalloons = 10;

const bgMusic = document.getElementById('bg-music');
let musicStarted = false;


// Tạo 10 bong bóng thường
for (let i = 0; i < totalNormalBalloons; i++) {
    let img = document.createElement('img');
    img.src = balloonImages[Math.floor(Math.random() * balloonImages.length)];
    img.classList.add('balloon');
    img.style.left = Math.random() * 90 + '%';
    img.style.bottom = '-150px';
    balloonContainer.appendChild(img);
    balloons.push(img);
    animateBalloon(img, false);
}

// Tạo sẵn bong bóng đặc biệt nhưng ẩn
let special = document.createElement('img');
special.src = 'images/special.png';
special.classList.add('balloon', 'special-balloon');
special.style.left = Math.random() * 85 + '%';
special.style.bottom = '-150px';
special.style.display = 'none';  // Ẩn trước
balloonContainer.appendChild(special);
animateBalloon(special, true);

// Gắn sự kiện cho bong thường
balloons.forEach(balloon => {
    balloon.addEventListener('click', () => {
        popBalloon(balloon);
        poppedCount++;
        if (poppedCount === totalNormalBalloons) {
            // Khi pop hết bong thường -> hiện special
            special.style.display = 'block';
        }
    });
});

// Sự kiện cho bong đặc biệt
special.addEventListener('click', () => {
    popBalloon(special);
    setTimeout(showCard, 400);
});

function popBalloon(balloon) {
    balloon.classList.add('pop');
    popSound.currentTime = 4;
    popSound.play();

    if (!musicStarted) {
		bgMusic.currentTime = 3;
        bgMusic.play();
        musicStarted = true;
    }
	
    setTimeout(() => balloon.remove(), 300);
}

function animateBalloon(balloon, isSpecial) {
    let bottom = -150;
    const speed = Math.random() * 0.8 + 0.6;
    const leftStart = parseFloat(balloon.style.left);

    function rise() {
        bottom += speed;
        balloon.style.bottom = bottom + 'px';
        balloon.style.left = (leftStart + Math.sin(bottom / 50) * 2) + '%';

        const maxHeight = window.innerHeight * 0.8;
        if (bottom < maxHeight) {
            requestAnimationFrame(rise);
        } else {
            // Đụng nóc thì dừng
            balloon.style.bottom = maxHeight + 'px';
        }
    }
    rise();
}

function showCard() {
    card.classList.remove('hidden');
}
