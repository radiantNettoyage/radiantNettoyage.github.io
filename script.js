// ===== Mobile Navigation =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ===== Navbar scroll effect =====
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== Language Toggle (FR/EN) =====
let currentLang = 'fr';
const langToggle = document.getElementById('langToggle');

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    langToggle.textContent = currentLang === 'fr' ? 'EN' : 'FR';

    document.querySelectorAll('[data-fr]').forEach(el => {
        const text = el.getAttribute(`data-${currentLang}`);
        if (text) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = text;
            } else {
                el.textContent = text;
            }
        }
    });
});

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Build mailto link as a simple free solution
    const subjectText = document.querySelector(`#subject option[value="${subject}"]`).textContent;
    const mailtoBody = `Nom: ${name}%0D%0ACourriel: ${email}%0D%0ASujet: ${subjectText}%0D%0A%0D%0A${encodeURIComponent(message)}`;
    const mailtoLink = `mailto:radiantnettoyage@hotmail.com?subject=${encodeURIComponent(subjectText)}&body=${mailtoBody}`;

    window.location.href = mailtoLink;

    // Show success message
    const successFr = 'Votre client de messagerie va s\'ouvrir. Merci!';
    const successEn = 'Your email client will open. Thank you!';
    contactForm.innerHTML = `
        <div class="form-success">
            <h3>${currentLang === 'fr' ? 'Merci!' : 'Thank you!'}</h3>
            <p>${currentLang === 'fr' ? successFr : successEn}</p>
        </div>
    `;
});

// ===== Smooth reveal animation =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .why-item, .stat, .contact-item, .job-highlight, .careers-requirements, .job-apply').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
