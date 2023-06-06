import React from "react";
import Image from "next/image";

interface Props {
  image: string;
  name: string;
}

function AttributeCard({ image, name }: Props) {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className="w-[55px] h-[55px] relative">
        <Image src={image} fill className="object-cover" alt="" />
      </div>
      <p className="text-[16px] md:text-[20px] text-black-main font-inter capitalize text-center">
        {name}
      </p>
    </div>
  );
}

export default AttributeCard;
