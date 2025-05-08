const container = document.getElementById("star-container");
const messageBox = document.getElementById("message-box");
const resetButton = document.getElementById("reset-button");
const lid = document.querySelector('.lid');
const jar = document.querySelector('.jar');
const gifContainer = document.getElementById("gif-container");

const messages = [
  { text: "keep up, you can do it!!", gif: "gif1.gif" },
  { text: "HELLO <3", gif: "gif2.gif" },
  { text: "Aren't you tired yet?", gif: "gif3.gif" },
  { text: "I'm sleeping", gif: "gif4.gif"},
  { text: "you're amazing!", gif: "gif5.gif"},
  { text: "You may now sleep", gif: "gif6.gif"},
  { text: "Follow your dreams!", gif: "gif7.gif"},
  { text: "Magic happens!", gif: "gif8.gif"},
  { text: "Sparkle like this star!", gif: "gif9.gif"},
  { text: "Never stop dreaming!", gif: "gif10.gif"}
];

const starSize = 20;
const minGap = 30;
let placedStars = [];
let clickedCount = 0;

function isFarEnough(x, y) {
  for (const star of placedStars) {
    const dx = x - star.x;
    const dy = y - star.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < minGap) return false;
  }
  return true;
}

function generateStars() {
  container.innerHTML = "";
  gifContainer.innerHTML = "";
  placedStars = [];
  clickedCount = 0;
  resetButton.style.display = "none";
  messageBox.style.display = "none";

  for (let i = 0; i < messages.length; i++) {
    let x, y, attempts = 0;
    const maxX = container.offsetWidth - starSize;
    const maxY = container.offsetHeight - starSize;

    do {
      x = Math.random() * maxX;
      y = Math.random() * maxY;
      attempts++;
      if (attempts > 100) break;
    } while (!isFarEnough(x, y));

    placedStars.push({ x, y });

    const star = document.createElement("img");
    star.src = "star.png";
    star.classList.add("star");
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    star.style.animationDelay = `${Math.random() * 2}s`;

    container.appendChild(star); // ✅ Append first

    // ✅ Then attach the click handler
    star.addEventListener("click", () => {
      messageBox.innerText = messages[i].text;
      messageBox.style.display = "block";

      // Animate lid
      lid.classList.add('open');
      setTimeout(() => {
        lid.classList.remove('open');
      }, 3000);

      // Shake jar
      jar.classList.add('shake');
      setTimeout(() => {
        jar.classList.remove('shake');
      }, 500);

      // Hide message after 3 seconds
      setTimeout(() => {
        messageBox.style.display = "none";
      }, 3000);

      // Hide other stars briefly
      const allStars = document.querySelectorAll('.star');
      allStars.forEach(s => {
        if (s !== star) s.style.opacity = "0";
      });

      // Show gif inside jar
      gifContainer.innerHTML = `<img src="${messages[i].gif}" alt="Star GIF">`;

      // Restore stars and remove gif after 2 seconds
      setTimeout(() => {
        allStars.forEach(s => {
          if (s !== star) s.style.opacity = "1";
        });
        gifContainer.innerHTML = "";
      }, 4000);

      // Remove clicked star
      star.remove();
      clickedCount++;

     if (clickedCount === messages.length) {
  setTimeout(() => {
    resetButton.style.display = "block";
  }, 4000); // Delay of 2 seconds (2000 ms)
}
    });
  }
}

resetButton.addEventListener("click", generateStars);
generateStars();
