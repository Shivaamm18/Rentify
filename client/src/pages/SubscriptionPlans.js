import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { subscriptionAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import './SubscriptionPlans.css';

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState({});
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadSubscriptionPlans();
  }, []);

  const loadSubscriptionPlans = async () => {
    try {
      const response = await subscriptionAPI.getSubscriptionPlans();
      if (response.data.success) {
        setPlans(response.data.data.plans);
      }
    } catch (error) {
      console.error('Error fetching subscription plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planType) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // In a real implementation, this would integrate with Stripe
    // For now, we'll just show an alert
    alert(`Subscription to ${planType} plan would be processed in a real implementation`);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="subscription-plans-page">
      <div className="container">
        <div className="page-header">
          <h1>Choose Your Plan</h1>
          <p>Unlock premium features with our subscription plans</p>
        </div>

        <div className="plans-grid">
          {Object.entries(plans).map(([planType, plan]) => (
            <div key={planType} className="plan-card">
              <div className="plan-header">
                <h2>{plan.name}</h2>
                <div className="plan-price">
                  <span className="price">₹{plan.price.amount}</span>
                  <span className="duration">/month</span>
                </div>
              </div>

              <div className="plan-features">
                <h3>Features:</h3>
                <ul>
                  {plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="plan-actions">
                <button 
                  className={`btn ${planType === 'basic' ? 'btn-outline' : 'btn-primary'}`}
                  onClick={() => handleSubscribe(planType)}
                >
                  {planType === 'basic' ? 'Get Started' : 'Subscribe Now'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="subscription-info">
          <h3>Why Subscribe?</h3>
          <div className="info-grid">
            <div className="info-item">
              <h4>View Contact Details</h4>
              <p>Access owner contact information for properties that interest you</p>
            </div>
            <div className="info-item">
              <h4>Save Properties</h4>
              <p>Save your favorite properties to view later</p>
            </div>
            <div className="info-item">
              <h4>Advanced Search</h4>
              <p>Use advanced filters to find your perfect property</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;