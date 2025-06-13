// DOM Elements
const messageFeed = document.getElementById('messageFeed');
const createMessageBtn = document.getElementById('createMessageBtn');
const createMessageModal = document.getElementById('createMessageModal');
const messageForm = document.getElementById('messageForm');
const cancelBtn = document.getElementById('cancelBtn');
const themeToggle = document.getElementById('themeToggle');
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const loginCancelBtn = document.getElementById('loginCancelBtn');
const signupBtn = document.getElementById('signupBtn');
const signupModal = document.getElementById('signupModal');
const signupForm = document.getElementById('signupForm');
const signupCancelBtn = document.getElementById('signupCancelBtn');

// Theme handling
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
    themeToggle.textContent = '☀️';
}

// Theme toggle handler
themeToggle.addEventListener('click', () => {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙';
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
    }
});

// Sample messages array (replace with API calls in production)
let messages = [
    {
        id: 1,
        author: "Lila the Lamb",
        content: "Welcome to the sheep box! 🐑",
        timestamp: new Date(Date.now() - 1000 * 60 * 2),
    },
    {
        id: 2,
        author: "Wooly",
        content: "This is so cute!",
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
    },
    {
        id: 3,
        author: "Shepherd",
        content: "Leave your message in the box below!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
    },
];

// Modal handling
createMessageBtn.addEventListener('click', () => {
    createMessageModal.classList.remove('hidden');
    createMessageModal.classList.add('flex');
});

cancelBtn.addEventListener('click', () => {
    createMessageModal.classList.add('hidden');
    createMessageModal.classList.remove('flex');
    messageForm.reset();
});

// Close modal when clicking outside
createMessageModal.addEventListener('click', (e) => {
    if (e.target === createMessageModal) {
        createMessageModal.classList.add('hidden');
        createMessageModal.classList.remove('flex');
        messageForm.reset();
    }
});

// Message form submission
messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const authorName = document.getElementById('authorName').value;
    const messageContent = document.getElementById('messageContent').value;
    
    const newMessage = {
        id: Date.now(),
        author: authorName,
        content: messageContent,
        timestamp: new Date(),
    };

    try {
        // In production, replace with actual API call
        // await fetch('/messages', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(newMessage)
        // });
        
        messages.unshift(newMessage);
        renderMessages();
        
        // Reset and close modal
        messageForm.reset();
        createMessageModal.classList.add('hidden');
        createMessageModal.classList.remove('flex');
    } catch (error) {
        console.error('Error posting message:', error);
        alert('Failed to post message. Please try again.');
    }
});

// Login modal handling
loginBtn.addEventListener('click', () => {
    loginModal.classList.remove('hidden');
    loginModal.classList.add('flex');
});

loginCancelBtn.addEventListener('click', () => {
    loginModal.classList.add('hidden');
    loginModal.classList.remove('flex');
    loginForm.reset();
});

// Close login modal when clicking outside
loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.add('hidden');
        loginModal.classList.remove('flex');
        loginForm.reset();
    }
});

// Login form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    try {
        // In production, replace with actual API call
        // await fetch('/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email, password, rememberMe })
        // });
        
        console.log('Login attempt:', { email, password, rememberMe });
        
        // Reset and close modal
        loginForm.reset();
        loginModal.classList.add('hidden');
        loginModal.classList.remove('flex');
    } catch (error) {
        console.error('Error logging in:', error);
        alert('Failed to login. Please try again.');
    }
});

// Sign Up modal handling
signupBtn.addEventListener('click', () => {
    signupModal.classList.remove('hidden');
    signupModal.classList.add('flex');
});

signupCancelBtn.addEventListener('click', () => {
    signupModal.classList.add('hidden');
    signupModal.classList.remove('flex');
    signupForm.reset();
});

// Close sign up modal when clicking outside
signupModal.addEventListener('click', (e) => {
    if (e.target === signupModal) {
        signupModal.classList.add('hidden');
        signupModal.classList.remove('flex');
        signupForm.reset();
    }
});

// Sign Up form submission
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const termsAgree = document.getElementById('termsAgree').checked;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    if (!termsAgree) {
        alert('Please agree to the Terms and Conditions');
        return;
    }
    
    try {
        // In production, replace with actual API call
        // await fetch('/signup', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ name, email, password })
        // });
        
        console.log('Sign up attempt:', { name, email, password, termsAgree });
        
        // Reset and close modal
        signupForm.reset();
        signupModal.classList.add('hidden');
        signupModal.classList.remove('flex');
    } catch (error) {
        console.error('Error signing up:', error);
        alert('Failed to sign up. Please try again.');
    }
});

// Render messages
function renderMessages() {
    // Render oldest at top, newest at bottom
    messageFeed.innerHTML = messages.slice().reverse().map(message => `
        <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div class="flex justify-between items-start mb-4">
                <h3 class="author font-semibold">${escapeHtml(message.author)}</h3>
                <span class="text-sm text-gray-500">${formatTimestamp(message.timestamp)}</span>
            </div>
            <p class="text-gray-700 mb-4">${escapeHtml(message.content)}</p>
            <div class="flex justify-end space-x-2">
                <button onclick="editMessage(${message.id})" class="text-gray-500 hover:text-gray-700">
                    ✏️
                </button>
                <button onclick="deleteMessage(${message.id})" class="text-gray-500 hover:text-red-500">
                    🗑️
                </button>
            </div>
        </div>
    `).join('');
    // Auto-scroll to bottom
    messageFeed.scrollTop = messageFeed.scrollHeight;
}

// Helper function to format timestamp
function formatTimestamp(timestamp) {
    const now = new Date();
    const diff = now - new Date(timestamp);
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (minutes < 60) return `${minutes} min${minutes === 1 ? '' : 's'} ago`;
    if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    return `${days} day${days === 1 ? '' : 's'} ago`;
}

// Helper function to escape HTML
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Message actions
function editMessage(id) {
    const message = messages.find(m => m.id === id);
    if (!message) return;
    
    // Populate modal with message data
    document.getElementById('authorName').value = message.author;
    document.getElementById('messageContent').value = message.content;
    
    // Show modal
    createMessageModal.classList.remove('hidden');
    createMessageModal.classList.add('flex');
    
    // Update message on form submit
    messageForm.onsubmit = async (e) => {
        e.preventDefault();
        
        message.author = document.getElementById('authorName').value;
        message.content = document.getElementById('messageContent').value;
        message.timestamp = new Date();
        
        try {
            // In production, replace with actual API call
            // await fetch(`/messages/${id}`, {
            //     method: 'PUT',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(message)
            // });
            
            renderMessages();
            
            // Reset and close modal
            messageForm.reset();
            createMessageModal.classList.add('hidden');
            createMessageModal.classList.remove('flex');
            messageForm.onsubmit = null; // Reset to default submit handler
        } catch (error) {
            console.error('Error updating message:', error);
            alert('Failed to update message. Please try again.');
        }
    };
}

function deleteMessage(id) {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    try {
        // In production, replace with actual API call
        // await fetch(`/messages/${id}`, { method: 'DELETE' });
        
        messages = messages.filter(m => m.id !== id);
        renderMessages();
    } catch (error) {
        console.error('Error deleting message:', error);
        alert('Failed to delete message. Please try again.');
    }
}

// Initial render
renderMessages(); 