AOS.init();
const mobileMenu = document.getElementById('mobile-menu');
const navbarMenu = document.querySelector('.navbar-menu');

mobileMenu.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
});


document.addEventListener('DOMContentLoaded', () => {
  const stars = document.querySelectorAll('.star');
  const ratingMessage = document.getElementById('rating-message');
  const ratingCountMessage = document.getElementById('rating-count-message');
  const clearRatingButton = document.getElementById('clear-rating');
  let ratings = JSON.parse(localStorage.getItem('ratings')) || [];

  function highlightStars(rating) {
      stars.forEach(star => {
          if (star.getAttribute('data-value') <= rating) {
              star.classList.add('selected');
          } else {
              star.classList.remove('selected');
          }
      });
  }

  function calculateAverageRating() {
      if (ratings.length === 0) return 0;
      const total = ratings.reduce((sum, rating) => sum + parseInt(rating, 10), 0);
      return total / ratings.length;
  }

  function setHoverMessages(rating, position) {
      if (position === 'left') {
          ratingMessage.classList.add('left');
          ratingCountMessage.classList.remove('left');
          ratingCountMessage.classList.add('right');
      } else {
          ratingMessage.classList.add('right');
          ratingCountMessage.classList.remove('right');
          ratingCountMessage.classList.add('left');
      }

      ratingMessage.textContent = `Hovering over ${rating} star(s)!`;
      ratingMessage.classList.add('active');
      const averageRating = calculateAverageRating();
      ratingCountMessage.textContent = `Average rating: ${averageRating.toFixed(1)} from ${ratings.length} user(s)!`;
      ratingCountMessage.classList.add('active');
  }

  function setFinalMessages(rating) {
      ratingMessage.classList.remove('left', 'right');
      ratingCountMessage.classList.remove('left', 'right');
      ratingMessage.classList.add('left'); // Set message to the left
      ratingCountMessage.classList.add('right'); // Set count to the right
      ratingMessage.textContent = `You rated us ${rating} stars, thanks!`;
      ratingMessage.classList.add('active');
      const averageRating = calculateAverageRating();
      ratingCountMessage.textContent = `Average rating: ${averageRating.toFixed(1)} from ${ratings.length} users!`;
      ratingCountMessage.classList.add('active');
  }

  function hideMessages() {
      ratingMessage.classList.remove('active', 'left', 'right');
      ratingCountMessage.classList.remove('active', 'left', 'right');
  }

  stars.forEach(star => {
      star.addEventListener('click', () => {
          const rating = star.getAttribute('data-value');
          ratings.push(rating);
          localStorage.setItem('ratings', JSON.stringify(ratings));
          setFinalMessages(rating);
          highlightStars(rating);
      });

      star.addEventListener('mouseover', () => {
          const rating = star.getAttribute('data-value');
          setHoverMessages(rating, star.getAttribute('data-position'));
          highlightStars(rating);
      });

      star.addEventListener('mouseout', () => {
          const averageRating = calculateAverageRating();
          hideMessages();
          highlightStars(Math.round(averageRating));
      });
  });

  clearRatingButton.addEventListener('click', () => {
      localStorage.removeItem('ratings');
      ratings = [];
      highlightStars(0);
      hideMessages();
  });
});

// Email.js
const formmail=document.getElementById('contact_form')
const contactmesg=document.getElementById('contact_message')    

const sendEmail = (e) => {
    e.preventDefault()

    // serviceId ,templateId,#form,publickey
    emailjs.sendForm('service_qq9lo8r','template_odk6y9p','#contact_form','BVrbKL6tfEuAhjrq4').then(() =>{
        // show message
        contactmesg.textContent= "Message sent successfully"
        // remove msg after 5 sec
        setTimeout(() =>{
            contactmesg.textContent=''
        },5000)
        // clear input fields
        formmail.reset()
    })
}
formmail.addEventListener('submit',sendEmail)
// up button
const upButton = document.getElementById('up');

window.addEventListener('scroll',() =>{
    if(scrollY >400){
        upButton.style.bottom='20px'
    }
    else{
        upButton.style.bottom='-50%'
    }
})
upButton.addEventListener('click',() =>{
    scrollTo({
        top:0,
        behavior:"smooth"
    })
})