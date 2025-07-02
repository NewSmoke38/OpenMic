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

// API Integration
const API_BASE = window.location.hostname === 'localhost' 
    ? 'http://localhost:8000/api/v1' 
    : 'https://openmic-h10h.onrender.com/api/v1';
const AUTH_BASE = `${API_BASE}/auth`;
const MESSAGES_BASE = `${API_BASE}/messages`;

// Register API call
async function registerUser(username, email, password, fullName) {
    try {
        const response = await fetch(`${AUTH_BASE}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password, fullName })
        });
        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        console.error('Register error:', error);
        return { success: false, data: { message: 'Network error' } };
    }
}

// Login API call
async function loginUser(email, password) {
    try {
        const response = await fetch(`${AUTH_BASE}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, data: { message: 'Network error' } };
    }
}

// Logout API call
async function logoutUser() {
    try {
        const response = await fetch(`${AUTH_BASE}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        console.error('Logout error:', error);
        return { success: false, data: { message: 'Network error' } };
    }
}

// Message API calls
async function createMessage(content, author, authorId) {
    try {
        const response = await fetch(`${MESSAGES_BASE}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content, author, authorId })
        });
        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        console.error('Create message error:', error);
        return { success: false, data: { message: 'Network error' } };
    }
}

async function fetchMessages() {
    try {
        const response = await fetch(`${MESSAGES_BASE}`);
        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        console.error('Fetch messages error:', error);
        return { success: false, data: { message: 'Network error' } };
    }
}

async function updateMessage(id, content) {
    try {
        const response = await fetch(`${MESSAGES_BASE}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content })
        });
        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        console.error('Update message error:', error);
        return { success: false, data: { message: 'Network error' } };
    }
}

async function deleteMessage(id) {
    try {
        const response = await fetch(`${MESSAGES_BASE}/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        console.error('Delete message error:', error);
        return { success: false, data: { message: 'Network error' } };
    }
}

async function likeMessage(id) {
    try {
        const response = await fetch(`${MESSAGES_BASE}/${id}/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                userId: currentUser?.id || '000000000000000000000000' 
            })
        });
        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        console.error('Like message error:', error);
        return { success: false, data: { message: 'Network error' } };
    }
}

// Auth state management
let isLoggedIn = false;
let currentUser = null;

// Logout function
async function handleLogout() {
    try {
        const result = await logoutUser();
        
        if (result.success) {
            console.log('Logout successful:', result.data);
            isLoggedIn = false;
            currentUser = null;
            
            // Update UI to show logged out state
            document.getElementById('loginBtn').classList.remove('hidden');
            document.getElementById('signupBtn').classList.remove('hidden');
            document.getElementById('logoutBtn').classList.add('hidden');
            
            alert('Logout successful!');
        } else {
            console.log('Logout failed:', result.data.message);
            alert('Logout failed: ' + result.data.message);
        }
    } catch (error) {
        console.error('Error logging out:', error);
        alert('Failed to logout. Please try again.');
    }
}

// Make functions globally accessible
window.handleLogout = handleLogout;
window.editMessage = editMessage;
window.deleteMessageHandler = deleteMessageHandler;
window.toggleLike = toggleLike;

// Theme handling
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
    themeToggle.innerHTML = `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
}

// Theme toggle handler
themeToggle.addEventListener('click', () => {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }
});

// Messages array (will be populated from API)
let messages = [];

// Load messages from API
async function loadMessages() {
    try {
        console.log('Fetching messages from API...');
        const result = await fetchMessages();
        
        if (result.success) {
            messages = result.data.messages || [];
            console.log('Messages loaded:', messages);
            renderMessages();
        } else {
            console.error('Failed to load messages:', result.data.message);
            alert('Failed to load messages: ' + result.data.message);
        }
    } catch (error) {
        console.error('Error fetching messages:', error);
        alert('Failed to load messages. Please refresh the page.');
    }
}

// Add event listener for page load
document.addEventListener('DOMContentLoaded', () => {
    // Only fetch messages if we're on the main page (where messageFeed exists)
    if (document.getElementById('messageFeed')) {
        loadMessages();
    }
    
    // Check auth state
    if (isLoggedIn) {
        document.getElementById('loginBtn').classList.add('hidden');
        document.getElementById('signupBtn').classList.add('hidden');
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) logoutBtn.classList.remove('hidden');
    }
});

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

// Update the message form submission
messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const messageContent = document.getElementById('messageContent').value;
    
    if (!messageContent.trim()) {
        alert('Please enter a message!');
        return;
    }

    try {
        const result = await createMessage(
            messageContent,
            currentUser?.username || 'Anonymous',
            currentUser?.id || '000000000000000000000000'
        );
        
        if (result.success) {
            console.log('Message created successfully:', result.data);
            
            // Refresh messages from server
            await loadMessages();
            
            // Reset and close modal
            messageForm.reset();
            createMessageModal.classList.add('hidden');
            createMessageModal.classList.remove('flex');
            
            alert('Message posted successfully!');
        } else {
            console.log('Message creation failed:', result.data.message);
            alert('Failed to post message: ' + result.data.message);
        }
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
    
    try {
        const result = await loginUser(email, password);
        
        if (result.success) {
            console.log('Login successful:', result.data);
            isLoggedIn = true;
            currentUser = {
                email: result.data.user.email,
                username: result.data.user.username,
                id: result.data.user._id || result.data.user.id
            };
            
            // Reset and close modal
            loginForm.reset();
            loginModal.classList.add('hidden');
            loginModal.classList.remove('flex');
            
            // Update UI to show logged in state
            document.getElementById('loginBtn').classList.add('hidden');
            document.getElementById('signupBtn').classList.add('hidden');
            document.getElementById('logoutBtn').classList.remove('hidden');
            
            alert('Login successful!');
        } else {
            console.log('Login failed:', result.data.message);
            alert('Login failed: ' + result.data.message);
        }
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
    
    const username = document.getElementById('signupName').value; // Using name field for username
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const fullName = document.getElementById('signupName').value; // Using name as fullName
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
        const result = await registerUser(username, email, password, fullName);
        
        if (result.success) {
            console.log('Registration successful:', result.data);
            
            // Reset and close modal
            signupForm.reset();
            signupModal.classList.add('hidden');
            signupModal.classList.remove('flex');
            
            alert('Registration successful! You can now login.');
        } else {
            console.log('Registration failed:', result.data.message);
            alert('Registration failed: ' + result.data.message);
        }
    } catch (error) {
        console.error('Error signing up:', error);
        alert('Failed to sign up. Please try again.');
    }
});

