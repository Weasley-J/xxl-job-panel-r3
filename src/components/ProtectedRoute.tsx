import React from 'react'
import { Navigate } from 'react-router-dom'
import storage from '@/utils/storage.ts'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = !!storage.get('token')

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
