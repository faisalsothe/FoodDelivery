"use client";

import CheckoutForm from "@/components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const PayPage = ({ params }: { params: { id: string } }) => {
  const [clientSecret, setClientSecret] = useState("");

  const { id } = params;

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res =
        {
          id: 3,
          clientSecret: "pizzas",
          title: "Cheesy Pizzas",
          desc: "Pizza Paradise: Irresistible slices, mouthwatering toppings, and cheesy perfection.",
          img: "/temporary/m3.png",
          color: "white",
        }
        const data = await res;
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, [id]);

  const options:StripeElementsOptions={
    clientSecret,
    appearance:{
      theme:"stripe"
    }
  }

  return (
    <div>
      {clientSecret && (
        <Elements options={options} key={clientSecret} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default PayPage;
