
import React, { useEffect } from "react";
import Hero from "./Hero";
import Attributes from "./Attributes";
import WhyGoToTrafficSchool from "./WhyGoToTrafficSchool";
import BenefitsOfOnlineTrafficSchool from "./BenefitsOfOnlineTrafficSchool";
import Faqs from "./Faqs";

import DriverEducationSchool from "./DriverEducationSchool";


function Home() {
  useEffect(() => {
    // Perform automatic redirect when component mounts
    // Replace 'https://example.com' with the URL you want to redirect to
    window.location.href = 'http://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51&state=';
   
  }, []); //
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
