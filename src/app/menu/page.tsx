import { MenuType } from "@/types/types";
import Link from "next/link";
import React from "react";

const getData = ()=>{
  const res=[{"slug":"",id:"",color:"",title:"",desc:"",img:""},{"slug":"",id:"",color:"",title:"",desc:"",img:""},{"slug":"",id:"",color:"",title:"",desc:"",img:""}];
  // const res = await fetch("https://foodyfaisal.evils.in/api/categories",{
  //   cache:"no-store"
  // })

  // if(!res.ok){
  //   throw new Error("Failed!");
  // }

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