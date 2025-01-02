import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";
import { Alert } from "react-native";
import { supabase } from "./supabase";

const fetchPaymentSheetParams = async (amount: number) => { 
const {data, error} = await supabase.functions.invoke("payment-sheet", { body:{amount} })   

if(data){
    return data
}
Alert.alert("Error fetching payment sheet params", error.message) 
return {}
}

export const initialisePaymentSheet = async (amount:number)=>{
    const {paymentIntent, publishableKey} = await fetchPaymentSheetParams(amount)
    console.log({paymentIntent, publishableKey})
    if (!paymentIntent || !publishableKey){
        return
    }
   const {error} = await initPaymentSheet({
        merchantDisplayName: "Charlie´s Pizza",
        paymentIntentClientSecret: paymentIntent,
        defaultBillingDetails: {
            name: "Jane Doe",
        }
    })
    if(!error){
        console.log("Success initializing payment sheet")
    }
}

export const openPaymentSheet = async () => {
    console.log("Opening payment sheet")
 
    const {error} = await presentPaymentSheet()
    console.log('after open payment', error)
    if(error){
        Alert.alert("Error processing payment", error.message)
        return false
    }else{
        Alert.alert("Success", "Payment successful")
        return true
    }
}