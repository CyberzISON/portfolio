// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Skill cards hover effect
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Add your form submission logic here
    alert('Thank you for your message! This is a demo form.');
    this.reset();
});

// Typing text animation
const texts = ['Full Stack Developer', 'Python Developer', 'Web Developer'];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';

function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);
    
    document.querySelector('.typing-text').textContent = letter;
    
    if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 2000);
    } else {
        setTimeout(type, 100);
    }
}

// Start the typing animation
type();

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded'); // Debug log

    // Get DOM elements
    const toggleButton = document.getElementById('chatbot-toggle');
    const closeButton = document.getElementById('chatbot-close');
    const chatbox = document.getElementById('chatbot-box');
    const input = document.getElementById('chatbot-input');
    const sendButton = document.getElementById('chatbot-send');
    const messagesContainer = document.getElementById('chatbot-messages');

    // Debug logs
    console.log('Toggle button:', toggleButton);
    console.log('Chatbox:', chatbox);

    // Check if elements exist
    if (!toggleButton || !closeButton || !chatbox || !input || !sendButton || !messagesContainer) {
        console.error('Missing elements:', {
            toggleButton,
            closeButton,
            chatbox,
            input,
            sendButton,
            messagesContainer
        });
        return;
    }

    // Toggle chatbox
    function toggleChatbox() {
        console.log('Toggle clicked'); // Debug log
        const isVisible = chatbox.style.display === 'flex';
        chatbox.style.display = isVisible ? 'none' : 'flex';
        if (!isVisible) {
            input.focus();
        }
    }

    // Add message to chat
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = isUser ? 'user-message' : 'bot-message';
        messageDiv.textContent = content;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Handle command
    function handleCommand(command) {
        const cmd = command.toLowerCase().trim();
        let response = '';

        switch(cmd) {
            case '1':
            case 'skills':
                response = 'Skills: Python, HTML, CSS, JavaScript, React JS, Basic SQL';
                break;
            case '2':
            case 'info':
                response = 'Souvik Ghosh, born December 12, 2003. Software Development (2022-2024)';
                break;
            case '3':
            case 'projects':
                response = 'Projects: File Sharing Website, Mini Minecraft Clone, Portfolio Website, TO-DO List';
                break;
            case '4':
            case 'exit':
                toggleChatbox();
                return;
            default:
                response = 'Unknown command. Try: 1.Skills, 2.Info, 3.Projects, 4.Exit';
        }
        addMessage(response);
    }

    // Send message
    function sendMessage() {
        const message = input.value.trim();
        if (message) {
            addMessage(message, true);
            handleCommand(message);
            input.value = '';
        }
    }

    // Event listeners for chatbot
    if (toggleButton) {
        toggleButton.addEventListener('click', (e) => {
            e.preventDefault();
            toggleChatbox();
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', (e) => {
            e.preventDefault();
            toggleChatbox();
        });
    }

    if (sendButton) {
        sendButton.addEventListener('click', (e) => {
            e.preventDefault();
            sendMessage();
        });
    }

    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    // Make toggleChatbox function available globally
    window.toggleChatbox = toggleChatbox;

    // Initialize chatbox as hidden
    if (chatbox) {
        chatbox.style.display = 'none';
    }

    console.log('Chatbot initialized successfully');
}); 