import { MenuType } from "@/types/types";
import Link from "next/link";
import React from "react";

const getData = async ()=>{
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

const MenuPage = async () => {

  const menu = await getData()
  return (
    <div className="p-4 lg:px-20 xl:px-40 h-full flex flex-col md:flex-row items-center justify-center">
      {menu.map((category) => (
        <Link
          rel="preload"
          href={`/menu/${category.slug}`}
          key={category.id}
          className="w-full h-1/3 bg-cover p-8 md:h-1/2"
          style={{ backgroundImage: `url(${category.img})` }}
        >
          <div className={`text-${category.color} w-3/2`}>
            <h1 className="uppercase font-bold text-2xl">{category.title}</h1>
            <p className="mr-12 text-sm my-8 md:mr-3">{category.desc}</p>
            <button className={`2xl:block bg-black text-white py-2 px-4 rounded-md`}>Explore</button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPage;
