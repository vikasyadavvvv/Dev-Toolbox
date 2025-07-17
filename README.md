# Dev Toolbox 🧰

A developer utility web application featuring JSON formatting and Base64 encoding/decoding tools with history tracking.

<img width="1891" height="985" alt="image" src="https://github.com/user-attachments/assets/37db0bd7-2cec-4d5c-99d8-73d57856a119" />

## Features ✨

- **JSON Formatter**:
  - Beautifies raw JSON with proper indentation
  - Syntax validation and error handling
  - Copy to clipboard functionality

- **Base64 Tools**:
  - Encode plain text to Base64
  - Decode Base64 to plain text
  - Toggle between encode/decode modes

- **History Tracking** (Bonus):
  - View all processed JSON documents
  - MongoDB database storage
  - Paginated results

## Technologies Used 🛠️

### Frontend
- React.js (Vite)
- Tailwind CSS
- React Icons
- Framer Motion (animations)
- Axios (HTTP client)

### Backend
- Node.js
- Express
- MongoDB (with Mongoose)
- CORS middleware


### Setup

**Environment Variables**:
PORT=5000

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/dev-toolbox.git
   cd dev-toolbox
   ```
   
```bash
   cd backend
   npm install
   npm start
```

```bash
cd frontend
npm install
npm run dev
```

