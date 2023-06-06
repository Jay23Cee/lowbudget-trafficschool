import React, { useState } from "react";
import Wrapper from "../../components/Shared/ComponentWrapper/Wrapper";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import { Data } from "../../../Data/JSON";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
// ====> import for drawer and humburger
import { Spin as Hamburger } from "hamburger-react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper>
      <div className="w-full h-[70px] md:h-[100px] flex justify-between items-center">
        {/* ====> logo */}
        <div className="w-[180px] sm:w-[240px] h-[120px] relative">
          <Image
            src="/assets/logo.png"
            fill
            className="object-contain"
            alt=""
          />
        </div>
        {/* ====> links */}
        <div className="hidden lg:flex justify-center items-center gap-14 -ml-8">
          {Data.Navibar.map((item, index) => {
            return (
              <ScrollLink
                key={index}
                to={item.path}
                spy={true}
                smooth={true}
                hashSpy={true}
                offset={0}
                duration={800}
                isDynamic={true}
                ignoreCancelEvents={false}
                spyThrottle={500}
                className="text-[16px] md:text-[20px] cursor-pointer font-inter capitalize text-black-main font-medium relative after:absolute after:w-0 after:h-[3px] after:left-0 after:bottom-0 after:bg-brand-primary hover:after:w-full after:duration-200"
              >
                {item.name}
              </ScrollLink>
            );
          })}
        </div>
        <div className="flex justify-center items-center gap-4">
          {/* =====> contact us button */}


          {/* ====> hamburger and drawer for small screen */}
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
                {/* =========>top bar */}
                <div className="w-full flex justify-between items-center">
                  {/* ===> logo */}
                  <p className="text-[35px] md:text-[50px] font-poppins font-semibold text-white-main">
                    Logo.
                  </p>
                  <RxCross2
                    onClick={() => setIsOpen(false)}
                    className="text-[45px] text-white-main "
                  />
                </div>
                {/* ========> sections links */}
                <div className="flex flex-col justify-center items-center gap-8 mt-16">
                  {Data.Navibar.map((navi, index) => {
                    return (
                      <ScrollLink
                        onClick={() => setIsOpen(false)}
                        key={index}
                        to={navi.path}
                        spy={true}
                        smooth={true}
                        hashSpy={true}
                        offset={0}
                        duration={800}
                        isDynamic={true}
                        ignoreCancelEvents={false}
                        spyThrottle={500}
                        className="text-white-main capitalize text-[16px] md:text-[20px] font-inter"
                      >
                        {navi.name}
                      </ScrollLink>
                    );
                  })}
                </div>
                {/* ====> two buttons */}
                <div className="flex justify-center items-center flex-col gap-8 mt-8">
                  {/* =====> contact us button */}
                  <button className="w-[120px] md:w-[150px] h-[40px] md:h-[45px] bg-brand-primary text-white-main rounded-[10px] hover:opacity-80">
                    <p className="text-[16px] md:text-[20px] font-inter font-medium capitalize text-white-main">
                      contact us
                    </p>
                  </button>
                  {/* ======> login button */}
                  <button className="w-[120px] md:w-[100px] h-[40px] md:h-[45px] bg-transparent border-[2px] border-brand-primary font-inter text-[20px] rounded-[10px] hover:bg-brand-primary hover:opacity-80">
                    <p className="text-[16px] md:text-[20px] font-inter font-medium capitalize text-white-main">
                      log in
                    </p>
                  </button>
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
