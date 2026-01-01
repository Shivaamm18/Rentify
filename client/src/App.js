import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PropertyList from './pages/PropertyList';
import PropertyDetail from './pages/PropertyDetail';
import AddProperty from './pages/AddProperty';
import MyProperties from './pages/MyProperties';
import SubscriptionPlans from './pages/SubscriptionPlans';
import Profile from './pages/Profile';
import AdminPage from './pages/AdminPage';
import PrivateRoute from './components/PrivateRoute';
// import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/properties" element={<PropertyList />} />
              <Route path="/properties/:id" element={<PropertyDetail />} />
              
              <Route path="/add-property" element={
                <PrivateRoute>
                  <AddProperty />
                </PrivateRoute>
              } />
              
              <Route path="/my-properties" element={
                <PrivateRoute>
                  <MyProperties />
                </PrivateRoute>
              } />
              
              <Route path="/subscription-plans" element={<SubscriptionPlans />} />
              
              <Route path="/profile" element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } />
              
              <Route path="/admin" element={
                <PrivateRoute>
                  <AdminPage />
                </PrivateRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
