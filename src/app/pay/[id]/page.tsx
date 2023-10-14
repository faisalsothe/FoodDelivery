"use client";

import CheckoutForm from "@/components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Suspense, useEffect, useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const PayPage = ({ params }: { params: { id: string } }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true); // Initialize loading state to true

  const { id } = params;

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await fetch(
          `https://foodyfaisal.evils.in/api/create-intent/${id}`,
          {
            method: "POST",
          }
        );
        const data = await res.json();
        setClientSecret(data.clientSecret);
        setLoading(false); // Set loading to false when data is loaded
      } catch (err) {
        console.log(err);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    makeRequest();
  }, [id]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <div>
      {loading ? ( // Check the loading state
        <p>Loading...</p>
      ) : (
        <Elements options={options} key={clientSecret} stripe={stripePromise}>
          <Suspense>
          <CheckoutForm />
          </Suspense>
        </Elements>
      )}
    </div>
  );
};

export default PayPage;
