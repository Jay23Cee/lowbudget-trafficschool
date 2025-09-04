
import React, { useEffect } from "react";
import Hero from "./Hero";
import Attributes from "./Attributes";
import WhyGoToTrafficSchool from "./WhyGoToTrafficSchool";
import BenefitsOfOnlineTrafficSchool from "./BenefitsOfOnlineTrafficSchool";
import Faqs from "./Faqs";

import DriverEducationSchool from "./DriverEducationSchool";


function Home() {
  useEffect(() => {
    document.title = "Go To Traffic School | Home";
  }, []); 
  return (
    <React.Fragment>
      <Hero />
      <Attributes/>
      <WhyGoToTrafficSchool/>
      <BenefitsOfOnlineTrafficSchool/>
      <Faqs/>
  
    </React.Fragment>
  );
}

export default Home;
