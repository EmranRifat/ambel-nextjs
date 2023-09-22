import React  from 'react';

const StepBar = () => {

 

  return (
    <div>
            <ul  className="steps min-w-0  text-[10px]  mt-4">
							<li data-content="" className="step step-neutral"> 10$</li>
							<li  data-content="" className=" step step-neutral    ">30$</li>
							<li  data-content="" className=" step  ">50$</li>
							<li  data-content="" className=" step ">100$+</li>
						</ul> 
    </div>
  );
};

export default StepBar;