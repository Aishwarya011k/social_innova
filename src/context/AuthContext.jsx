import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const signup = async ({ email, password, name, location, donationPreferences, pickupTime, userType = 'donor' }) => {
    if (!email || !password || !name) {
      throw new Error('Please fill in all required fields');
    }

    const mockUser = {
      id: Date.now().toString(),
      email: email,
      name: name,
      location: location,
      donationPreferences: donationPreferences,
      pickupTime: pickupTime,
      role: 'user',
      userType: userType, // donor, recipient, or funder
      memberSince: new Date().toISOString(),
      donationsCount: 0,
      donationStreak: 0,
      isVerified: true
    };

    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return mockUser;
  };

  const login = async ({ email, password }) => {
    if (!email || !password) {
      throw new Error('Please fill in all fields');
    }

    // First, check if a user exists in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      if (parsedUser.email === email) {
        setUser(parsedUser);
        return parsedUser;
      }
    }

    // If no saved user found, create a new user profile (demo purposes)
    const newUser = {
      id: Date.now().toString(),
      email: email,
      name: email.split('@')[0],
      userType: 'donor', // default type
      isVerified: true,
      location: 'Not specified',
      donationPreferences: ['clothing', 'books'],
      pickupTime: 'weekends',
      role: 'user',
      memberSince: new Date().toISOString(),
      donationsCount: 0,
      donationStreak: 0,
      activeDonations: 0
    };

    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return newUser;
  };
  const updateUserType = async (newType) => {
    if (!user) {
      throw new Error('No user is logged in');
    }

    // Allow switching to any valid user type
    if (!['donor', 'funder', 'recipient'].includes(newType)) {
      throw new Error('Invalid user type');
    }

    const updatedUser = {
      ...user,
      userType: newType,
    };

    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return updatedUser;
  };

  const updateProfile = async (updates) => {
    if (!user) {
      throw new Error('No user is logged in');
    }

    // If trying to change userType, apply the role switching rules
    if (updates.userType) {
      if (user.userType === 'recipient') {
        throw new Error('Recipients cannot change their role');
      }
      if (updates.userType !== 'donor' && updates.userType !== 'funder') {
        throw new Error('Invalid user type');
      }
    }

    const updatedUser = {
      ...user,
      ...updates,
    };

    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return updatedUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    signup,
    login,
    logout,
    updateProfile,
    updateUserType,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};