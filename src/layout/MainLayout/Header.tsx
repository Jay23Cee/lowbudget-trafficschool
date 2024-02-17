import React, { useState } from "react";
import Wrapper from "../../components/Shared/ComponentWrapper/Wrapper";
import Link from "next/link";
import { Data } from "../../../Data/JSON";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { Spin as Hamburger } from "hamburger-react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Function to close the drawer
  const closeDrawer = () => setIsOpen(false);

  return (
    <Wrapper>
      <div className="w-full h-[70px] md:h-[100px] flex justify-between items-center">
        <div className="w-[180px] sm:w-[240px] h-[120px] relative">
          <Link href="/">
            <span onClick={closeDrawer}>
              <Image src="/assets/lowbugettraffic_logo.png" fill className="object-contain" alt="" />
            </span>
          </Link>
        </div>
        <div className="hidden lg:flex justify-center items-center gap-14 -ml-8">
          {Data.Navibar.map((item, index) => (
            <Link href={item.path} key={index}>
              <span onClick={closeDrawer}>{item.name}</span>
            </Link>
          ))}
        </div>
        <div className="flex justify-center items-center gap-4">
          <div className="lg:hidden flex justify-end items-center">
            <Hamburger
              color="black"
              rounded
              size={34}
              toggled={isOpen}
              toggle={setIsOpen}
            />
            <Drawer
              open={isOpen}
              onClose={() => setIsOpen(false)}
              direction="right"
              className="drawer"
            >
              <div className="flex flex-col p-6 justify-center items-center ">
                <div className="w-full flex justify-between items-center">
                  <p className="text-[35px] md:text-[50px] font-poppins font-semibold text-white-main">
                    {/* Logo */}
                  </p>
                  <RxCross2
                    onClick={() => setIsOpen(false)}
                    className="text-[45px] text-white-main "
                  />
                </div>
                <div className="flex flex-col justify-center items-center gap-8 mt-16 text-white-main">
                  {Data.Navibar.map((item, index) => (
                    <Link href={item.path} key={index}>
                      <span onClick={closeDrawer}>{item.name}</span>
                    </Link>
                  ))}
                </div>
                <div className="flex justify-center items-center flex-col gap-8 mt-8">
                  {/* Buttons */}
                </div>
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Header;
