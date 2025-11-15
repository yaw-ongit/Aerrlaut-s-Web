document.addEventListener('DOMContentLoaded', () => {
    // --- Data Produk untuk Modal (Sesuai dengan nama produk B. Inggris yang baru) ---
    const productData = {
        1: { title: "Brownie Choco Crunchy 🌰", description: "Brownie premium dengan topping cokelat yang renyah dan nikmat di setiap gigitan.", price: "Rp 15.000" },
        2: { title: "Brownie Cheddar Cheese ❤️", description: "Kombinasi unik brownie lezat dengan keju cheddar yang gurih dan menggugah selera.", price: "Rp 15.000" },
        5: { title: "Brownie Original 🧸", description: "Brownie klasik kami dengan tekstur lembut dan rasa cokelat yang kaya. Pilihan terbaik untuk pemula!", price: "Rp 14.000" },
        4: { title: "Brownie Special 🎁", description: "Resep spesial eksklusif dengan bahan-bahan pilihan terbaik. Dijamin membuat Anda ketagihan!", price: "Rp 17.000" },
        3: { title: "Burnt Cheesecake 🍮", description: "Cheesecake bergaya Basque dengan tekstur creamy dan lapisan yang sedikit gosong. Rasa yang sempurna!", price: "Rp 20.000" },
        // Untuk COMING SOON, tidak perlu data di sini.
    };

    // 1. NAVIGASI INTERAKTIF & SMOOTH SCROLL
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Smooth Scroll (menggunakan JS untuk konsistensi cross-browser dan offset)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            // Menambahkan offset agar tidak tertutup navbar fixed
            const targetElement = document.querySelector(targetId);
            const offsetTop = targetElement.offsetTop - navbar.offsetHeight; 
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // Header Berubah Gaya Saat Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. "PEEK" PRODUK INTERAKTIF (MODAL)
    const productImages = document.querySelectorAll('.product-img');
    const modal = document.getElementById('product-modal');
    const closeModal = document.querySelector('.close-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDetails = document.getElementById('modal-details');
    const modalPrice = document.querySelector('.modal-price');

    productImages.forEach(img => {
        img.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            const data = productData[productId];

            if (data) {
                modalTitle.textContent = data.title;
                modalImage.src = this.src;
                modalDetails.innerHTML = `${data.description}`;
                modalPrice.textContent = `Harga: ${data.price}`;
                modal.style.display = 'block';
            }
        });
    });

    // Tutup modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // ** Bagian 3 (Formulir Pemesanan) Dihapus Total **

    // 4. MODE MALAM (BONUS)
    const themeToggle = document.getElementById('theme-toggle');

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Ganti ikon toggle
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.textContent = '☀️';
            themeToggle.setAttribute('aria-label', 'Toggle Light Mode');
        } else {
            themeToggle.textContent = '🌙';
            themeToggle.setAttribute('aria-label', 'Toggle Dark Mode');
        }
    });
});