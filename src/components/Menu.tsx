"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CartIcon from "./CartIcon";
import { signOut, useSession } from "next-auth/react";

const links = [
  { id: 1, title: "Homepage", url: "/" },
  { id: 2, title: "Menu", url: "/menu" },
  { id: 4, title: "Contact", url: "/contact-me" },
];

const Menu = () => {
  const [open, setOpen] = useState(false);
  const { status } = useSession();
  let user=status==="authenticated";

  return (
    <div>
      <Image
        src={open ? "/close.png" : "/open.png"}
        alt=""
        priority
        width={20}
        height={20}
        onClick={() => setOpen(!open)}
        className="cursor-pointer"
      />
      {open && (
        <div className="bg-red-500 text-white absolute left-0 top-24 w-full h-[calc(100vh-6rem)] flex flex-col gap-8 items-center justify-center text-3xl z-10">
          {links.map((item) => (
            <Link href={item.url} key={item.id} onClick={() => setOpen(false)}>
              {item.title}
            </Link>
          ))}
          {user ? (
            <Link
            href="/orders"
            onClick={() => setOpen(false)}>
            Orders<br/>
            <span className="mt-2" onClick={() => signOut()}>Logout</span>
          </Link>
          ):(<Link
            href="/login"
            onClick={() => setOpen(false)}>
            Login
          </Link>
          )}
          <Link href="/cart" onClick={() => setOpen(false)}>
            <CartIcon />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
