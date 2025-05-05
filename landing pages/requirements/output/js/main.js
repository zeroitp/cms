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

// Product multi-slider JS
(function() {
    const track = document.querySelector('.multi-track');
    const slides = document.querySelectorAll('.multi-slide');
    const leftBtn = document.querySelector('.multi-arrow.left');
    const rightBtn = document.querySelector('.multi-arrow.right');
    let current = 0;
    function getVisible() {
        if (window.innerWidth > 1200) return 3;
        if (window.innerWidth > 900) return 2;
        return 1;
    }
    function updateSlider() {
        const slideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(track).gap || 32);
        const visible = getVisible();
        const maxCurrent = Math.max(0, slides.length - visible);
        if (current > maxCurrent) current = maxCurrent;
        track.style.transform = `translateX(${-current * slideWidth}px)`;
    }
    leftBtn.onclick = function() {
        if (current > 0) current--;
        updateSlider();
    };
    rightBtn.onclick = function() {
        if (current < slides.length - getVisible()) current++;
        updateSlider();
    };
    // Swipe support
    let startX = 0;
    track.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    track.addEventListener('touchend', e => {
        let dx = e.changedTouches[0].clientX - startX;
        if (dx > 40 && current > 0) { current--; updateSlider(); }
        if (dx < -40 && current < slides.length - getVisible()) { current++; updateSlider(); }
    });
    window.addEventListener('resize', updateSlider);
    updateSlider();
})(); 