import DeleteButton from "@/components/DeleteButton";
import Price from "@/components/Price";
import { ProductType } from "@/types/types";
import Image from "next/image";
import React from "react";

const getData = async (id: string) => {
  const res = {
    id: 1,
    title: "Sicilian",
    desc: "Ignite your taste buds with a fiery combination of spicy pepperoni, jalapeños, crushed red pepper flakes, and melted mozzarella cheese, delivering a kick with every bite.",
    img: "/temporary/p1.png",
    price: 24.9,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 4,
      },
      {
        title: "Large",
        additionalPrice: 6,
      },
    ],
  }


  return res;
};

const SingleProductPage = async ({ params }: { params: { id: string } }) => {
  const singleProduct = await getData(params.id);

  return (
    <div className="mb-20 p-8 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-red-500 md:flex-row md:gap-8 md:items-center relative">
      {/* IMAGE CONTAINER */}
      {singleProduct.img && (
        <div rel="preload" className=" mb-10 relative w-full h-full md:h-[70%]">
          <Image
            rel="preload"
            src={singleProduct.img}
            alt=""
            className="object-contain"
            priority
            fill
            sizes="100"
          />
        </div>
      )}
      {/* TEXT CONTAINER */}
      <div className="h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        <h1 className="text-3xl font-bold uppercase">
          <span>{singleProduct.title}</span>
          <DeleteButton id={String(singleProduct.id)} />
        </h1>
        <p>{singleProduct.desc}</p>
      </div>
    </div>
  );
};

export default SingleProductPage;
