import { Redirect, Stack } from 'expo-router'
import React from 'react'
import { useAuth } from '../../providers/AuthProvider'

const AuthLayout = () => {
  const { session } = useAuth()

  if (session) {
    return <Redirect href={'/'} />
  }

  return <Stack />
}

export default AuthLayout
