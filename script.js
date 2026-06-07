// Modal Functions
        function openModal(projectName) {
            const modalMap = {
                'brainwave': 'brainwaveModal',
                'trivia': 'triviaModal'
            };
            const modal = document.getElementById(modalMap[projectName]);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        }

        function closeModal(projectName) {
            const modalMap = {
                'brainwave': 'brainwaveModal',
                'trivia': 'triviaModal'
            };
            const modal = document.getElementById(modalMap[projectName]);
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            if (event.target.classList.contains('modal')) {
                event.target.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href.startsWith('#') && href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });

        // Hire Me button
        document.querySelector('.hire-btn').addEventListener('click', function() {
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        });

        // Contact form handling
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Create mailto link
            const subject = 'Portfolio Contact from ' + name;
            const body = 'Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message;
            const mailtoLink = 'mailto:dagidag1995@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
            
            window.location.href = mailtoLink;
            this.reset();
        });

        // Add scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideUp 0.8s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.project-card, .stat').forEach(el => {
            observer.observe(el);
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal').forEach(modal => {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                });
            }
        });

        // Add active state to nav links based on scroll position
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section');
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            document.querySelectorAll('nav a').forEach(link => {
                if (link.getAttribute('href').slice(1) === current) {
                    link.style.color = 'var(--primary)';
                } else {
                    link.style.color = 'var(--text-secondary)';
                }
            });
        });

        // Animated greeting
        const greetings = [
            "Hi, I'm Dagim 👋",
            "Welcome to my portfolio ✨",
            "Let's build something great 🚀",
            "AI & Full-Stack Dev 🧠",
            "Nice to meet you! 😊"
        ];
        let gIdx = 0;
        const greetingEl = document.getElementById('greeting-text');

        function typeText(text, cb) {
            greetingEl.textContent = '';
            let i = 0;
            const timer = setInterval(() => {
                greetingEl.textContent += text[i];
                i++;
                if (i >= text.length) {
                    clearInterval(timer);
                    setTimeout(cb, 2200);
                }
            }, 60);
        }

        function eraseText(cb) {
            let text = greetingEl.textContent;
            const timer = setInterval(() => {
                text = text.slice(0, -1);
                greetingEl.textContent = text;
                if (text.length === 0) {
                    clearInterval(timer);
                    cb();
                }
            }, 35);
        }

        function cycleGreeting() {
            typeText(greetings[gIdx], () => {
                eraseText(() => {
                    gIdx = (gIdx + 1) % greetings.length;
                    cycleGreeting();
                });
            });
        }

        cycleGreeting();