// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        // navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        // navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Skill cards animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card').forEach(card => {
    observer.observe(card);
});

// Theme handling
document.addEventListener('DOMContentLoaded', function() {
    // Set dark theme as default if no theme is stored
    if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', 'dark');
    }
    
    // Apply the stored theme (or dark theme by default)
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', currentTheme);
    
    // Update the active state in theme selector
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        if (option.getAttribute('data-theme') === currentTheme) {
            option.classList.add('active');
        }
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeDropdown = document.querySelector('.theme-dropdown');

    themeToggle.addEventListener('click', () => {
        themeDropdown.classList.toggle('show');
    });

    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const selectedTheme = option.getAttribute('data-theme');
            document.body.setAttribute('data-theme', selectedTheme);
            localStorage.setItem('theme', selectedTheme);
            
            // Update active state
            themeOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            themeDropdown.classList.remove('show');
        });
    });
});

// Mobile Menu Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href*=${sectionId}]`).classList.add('active');
        } else {
            document.querySelector(`.nav-link[href*=${sectionId}]`).classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// Contact Form Handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formMessage = document.getElementById('formMessage');
    const submitButton = this.querySelector('button[type="submit"]');
    
    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    formMessage.textContent = '';
    
    // Replace these with your EmailJS service ID and template ID
    emailjs.sendForm('service_35709t7', 'template_mpyq66w', this)
        .then(() => {
            formMessage.textContent = 'Message sent successfully!';
            formMessage.className = 'form-message success';
            this.reset();
        })
        .catch((error) => {
            formMessage.textContent = 'Failed to send message. Please try again.';
            formMessage.className = 'form-message error';
            console.error('EmailJS Error:', error);
        })
        .finally(() => {
            // Re-enable submit button and restore original text
            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
        });
});

// Add this CSS to your styles.css
const styles = `
.form-message {
    margin-top: 1rem;
    padding: 10px;
    border-radius: 4px;
    text-align: center;
}

.form-message.success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.form-message.error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}
`;