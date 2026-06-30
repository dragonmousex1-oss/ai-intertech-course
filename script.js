// ============================================
// Script.js - Thai Educational Website JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ---- 1. Mobile Navigation Toggle ----
    const navToggle = document.querySelector('#navToggle') || document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a nav link
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // ---- 2. Navbar Scroll Effect ----
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ---- 4. Smooth Scroll for Anchor Links ----
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---- 5. Scroll Animation with IntersectionObserver ----
    const animatedElements = document.querySelectorAll(
        '.unit-card, .feature-card, .content-block, .review-card, .comparison-card, .example-card'
    );

    // Add data-animate attribute to target elements
    animatedElements.forEach(function (el, index) {
        el.setAttribute('data-animate', '');
        // Add stagger delay for items in same group
        el.style.transitionDelay = (index % 6) * 0.05 + 's';
    });

    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px'
    };

    const scrollObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                // Add animate-in class to make element visible permanently
                entry.target.classList.add('animate-in');
                // Stop observing once animated (it stays visible forever)
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-animate]').forEach(function (el) {
        scrollObserver.observe(el);
    });

    // ---- 6. Active Navigation Highlighting ----
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-links a').forEach(function (link) {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

});

// ---- 3. Toggle Answer Function (Global) ----
function toggleAnswer(btn) {
    const answerDiv = btn.nextElementSibling;
    if (!answerDiv) return;

    answerDiv.classList.toggle('hidden');

    if (answerDiv.classList.contains('hidden')) {
        btn.textContent = 'ดูคำตอบ';
        btn.classList.remove('revealed');
    } else {
        btn.textContent = 'ซ่อนคำตอบ';
        btn.classList.add('revealed');
    }
}
