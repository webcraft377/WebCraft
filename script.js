// Smooth Scrolling untuk navigation links
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

// Intersection Observer untuk animasi fade-in
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Tambah animasi fade-in
            entry.target.style.animation = 'fadeIn 0.6s ease-in-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe portfolio items
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.style.opacity = '0';
    observer.observe(item);
});

// Observe pricing cards
document.querySelectorAll('.pricing-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Observe feature items
document.querySelectorAll('.feature').forEach(feature => {
    feature.style.opacity = '0';
    observer.observe(feature);
});

// Tambah keyframe untuk fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Form Validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const nama = this.querySelector('input[placeholder="Nama Anda"]').value.trim();
        const email = this.querySelector('input[placeholder="Email Anda"]').value.trim();
        const telepon = this.querySelector('input[placeholder="Nomor Telepon"]').value.trim();
        const pesan = this.querySelector('textarea[placeholder="Pesan Anda"]').value.trim();
        
        // Validasi
        let isValid = true;
        let errorMessages = [];
        
        if (!nama) {
            isValid = false;
            errorMessages.push('Nama tidak boleh kosong');
        }
        
        if (!email || !isValidEmail(email)) {
            isValid = false;
            errorMessages.push('Email tidak valid');
        }
        
        if (!telepon || telepon.length < 10) {
            isValid = false;
            errorMessages.push('Nomor telepon minimal 10 digit');
        }
        
        if (!pesan) {
            isValid = false;
            errorMessages.push('Pesan tidak boleh kosong');
        }
        
        if (isValid) {
            // Simulasi pengiriman form
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Pesan Terkirim!';
            submitBtn.style.background = '#4CAF50';
            
            setTimeout(() => {
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
            }, 2000);
        } else {
            alert('Validasi gagal:\n' + errorMessages.join('\n'));
        }
    });
}

// Fungsi validasi email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.style.color = 'var(--white)';
        if (link.getAttribute('href') === '#' + current) {
            link.style.color = 'var(--primary-cyan)';
        }
    });
});

// Navbar sticky effect dengan shadow
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 0) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 212, 255, 0.3)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 212, 255, 0.2)';
    }
});

// Mobile menu toggle (untuk responsive)
const navBrand = document.querySelector('.nav-brand');
const navMenu = document.querySelector('.nav-menu');

if (window.innerWidth <= 768) {
    navBrand.style.cursor = 'pointer';
    navBrand.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'none' ? 'flex' : 'none';
    });
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.style.display = 'none';
        });
    });
}

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.style.display = 'flex';
    }
});
