// Toggle Unit Cards
document.querySelectorAll('.unit-header').forEach(header => {
    header.addEventListener('click', () => {
        const card = header.parentElement;
        const body = card.querySelector('.unit-body');
        const isActive = card.classList.contains('active');

        // Close all cards
        document.querySelectorAll('.unit-card').forEach(c => {
            c.classList.remove('active');
            const b = c.querySelector('.unit-body');
            b.style.maxHeight = null;
        });

        // Open clicked card if it wasn't active
        if (!isActive) {
            card.classList.add('active');
            body.style.maxHeight = body.scrollHeight + 'px';
            // Scroll to card
            setTimeout(() => {
                card.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    });
});

// Toggle Review Answers
function toggleAnswer(btn) {
    const answer = btn.nextElementSibling;
    if (answer.classList.contains('hidden')) {
        answer.classList.remove('hidden');
        btn.textContent = 'ซ่อนคำตอบ';
        btn.style.background = 'linear-gradient(135deg, #34d399, #10b981)';
    } else {
        answer.classList.add('hidden');
        btn.textContent = 'ดูคำตอบ';
        btn.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6)';
    }
}

// Smooth scroll for navigation
document.querySelectorAll('.nav-links a, .btn-primary').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPos = target.offsetTop - navHeight;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -30px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate cards on scroll
document.querySelectorAll('.unit-card, .review-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});
