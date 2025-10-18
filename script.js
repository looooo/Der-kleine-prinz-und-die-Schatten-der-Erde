// Slide Navigation System
class SlideShow {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = document.querySelectorAll('.slide').length;
        this.slides = document.querySelectorAll('.slide');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.currentSlideSpan = document.getElementById('currentSlide');
        this.totalSlidesSpan = document.getElementById('totalSlides');
        this.progressBar = document.getElementById('progress');
        this.chapterBtns = document.querySelectorAll('.chapter-btn');
        
        this.init();
    }
    
    init() {
        // Set initial values
        this.totalSlidesSpan.textContent = this.totalSlides;
        this.updateSlide();
        
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.changeSlide(-1));
        this.nextBtn.addEventListener('click', () => this.changeSlide(1));
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.changeSlide(-1);
            } else if (e.key === 'ArrowRight') {
                this.changeSlide(1);
            } else if (e.key >= '1' && e.key <= '7') {
                this.goToSlide(parseInt(e.key) - 1);
            }
        });
        
        // Touch/swipe support
        this.addTouchSupport();
        
        // Auto-save progress
        this.loadProgress();
        
        // Update chapter buttons
        this.updateChapterButtons();
    }
    
    changeSlide(direction) {
        const newSlide = this.currentSlide + direction;
        
        if (newSlide >= 0 && newSlide < this.totalSlides) {
            this.goToSlide(newSlide);
        }
    }
    
    goToSlide(slideIndex) {
        if (slideIndex < 0 || slideIndex >= this.totalSlides) return;
        
        // Remove active class from current slide
        this.slides[this.currentSlide].classList.remove('active');
        
        // Add prev class for animation
        if (slideIndex < this.currentSlide) {
            this.slides[this.currentSlide].classList.add('prev');
        }
        
        // Update current slide
        this.currentSlide = slideIndex;
        
        // Add active class to new slide
        this.slides[this.currentSlide].classList.add('active');
        
        // Remove prev class after animation
        setTimeout(() => {
            this.slides.forEach(slide => slide.classList.remove('prev'));
        }, 600);
        
        this.updateSlide();
        this.saveProgress();
        this.updateChapterButtons();
        
        // Scroll to top of slide content
        const slideContent = this.slides[this.currentSlide].querySelector('.slide-content');
        if (slideContent) {
            slideContent.scrollTop = 0;
        }
    }
    
    updateSlide() {
        // Update slide indicator
        this.currentSlideSpan.textContent = this.currentSlide + 1;
        
        // Update navigation buttons
        this.prevBtn.disabled = this.currentSlide === 0;
        this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
        
        // Update progress bar
        const progress = ((this.currentSlide + 1) / this.totalSlides) * 100;
        this.progressBar.style.width = `${progress}%`;
        
        // Update page title
        const slideTitle = this.slides[this.currentSlide].querySelector('h1, h2');
        if (slideTitle) {
            document.title = `${slideTitle.textContent} - Der kleine Prinz und die Schatten der Erde`;
        }
    }
    
    updateChapterButtons() {
        this.chapterBtns.forEach((btn, index) => {
            btn.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    addTouchSupport() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const deltaX = startX - endX;
            const deltaY = startY - endY;
            
            // Only trigger if horizontal swipe is more significant than vertical
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    // Swipe left - next slide
                    this.changeSlide(1);
                } else {
                    // Swipe right - previous slide
                    this.changeSlide(-1);
                }
            }
        });
    }
    
    saveProgress() {
        localStorage.setItem('littlePrince_currentSlide', this.currentSlide);
    }
    
    loadProgress() {
        const savedSlide = localStorage.getItem('littlePrince_currentSlide');
        if (savedSlide !== null) {
            const slideIndex = parseInt(savedSlide);
            if (slideIndex >= 0 && slideIndex < this.totalSlides) {
                this.goToSlide(slideIndex);
            }
        }
    }
}

// Global functions for HTML onclick handlers
function changeSlide(direction) {
    slideShow.changeSlide(direction);
}

function goToSlide(slideIndex) {
    slideShow.goToSlide(slideIndex);
}

// Reading progress tracking
class ReadingTracker {
    constructor() {
        this.readingTimes = JSON.parse(localStorage.getItem('littlePrince_readingTimes') || '{}');
        this.currentSlideStartTime = Date.now();
        this.init();
    }
    
