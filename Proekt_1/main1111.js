//SEARCH BOX
let search = document.querySelector('.search-box');
document.querySelector('#search-icon').onclick = () => {
  search.classList.toggle('active');
}
//HEADER-STICKY
const header = document.querySelector("header");
window.addEventListener ("scroll", function() {
	header.classList.toggle ("sticky", window.scrollY > 100); //posle 100pixeli po Y oska, da se smeni vo sticky
});

//LOGIN OVERLAY
document.getElementById("loginButton").addEventListener("click", function () {
  document.getElementById("loginKutija").style.display = "block";
  document.getElementById("overlay").style.display = "block";
});

document.getElementById("cancelLogin").addEventListener("click", function () {
  document.getElementById("loginKutija").style.display = "none";
  document.getElementById("overlay").style.display = "none";
});

document.getElementById("submitLogin").addEventListener("click", function () {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username && password) { //ako se ispolneti da se smeni "LOGIN" so "USERNAME" so ste me stavile i se iskluchuva
    document.getElementById("loginButton").textContent = username;
    document.getElementById("loginKutija").style.display = "none";
    document.getElementById("overlay").style.display = "none";
  } else {
    alert("Please fill in both fields!");
  }
});
// button action za scheduling
function handleSubmit(event) { 
  event.preventDefault();
  alert('Successful Scheduling!');
  document.getElementById('testDriveForm').reset(); //resetiraj form posle submit
}
// button action za review
function handleSubmit2(event) { 
  event.preventDefault();
  alert('Thank you for leaving a review! Very much appreciated!');
  document.getElementById('reviewFORM').reset(); //resetiraj form posle submit
}

// LIKES I KOMENTARI ZA SEKOJA SLIKA
const imageData = new Map();

const kutija = document.getElementById('imageKutija');
const kutijaImg = document.getElementById('kutijaImage');
const closeBtn = document.getElementsByClassName('close')[0];
const likeButton = document.getElementById('likeButton');
const likeCount = document.getElementById('likeCount');
const commentInput = document.getElementById('commentInput');
const commentsSection = document.getElementById('commentsSection');

// Za sekoj element vo "modern-cars" section ->uniqueID ->inicijaliziraj data -> clickListener
document.querySelectorAll('.modern-content .row').forEach((item, index) => {
  const imageId = `modern-${index}`;
  initializeImageData(imageId);
  addClickListener(item, imageId);
});

// Za sekoj element vo "vintage-cars" section ->uniqueID ->inicijaliziraj data -> clickListener
document.querySelectorAll('.cars-grid .car-box').forEach((item, index) => {
  const imageId = `vintage-${index}`;
  initializeImageData(imageId);
  addClickListener(item, imageId);
});

function initializeImageData(imageId) { //proveruva dali sekoja slika ima vlez vo "imagedata MAP" so defaultni vrednosti
  if (!imageData.has(imageId)) {
    imageData.set(imageId, {
      likes: 0,
      isLiked: false,
      comments: [],
      timestamp: new Date()
    });
  }
}
//pri klik na slikata -> ovtori pop-up "openKutija" 
function addClickListener(item, imageId) {
  item.addEventListener('click', () => {
    const imgSrc = item.querySelector('img').src;
    const title = item.querySelector('h5, .car-title').textContent; //go zimame imeto na voziloto za "title"
    openKutija(imgSrc, imageId, title);
  });
}

function openKutija(imgSrc, imageId, title) {
  kutija.style.display = 'block';
  kutijaImg.src = imgSrc;
  kutijaImg.dataset.imageId = imageId;
  
  const username = document.querySelector('.username');
  if (username) {
    username.textContent = title; //go zimame imeto na voziloto za "title"
  }
  
  updateLikesAndComments(imageId);
}

function updateLikesAndComments(imageId) {
  const data = imageData.get(imageId);
  
  // Update like button and count
  
  //likeCount.textContent = `${data.likes} ${data.likes === 1 ? 'like' : 'likes'}`; #Za porealni situacii korisen kod
  likeButton.querySelector('i').classList.toggle('bxs-heart', data.isLiked);
  likeButton.querySelector('i').classList.toggle('bx-heart', !data.isLiked);
  
  // Update comments
  commentsSection.innerHTML = '';
  data.comments.forEach(comment => {
    const commentElement = document.createElement('div');
    commentElement.className = 'comment';
    commentElement.innerHTML = `
      <div class="user-avatar"></div>
      <div class="comment-content">
        <span class="comment-username">User</span>
        <span>${comment}</span>
        <div class="comment-timestamp">Just now</div>
      </div>
    `;
    commentsSection.appendChild(commentElement);
  });
}

//LikeButton CLICK
likeButton.addEventListener('click', () => {
  const imageId = kutijaImg.dataset.imageId;
  const data = imageData.get(imageId);
  
  if (data.isLiked) { //dokolku e vishe liked -> sakame na click da se trgne like-ot
    // Incrementiraj like count
    data.likes -= 1;
    data.isLiked=false;
    likeCount.textContent = 'No likes yet';
  } else {
    data.likes += 1;
    likeCount.textContent = data.likes +' '+'like';
    data.isLiked=true;
  }
  updateLikesAndComments(imageId);
});

// Comment Submission
commentInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey && commentInput.value.trim()) {
    e.preventDefault();
    const imageId = kutijaImg.dataset.imageId;
    const data = imageData.get(imageId);
    
    data.comments.push(commentInput.value.trim());
    commentInput.value = '';
    
    updateLikesAndComments(imageId);
  }
});

// Zatvori pop-up koga ke klikneme na X ili nadvor od kutijata
closeBtn.onclick = () => kutija.style.display = 'none';
window.onclick = (e) => {
  if (e.target === kutija) {
    kutija.style.display = 'none';
  }
};

Math.random()