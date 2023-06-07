import React from "react";
import Hero from "./Hero";
import Attributes from "./Attributes";
import WhyGoToTrafficSchool from "./WhyGoToTrafficSchool";
import BenefitsOfOnlineTrafficSchool from "./BenefitsOfOnlineTrafficSchool";
import Faqs from "./Faqs";

import DriverEducationSchool from "./DriverEducationSchool";


function Home() {
  return (
    <React.Fragment>
      <Hero />
      <Attributes/>
      <WhyGoToTrafficSchool/>
      <BenefitsOfOnlineTrafficSchool/>
      <Faqs/>
      <DriverEducationSchool/>
    </React.Fragment>
  );
}

export default Home;
