import React from "react";
import Wrapper from "@/components/Shared/ComponentWrapper/Wrapper";
import Faq from "react-faq-component";
import { Data } from "../../../Data/JSON";

function Faqs() {
  return (
    <Wrapper styles="py-10">
        <div id="faqs" className="w-full">
      <Faq data={Data.faqs} />

        </div>
    </Wrapper>
  );
}

export default Faqs;


