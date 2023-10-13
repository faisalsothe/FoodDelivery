"use client"
import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import CartIcon from "./CartIcon";
import Image from "next/image";
import UserLinks from "./UserLinks";
import { useSession } from "next-auth/react";

const Navbar = () => {

  const { status } = useSession();
  let user=status==="authenticated";

  return (
    <div className="h-12 text-red-500 p-4 flex flex-1 items-center justify-center border-b-2 border-b-red-500 uppercase md:h-24 lg:px-20 xl:px-40">
      {/* LEFT LINKS */}
      <div className="hidden md:flex gap-4 flex-1 font-bold">
        <Link href="/">Homepage</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/contact-me">Contact</Link>
      </div>
      {/* LOGO */}
      <div className="text-3xl md:font-bold md:text-4xl flex-1 md:text-center font-bold justify-center">
        <Link href="/">FZ</Link>
      </div>
      {/* MOBILE MENU */}
      <div className="md:hidden">
        <Menu />
      </div>
      {/* RIGHT LINKS */}
      <div className="hidden flex md:flex flex-row flex-1 gap-4 items-center justify-center">
      <div className={`${user ? "pr-5 py-1" :""} md:absolute top-2 r-2 lg:static flex items-center gap-2 cursor-pointer bg-orange-300 px-1 rounded-md`}>
        <Image src="/phone.png" priority alt="" width={20} height={20} />
        <span>022 123456</span>
      </div>
      <UserLinks/>
      <CartIcon />
    </div>

    </div>
  )
};

export default Navbar;