// Render messages
function renderMessages() {
    // Check if there are no messages
    if (messages.length === 0) {
        messageFeed.innerHTML = `
            <div class="bg-white/80 backdrop-blur-sm rounded-xl p-12 shadow-lg text-center">
                <div class="text-6xl mb-4">📝</div>
                <h3 class="text-xl font-semibold text-gray-700 mb-2">No messages yet</h3>
                <p class="text-gray-600">Be the first to share your thoughts!</p>
                <button onclick="document.getElementById('createMessageBtn').click()" class="mt-4 px-6 py-2 bg-pastel-purple/60 hover:bg-pastel-purple/80 text-white rounded-full transition-all">
                    Create First Message
                </button>
            </div>
        `;
        return;
    }
    
    // Render oldest at top, newest at bottom
    messageFeed.innerHTML = messages.slice().reverse().map(message => {
        // Check if current user has liked this message
        const userLiked = message.likedBy && message.likedBy.some(id => id.toString() === currentUser?.id);
        
        // Debug logging
        console.log('Message:', message._id, 'Current User ID:', currentUser?.id, 'LikedBy:', message.likedBy, 'UserLiked:', userLiked);
        
        return `
        <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div class="flex justify-between items-start mb-4">
                <h3 class="author font-semibold">${escapeHtml(message.author)}</h3>
                <span class="text-sm text-gray-500">${formatTimestamp(message.timestamp || message.createdAt)}</span>
            </div>
            <p class="text-gray-700 mb-4">${escapeHtml(message.content)}</p>
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-1">
                    <button onclick="toggleLike('${message._id}')" class="like-btn ${isLoggedIn ? 'text-[#c49ac4] hover:text-[#a87aa8] cursor-pointer' : 'text-gray-400 cursor-not-allowed opacity-50'} transition-colors flex items-center gap-1">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="${userLiked ? 'currentColor' : 'none'}" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span class="text-sm">${message.likes || 0}</span>
                    </button>
                </div>
                ${isLoggedIn && message.author === currentUser?.username ? `
                    <div class="flex space-x-2">
                        <button onclick="editMessage('${message._id}')" class="text-gray-500 hover:text-gray-700">
                            ✏️
                        </button>
                        <button onclick="deleteMessageHandler('${message._id}')" class="text-gray-500 hover:text-red-500">
                            🗑️
                        </button>
                    </div>
                ` : ''}
            </div>
        </div>
    `}).join('');
    
    // Scroll to top to show oldest messages first (with small delay to ensure DOM update)
    setTimeout(() => {
        messageFeed.scrollTop = 0;
    }, 10);
}

// Update the like function to use backend API
async function toggleLike(messageId) {
    // Check if user is logged in
    if (!isLoggedIn) {
        alert('Please log in to like messages!');
        return;
    }
    
    try {
        const result = await likeMessage(messageId);
        
        if (result.success) {
            console.log('Message liked successfully:', result.data);
            await loadMessages(); // Refresh messages to show updated like count
        } else {
            console.log('Like failed:', result.data.message);
            alert('Failed to like message: ' + result.data.message);
        }
    } catch (error) {
        console.error('Error liking message:', error);
        alert('Failed to like message. Please try again.');
    }
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

// Update the edit message function
async function editMessage(id) {
    const message = messages.find(m => m._id === id);
    if (!message) return;

    const newContent = prompt('Edit your message:', message.content);
    if (newContent === null || newContent === message.content) return;

    try {
        const result = await updateMessage(id, newContent);
        
        if (result.success) {
            console.log('Message updated successfully:', result.data);
            await loadMessages(); // Refresh messages from server
        } else {
            console.log('Message update failed:', result.data.message);
            alert('Failed to update message: ' + result.data.message);
        }
    } catch (error) {
        console.error('Error editing message:', error);
        alert('Failed to edit message. Please try again.');
    }
}

// Update the delete message function
async function deleteMessageHandler(id) {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
        const result = await deleteMessage(id);
        
        if (result.success) {
            console.log('Message deleted successfully:', result.data);
            await loadMessages(); // Refresh messages from server
        } else {
            console.log('Message deletion failed:', result.data.message);
            alert('Failed to delete message: ' + result.data.message);
        }
    } catch (error) {
        console.error('Error deleting message:', error);
        alert('Failed to delete message. Please try again.');
    }
}

// Messages will be loaded from API when page loads 