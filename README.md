# OpenMic

A beautiful, minimalist public messaging web app built with HTML, Tailwind CSS, and vanilla JavaScript.

## Features

- 🎨 Elegant, modern UI with soft pastel colors and glassmorphism effects
- 📱 Fully responsive design that works on all devices
- 💬 Real-time message posting and updates
- ✏️ Edit and delete your own messages
- ⏰ Relative timestamps (e.g., "2 mins ago")
- 🎯 Bento grid layout for messages
- 🔒 Secure HTML escaping for user input

## Getting Started

1. Clone this repository
2. Open `index.html` in your web browser
3. Start sharing messages!

## Technical Details

- Built with vanilla JavaScript (no frameworks)
- Styled with Tailwind CSS
- Uses modern CSS features like backdrop-blur and gradients
- Implements proper security measures (HTML escaping)
- Ready for API integration (commented code included)

## API Integration

The app is ready to be connected to a backend API. Simply uncomment and modify the fetch calls in `app.js` to point to your API endpoints:

- `POST /messages` - Create a new message
- `PUT /messages/:id` - Update a message
- `DELETE /messages/:id` - Delete a message

## Browser Support

The app works in all modern browsers that support:
- CSS Grid
- Flexbox
- CSS Variables
- ES6+ JavaScript features

## License

MIT License - feel free to use this project for your own purposes! # OpenMic
