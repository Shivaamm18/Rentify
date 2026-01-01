# Rentify 🏠

Premium Rental Property Platform for India. Built with the MERN Stack.

![Rentify Hero](https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)

## 🌟 Features

- **Premium UI**: Ultra-modern, responsive design using Tailwind CSS and Framer Motion.
- **Smart Search**: Advanced filtering by BHK, budget, location, and furnishing.
- **Owner Verification**: Trusted listings with verified property details.
- **Subscription Model**: Unlock owner contact details with premium plans.
- **Responsive Design**: Optimized for mobile, tablet, and desktop views.
- **Secure Auth**: JWT-based authentication for users and owners.

## 🚀 Tech Stack

- **Frontend**: React.js, Tailwind CSS, Framer Motion, React Icons.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Atlas).
- **Authentication**: JSON Web Tokens (JWT).
- **Deployment**: Vercel (Frontend), Render (Backend).

## 🛠️ Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Shivaamm18/Rentify.git
   cd Rentify
   ```

2. **Install dependencies**:
   ```bash
   npm run install-all
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_jwt_secret
   PORT=5001
   ```

4. **Run the application**:
   ```bash
   npm run dev
   ```

## 📦 Deployment

### Frontend (Vercel)
- Connect your GitHub repo.
- Set **Root Directory** to `client`.
- Add environment variable `REACT_APP_API_URL` pointing to your backend.

### Backend (Render)
- Connect your GitHub repo.
- Set **Root Directory** to `server`.
- Add environment variables `MONGODB_URI`, `JWT_SECRET`, etc.

## 📄 License

MIT License. Feel free to use this project for your own purposes!
