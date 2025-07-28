let hamburger = document.getElementById('hamburger');
let navList = document.getElementById('nav-list');

hamburger.addEventListener('click', () => {
    navList.classList.toggle('active');
})

/*for the particle animation*/
tsParticles.load("tsparticles", {
  backgroundMode: false,
  fpsLimit: 60,
  particles: {
    color: { value: "#997a68ff" }, //particle color
    links: {
      color: "#566f98ff", // Accent blue for linking lines
      distance: 150,
      enable: true,
      opacity: 0.4,
      width: 1,
    },
    collisions: { enable: false },
    move: {
      direction: "none",
      enable: true,
      outModes: { default: "bounce" },
      random: false,
      speed: 1, // Slower speed for subtlety
      straight: false,
    },
    number: {
      density: { enable: true, area: 800 },
      value: 50, // Number of particles
    },
    opacity: { value: 0.5 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 3 } }, // Small particle sizes
  },

  interactivity: {
    events: {
      onHover: {
        enable: true, // Enable hover events
        mode: "repulse", // Set the hover mode to "repulse"
      },
    },
    modes: {
      repulse: {
        distance: 100, // How far the particles will be pushed away
        duration: 0.4, // The speed of the repulse effect
      },
    },
  },
  detectRetina: true,
});

const contactForm = document.getElementById('contact-form');
const submitButton = contactForm.querySelector('button[type="submit"]'); 

contactForm.addEventListener('submit', async function(event) { 
    event.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Clear previous error states
    nameInput.classList.remove('error');
    emailInput.classList.remove('error');
    messageInput.classList.remove('error');
    const existingErrorMessage = contactForm.querySelector('.form-error-message');
    if (existingErrorMessage) {
        existingErrorMessage.remove();
    }

    // --- Frontend Validation (without alerts) ---
    let hasError = false;
    if (name === '') {
        nameInput.classList.add('error');
        hasError = true;
    }
    if (email === '') {
        emailInput.classList.add('error');
        hasError = true;
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            emailInput.classList.add('error');
            hasError = true;
        }
    }
    if (message === '') {
        messageInput.classList.add('error');
        hasError = true;
    }

    if (hasError) {
        const errorMessageDiv = document.createElement('div');
        errorMessageDiv.classList.add('form-error-message');
        errorMessageDiv.textContent = 'Please correct the highlighted fields.';
        contactForm.insertBefore(errorMessageDiv, submitButton); 
        return; // Stop execution if validation fails
    }
    //-----End of frontend validation-----

    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true; // Disable to prevent multiple clicks

    const backendUrl = 'https://portfolio-backend-5sl3.onrender.com/send-email';

    try { 
        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        });

        const data = await response.text(); 

        if (!response.ok) { 
            throw new Error(`Server responded with status: ${response.status}. Message: ${data}`);
        }

        // Success feedback
        submitButton.textContent = 'Sent!';
        contactForm.reset(); // Clear the form
        console.log('Message sent successfully:', data);

        // Reset button after 1 second
        setTimeout(() => {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }, 1000); // "Sent!" for 1 second

    } catch (error) {
        // Error feedback
        submitButton.textContent = 'Error!';
        console.error('Error sending message:', error);
        
        // Reset button after 1 second
        setTimeout(() => {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }, 1000); 
    }
});
