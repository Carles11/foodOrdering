import {
  initPaymentSheet,
  presentPaymentSheet
} from '@stripe/stripe-react-native'
import { Alert } from 'react-native'
import { supabase } from './supabase'

const fetchPaymentSheetParams = async (amount: number) => {
  const { data, error } = await supabase.functions.invoke('payment-sheet', {
    body: { amount }
  })
  if (data) {
    console.log({ data, error })

    return data
  }
  Alert.alert('_Error fetching payment sheet params_', error.message)
  return {}
}

export const initialisePaymentSheet = async (amount: number) => {
  const { paymentIntent, publishableKey, customer, ephemeralKey } =
    await fetchPaymentSheetParams(amount)

  if (!paymentIntent || !publishableKey) {
    Alert.alert('/Error fetching payment sheet params/')
    return false
  }

  const { error } = await initPaymentSheet({
    merchantDisplayName: 'Charlie´s Pizza',
    paymentIntentClientSecret: paymentIntent,
    customerId: customer,
    customerEphemeralKeySecret: ephemeralKey,
    defaultBillingDetails: {
      name: 'Jane Doe'
    }
  })

  if (!error) {
    console.log('Success initializing payment sheet')
    return true
  } else {
    Alert.alert('Error initializing payment sheet', error.message)
    return false
  }
}

export const openPaymentSheet = async () => {
  console.log('Opening payment sheet')

  const { error } = await presentPaymentSheet()
  console.log('after open payment', error)
  if (error) {
    Alert.alert('Error processing payment', error.message)
    return false
  } else {
    Alert.alert('Success', 'Payment successful')
    return true
  }
}
