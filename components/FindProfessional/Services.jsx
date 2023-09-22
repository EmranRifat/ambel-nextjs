import { useState } from "react";
import ServiceOne from "./ServiceOne";
import ServiceTwo from "./ServiceTwo";
import ServiceThree from "./ServiceThree";

const Services = (props) => {
  const [show, setShow] = useState(1);
  console.log(props.services);
  return (
    <>
      {show === 0 && <ServiceOne setShow={setShow} />}
      {show === 1 && <ServiceTwo services={props.services} setShow={setShow} />}
      {/* {show === 2 && <ServiceThree setShow={setShow} />} */}
    </>
  );
};

export default Services;
