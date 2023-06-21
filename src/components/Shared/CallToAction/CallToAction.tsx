import React, { useEffect, useState } from "react";
import Wrapper from "../ComponentWrapper/Wrapper";
import OutSideClick from "@/hooks/OutSideClick";
import { GoLocation } from "react-icons/go";
import { FiChevronDown } from "react-icons/fi";


type StateType = {
  name: string;
  affiliateLink: string;
};

function CallToAction() {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState("");

  
  const [selectedState, setSelectedState] = useState<StateType | null>(null);
  

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

  const handleStateSelect = (state:any) => {
    setLocation(state.name);
    setSelectedState(state);
    setIsOpen(false);
  };

  const handleGetStarted = () => {
    if (selectedState ) {
      window.location.href = selectedState.affiliateLink;
    }
  };

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
                defaultValue={location}
                placeholder="Select State"
              />
              <FiChevronDown className="text-[28px] text-[#afb4be] absolute right-3" />
            </div>
            {isOpen && (
              <OutSideClick
                style="w-full max-h-[500px] srollBar overflow-auto bg-white-main border-[2px] border-solid border-brand-main rounded-[8px] p-3 absolute -top-[20rem] z-30"
                Event={() => {
                  setIsOpen(false);
                }}
              >
                {StatesOfUnited.map((state, index) => (
                  <div key={index} className="flex flex-col mb-3">
                    <div
                      className={`cursor-pointer flex justify-start hover:text-brand-primary items-center gap-2 ${
                        location === state.name
                          ? "text-brand-primary"
                          : "text-black-main"
                      } font-sans text-[16px] font-normal`}
                      onClick={() => handleStateSelect(state)}
                    >
                      <GoLocation
                        className={`text-[22px] ${
                          location === state.name && "fill-brand-primary"
                        }`}
                      />
                      {state.name}
                    </div>
                    {index + 1 < StatesOfUnited.length && (
                      <div className="w-[90%] border-b-[2px] border-solid border-brand-primary my-3"></div>
                    )}
                  </div>
                ))}
              </OutSideClick>
            )}
          </div>
          <button
            className="w-[180px] h-[45px] bg-white-main rounded-[10px] hover:opacity-90 text-black-main capitalize text-[18px] font-medium"
            onClick={handleGetStarted}
          >
            get started
          </button>
        </div>
      </div>
    </Wrapper>
  );
}

export const StatesOfUnited = [
  {
    name: "Alabama",
    affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Alaska",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Arizona",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Arkansas",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "California",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Colorado",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Connecticut",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Delaware",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Florida",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Georgia",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Hawaii",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Idaho",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },

  {
    name: "Illinois",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Indiana",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Iowa",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Kansas",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Kentucky",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Louisiana",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Maine",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Maryland",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Massachusetts",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Michigan",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Minnesota",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Mississippi",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Missouri",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },

  {
    name: "Montana",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Nebraska",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Nevada",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "New Hampshire",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "New Jersey",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "New Mexico",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "New York",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "North Carolina",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "North Dakota",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Ohio",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Oklahoma",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Oregon",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Pennsylvania",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Rhode Island",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "South Carolina",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "South Dakota",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Tennessee",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Texas",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Utah",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Vermont",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Virginia",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Washington",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "West Virginia",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Wisconsin",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
  {
    name: "Wyoming",
     affiliateLink: "http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=alabama",
  },
];

export default CallToAction;
