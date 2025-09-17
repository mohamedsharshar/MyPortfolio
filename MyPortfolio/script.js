// ===== MODERN PORTFOLIO JAVASCRIPT =====

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initLoadingScreen();
    initNavbar();
    initHeroAnimations();
    initProjectFilter();
    initModal();
    initContactForm();
    initBackToTop();
    initAOS();
    initSkillProgressBars();
    initStatsCounter();
    initChatbot(); // Add chatbot initialization
});

// ===== LOADING SCREEN =====
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            loadingScreen.style.opacity = '0';
            setTimeout(function() {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000);
    });
}

// ===== NAVBAR FUNCTIONALITY =====
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function() {
            navbarToggle.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu
                if (navbarMenu.classList.contains('active')) {
                    navbarToggle.classList.remove('active');
                    navbarMenu.classList.remove('active');
                }
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== HERO ANIMATIONS =====
function initHeroAnimations() {
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroText && heroImage) {
        // Add entrance animations
        setTimeout(() => {
            heroText.classList.add('fade-in');
        }, 500);
        
        setTimeout(() => {
            heroImage.classList.add('slide-up');
        }, 1000);
    }

    // Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// ===== PROJECT FILTER SYSTEM =====
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    let visibleProjects = 6; // Show 6 projects initially
    let currentFilter = 'all';

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            currentFilter = filterValue;
            
            filterProjects(filterValue);
        });
    });

    function filterProjects(filter) {
        projectItems.forEach((item, index) => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.classList.remove('hidden');
                }, 10);
            } else {
                item.classList.add('hidden');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
        
        // Reset visible projects counter
        visibleProjects = 6;
        updateProjectVisibility();
    }

    // Load more functionality
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            visibleProjects += 6;
            updateProjectVisibility();
        });
    }

    function updateProjectVisibility() {
        const visibleItems = Array.from(projectItems).filter(item => {
            const category = item.getAttribute('data-category');
            return currentFilter === 'all' || category === currentFilter;
        });

        visibleItems.forEach((item, index) => {
            if (index < visibleProjects) {
                item.style.display = 'block';
                item.classList.remove('hidden');
            } else {
                item.style.display = 'none';
            }
        });

        // Hide load more button if all projects are visible
        if (loadMoreBtn) {
            loadMoreBtn.style.display = visibleProjects >= visibleItems.length ? 'none' : 'inline-flex';
        }
    }

    // Initial setup
    updateProjectVisibility();
}

// ===== MODAL FUNCTIONALITY =====
function initModal() {
    const modal = document.getElementById('project-modal');
    const closeModal = document.querySelector('.close-modal');
    const projectItems = document.querySelectorAll('.project-item');

    // Open modal
    projectItems.forEach(item => {
        const viewBtn = item.querySelector('.btn-view');
        if (viewBtn) {
            viewBtn.addEventListener('click', function(e) {
                e.preventDefault();
                openProjectModal(item);
            });
        }
    });

    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', closeProjectModal);
    }

    // Close modal on background click
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeProjectModal();
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeProjectModal();
        }
    });

    function openProjectModal(projectItem) {
        if (!modal) return;

        const title = projectItem.querySelector('h3').textContent;
        const description = projectItem.querySelector('p').textContent;
        const image = projectItem.querySelector('img').src;
        const category = projectItem.getAttribute('data-category');
        const techTags = projectItem.querySelectorAll('.tech-tag');

        // Update modal content
        const modalTitle = modal.querySelector('.modal-info h3');
        const modalDescription = modal.querySelector('.modal-info p');
        const modalImage = modal.querySelector('.modal-image img');
        const modalTech = modal.querySelector('.modal-tech');

        if (modalTitle) modalTitle.textContent = title;
        if (modalDescription) modalDescription.textContent = description;
        if (modalImage) modalImage.src = image;
        
        // Update tech tags
        if (modalTech) {
            modalTech.innerHTML = '';
            techTags.forEach(tag => {
                const newTag = tag.cloneNode(true);
                modalTech.appendChild(newTag);
            });
        }

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const service = formData.get('service');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('يرجى إدخال بريد إلكتروني صحيح', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('جاري إرسال الرسالة...', 'info');
            
            setTimeout(() => {
                showNotification('تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.', 'success');
                contactForm.reset();
            }, 2000);
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
        font-family: 'Cairo', sans-serif;
        direction: rtl;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== AOS ANIMATION INITIALIZATION =====
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-quart',
            once: true,
            offset: 100,
            delay: 100
        });
    }
}

// ===== SKILL PROGRESS BARS =====
function initSkillProgressBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress-bar');
                if (progressBar) {
                    const percentage = progressBar.getAttribute('data-percentage') || '80';
                    setTimeout(() => {
                        progressBar.style.width = percentage + '%';
                    }, 200);
                }
            }
        });
    }, { threshold: 0.3 });

    skillItems.forEach(item => {
        observer.observe(item);
    });
}

