import React, { useEffect, useState } from "react";
import Wrapper from "../ComponentWrapper/Wrapper";
import OutSideClick from "@/hooks/OutSideClick";
import { GoLocation } from "react-icons/go";
import { FiChevronDown } from "react-icons/fi";

function CallToAction() {
  const [isSticky, setIsSticky] = useState(false);
  const [IsOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const scrollThreshold = windowHeight / 1;

      setIsSticky(scrollPosition > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Wrapper
      styles={`bg-brand-primary py-6 flex justify-center items-center duration-700 z-100 ${
        isSticky ? "sticky opacity-100" : "hideen opacity-0"
      } bottom-0`}
    >
      <div className="w-full h-full flex md:flex-row flex-col gap-4 md:gap-0 justify-between items-center">
        <p className="text-white-main text-center font-inter text-[20px] leading-6 lg:text-[24px] capitalize font-medium">
          start your online traffic school today
        </p>
        <div className="flex sm:flex-row flex-col justify-center items-center gap-4">
          {/* ===> select location */}
          <div className="w-full max-w-[210px] flex flex-col justify-center items-center relative ">
            <div className="w-full flex justify-between items-center">
              <input
                onClick={() => setIsOpen(true)}
                className="w-full h-[55px] border-[3px] placeholder:text-[18px] placeholder:font-medium text-[18px] font-inter font-medium px-2 rounded-[10px] focus:outline-none border-brand-primary"
                type="text"
                id="select-state"
                value={location}
                placeholder="Select State"
              />
              <FiChevronDown className="text-[28px] text-[#afb4be] absolute right-3" />
            </div>
            {IsOpen && (
              <OutSideClick
                style="w-full max-h-[500px] srollBar overflow-auto bg-white-main border-[2px] border-solid border-brand-main rounded-[8px] p-3 absolute -top-[20rem] z-30"
                Event={() => {
                  setIsOpen(false);
                }}
              >
                {StatesOfUnited.map((option: any, index: number) => {
                  return (
                    <div key={index} className="flex flex-col mb-3">
                      <div
                        className={`cursor-pointer flex justify-start hover:text-brand-primary items-center gap-2 ${
                          location === option.name
                            ? "text-brand-primary"
                            : "text-black-main"
                        } font-sans text-[16px] font-normal`}
                        key={index}
                        onClick={() => {
                          setLocation(option.name);
                          setIsOpen(false);
                        }}
                      >
                        <GoLocation
                          className={`text-[22px] ${
                            Location === option.name && "fill-brand-primary "
                          } `}
                        />
                        {option.name}
                      </div>
                      {index + 1 < Location.length && (
                        <div className="w-[90%] border-b-[2px] border-solid border-brand-primary my-3"></div>
                      )}
                    </div>
                  );
                })}
              </OutSideClick>
            )}
          </div>
          <button className="w-[180px] h-[45px] bg-white-main rounded-[10px] hover:opacity-90 text-black-main capitalize text-[18px] font-medium">
            get started
          </button>
        </div>
      </div>
    </Wrapper>
  );
}

const StatesOfUnited = [
  {
    name: "Alabama",
    path: "",
  },
  {
    name: "Alaska",
    path: "",
  },
  {
    name: "Arizona",
    path: "",
  },
  {
    name: "Arkansas",
    path: "",
  },
  {
    name: "California",
    path: "",
  },
  {
    name: "Colorado",
    path: "",
  },
  {
    name: "Connecticut",
    path: "",
  },
  {
    name: "Delaware",
    path: "",
  },
  {
    name: "Florida",
    path: "",
  },
  {
    name: "Georgia",
    path: "",
  },
  {
    name: "Hawaii",
    path: "",
  },
  {
    name: "Idaho",
    path: "",
  },

  {
    name: "Illinois",
    path: "",
  },
  {
    name: "Indiana",
    path: "",
  },
  {
    name: "Iowa",
    path: "",
  },
  {
    name: "Kansas",
    path: "",
  },
  {
    name: "Kentucky",
    path: "",
  },
  {
    name: "Louisiana",
    path: "",
  },
  {
    name: "Maine",
    path: "",
  },
  {
    name: "Maryland",
    path: "",
  },
  {
    name: "Massachusetts",
    path: "",
  },
  {
    name: "Michigan",
    path: "",
  },
  {
    name: "Minnesota",
    path: "",
  },
  {
    name: "Mississippi",
    path: "",
  },
  {
    name: "Missouri",
    path: "",
  },

  {
    name: "Montana",
    path: "",
  },
  {
    name: "Nebraska",
    path: "",
  },
  {
    name: "Nevada",
    path: "",
  },
  {
    name: "New Hampshire",
    path: "",
  },
  {
    name: "New Jersey",
    path: "",
  },
  {
    name: "New Mexico",
    path: "",
  },
  {
    name: "New York",
    path: "",
  },
  {
    name: "North Carolina",
    path: "",
  },
  {
    name: "North Dakota",
    path: "",
  },
  {
    name: "Ohio",
    path: "",
  },
  {
    name: "Oklahoma",
    path: "",
  },
  {
    name: "Oregon",
    path: "",
  },
  {
    name: "Pennsylvania",
    path: "",
  },
  {
    name: "Rhode Island",
    path: "",
  },
  {
    name: "South Carolina",
    path: "",
  },
  {
    name: "South Dakota",
    path: "",
  },
  {
    name: "Tennessee",
    path: "",
  },
  {
    name: "Texas",
    path: "",
  },
  {
    name: "Utah",
    path: "",
  },
  {
    name: "Vermont",
    path: "",
  },
  {
    name: "Virginia",
    path: "",
  },
  {
    name: "Washington",
    path: "",
  },
  {
    name: "West Virginia",
    path: "",
  },
  {
    name: "Wisconsin",
    path: "",
  },
  {
    name: "Wyoming",
    path: "",
  },
];

export default CallToAction;
