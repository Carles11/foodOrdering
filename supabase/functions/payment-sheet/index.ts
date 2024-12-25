import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { stripe } from '../_utils/stripe.ts';

console.log('Hello from Functions!');

interface PaymentRequest {
  amount: number;
}

interface PaymentResponse {
  publishableKey: string | undefined;
  paymentIntent: string;
}

serve(async (req: Request): Promise<Response> => {
  try {
    const { amount }: PaymentRequest = await req.json();

    // Create a PaymentIntent so that the SDK can charge the logged in customer.
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1155,
      currency: 'usd',
      // customer: customer,
    });
    const res: PaymentResponse = {
      publishableKey: Deno.env.get('EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY'),
      paymentIntent: paymentIntent.client_secret,
      // ephemeralKey: ephemeralKey.secret,
      // customer: customer,
    };
    return new Response(JSON.stringify(res), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.log({error})
    return new Response(JSON.stringify(error), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:*/

  // curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/payment-sheet' \
  //   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
  //   --header 'Content-Type: application/json' \
  //   --data '{"amount":"1150"}'


