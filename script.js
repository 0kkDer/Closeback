document.addEventListener('DOMContentLoaded', () => {
    
    // ============================================
    // 1. SCROLL ANIMATION (Intersection Observer)
    // ============================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Ambil semua elemen dengan class animasi
    const animatedElements = document.querySelectorAll('.fade-up, .line-anim');
    animatedElements.forEach(el => observer.observe(el));


    // ============================================
    // 2. NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    // ============================================
    // 3. SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });


    // ============================================
    // 4. FORM SUBMIT HANDLING
    // ============================================
    const form = document.getElementById('signup-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const input = form.querySelector('input');
        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        
        // Loading animation
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        btn.style.pointerEvents = 'none';
        
        setTimeout(() => {
            // Success
            btn.innerHTML = '<i class="fas fa-check"></i>';
            btn.style.background = '#d4af37';
            btn.style.color = '#000';
            
            setTimeout(() => {
                alert('Terima kasih! Kamu sekarang masuk list eksklusif CLOSEBAG.');
                input.value = '';
                btn.innerText = originalText;
                btn.style.background = '#fff';
                btn.style.color = '#000';
                btn.style.pointerEvents = 'all';
            }, 500);
            
        }, 1500);
    });

});
