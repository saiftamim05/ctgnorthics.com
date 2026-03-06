// স্ক্রলে কাউন্টার অ্যানিমেশন
const counterSection = document.querySelector('.counter-section');
let counted = false;

window.addEventListener('scroll', () => {
    if (!counted && counterSection.getBoundingClientRect().top < window.innerHeight - 100) {
        counted = true;
        document.querySelectorAll('.counter').forEach(counter => {
            counter.innerText = '0';
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const updateCounter = () => {
                const increment = target / 100;
                if (count < target) {
                    count += increment;
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCounter, 10);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    }
});

// পেজ লোডে কাউন্টার অ্যানিমেশন (যারা স্ক্রল না করে দেখবে তাদের জন্য)
window.addEventListener('load', () => {
    // চেক করা যে স্ক্রল কাউন্টার আগেই চালু হয়েছে কিনা
    if (!counted && counterSection.getBoundingClientRect().top < window.innerHeight) {
        counted = true;
        document.querySelectorAll('.counter').forEach(counter => {
            const target = +counter.getAttribute('data-target');
            counter.innerText = target;
        });
    } else if (!counted) {
        // যদি স্ক্রল কাউন্টার না চলে, তাহলে ধীরে ধীরে সংখ্যা দেখান
        document.querySelectorAll('.counter').forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const updateCounter = () => {
                const increment = target / 100;
                if (count < target) {
                    count += increment;
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCounter, 10);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    }
});

// স্ক্রলে নেভিগেশন অ্যাক্টিভ হাইলাইট
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ফর্ম সাবমিট হ্যান্ডলার
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    this.reset();
    const messageEl = document.getElementById('formMessage');
    messageEl.style.display = 'block';
    setTimeout(() => {
        messageEl.style.display = 'none';
    }, 3000);
});

// স্মুথ স্ক্রোলিং (ঐচ্ছিক)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});