// Enhanced Intersection Observer cho lazy loading
class LazyLoader {
    constructor() {
        this.imageObserver = null;
        this.sectionObserver = null;
        this.loadedImages = new Set();
        this.init();
    }

    init() {
        // Lazy load images
        this.initImageLazyLoading();
        // Lazy load sections
        this.initSectionLazyLoading();
        // Load critical scripts
        this.loadCriticalScripts();
    }

    initImageLazyLoading() {
        if ('IntersectionObserver' in window) {
            this.imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.loadImage(img);
                    }
                });
            }, {
                rootMargin: '100px 0px', // Load images 100px before they come into view
                threshold: 0.01
            });

            // Observe all lazy images
            document.querySelectorAll('img[data-src]').forEach(img => {
                this.imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            this.fallbackImageLoading();
        }
    }

    loadImage(img) {
        if (this.loadedImages.has(img)) return;
        
        const src = img.getAttribute('data-src');
        if (!src) return;

        // Add loading class for animation
        img.classList.add('loading');
        
        // Create new image to preload
        const imageLoader = new Image();
        
        imageLoader.onload = () => {
            // Image loaded successfully
            img.src = src;
            img.classList.remove('loading');
            img.classList.add('loaded');
            img.removeAttribute('data-src');
            this.loadedImages.add(img);
            this.imageObserver.unobserve(img);
        };
        
        imageLoader.onerror = () => {
            // Image failed to load, remove loading state
            img.classList.remove('loading');
            console.warn('Failed to load image:', src);
            this.imageObserver.unobserve(img);
        };
        
        imageLoader.src = src;
    }

    fallbackImageLoading() {
        // Load all images immediately for older browsers
        document.querySelectorAll('img[data-src]').forEach(img => {
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
                img.classList.add('loaded');
                img.removeAttribute('data-src');
            }
        });
    }

    initSectionLazyLoading() {
        if ('IntersectionObserver' in window) {
            this.sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const section = entry.target;
                        
                        // Load section-specific scripts
                        this.loadSectionScripts(section);
                        
                        section.classList.add('section-visible');
                        this.sectionObserver.unobserve(section);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.1
            });

            // Observe sections (except critical ones)
            document.querySelectorAll('section:not(#banner):not(#project-intro)').forEach(section => {
                this.sectionObserver.observe(section);
            });
        }
    }

    loadSectionScripts(section) {
        // Load Swiper for amenities section
        if (section.classList.contains('amenities') && !window.swiperLoaded) {
            this.loadSwiper();
        }
        
        // Load Splide for products section
        if (section.classList.contains('products') && !window.splideLoaded) {
            this.loadSplide();
        }

        // Load gallery scripts
        if (section.classList.contains('gallery') && !window.galleryLoaded) {
            this.loadGalleryScripts();
        }
    }

    loadCriticalScripts() {
        // Load Font Awesome icons
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const faLink = document.createElement('link');
            faLink.rel = 'stylesheet';
            faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
            faLink.async = true;
            document.head.appendChild(faLink);
        }
    }

    loadSwiper() {
        if (window.swiperLoaded) return;
        
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
        document.head.appendChild(link);

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
        script.onload = () => {
            window.swiperLoaded = true;
            this.initSwiperComponents();
        };
        document.body.appendChild(script);
    }

    loadSplide() {
        if (window.splideLoaded) return;
        
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css';
        document.head.appendChild(link);

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js';
        script.onload = () => {
            window.splideLoaded = true;
            this.initSplideComponents();
        };
        document.body.appendChild(script);
    }

    loadGalleryScripts() {
        if (window.galleryLoaded) return;
        
        // Load gallery-specific functionality
        window.galleryLoaded = true;
        this.initGalleryComponents();
    }

    initSwiperComponents() {
        // Wait for DOM to be ready
        if (typeof Swiper === 'undefined') {
            setTimeout(() => this.initSwiperComponents(), 100);
            return;
        }

        // Initialize Swiper for amenities
        const galleryThumbs = new Swiper('.galleryThumbs', {
            spaceBetween: 10,
            slidesPerView: 'auto',
            freeMode: true,
            watchSlidesProgress: true,
            watchOverflow: true,
            slideToClickedSlide: true,
            breakpoints: {
                320: { slidesPerView: 3, spaceBetween: 8 },
                768: { slidesPerView: 4, spaceBetween: 10 },
                1024: { slidesPerView: 6, spaceBetween: 12 }
            }
        });

        const gallerySwiper = new Swiper('.gallerySwiper', {
            effect: 'creative',
            creativeEffect: {
                prev: { translate: ['-100%', 0, -1], opacity: 0 },
                next: { translate: ['100%', 0, 0], opacity: 0 }
            },
            speed: 1000,
            spaceBetween: 30,
            loop: true,
            autoplay: { delay: 5000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            thumbs: { swiper: galleryThumbs }
        });

        // Initialize gallery album swiper
        const galleryAlbumSwiper = new Swiper('.galleryAlbumSwiper', {
            loop: true,
            speed: 900,
            spaceBetween: 30,
            autoplay: { delay: 4000, disableOnInteraction: false },
            pagination: { el: '.galleryAlbumSwiper .swiper-pagination', clickable: true },
            navigation: {
                nextEl: '.galleryAlbumSwiper .swiper-button-next',
                prevEl: '.galleryAlbumSwiper .swiper-button-prev'
            },
            effect: 'fade',
            fadeEffect: { crossFade: true }
        });
    }

    initSplideComponents() {
        // Wait for DOM to be ready
        if (typeof Splide === 'undefined') {
            setTimeout(() => this.initSplideComponents(), 100);
            return;
        }

        // Initialize Splide for products
        new Splide('.productSplide', {
            type: 'fade',
            rewind: true,
            autoplay: true,
            interval: 5000,
            pauseOnHover: true,
            pauseOnFocus: true,
            arrows: true,
            pagination: false,
            speed: 1000,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
            classes: {
                arrows: 'splide__arrows custom-arrows',
                arrow: 'splide__arrow custom-arrow',
                prev: 'splide__arrow--prev custom-prev',
                next: 'splide__arrow--next custom-next'
            }
        }).mount();
    }

    initGalleryComponents() {
        // Initialize gallery tab functionality and lightbox
        this.initGalleryTabs();
        this.initLightbox();
    }

    initGalleryTabs() {
        const tabBtns = document.querySelectorAll('.gallery-tab-buttons .tab-btn');
        const tabPanes = document.querySelectorAll('.gallery-tab-content .tab-pane');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    initLightbox() {
        // Enhanced lightbox functionality
        const lightbox = document.querySelector('.gallery-lightbox');
        if (!lightbox) return;

        const lightboxImg = lightbox.querySelector('img');
        const lightboxClose = lightbox.querySelector('.lightbox-close');
        const lightboxPrev = lightbox.querySelector('.lightbox-prev');
        const lightboxNext = lightbox.querySelector('.lightbox-next');
        
        let currentIndex = 0;
        let currentGroup = [];

        // Enhanced lightbox opening function
        window.openLightboxWithGroup = (index, group) => {
            if (!lightboxImg) return;
            currentGroup = group;
            currentIndex = index;
            lightboxImg.src = group[index].src || group[index].dataset.src || group[index];
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        // Enhanced navigation functions
        const showPrevImage = () => {
            if (!currentGroup.length) return;
            currentIndex = (currentIndex - 1 + currentGroup.length) % currentGroup.length;
            lightboxImg.src = currentGroup[currentIndex].src || currentGroup[currentIndex].dataset.src || currentGroup[currentIndex];
        };

        const showNextImage = () => {
            if (!currentGroup.length) return;
            currentIndex = (currentIndex + 1) % currentGroup.length;
            lightboxImg.src = currentGroup[currentIndex].src || currentGroup[currentIndex].dataset.src || currentGroup[currentIndex];
        };

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        };

        // Event listeners
        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);
        if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
        });

        // Auto-attach lightbox to images
        this.attachLightboxToImages();
    }

    attachLightboxToImages() {
        // Location map
        const locationMapImg = document.querySelector('.location-map img');
        if (locationMapImg) {
            locationMapImg.style.cursor = 'zoom-in';
            locationMapImg.addEventListener('click', function() {
                window.openLightboxWithGroup(0, [this]);
            });
        }

        // Gallery images
        const attachToGroup = (selector) => {
            const images = Array.from(document.querySelectorAll(selector));
            images.forEach((img, idx) => {
                img.style.cursor = 'zoom-in';
                img.addEventListener('click', function(e) {
                    e.stopPropagation();
                    window.openLightboxWithGroup(idx, images);
                });
            });
        };

        attachToGroup('.gallerySwiper .gallery-item img');
        attachToGroup('.productSplide .splide__slide img');
        attachToGroup('.galleryAlbumSwiper .swiper-slide img');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new LazyLoader();
});

// Service Worker registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}