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

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault(); 

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  if (name === '' || email === '' || message === '') {
    alert('Please fill in all fields.');
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    console.log('Form submitted:', { name, email, message });
    alert('Thank you for your message!');
    this.reset();
});