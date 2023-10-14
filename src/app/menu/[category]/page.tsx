import Image from "next/image";
import Link from "next/link";
import React from "react";

const getData = async (category:string)=>{
  const res = [
    {
      id: 1,
      slug: "pastas",
      title: "Italian Pastas",
      desc: "Savor the taste of perfection with our exquisite Italian handmade pasta menu.",
      img: "/temporary/m1.png",
      color: "white",
    },
    {
      id: 2,
      slug: "burgers",
      title: "Juicy Burgers",
      desc: "Burger Bliss: Juicy patties, bold flavors, and gourmet toppings galore.",
      img: "/temporary/m2.png",
      color: "black",
    },
    {
      id: 3,
      slug: "pizzas",
      title: "Cheesy Pizzas",
      desc: "Pizza Paradise: Irresistible slices, mouthwatering toppings, and cheesy perfection.",
      img: "/temporary/m3.png",
      color: "white",
    },
  ];


  return res;
}

type Props = {
  params:{category:string}
}

const CategoryPage = async ({params}:Props) => {

  const products = await getData(params.category);

  return (
    <div className="flex flex-wrap text-red-500">
      {products.map((item) => (
        <Link className="w-full h-[60vh] border-r-2 border-b-2 border-red-500 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group odd:bg-fuchsia-50" href={`/product/${item.id}`} key={item.id}>
          {/* IMAGE CONTAINER */}
          {item.img && (
            <div className="relative h-[80%]">
              <Image src={item.img} alt="" priority fill sizes="100" className="object-contain"/>
            </div>
          )}
          {/* TEXT CONTAINER */}
          <div className="flex items-center justify-between font-bold">
            <h1 className="text-2xl uppercase p-2">{item.title}</h1>
            <h2 className="group-hover:hidden text-xl">₹{item.title}</h2>
            <button className="hidden group-hover:block uppercase bg-red-500 text-white p-2 rounded-md">Add to Cart</button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryPage;
