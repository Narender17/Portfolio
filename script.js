console.log('script.js loaded');

// Typing effect for hero section
const roles = [
  'Web Developer',
  'Python Enthusiast',
  'JavaScript Coder',
  'Tech Learner'
];
let roleIndex = 0, charIndex = 0, typing = true;
const typingText = document.querySelector('.typing-text');
function typeRole() {
  const currentRole = roles[roleIndex];
  if (typing) {
    if (charIndex < currentRole.length) {
      typingText.textContent = currentRole.slice(0, charIndex + 1);
      charIndex++;
      setTimeout(typeRole, 80);
    } else {
      typing = false;
      setTimeout(typeRole, 1200);
    }
  } else {
    if (charIndex > 0) {
      typingText.textContent = currentRole.slice(0, charIndex - 1);
      charIndex--;
      setTimeout(typeRole, 40);
    } else {
      typing = true;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, 400);
    }
  }
}
typeRole();

// Smooth scrolling for nav links and active state switching
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const sections = Array.from(sidebarLinks).map(link => document.querySelector(link.getAttribute('href')));

sidebarLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
    // Set active class on click
    sidebarLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

// Improved: Highlight active link on scroll (closest section to top)
window.addEventListener('scroll', () => {
  let closestSection = null;
  let minDistance = Number.POSITIVE_INFINITY;
  const scrollY = window.scrollY;
  sections.forEach(section => {
    if (section) {
      const distance = Math.abs(section.getBoundingClientRect().top - 80); // 80px offset for header
      if (section.getBoundingClientRect().top - 80 <= 0 && distance < minDistance) {
        minDistance = distance;
        closestSection = section;
      }
    }
  });
  sidebarLinks.forEach(link => {
    link.classList.remove('active');
    if (closestSection && link.getAttribute('href') === '#' + closestSection.getAttribute('id')) {
      link.classList.add('active');
    }
  });
});

// Download Resume button (placeholder)

// Sidebar close button functionality
const closeSidebarBtn = document.getElementById('close-sidebar');
const sidebar = document.getElementById('sidebar');
// Sidebar open/close arrow button functionality with sliding effect
const openSidebarBtn = document.getElementById('open-sidebar');
if (closeSidebarBtn && sidebar && openSidebarBtn) {
  closeSidebarBtn.addEventListener('click', () => {
    sidebar.classList.add('closed');
    openSidebarBtn.style.display = 'block';
    document.body.classList.add('sidebar-closed');
  });
  openSidebarBtn.addEventListener('click', () => {
    sidebar.classList.remove('closed');
    openSidebarBtn.style.display = 'none';
    document.body.classList.remove('sidebar-closed');
  });
}

// --- EmailJS Contact Form Integration ---
// 1. Go to https://www.emailjs.com/ and sign up (free)
// 2. Add your email as a service, create a template with variables: from_name, from_email, message
// 3. Get your Public Key, Service ID, and Template ID from the EmailJS dashboard
// 4. Replace the placeholders below with your actual keys

// Initialize EmailJS (replace with your public key)
// Removed emailjs.init('YOUR_PUBLIC_KEY'); as EmailJS is not used anymore

const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    // Open the user's default mail client (Gmail if set as default)
    window.location.href = `mailto:narenderkumar48125@gmail.com?subject=${subject}&body=${body}`;
  });
}
// --- End EmailJS Contact Form Integration --- 