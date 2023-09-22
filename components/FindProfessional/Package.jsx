import services from "../../public/icons/services.png";
import serviceicon from "../../public/icons/serviceicon.png";
import category from "../../public/icons/category.png";
import mapicon from "../../public/icons/mapicon.png";
import map from "../../public/icons/map.png";
import flower from "../../public/icons/flower.png";
import packageandmembership from "../../public/icons/packageandmembership.png";
import femaleDoctor from "../../public/img/femaledoctor.png";
import phonecallfill from "../../public/icons/phonecallfill.png";
import mailfill from "../../public/icons/mailfill.png";
import headphone from "../../public/icons/headphone.png";
import clocktime from "../../public/icons/clocktime.png";

const Services = ({ packages }) => {
  console.log(packages);
  return (
    <>
      <div className="w-[95%] flex flex-row mx-auto ">
        <img src={services.src} alt="" className="" />
        <div className="w-[470px] h-[465px] border-[2px] border-[#307172] rounded-[8px] p-[60px] mt-[25px] ">
          <div className="pb-[20px]">
            <img src={category.src} />
            <div className="pt-[5px]">
              <text className="block text-[#307172] text-[20px] pl-[15px] font-[600]">
                Category
              </text>
              <text className="block text-[#404040] pl-[15px] text-[28px]">
                24 Service category
              </text>
            </div>
          </div>
          <div className="pb-[20px]">
            <img src={serviceicon.src} />
            <div className="pt-[5px]">
              <text className="block text-[#307172] pl-[15px] text-[20px] font-[600]">
                Service
              </text>
              <text className="block text-[#404040] pl-[15px] text-[28px]">
                {packages.length} available Services
              </text>
            </div>
          </div>
          <div>
            <img src={packageandmembership.src} />
            <div className="pt-[5px]">
              <text className="block text-[#307172] pl-[15px] text-[20px] font-[600]">
                Package and Membership
              </text>
              <text className="block text-[#404040] pl-[15px] text-[28px]">
                {packages.length} Package and membership available
              </text>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[95%] mx-auto flex flex-row">
        <div className="w-[33%] bg-[#19525A] text-center py-[40px] rounded-tl-[10px] rounded-bl-[10px]">
          <text className="block text-[24px] leading-[36px] text-[#FFF] pb-[20px]">
            Emergency Service
          </text>
          <text className="block text-[18px] leading-[27px] tracking-[0.1rem] text-[#FFF] pb-[10px]">
            +(123) 555-0178-890
          </text>
          <text className="block text-[18px] leading-[27px] tracking-[0.1rem] text-[#FFF] pb-[10px]">
            +(123) 555-0178-890
          </text>
        </div>
        <div className="w-[33%] bg-[#0089C9] text-center py-[40px]">
          <text className="block text-[24px] leading-[36px] text-[#FFF] pb-[20px]">
            Appointment
          </text>
          <text className="block text-[18px] leading-[27px] tracking-[0.1rem] text-[#FFF] pb-[10px]">
            healthcare@medical.com
          </text>
          <text className="block text-[18px] leading-[27px] tracking-[0.1rem] text-[#FFF] pb-[10px]">
            +(123) 555-0178-890
          </text>
        </div>
        <div className="w-[33%] bg-[#19525A] text-center py-[40px] rounded-tr-[10px] rounded-br-[10px]">
          <text className="block text-[24px] leading-[36px] text-[#FFF] pb-[20px]">
            Direction
          </text>
          <text className="block text-[18px] leading-[27px] tracking-[0.1rem] text-[#FFF] pb-[10px]">
            Find us on map
          </text>
        </div>
      </div>
      <div className="mt-[50px]">
        <div className="text-center pb-[50px]">
          <text className="block text-[48px] text-[#000] font-[500]">
            Packages
          </text>
          <text className="block w-[70%] mx-auto text-[24px] leading-[40px] text-[#404040] font-[500]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum
            pretium, ultrices sed faucibus nulla. Egestas scque nat cursus arcu,
            diam.
          </text>
        </div>
        <div className="w-[95%] mx-auto">
          <div className="flex flex-row justify-between pb-[30px]">
            {[1, 2, 3, 4].map((pkg, index) => {
              <div key={index} className="w-[310px] bg-[#FFF] pt-[20px]  shadow-[0_0px_5px_1px_rgba(0,0,0,0.25)] rounded-[8px]">
                <p className="font-[500] text-[16px] text-[#5B5B5B] px-[10px]">
                  oo
                </p>
                <p className="font-[300] text-[12px] text-[#5B5B5B] px-[10px]">
                  (Worth of $600 value)
                </p>
                <div className="pt-[10px] px-[10px]">
                  <p className="font-[300] text-[14px] text-[#5B5B5B] pb-[10px]">
                    Service 1
                  </p>
                  <p className="font-[300] text-[14px] text-[#5B5B5B] pb-[10px]">
                    Service 2
                  </p>
                  <p className="font-[300] text-[14px] text-[#5B5B5B] pb-[10px]">
                    Service 3
                  </p>
                  <p className="font-[300] text-[14px] text-[#5B5B5B] pb-[10px]">
                    Service 4
                    <span className="font-[300] text-[14px] text-[#0094FF]">
                      +3 more
                    </span>
                  </p>
                </div>
                <p className="text-[#FF6B00] text-[16px] px-[10px] ">
                  Price- $500/Per Package
                </p>
                <div className="bg-[#19525A] text-center py-[10px] rounded-[8px] mt-[30px]">
                  <text className="text-[16px] text-[#FFF]">Buy Now</text>
                </div>
              </div>;
            })}
          </div>
        </div>
      </div>
      <div className="mt-[50px]">
        <div className="text-center pb-[50px]">
          <text className="block text-[48px] text-[#000] font-[500]">
            Membership
          </text>
          <text className="block w-[70%] mx-auto text-[24px] leading-[40px] text-[#404040] font-[500]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum
            pretium, ultrices sed faucibus nulla. Egestas scque nat cursus arcu,
            diam.
          </text>
        </div>
        <div className="w-[95%] mx-auto">
          <div className="flex flex-row justify-between pb-[30px]">
            <div className="w-[310px] bg-[#FFF] pt-[20px]  shadow-[0_0px_5px_1px_rgba(0,0,0,0.25)] rounded-[8px]">
              <p className="font-[500] text-[16px] text-[#5B5B5B] px-[10px]">
                Full package name is goes here
              </p>
              <p className="font-[300] text-[12px] text-[#5B5B5B] px-[10px]">
                (Worth of $600 value)
              </p>
              <div className="pt-[10px] px-[10px]">
                <p className="font-[300] text-[14px] text-[#5B5B5B] pb-[10px]">
                  Service 1
                </p>
                <p className="font-[300] text-[14px] text-[#5B5B5B] pb-[10px]">
                  Service 2
                </p>
                <p className="font-[300] text-[14px] text-[#5B5B5B] pb-[10px]">
                  Service 3
                </p>
                <p className="font-[300] text-[14px] text-[#5B5B5B] pb-[10px]">
                  Service 4
                  <span className="font-[300] text-[14px] text-[#0094FF]">
                    +3 more
                  </span>
                </p>
              </div>
              <p className="text-[#FF6B00] text-[16px] px-[10px] ">
                Price- $500/Per Package
              </p>
              <div className="bg-[#19525A] text-center py-[10px] rounded-[8px] mt-[30px]">
                <text className="text-[16px] text-[#FFF]">Buy Now</text>
              </div>
            </div>
            <div className="w-[310px] bg-[#FFF] pt-[20px]  shadow-[0_0px_5px_1px_rgba(0,0,0,0.25)] rounded-[8px]">
              <p className="font-[500] text-[16px] text-[#5B5B5B] px-[10px]">
                Full package name is goes here
              </p>
              <p className="font-[300] text-[12px] text-[#5B5B5B] px-[10px]">
                (Worth of $600 value)
              </p>
              <div className="pt-[10px] px-[10px]">
                <p className="font-[300] text-[14px] text-[#5B5B5B] pb-[10px]">
                  Service 1
                </p>
                <p className="font-[300] text-[14px] text-[#5B5B5B] pb-[10px]">
                  Service 2
                </p>
                <p className="font-[300] text-[14px] text-[#5B5B5B] pb-[10px]">
                  Service 3
                </p>
                <p className="font-[300] text-[14px] text-[#5B5B5B] pb-[10px]">
                  Service 4
                  <span className="font-[300] text-[14px] text-[#0094FF]">
                    +3 more
                  </span>
                </p>
              </div>
              <p className="text-[#FF6B00] text-[16px] px-[10px] ">
                Price- $500/Per Package
              </p>
              <div className="bg-[#19525A] text-center py-[10px] rounded-[8px] mt-[30px]">
                <text className="text-[16px] text-[#FFF]">Buy Now</text>
              </div>
            </div>
            <div className="w-[310px] bg-[#FFF] pt-[20px]  shadow-[0_0px_5px_1px_rgba(0,0,0,0.25)] rounded-[8px]">
              <p className="font-[500] text-[16px] text-[#5B5B5B] px-[10px]">
                Full package name is goes here
              </p>
              <p className="font-[300] text-[12px] text-[#5B5B5B] px-[10px]">
                (Worth of $600 value)
              </p>
              <div className="pt-[10px] px-[10px]">
                <p className="font-[300] text-[14px] text-[#5B5B5B] pb-[10px]">
                  Service 1
                </p>
                <p className="font-[300] text-[14px] text-[#5B5B5B] pb-[10px]">
                  Service 2
                </p>
                <p className="font-[300] text-[14px] text-[#5B5B5B] pb-[10px]">
                  Service 3
                </p>
                <p className="font-[300] text-[14px] text-[#5B5B5B] pb-[10px]">
                  Service 4
                  <span className="font-[300] text-[14px] text-[#0094FF]">
                    +3 more
                  </span>
                </p>
              </div>
              <p className="text-[#FF6B00] text-[16px] px-[10px] ">
                Price- $500/Per Package
              </p>
              <div className="bg-[#19525A] text-center py-[10px] rounded-[8px] mt-[30px]">
                <text className="text-[16px] text-[#FFF]">Buy Now</text>
              </div>
            </div>
            <div className="w-[310px] bg-[#FFF] pt-[20px]  shadow-[0_0px_5px_1px_rgba(0,0,0,0.25)] rounded-[8px]">
              <p className="font-[500] text-[16px] text-[#5B5B5B] px-[10px]">
                Full package name is goes here
              </p>
              <p className="font-[300] text-[12px] text-[#5B5B5B] px-[10px]">
                (Worth of $600 value)
              </p>
              <div className="pt-[10px] px-[10px]">
                <p className="font-[300] text-[14px] text-[#5B5B5B] pb-[10px]">
                  Service 1
                </p>
                <p className="font-[300] text-[14px] text-[#5B5B5B] pb-[10px]">
                  Service 2
                </p>
                <p className="font-[300] text-[14px] text-[#5B5B5B] pb-[10px]">
                  Service 3
                </p>
                <p className="font-[300] text-[14px] text-[#5B5B5B] pb-[10px]">
                  Service 4
                  <span className="font-[300] text-[14px] text-[#0094FF]">
                    +3 more
                  </span>
                </p>
              </div>
              <p className="text-[#FF6B00] text-[16px] px-[10px] ">
                Price- $500/Per Package
              </p>
              <div className="bg-[#19525A] text-center py-[10px] rounded-[8px] mt-[30px]">
                <text className="text-[16px] text-[#FFF]">Buy Now</text>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[80%] mx-auto pt-[80px] pb-[30px]">
        <div className="text-center pb-[50px]">
          <text className="block text-[48px] text-[#19525A] font-[500]">
            Our Locations
          </text>
          <div className="flex flex-row justify-center pt-[50px] relative">
            <hr className="h-[2px] bg-[#19525A] w-[80px] mr-[45px]" />
            <img
              src={flower.src}
              alt="flower-icon"
              className="absolute top-[15px]"
            />
            <hr className="h-[2px] bg-[#19525A] w-[80px] ml-[45px]" />
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="w-[350px]">
            <div>
              <p className="text-[24px] text-[#19525A] font-[600] pb-[20px]">
                Orange
              </p>
              <div className="flex flex-row pb-[20px]">
                <img
                  src={mapicon.src}
                  alt="map-icon"
                  className="w-[20px] h-[20px]"
                />{" "}
                <p className="text-[#5B5B5B] text-[14px]">
                  Bloomfield Medical Campus,
                  <br /> Level 2/1521 Forest Rd,
                  <br /> Orange NSW 2800
                </p>
              </div>
            </div>
            <div className="">
              <img
                src={map.src}
                alt="map-image"
                className="shadow-[0_4px_20px_10px_rgba(0,0,0,0.15)]"
              />
            </div>
          </div>
          <div className="w-[350px]">
            <div>
              <p className="text-[24px] text-[#19525A] font-[600] pb-[20px]">
                Bathurst
              </p>
              <div className="flex flex-row pb-[20px]">
                <img
                  src={mapicon.src}
                  alt="map-icon"
                  className="w-[20px] h-[20px]"
                />{" "}
                <p className="text-[#5B5B5B] text-[14px]">
                  Bloomfield Medical Campus,
                  <br /> Level 2/1521 Forest Rd,
                  <br /> Orange NSW 2800
                </p>
              </div>
            </div>
            <div className="">
              <img
                src={map.src}
                alt="map-image"
                className="shadow-[0_4px_20px_10px_rgba(0,0,0,0.15)]"
              />
            </div>
          </div>
          <div className="w-[350px]">
            <div>
              <p className="text-[24px] text-[#19525A] font-[600] pb-[20px]">
                Parkes
              </p>
              <div className="flex flex-row pb-[20px]">
                <img
                  src={mapicon.src}
                  alt="map-icon"
                  className="w-[20px] h-[20px]"
                />{" "}
                <p className="text-[#5B5B5B] text-[14px]">
                  Bloomfield Medical Campus,
                  <br /> Level 2/1521 Forest Rd,
                  <br /> Orange NSW 2800
                </p>
              </div>
            </div>
            <div className="">
              <img
                src={map.src}
                alt="map-image"
                className="shadow-[0_4px_20px_10px_rgba(0,0,0,0.15)]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-[115px] flex flex-row  pt-[20px]">
        <div className="w-[35%] pt-[80px]">
          <div className="w-[100%] mx-auto">
            <div className="flex flex-row pb-[20px]">
              <img
                src={phonecallfill.src}
                alt="map-icon"
                className="w-[20px] h-[20px] mr-[5px] relative top-[8px]"
              />{" "}
              <p className="text-[#5B5B5B] text-[20px]">
                +(123) 555-0178-890
                <br /> +(123) 555-0178-890
              </p>
            </div>
            <div className="flex flex-row pb-[20px]">
              <img
                src={clocktime.src}
                alt="map-icon"
                className="w-[20px] h-[20px] mr-[5px] relative top-[8px]"
              />{" "}
              <p className="text-[#5B5B5B] text-[20px]">
                Mon-Fri: 9:00AM-10:00PM
                <br /> Sat-Sun: 9:00AM-01:00PM
              </p>
            </div>
            <div className="flex flex-row pb-[20px]">
              <img
                src={mailfill.src}
                alt="map-icon"
                className="w-[20px] h-[15px] mr-[5px] relative top-[8px]"
              />{" "}
              <p className="text-[#5B5B5B] text-[20px]">
                info@medical.com
                <br /> info@medical.com
              </p>
            </div>
            <div className="text-center">
              <p className="text-[#5B5B5B] text-[32px] font-[500] pb-[10px] text-center mr-[120px]">
                Ask to
              </p>
              <div className="inline-block bg-[#19525A] rounded-[50px] w-[210px] py-[5px] px-[10px] mx-auto text-center mr-[120px]">
                <img
                  src={headphone.src}
                  alt="headphone"
                  className="inline-block pl-[10px] pr-[10px] relative -top-[5px]"
                />
                <p className="inline-block text-[#FFF] text-[24px] font-[500]">
                  Receptionist
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img
            src={femaleDoctor.src}
            alt="femaleDoctor"
            className="block w-[500px]  pt-[20px]"
          />
        </div>
        <div className="w-[30%] h-[430px] pt-[40px] mt-[20px]">
          <p className="text-[#19525A] text-[32px] font-[500]">Quick Contact</p>
          <input
            type="email"
            placeholder="Your Email"
            className="text-[24px] border-[1px] w-[350px] h-[90px] border-[#5B5B5B] p-[15px] focus:outline-none bg-[#f7f6f4] rounded-[10px] mt-[15px] mb-[10px]"
          />
          <textarea
            placeholder="Your Mesaage"
            className="text-[24px] border-[1px] w-[350px] h-[150px] border-[#5B5B5B] p-[15px] focus:outline-none bg-[#f7f6f4] rounded-[10px]"
          />
          <button className="bg-[#19525A] block w-[140px] h-[40px] text-[#FFF] text-[24px] font-[500] rounded-[10px] mt-[10px]">
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Services;
