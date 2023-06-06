import React from "react";
import Wrapper from "@/components/Shared/ComponentWrapper/Wrapper";
import Image from "next/image";

function BenefitsOfOnlineTrafficSchool() {
  return (
    <Wrapper styles="bg-white-cool py-10">
      <div className="w-full grid gap-8 grid-cols-1 lg:grid-cols-[1.7fr,2fr]">
        {/* ==> left portion */}
        <div className="w-full h-[260px] xl:h-[320px] shadow-2xl relative rounded-[20px]">
          <Image
            src="/assets/driving.jpeg"
            fill
            className="object-cover rounded-[20px]"
            alt=""
          />
        </div>
        {/* ====> right portion */}
        <div className="w-full flex flex-col gap-8">
          {/*  */}
          <div className="w-full flex flex-col gap-2">
            <p className="text-black-main text-[28px] leading-8 text-center font-semibold font-inter capitalize">
              Online Traffic School Course On Any Device, Any Time
            </p>
            <p className="text-[16px] font-inter text-center text-[#6c757d]">
              In the digital age, where almost every service is available at our
              fingertips, why should traffic school be any different? Welcome to
              the world of online traffic school, a convenient and effective
              platform that allows you to brush up on safe driving techniques
              without stepping out of your comfort zone.
            </p>
          </div>
          {/*  */}
          <div className="w-full flex flex-col gap-2">
            <p className="text-black-main text-[28px] leading-8 text-center font-semibold font-inter capitalize">
              What is an Online Traffic School?
            </p>
            <p className="text-[16px] font-inter text-center text-[#6c757d]">
              Online traffic school is a virtual version of a traditional
              traffic school, providing courses that teach defensive driving,
              traffic rules, and driver safety. These courses can be completed
              from the comfort of your home or anywhere else with internet
              access. Whether you have received a traffic violation, want to
              reduce points on your license, or simply wish to refresh your
              driving knowledge, online traffic school is a flexible and
              convenient solution.
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default BenefitsOfOnlineTrafficSchool;
