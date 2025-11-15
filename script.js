document.addEventListener('DOMContentLoaded', () => {
    // Produk Data
    const productData = {
        1: { 
            title: "Brownie Choco Crunchy 🌰", 
            description: "Brownie premium dengan topping cokelat yang renyah. Tekstur lembut di dalam dengan kehangatan cokelat yang sempurna. Setiap gigitan memberikan sensasi renyah yang tak terlupakan!", 
            price: "Rp 15.000" 
        },
        2: { 
            title: "Brownie Cheddar Cheese ❤️", 
            description: "Kombinasi unik yang memadukan manisnya brownie dengan gurihnya keju cheddar premium. Rasakan harmoni sempurna antara dua rasa dalam satu gigitan istimewa!", 
            price: "Rp 15.000" 
        },
        5: { 
            title: "Brownie Original Classic 🧸", 
            description: "Brownie klasik kami dengan tekstur lembut dan rasa cokelat yang kaya. Pilihan terbaik untuk pemula yang ingin merasakan kesempurnaan brownie tradisional!", 
            price: "Rp 14.000" 
        },
        4: { 
            title: "Brownie Special Edition 🎁", 
            description: "Resep spesial eksklusif dengan bahan-bahan pilihan terbaik kami. Dijamin membuat Anda ketagihan dengan kombinasi rahasia yang tak tertandingi!", 
            price: "Rp 17.000" 
        },
        3: { 
            title: "Burnt Cheesecake Basque 🍮", 
            description: "Cheesecake bergaya Basque dengan tekstur creamy yang sempurna dan lapisan karamel yang sedikit gosong. Cita rasa yang kompleks dan tak terlupakan di setiap gigitan!", 
            price: "Rp 20.000" 
        },
    };

    // ===== 1. NAVIGASI SMOOTH SCROLL =====
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const offsetTop = targetElement.offsetTop - navbar.offsetHeight;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // ===== 2. NAVBAR SCROLL EFFECT =====
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===== 3. PRODUCT MODAL INTERAKTIF =====
    const productImages = document.querySelectorAll('.product-img');
    const modal = document.getElementById('product-modal');
    const closeModal = document.querySelector('.close-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDetails = document.getElementById('modal-details');
    const modalPrice = document.querySelector('.modal-price');
    const modalOverlay = document.querySelector('.modal-overlay');

    productImages.forEach(img => {
        img.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            const data = productData[productId];

            if (data) {
                modalTitle.textContent = data.title;
                modalImage.src = this.src;
                modalDetails.innerHTML = `<p>${data.description}</p>`;
                modalPrice.textContent = `Harga: ${data.price}`;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    modalOverlay.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // ===== 4. DARK MODE TOGGLE =====
    const themeToggle = document.getElementById('theme-toggle');

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });

    // ===== 5. PARALLAX EFFECT (BONUS) =====
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.main-header');
        const scrollY = window.scrollY;
        hero.style.backgroundPosition = `0 ${scrollY * 0.5}px`;
    });

    // ===== 6. INTERSECTION OBSERVER untuk LAZY ANIMATION =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });
});
