import { createContext, useState, useEffect } from 'react'
import { authAPI } from '../services/api'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check if user is already logged in on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authAPI.getProfile()
        if (response.success) {
          setUser(response.data.user)
        }
      } catch (err) {
        // Not logged in, which is fine
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const register = async (name, email, password) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await authAPI.register(name, email, password)
      if (response.success) {
        setUser(response.data.user)
        return response
      }
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await authAPI.login(email, password)
      if (response.success) {
        setUser(response.data.user)
        return response
      }
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      await authAPI.logout()
      setUser(null)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
