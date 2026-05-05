// services/api.js - Centralized API calls
const API_URL = import.meta.env.VITE_API_URL || 'https://koblathozart-crypto-app-backend.onrender.com'

// Auth API calls
export const authAPI = {
  register: async (name, email, password) => {
    const params = new URLSearchParams({
      name,
      email,
      password
    })

    const response = await fetch(`${API_URL}/auth/register?${params}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Registration failed')
    }

    return response.json()
  },

  login: async (email, password) => {
    const params = new URLSearchParams({
      email,
      password
    })

    const response = await fetch(`${API_URL}/auth/login?${params}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Login failed')
    }

    return response.json()
  },

  logout: async () => {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Logout failed')
    }

    return response.json()
  },

  getProfile: async () => {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'GET',
      credentials: 'include'
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch profile')
    }

    return response.json()
  }
}

// Crypto API calls
export const cryptoAPI = {
  getAllCryptos: async () => {
    const response = await fetch(`${API_URL}/crypto`, {
      method: 'GET',
      credentials: 'include'
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch cryptocurrencies')
    }

    return response.json()
  },

  getGainers: async () => {
    const response = await fetch(`${API_URL}/crypto/gainers`, {
      method: 'GET',
      credentials: 'include'
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch gainers')
    }

    return response.json()
  },

  getNewListings: async () => {
    const response = await fetch(`${API_URL}/crypto/new`, {
      method: 'GET',
      credentials: 'include'
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch new listings')
    }

    return response.json()
  },

  addCrypto: async (name, symbol, price, change, image, marketCap) => {
    const response = await fetch(`${API_URL}/crypto`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, symbol, price, change, image, marketCap })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to add cryptocurrency')
    }

    return response.json()
  }
}
