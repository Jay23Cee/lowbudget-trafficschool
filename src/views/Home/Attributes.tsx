import React from "react";
import Wrapper from "@/components/Shared/ComponentWrapper/Wrapper";
import Image from "next/image";
import { Data } from "../../../Data/JSON";
import AttributeCard from "@/components/AttributeCard/AttributeCard";

function Attributes() {
  return (
    <Wrapper styles=" bg-white-cool py-10">
      <div id="attributes" className="w-full grid gap-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {Data.Attributes.map((item, index) => {
          return (
            <AttributeCard key={index} image={item.img} name={item.name} />
          );
        })}
      </div>
    </Wrapper>
  );
}

export default Attributes;
