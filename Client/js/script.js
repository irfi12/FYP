let menu = document.querySelector('.header .menu');

document.querySelector('#menu-btn').onclick = () =>{
   menu.classList.toggle('active');
}

window.onscroll = () =>{
   menu.classList.remove('active');
}

document.querySelectorAll('input[type="number"]').forEach(inputNumber => {
   inputNumber.oninput = () =>{
      if(inputNumber.value.length > inputNumber.maxLength) inputNumber.value = inputNumber.value.slice(0, inputNumber.maxLength);
   };
});

document.querySelectorAll('.view-property .details .thumb .small-images img').forEach(images =>{
   images.onclick = () =>{
      src = images.getAttribute('src');
      document.querySelector('.view-property .details .thumb .big-image img').src = src;
   }
});

document.querySelectorAll('.faq .box-container .box h3').forEach(headings =>{
   headings.onclick = () =>{
      headings.parentElement.classList.toggle('active');
   }
});
// JavaScript for rotating background images
document.addEventListener('DOMContentLoaded', function() {
   const images = [
      'hall-img-2.webp',
      'hall-img-3.webp',
      'hall-img-4.webp',
      'hall-img-5.webp',
   ];
   let currentIndex = 0;
   const backgroundContainer = document.querySelector('.background-container');

   function changeBackgroundImage() {
      currentIndex = (currentIndex + 1) % images.length;
      backgroundContainer.style.backgroundImage = `url(${images[currentIndex]})`;
   }

   // Initial background image setup
   backgroundContainer.style.backgroundImage = `url(${images[currentIndex]})`;

   // Change image every 5 seconds (5000 milliseconds)
   setInterval(changeBackgroundImage, 5000);
});
