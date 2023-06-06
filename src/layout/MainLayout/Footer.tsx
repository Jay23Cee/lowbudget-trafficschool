import React from "react";
import Wrapper from "@/components/Shared/ComponentWrapper/Wrapper";
import Link from "next/link";
import { BsTwitter } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import Image from "next/image";

function Footer() {
  return (
    <Wrapper styles="py-10 bg-white-cool">
      <div className="w-full flex flex-col gap-8 justify-center items-center">
        {/* ====> logo */}
        <div className="w-[180px] sm:w-[240px] h-[120px] relative -mt-6">
          <Image
            src="/assets/logo.png"
            fill
            className="object-contain"
            alt=""
          />
        </div>
        {/* ====> social icons */}
        <div className="flex justify-center items-center gap-6 -mt-12 sm:-mt-10">
          {Social.map((item, index) => {
            return (
              <Link key={index} href="#">
                {item.path}
              </Link>
            );
          })}
        </div>
        <p className="text-[16px] text-center font-medium font-inter text-black-main">
          © 1997-2023 DriversEd.com. All rights reserved. Please see our privacy
          policy for more details.
        </p>
      </div>
    </Wrapper>
  );
}

const Social = [
  {
    path: (
      <BsTwitter className="text-[30px] sm:text-[40px] text-black-main hover:scale-110 duration-300" />
    ),
  },
  {
    path: (
      <AiFillInstagram className="text-[30px] sm:text-[40px] text-black-main hover:scale-110 duration-300" />
    ),
  },
  {
    path: (
      <BsFacebook className="text-[30px] sm:text-[40px] text-black-main hover:scale-110 duration-300" />
    ),
  },
];

export default Footer;
