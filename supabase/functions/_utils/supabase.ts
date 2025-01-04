import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { stripe } from '../_utils/stripe.ts'

export const createOrRetrieveProfile = async (req: Request) => {
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    {
      global: {
        headers: { Authorization: req.headers.get('Authorization')! }
      }
    }
  )
  // Now we can get the session or user object
  const {
    data: { user }
  } = await supabaseClient.auth.getUser()

  console.log('createOrRetrieveProfile user: ', { user })

  if (!user) throw new Error('No user found')

  const { data: profile, error } = await supabaseClient
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error || !profile) {
    throw new Error('No profile found')
  }

  console.log('createOrRetrieveProfile profile: ', { profile })

  if (profile.stripe_customer_id) {
    return profile.stripe_customer_id
  }

  // Create a Stripe customer
  const stripeCustomer = await stripe.customers.create({
    email: user.email,
    metadata: { uid: user.id }
  })

  console.log('createOrRetrieveProfile stripeCustomer: ', { stripeCustomer })

  await supabaseClient
    .from('profiles')
    .update({ stripe_customer_id: stripeCustomer.id })
    .eq('id', profile.id)

  return stripeCustomer.id
}
