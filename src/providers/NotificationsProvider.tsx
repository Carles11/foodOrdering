import { registerForPushNotificationsAsync } from '@/lib/notifications'
import * as Notifications from 'expo-notifications'
import { ExpoPushToken } from 'expo-notifications'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'

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

  const notificationListener = useRef<Notifications.EventSubscription>()
  const responseListener = useRef<Notifications.EventSubscription>()
  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token: any) => setExpoPushToken(token ?? ''))
      .catch((error: any) => {
        setExpoPushToken(null)
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
  console.log('PushToken', { expoPushToken })
  console.log({ notification })
  console.log({ expoPushTokenError })
  return <>{children}</>
}

export default NotificationProvider