// ===== STATS COUNTER =====
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = parseInt(target.getAttribute('data-count') || target.textContent);
                animateCounter(target, 0, finalNumber, 2000);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    const range = end - start;

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Use easing function for smooth animation
        const easedProgress = easeOutQuart(progress);
        const current = Math.floor(start + (range * easedProgress));
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = end;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== CHATBOT FUNCTIONALITY =====
function initChatbot() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbot = document.getElementById('chatbot');
    const closeChatbot = document.getElementById('close-chatbot');
    const chatbotInput = document.getElementById('chatbot-input');
    const sendButton = document.getElementById('send-message');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const quickReplies = document.querySelectorAll('.quick-reply');
    const notificationBadge = document.getElementById('notification-badge');

    let isTyping = false;
    let conversationStarted = false;

    // Predefined responses
    const botResponses = {
        'أريد معرفة خدماتك': {
            text: 'أقدم خدمات متكاملة في تطوير الويب:\n\n🌐 تطوير مواقع الويب الديناميكية\n📱 تطوير تطبيقات الموبايل\n🎨 تصميم واجهات المستخدم (UI/UX)\n💻 برمجة المتاجر الإلكترونية\n⚡ تحسين الأداء والسرعة\n🔧 الصيانة والدعم الفني',
            quickReplies: ['عرض الأسعار', 'أمثلة على أعمالك', 'كيف أبدأ مشروعي؟']
        },
        'أريد رؤية أعمالك': {
            text: 'يمكنك مشاهدة أحدث أعمالي في قسم "المشاريع" أعلاه. تشمل:\n\n🏪 متاجر إلكترونية متكاملة\n📊 لوحات تحكم إدارية\n🎯 مواقع شركات احترافية\n📱 تطبيقات ويب تفاعلية\n\nكل مشروع مصمم بعناية ليحقق أهداف العميل.',
            quickReplies: ['أريد مثل هذا المشروع', 'ما التقنيات المستخدمة؟', 'كم المدة المطلوبة؟']
        },
        'كيف يمكنني التواصل معك؟': {
            text: 'يمكنك التواصل معي بعدة طرق:\n\n📱 واتساب: +201234567890\n📧 البريد الإلكتروني: mohamed@example.com\n💬 تلجرام: @mohameddev\n🌐 لينكد إن: Mohamed Sharshar\n\nأو يمكنك ملء نموذج التواصل في الموقع وسأرد عليك فوراً!',
            quickReplies: ['ملء نموذج التواصل', 'تحديد موعد مكالمة', 'سؤال سريع']
        },
        'كم سعر تطوير موقع؟': {
            text: 'أسعار تطوير المواقع تختلف حسب المتطلبات:\n\n💼 موقع تعريفي بسيط: 500-1000$\n🏪 متجر إلكتروني: 1500-3000$\n🏢 موقع شركة متكامل: 2000-5000$\n⚙️ تطبيق ويب مخصص: 3000-8000$\n\nالسعر النهائي يحدد بعد دراسة المشروع تفصيلياً.',
            quickReplies: ['طلب عرض سعر مخصص', 'ما المشمول في السعر؟', 'طرق الدفع المتاحة']
        },
        'default': {
            text: 'شكراً لك على تواصلك! 😊\n\nأنا محمد شرشر، مطور ويب متخصص في إنشاء مواقع ومتاجر إلكترونية احترافية.\n\nكيف يمكنني مساعدتك اليوم؟',
            quickReplies: ['خدماتك', 'أعمالك', 'الأسعار', 'التواصل']
        }
    };

    // Toggle chatbot
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', function() {
            toggleChatbot();
        });
    }

    // Close chatbot
    if (closeChatbot) {
        closeChatbot.addEventListener('click', function() {
            closeChatbotWindow();
        });
    }

    // Send message on button click
    if (sendButton) {
        sendButton.addEventListener('click', function() {
            sendMessage();
        });
    }

    // Send message on Enter key
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Quick replies
    quickReplies.forEach(reply => {
        reply.addEventListener('click', function() {
            const message = this.getAttribute('data-message');
            sendUserMessage(message);
            setTimeout(() => {
                respondToMessage(message);
            }, 500);
        });
    });

    function toggleChatbot() {
        if (chatbot.classList.contains('active')) {
            closeChatbotWindow();
        } else {
            openChatbotWindow();
        }
    }

    function openChatbotWindow() {
        chatbot.classList.add('active');
        chatbotToggle.classList.add('active');
        
        // Hide notification badge
        if (notificationBadge) {
            notificationBadge.classList.add('hidden');
        }

        // Focus on input
        setTimeout(() => {
            if (chatbotInput) {
                chatbotInput.focus();
            }
        }, 300);

        // Show welcome message if first time
        if (!conversationStarted) {
            setTimeout(() => {
                addBotMessage('مرحباً بك! 👋\n\nأنا محمد شرشر، مطور ويب محترف. أسعد بخدمتك!\n\nكيف يمكنني مساعدتك اليوم؟');
                showQuickReplies(['خدماتك', 'أعمالك', 'الأسعار', 'التواصل']);
            }, 1000);
            conversationStarted = true;
        }
    }

    function closeChatbotWindow() {
        chatbot.classList.remove('active');
        chatbotToggle.classList.remove('active');
    }

    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            sendUserMessage(message);
            chatbotInput.value = '';
            
            // Respond after a short delay
            setTimeout(() => {
                respondToMessage(message);
            }, 800);
        }
    }

    function sendUserMessage(message) {
        const messageElement = createMessageElement(message, 'user');
        chatbotMessages.appendChild(messageElement);
        scrollToBottom();
        hideQuickReplies();
    }

    function addBotMessage(message) {
        showTypingIndicator();
        
        setTimeout(() => {
            hideTypingIndicator();
            const messageElement = createMessageElement(message, 'bot');
            chatbotMessages.appendChild(messageElement);
            scrollToBottom();
        }, 1500);
    }

    function createMessageElement(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        const textElement = document.createElement('p');
        textElement.textContent = text;
        
        const timeElement = document.createElement('span');
        timeElement.className = 'message-time';
        timeElement.textContent = getCurrentTime();
        
        content.appendChild(textElement);
        content.appendChild(timeElement);
        
        if (sender === 'bot') {
            messageDiv.appendChild(avatar);
            messageDiv.appendChild(content);
        } else {
            messageDiv.appendChild(content);
            messageDiv.appendChild(avatar);
        }
        
        return messageDiv;
    }

    function respondToMessage(userMessage) {
        let response;
        const normalizedMessage = userMessage.toLowerCase();
        
        // Find matching response
        for (const [key, value] of Object.entries(botResponses)) {
            if (key !== 'default' && (
                normalizedMessage.includes(key) || 
                normalizedMessage.includes(key.toLowerCase()) ||
                userMessage === key
            )) {
                response = value;
                break;
            }
        }
        
        // Use default response if no match found
        if (!response) {
            if (normalizedMessage.includes('سعر') || normalizedMessage.includes('تكلفة') || normalizedMessage.includes('كلف')) {
                response = botResponses['كم سعر تطوير موقع؟'];
            } else if (normalizedMessage.includes('خدم') || normalizedMessage.includes('تطوير') || normalizedMessage.includes('برمج')) {
                response = botResponses['أريد معرفة خدماتك'];
            } else if (normalizedMessage.includes('عمل') || normalizedMessage.includes('مشروع') || normalizedMessage.includes('بورتفوليو')) {
                response = botResponses['أريد رؤية أعمالك'];
            } else if (normalizedMessage.includes('تواصل') || normalizedMessage.includes('اتصال') || normalizedMessage.includes('رقم')) {
                response = botResponses['كيف يمكنني التواصل معك؟'];
            } else {
                response = botResponses['default'];
            }
        }
        
        addBotMessage(response.text);
        
        // Show quick replies after bot message
        setTimeout(() => {
            if (response.quickReplies) {
                showQuickReplies(response.quickReplies);
            }
        }, 2000);
    }

    function showTypingIndicator() {
        if (isTyping) return;
        
        isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = '<i class="fas fa-robot"></i>';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        const dots = document.createElement('div');
        dots.className = 'typing-dots';
        dots.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
        
        content.appendChild(dots);
        typingDiv.appendChild(avatar);
        typingDiv.appendChild(content);
        
        chatbotMessages.appendChild(typingDiv);
        scrollToBottom();
    }

    function hideTypingIndicator() {
        isTyping = false;
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    function showQuickReplies(replies) {
        const quickRepliesContainer = document.getElementById('quick-replies');
        if (quickRepliesContainer) {
            quickRepliesContainer.innerHTML = '';
            
            replies.forEach(reply => {
                const button = document.createElement('button');
                button.className = 'quick-reply';
                button.setAttribute('data-message', reply);
                button.textContent = reply;
                
                button.addEventListener('click', function() {
                    const message = this.getAttribute('data-message');
                    sendUserMessage(message);
                    setTimeout(() => {
                        respondToMessage(message);
                    }, 500);
                });
                
                quickRepliesContainer.appendChild(button);
            });
        }
    }

    function hideQuickReplies() {
        const quickRepliesContainer = document.getElementById('quick-replies');
        if (quickRepliesContainer) {
            quickRepliesContainer.innerHTML = '';
        }
    }

    function scrollToBottom() {
        setTimeout(() => {
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }, 100);
    }

    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('ar-EG', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        });
    }

    // Show notification badge periodically
    setTimeout(() => {
        if (!conversationStarted && notificationBadge) {
            notificationBadge.classList.remove('hidden');
        }
    }, 10000); // Show after 10 seconds if user hasn't interacted
}

// ===== ADD NOTIFICATION ANIMATIONS =====
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);