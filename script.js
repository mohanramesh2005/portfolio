document.addEventListener('DOMContentLoaded', function() {
    // ========== Loading Screen ==========
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        window.addEventListener('load', function() {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        });
    }

    // ========== Mobile Navigation ==========
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('active');
            hamburger.innerHTML = nav.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        document.querySelectorAll('#nav a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // ========== Sticky Header ==========
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            header.classList.toggle('scrolled', window.scrollY > 100);
        });
    }

    // ========== Scroll Progress Bar ==========
    const progressBar = document.getElementById('myBar');
    if (progressBar) {
        window.addEventListener('scroll', function() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            progressBar.style.width = (winScroll / height) * 100 + '%';
        });
    }

    // ========== Back to Top Button ==========
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            backToTopButton.style.display = window.pageYOffset > 300 ? 'flex' : 'none';
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ========== Typing Animation ==========
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const words = ["AI Developer","Cybersecurity Specialist", "Full Stack Developer", "Cloud Engineer", "Python Developer"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentWord = words[wordIndex];
            typingText.textContent = currentWord.substring(0, charIndex);
            
            if (!isDeleting && charIndex < currentWord.length) {
                charIndex++;
                setTimeout(type, 100);
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
                setTimeout(type, 50);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 1000);
            }
        }
        setTimeout(type, 1500);
    }

    // ========== Smooth Scrolling ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header')?.offsetHeight || 80;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== Animate Skills ==========
    const skills = document.querySelectorAll('.skill');
    if (skills.length > 0) {
        function animateSkills() {
            skills.forEach(skill => {
                if (isElementInViewport(skill)) {
                    const skillLevel = skill.querySelector('.skill-level');
                    const percent = skill.getAttribute('data-percent');
                    skillLevel.style.width = percent + '%';
                }
            });
        }
        
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (rect.top <= window.innerHeight && rect.bottom >= 0);
        }
        
        window.addEventListener('scroll', animateSkills);
        animateSkills();
    }

    // ========== Project Cards ==========
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        // Hover effect
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = this.offsetWidth / 2;
            const centerY = this.offsetHeight / 2;
            
            this.style.transform = `perspective(1000px) rotateX(${(y - centerY) / 20}deg) rotateY(${(centerX - x) / 20}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
        
        // Click effect for project links
        const projectLinks = card.querySelectorAll('.project-link, .project-github');
        projectLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.stopPropagation();
                // Add your link handling logic here
                console.log('Project link clicked:', this.href);
            });
        });
    });

    // ========== Certificate Cards ==========
    const certificateCards = document.querySelectorAll('.certificate-card');
    certificateCards.forEach(card => {
        // Hover effect
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = this.offsetWidth / 2;
            const centerY = this.offsetHeight / 2;
            
            this.style.transform = `perspective(1000px) rotateX(${(y - centerY) / 20}deg) rotateY(${(centerX - x) / 20}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
        
        // Click effect for certificate links
        const certLinks = card.querySelectorAll('.view-certificate');
        certLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.stopPropagation();
                // Add your certificate viewing logic here
                console.log('Certificate link clicked:', this.href);
            });
        });
    });

    // ========== Form Submission ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent';
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalContent;
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }

    // ========== Dark Mode Toggle ==========
    const darkModeToggle = document.createElement('div');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(darkModeToggle);
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        this.innerHTML = document.body.classList.contains('dark-mode') ? 
            '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Initialize dark mode if preference exists
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});
