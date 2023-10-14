"use client";
import { useCartStore} from "@/utils/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect} from "react";

const CartPage = () => {
  let { products, totalItems, totalPrice, removeFromCart } = useCartStore();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  if (!router) {
    return;
  }
  
  const handleCheckout = async () => {
    if(!session){
      router.push("/login");
    }

    else {
      try {
        const res = await fetch("http://localhost:3000/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            price: totalPrice,
            products,
            status: "Being Prepared.",
            userEmail: session.user.email,
          }),
        });
        const data =await res.json()
        router.push(`/pay/${data.id}`);
      } 
      catch (err) {
        console.log(err);
      }
    }
  };


  return (
    <div className="h-[calc(100vh-6rem)] md:mb-8 md:h-[calc(100vh-9rem)] flex flex-col flex-1 text-red-500 lg:flex-row">
      {/* PRODUCTS CONTAINER */}
      <div className="h-1/2 p-4 flex flex-1 flex-col overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:p-20 xl:p-40">
        {/* SINGLE ITEM */}
        {products.map((item) => (
          <div className="flex flex-1 items-center justify-between mb-4" key={item.id}>
            {item.img && (
                <Image rel="preload" src={item.img} priority alt="" width="0" height="0" sizes="100" style={{ width: '100px', height: 'auto' }}/>
            )}

            <div className="">
              <h1 className="uppercase text-xl font-bold">
                {item.title} x{item.quantity}
              </h1>
              <span>{item.optionTitle}</span>
            </div>
            <h2 className="font-bold">₹{item.price}</h2>
            <span
              className="cursor-pointer"
              onClick={() => removeFromCart(item)}
            >
              X
            </span>
          </div>
        ))}
      </div>
      {/* PAYMENT CONTAINER */}
      <div className="mt-6 mb-8 h-1/2 p-4 pt-6 md:pt-10 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-3/3 2xl:w-1/2 lg:p-20 lg:text-md xl:p-40 2xl:text-xl 2xl:gap-4">
        <div className="flex justify-between">
          <span className="mr-5">Subtotal ({totalItems} items)&nbsp;</span>
          <span className="font-bold">₹{totalPrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Service Cost:&nbsp;</span>
          <span className="">₹0.00</span>
        </div>
        <div className="flex justify-between">
          <span className="">Delivery Cost:&nbsp;</span>
          <span className="text-green-500 font-bold">FREE!</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span className="">TOTAL:&nbsp;</span>
          <span className="font-bold">₹{totalPrice}</span>
        </div>
        <button
          className="bg-red-500 font-bold uppercase text-white p-3 rounded-md w-full self-start"
          onClick={handleCheckout}
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartPage;