    init() {
        // Track when user changes slides
        document.addEventListener('slideChanged', () => {
            this.trackReadingTime();
        });
        
        // Track when user leaves the page
        window.addEventListener('beforeunload', () => {
            this.trackReadingTime();
        });
        
        // Track visibility changes (tab switching)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.trackReadingTime();
            } else {
                this.currentSlideStartTime = Date.now();
            }
        });
    }
    
    trackReadingTime() {
        const slideIndex = slideShow.currentSlide;
        const timeSpent = Date.now() - this.currentSlideStartTime;
        
        if (!this.readingTimes[slideIndex]) {
            this.readingTimes[slideIndex] = 0;
        }
        
        this.readingTimes[slideIndex] += timeSpent;
        localStorage.setItem('littlePrince_readingTimes', JSON.stringify(this.readingTimes));
        
        this.currentSlideStartTime = Date.now();
    }
    
    getTotalReadingTime() {
        return Object.values(this.readingTimes).reduce((total, time) => total + time, 0);
    }
    
    getReadingProgress() {
        const totalSlides = slideShow.totalSlides;
        const readSlides = Object.keys(this.readingTimes).length;
        return (readSlides / totalSlides) * 100;
    }
}

// Accessibility enhancements
class AccessibilityEnhancer {
    constructor() {
        this.init();
    }
    
    init() {
        // Add ARIA labels
        this.addAriaLabels();
        
        // Add skip navigation
        this.addSkipNavigation();
        
        // Enhance keyboard navigation
        this.enhanceKeyboardNavigation();
        
        // Add focus management
        this.manageFocus();
    }
    
    addAriaLabels() {
        const slides = document.querySelectorAll('.slide');
        slides.forEach((slide, index) => {
            slide.setAttribute('role', 'tabpanel');
            slide.setAttribute('aria-label', `Slide ${index + 1} of ${slides.length}`);
        });
        
        const navBtns = document.querySelectorAll('.nav-btn');
        navBtns[0].setAttribute('aria-label', 'Previous slide');
        navBtns[1].setAttribute('aria-label', 'Next slide');
        
        const chapterBtns = document.querySelectorAll('.chapter-btn');
        chapterBtns.forEach((btn, index) => {
            btn.setAttribute('aria-label', `Go to chapter ${index + 1}`);
        });
    }
    
    addSkipNavigation() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-color);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add main content ID
        const mainContent = document.querySelector('.slides-container');
        mainContent.id = 'main-content';
        mainContent.setAttribute('tabindex', '-1');
    }
    
    enhanceKeyboardNavigation() {
        // Add visible focus indicators
        const style = document.createElement('style');
        style.textContent = `
            .nav-btn:focus,
            .chapter-btn:focus {
                outline: 3px solid var(--accent-color);
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(style);
    }
    
    manageFocus() {
        // Focus management when slides change
        document.addEventListener('slideChanged', () => {
            const currentSlide = document.querySelector('.slide.active');
            const heading = currentSlide.querySelector('h1, h2');
            if (heading) {
                heading.setAttribute('tabindex', '-1');
                heading.focus();
            }
        });
    }
}

// Performance optimizations
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        // Lazy load images
        this.lazyLoadImages();
        
        // Preload next slide images
        this.preloadNextSlideImages();
        
        // Optimize animations
        this.optimizeAnimations();
    }
    
    lazyLoadImages() {
        const images = document.querySelectorAll('img[src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    preloadNextSlideImages() {
        document.addEventListener('slideChanged', () => {
            const nextSlideIndex = slideShow.currentSlide + 1;
            if (nextSlideIndex < slideShow.totalSlides) {
                const nextSlide = slideShow.slides[nextSlideIndex];
                const images = nextSlide.querySelectorAll('img');
                images.forEach(img => {
                    if (!img.complete) {
                        const preloadImg = new Image();
                        preloadImg.src = img.src;
                    }
                });
            }
        });
    }
    
    optimizeAnimations() {
        // Reduce animations for users who prefer reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const style = document.createElement('style');
            style.textContent = `
                * {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize slide show
    window.slideShow = new SlideShow();
    
    // Initialize reading tracker
    const readingTracker = new ReadingTracker();
    
    // Initialize accessibility enhancements
    const accessibilityEnhancer = new AccessibilityEnhancer();
    
    // Initialize performance optimizations
    const performanceOptimizer = new PerformanceOptimizer();
    
    // Custom event for slide changes
    const originalGoToSlide = slideShow.goToSlide.bind(slideShow);
    slideShow.goToSlide = function(slideIndex) {
        originalGoToSlide(slideIndex);
        document.dispatchEvent(new CustomEvent('slideChanged', { detail: { slideIndex } }));
    };
    
    // Add loading complete class
    document.body.classList.add('loaded');
    
    console.log('Der kleine Prinz - Website loaded successfully! 🌟');
    console.log('Navigation: Use arrow keys, swipe, or click the navigation buttons');
    console.log('Keyboard shortcuts: Numbers 1-7 to jump to specific chapters');
});
