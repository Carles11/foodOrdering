import { Link, Redirect } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import Button from '../components/Button'

const index = () => {
  const userIsLoggedIn = true

  if (!userIsLoggedIn) {
    console.log('user is logged in')
    return <Redirect href="/(auth)/sign-in" />
  } else {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
        <Link href={'/(user)'} asChild>
          <Button text="User" />
        </Link>
        <Link href={'/(admin)'} asChild>
          <Button text="Admin" />
        </Link>
      </View>
    )
  }
}

export default index
