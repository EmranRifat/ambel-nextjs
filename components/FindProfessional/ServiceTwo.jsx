import card from "../../public/icons/creditcard.png";
import dollar from "../../public/icons/dollar.png";
import clockwhite from "../../public/icons/clockwhite.png";
import settings from "../../public/icons/settingswhite.png";
import maledoctor from "../../public/img/maledoctor.png";
import leftarrow from "../../public/icons/leftsidearrow.png";

const Services = ({ setShow, services }) => {
  const servicesByDepartment = services.reduce((acc, service) => {
    const departmentName = service.department.name;
    const department = acc.find(
      (department) => department.name === departmentName
    );
    if (department) {
      department.services.push(service);
    } else {
      acc.push({
        name: departmentName,
        services: [service],
      });
    }
    return acc;
  }, []);
  console.log(servicesByDepartment);
  return (
    <>
      <div className="w-[95%] mx-auto">
        <div className="text-center relative pt-[30px]">
          <img
            src={leftarrow.src}
            alt="left-side-arrow"
            className="absolute left-[20px] top-[40px]"
            onClick={() => {
              setShow(0);
            }}
          />
          <p className="text-[#5B5B5B] text-[32px] font-[500]">
            Book By Services
          </p>
        </div>
        <div className="py-[15px]">
          {servicesByDepartment.map((department, index) => (
            <div className="w-full" key={index}>
              <p className="text-[32px] text-[#000] font-[600]">
                {department.name}
              </p>
              {department.services.map((service, index) => (
                <div className="flex flex-row  pb-[35px]" key={index}>
                  <div className="w-[400px] shrink-0 block h-[116px] px-[20px] py-[10px] mr-[50px] bg-[#19525A] text-[#FFF] rounded-[8px]">
                    <p className="h-[48px]">{service.name}</p>
                    <div className="pt-[20px] text-[16px] flex flex-row justify-between">
                      <div className="inline-block pr-[10px] ">
                        <img
                          src={clockwhite.src}
                          alt="clock"
                          className="inline-block relative -top-[2px]"
                        />
                        <text className="text-[14px]">
                          {" "}
                          {service.allocatedTime}
                        </text>
                      </div>
                      <div className="inline-block pr-[10px]">
                        <img
                          src={dollar.src}
                          alt="dollar"
                          className="inline-block relative -top-[2px]"
                        />
                        <text className="text-[14px]"> {service.price}</text>
                      </div>
                      <div className="inline-block pr-[10px]">
                        <img
                          src={card.src}
                          alt="Card"
                          className="inline-block relative -top-[2px]"
                        />
                        <text className="text-[14px]"> {service?.payment}</text>
                      </div>

                      <div className="inline-block">
                        <img
                          src={settings.src}
                          alt="setting"
                          className="inline-block relative -top-[2px]"
                        />
                        <text className="text-[14px]">
                          {" "}
                          {service.wayOfService}
                        </text>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-start flex-wrap">
                    {service.practitioner.map((doctor, index) => (
                      <img
                        key={index}
                        src={doctor.user?.photo || maledoctor.src}
                        alt="doctor-iamge"
                        className="w-[140px] h-[140px] border-[1px] border-[#307172] rounded-[8px] m-[5px] mt-[0px]"
                        onClick={() => {
                          // setShow(2);
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Services;
