import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import Link from "next/link";
import OutSideClick from "@/hooks/OutSideClick";
import { GoLocation } from "react-icons/go";
import { FiChevronDown } from "react-icons/fi";
import { StatesOfUnited } from "@/components/Shared/CallToAction/CallToAction";


type StateType = {
  name: string;
  affiliateLink: string;
};


function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [selectedState, setSelectedState] = useState<StateType | null>(null);

  const handleStateSelect = (state: any) => {
    setLocation(state.name);
    setSelectedState(state);
    setIsOpen(false);
  };

  const handleGetStarted = () => {
    if (selectedState) {
      window.location.href = selectedState.affiliateLink;
    }
  };

  return (
    <div id="home" className="w-full h-screen md:h-[calc(100vh-136px)] relative bg-[url('/assets/heroBg.jpeg')] bg-no-repeat bg-cover">
      {/* ====> overly on image */}
      <div className="w-full h-full absolute left-0 top-0 bg-black-main/60"></div>
      {/* ====> */}
      <div className="w-full h-full absolute flex flex-col gap-8 justify-center items-center md:px-8 px-4">
        <p className="uppercase text-white-main text-[30px] text-center leading-10 sm:text-[36px] md:text-[40px] lg:text-[50px] font-semibold font-poppins">
          online traffic school
        </p>
        {/* ====> some attributes */}
        <div className="flex flex-col gap-2 sm:gap-3">
          {Attributes.map((item, index) => {
            return (
              <div
                key={index}
                className="flex justify-start items-center gap-3 sm:gap-4"
              >
                <FaCheck className="text-brand-primary text-[30px] sm:text-[32px] lg:text-[38px]" />
                <p className="text-[20px] sm:text-[22px] lg:text-[26px] font-inter capitalize text-white-main font-normal">
                  {item.name}
                </p>
              </div>
            );
          })}
        </div>
        {/* ====> select location + get started button */}
        <div className="w-full flex md:flex-row flex-col justify-center items-center gap-4">
          {/* ===> select location */}
          <div className="w-full max-w-[240px] flex flex-col justify-center items-center relative">
            <div className="w-full flex justify-between items-center">
              <input
                onClick={() => setIsOpen(true)}
                className="w-full h-[55px] border-[3px] placeholder:text-[18px] placeholder:font-medium text-[18px] font-inter font-medium px-2 rounded-[10px] focus:outline-none border-brand-primary"
                type="text"
                id="select-state"
                defaultValue={location}
                placeholder="Select State"
              />
              <FiChevronDown className="text-[28px] text-[#afb4be] absolute right-3" />
            </div>
            {isOpen && (
              <OutSideClick
                style="w-full max-h-[500px] srollBar overflow-auto bg-white-main border-[2px] border-solid border-brand-main rounded-[8px] p-3 absolute -top-[240px] z-30"
                Event={() => {
                  setIsOpen(false);
                }}
              >
                {StatesOfUnited.map((option, index) => (
                  <div key={index} className="flex flex-col mb-3">
                    <div
                      className={`cursor-pointer flex justify-start hover:text-brand-primary items-center gap-2 ${
                        location === option.name
                          ? "text-brand-primary"
                          : "text-black-main"
                      } font-sans text-[16px] font-normal`}
                      onClick={() => handleStateSelect(option)}
                    >
                      <GoLocation
                        className={`text-[22px] ${
                          location === option.name && "fill-brand-primary"
                        }`}
                      />
                      {option.name}
                    </div>
                    {index + 1 < StatesOfUnited.length && (
                      <div className="w-[90%] border-b-[2px] border-solid border-brand-primary my-3"></div>
                    )}
                  </div>
                ))}
              </OutSideClick>
            )}
          </div>
          {/* ===> get started button */}
          <button
            className="w-full max-w-[240px] h-[55px] rounded-[10px] hover:opacity-70 bg-brand-primary"
            onClick={handleGetStarted}
          >
            <p className="text-[26px] font-inter capitalize text-white-main">
              get started
            </p>
          </button>
        </div>
        {/* ===> */}
        <div className="flex flex-col"></div>
      </div>
    </div>
  );
}



const Attributes = [
  {
    name: "for traffic tickets",
  },
  {
    name: "auto insurance discounts",
  },
  {
    name: "100% online",
  },
  {
    name: "state licensed courses",
  },
];

export default Hero;
