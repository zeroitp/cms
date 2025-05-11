// Initialize Google Maps
function initMap() {
    const sunCasaCentral = { lat: 11.0168, lng: 106.6864 }; // Coordinates for Sun Casa Central
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: sunCasaCentral,
    });
    
    const marker = new google.maps.Marker({
        position: sunCasaCentral,
        map: map,
        title: 'Sun Casa Central'
    });
}

// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
});

// Form validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('consultationForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const interest = document.getElementById('interest').value;
        
        // Basic validation
        if (!name || !phone || !email || !interest) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }
        
        // Phone number validation
        const phoneRegex = /^[0-9]{10,11}$/;
        if (!phoneRegex.test(phone)) {
            alert('Số điện thoại không hợp lệ');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Email không hợp lệ');
            return;
        }
        
        // If all validations pass, you can submit the form
        // Here you would typically send the data to your server
        alert('Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
        form.reset();
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize map when the page loads
document.addEventListener('DOMContentLoaded', initMap);

// Up to Top Button functionality
window.addEventListener('DOMContentLoaded', function() {
    const toTopBtn = document.getElementById('toTopBtn');
    const bannerSection = document.getElementById('banner');

    function checkToTopBtn() {
        const bannerBottom = bannerSection.getBoundingClientRect().bottom;
        if (bannerBottom < 0) {
            toTopBtn.classList.add('show');
        } else {
            toTopBtn.classList.remove('show');
        }
    }

    window.addEventListener('scroll', checkToTopBtn);
    checkToTopBtn();

    toTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Product slideshow JS
(function() {
    const slides = document.querySelectorAll('.slide-item');
    let currentSlide = 0;
    function showSlide(idx) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === idx);
        });
    }
    const leftBtn = document.querySelector('.slide-arrow.left');
    const rightBtn = document.querySelector('.slide-arrow.right');
    if (leftBtn && rightBtn && slides.length) {
        leftBtn.onclick = function() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        };
        rightBtn.onclick = function() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        };
        // Swipe support
        let startX = 0;
        const track = document.querySelector('.slide-track');
        if (track) {
            track.addEventListener('touchstart', e => startX = e.touches[0].clientX);
            track.addEventListener('touchend', e => {
                let dx = e.changedTouches[0].clientX - startX;
                if (dx > 40) leftBtn.click();
                if (dx < -40) rightBtn.click();
            });
        }
    }
})();

// Product slideshow full JS
(function() {
    const slides = document.querySelectorAll('.slide-item-full');
    let currentSlide = 0;
    function showSlide(idx) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === idx);
        });
    }
    const leftBtns = document.querySelectorAll('.slide-arrow-full.left');
    const rightBtns = document.querySelectorAll('.slide-arrow-full.right');
    if (leftBtns.length && rightBtns.length && slides.length) {
        leftBtns.forEach(btn => btn.onclick = function() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
        rightBtns.forEach(btn => btn.onclick = function() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });
        // Swipe support
        let startX = 0;
        const track = document.querySelector('.slide-track-full');
        if (track) {
            track.addEventListener('touchstart', e => startX = e.touches[0].clientX);
            track.addEventListener('touchend', e => {
                let dx = e.changedTouches[0].clientX - startX;
                if (dx > 40) leftBtns[0].click();
                if (dx < -40) rightBtns[0].click();
            });
        }
    }
})();

// Bank Logo Animation
function initBankLogoAnimation() {
    const bankLogos = document.querySelectorAll('.bank-logos img');
    
    // Add animation class to each logo with a delay
    bankLogos.forEach((logo, index) => {
        logo.style.animationDelay = `${index * 0.5}s`;
    });

    // Ensure animation continues even after page load
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            } else {
                entry.target.style.animationPlayState = 'paused';
            }
        });
    }, {
        threshold: 0.1
    });

    bankLogos.forEach(logo => {
        observer.observe(logo);
    });
}

// Initialize bank logo animation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initBankLogoAnimation();
    // ... existing code ...
});

// Gallery tab switching and Swiper init
(function() {
    const tabBtns = document.querySelectorAll('.gallery-tab-buttons .tab-btn');
    const tabPanes = document.querySelectorAll('.gallery-tab-content .tab-pane');
    let albumSwiper = null;
    let albumSwiperInitialized = false;

    function showTab(tabId) {
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        document.querySelector('.gallery-tab-buttons .tab-btn[data-tab="' + tabId + '"]').classList.add('active');
        document.getElementById(tabId).classList.add('active');
        if (tabId === 'gallery-album' && !albumSwiperInitialized) {
            albumSwiper = new Swiper('.galleryAlbumSwiper', {
                loop: true,
                speed: 900,
                spaceBetween: 30,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.galleryAlbumSwiper .swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.galleryAlbumSwiper .swiper-button-next',
                    prevEl: '.galleryAlbumSwiper .swiper-button-prev',
                },
                effect: 'fade',
                fadeEffect: { crossFade: true },
            });
            albumSwiperInitialized = true;
        }
    }
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            showTab(this.getAttribute('data-tab'));
        });
    });
    // Auto-init album tab on load
    if (document.getElementById('gallery-album')) {
        showTab('gallery-album');
    }
})();

// Lightbox mở rộng cho nhiều khu vực
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        // Lightbox elements
        const lightbox = document.querySelector('.gallery-lightbox');
        const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
        const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
        const lightboxPrev = lightbox ? lightbox.querySelector('.lightbox-prev') : null;
        const lightboxNext = lightbox ? lightbox.querySelector('.lightbox-next') : null;
        let currentIndex = 0;
        let currentGroup = [];

        // Helper: open lightbox with src, group
        function openLightboxWithGroup(index, group) {
            if (!lightboxImg) return;
            currentGroup = group;
            currentIndex = index;
            lightboxImg.src = group[index].src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
        function showPrevImage() {
            if (!currentGroup.length) return;
            currentIndex = (currentIndex - 1 + currentGroup.length) % currentGroup.length;
            lightboxImg.src = currentGroup[currentIndex].src;
        }
        function showNextImage() {
            if (!currentGroup.length) return;
            currentIndex = (currentIndex + 1) % currentGroup.length;
            lightboxImg.src = currentGroup[currentIndex].src;
        }
        // Event listeners for lightbox
        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);
        if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);
        if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
        });

        // 1. location-map
        const locationMapImg = document.querySelector('.location-map img');
        if (locationMapImg) {
            locationMapImg.style.cursor = 'zoom-in';
            locationMapImg.addEventListener('click', function() {
                openLightboxWithGroup(0, [this]);
            });
        }
        // 2. gallerySwiper (amenities)
        const gallerySwiperImgs = Array.from(document.querySelectorAll('.gallerySwiper .gallery-item img'));
        gallerySwiperImgs.forEach((img, idx) => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', function(e) {
                e.stopPropagation();
                openLightboxWithGroup(idx, gallerySwiperImgs);
            });
        });
        // 3. productSplide
        const productSplideImgs = Array.from(document.querySelectorAll('.productSplide .splide__slide img'));
        productSplideImgs.forEach((img, idx) => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', function(e) {
                e.stopPropagation();
                openLightboxWithGroup(idx, productSplideImgs);
            });
        });
        // 4. galleryAlbumSwiper
        const galleryAlbumImgs = Array.from(document.querySelectorAll('.galleryAlbumSwiper .swiper-slide img'));
        galleryAlbumImgs.forEach((img, idx) => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', function(e) {
                e.stopPropagation();
                openLightboxWithGroup(idx, galleryAlbumImgs);
            });
        });
    });
})(); 