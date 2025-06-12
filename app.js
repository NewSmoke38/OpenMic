// DOM Elements
const messageFeed = document.getElementById('messageFeed');
const createMessageBtn = document.getElementById('createMessageBtn');
const createMessageModal = document.getElementById('createMessageModal');
const messageForm = document.getElementById('messageForm');
const cancelBtn = document.getElementById('cancelBtn');

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

// Render messages
function renderMessages() {
    messageFeed.innerHTML = messages.map(message => `
        <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div class="flex justify-between items-start mb-4">
                <h3 class="font-semibold text-gray-800">${escapeHtml(message.author)}</h3>
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