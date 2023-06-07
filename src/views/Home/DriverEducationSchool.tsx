import React from "react";
import Wrapper from "@/components/Shared/ComponentWrapper/Wrapper";
import Image from "next/image";

function DriverEducationSchool() {
  return (
    <Wrapper styles="bg-white-cool py-10">
      <div className="w-full grid gap-8 grid-cols-1 lg:grid-cols-[2fr,1.7fr]">
        {/* ====> left portion */}
        <div className="w-full flex flex-col gap-8">
          {/*  */}
          <div className="w-full flex flex-col gap-2">
            <p className="text-black-main text-[28px] leading-8 text-center font-semibold font-inter capitalize">
              Driver Education School: Learn to Drive Safely and Confidently
            </p>
            <p className="text-[16px] font-inter text-center text-[#6c757d]">
              Driver Education schools provide comprehensive training programs designed to teach aspiring drivers the necessary skills and knowledge to drive safely and confidently. Attending a Driver Education school can greatly benefit new drivers, as well as those looking to improve their existing driving skills.
            </p>
            <p className="text-[16px] font-inter text-center text-[#6c757d]">
              To explore reputable Driver Education school options and learn more about their programs, visit <a href="https://drivers-ed-depot.vercel.app/"  rel="noopener noreferrer" className="text-brand-secondary">Drivers Ed Depot</a>.
            </p>
          </div>
        </div>
        {/* ==> right portion */}
        <div className="w-full h-[260px] xl:h-[320px] shadow-2xl relative rounded-[20px]">
          <Image
            src="/assets/driver.jpg"
            fill
            className="object-cover rounded-[20px]"
            alt=""
          />
        </div>
      </div>
    </Wrapper>
  );
}

export default DriverEducationSchool;
