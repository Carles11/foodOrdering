import { registerForPushNotificationsAsync } from '@/lib/notifications'
import { supabase } from '@/lib/supabase'
import * as Notifications from 'expo-notifications'
import { ExpoPushToken } from 'expo-notifications'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { useAuth } from './AuthProvider'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
})

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [expoPushToken, setExpoPushToken] = useState<ExpoPushToken | null>(null)
  const [expoPushTokenError, setExpoPushTokenError] = useState<String | null>(
    null
  )
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined)

  const { profile } = useAuth()
  const userId = profile?.id

  const notificationListener = useRef<Notifications.EventSubscription>()
  const responseListener = useRef<Notifications.EventSubscription>()

  const savePushToken = async (newToken: ExpoPushToken | undefined | null) => {
    setExpoPushToken(newToken ?? null)

    if (!newToken) {
      return
    }

    // Save the token to the server
    await supabase
      .from('profiles')
      .update({ expo_push_token: newToken })
      .match({ id: userId })
  }

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token: any) => savePushToken(token ?? ''))
      .catch((error: any) => {
        savePushToken(null)
        setExpoPushTokenError(error)
      })

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification)
      })

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response)
      })

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        )
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])
  // console.log('PushToken', { expoPushToken })
  // console.log({ notification })
  // console.log({ expoPushTokenError })
  return <>{children}</>
}

export default NotificationProvider
