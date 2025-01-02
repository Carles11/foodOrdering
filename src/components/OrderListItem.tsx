import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link, useSegments } from 'expo-router'
import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Tables } from '../types'

dayjs.extend(relativeTime)

type OrderListItemProps = {
  order: Tables<'orders'>
}

const OrderListItem = ({ order }: OrderListItemProps) => {
  // const segments = useSegments()
  console.log({ order })
  const [orderInfo, setOrderInfo] = useState<Tables<'orders'>>(order)

  useEffect(() => {
    setOrderInfo(order)
  }, [order])

  return (
    <Link href={`/orders/${orderInfo.id}`} asChild>
      <Pressable style={styles.container}>
        <View>
          <Text style={styles.title}>Order #{orderInfo.id}</Text>
          <Text style={styles.time}>
            {dayjs(orderInfo.created_at).fromNow()}
          </Text>
        </View>

        <Text style={styles.status}>{orderInfo.status}</Text>
      </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 5
  },
  time: {
    color: 'gray'
  },
  status: {
    fontWeight: '500'
  }
})

export default OrderListItem
