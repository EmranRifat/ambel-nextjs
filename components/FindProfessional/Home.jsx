import { useEffect, useState } from "react";
import femaleDoctor from "../../public/img/femaledoctor.png";
import femaleDoctor3 from "../../public/img/femaledoctor3.png";
import femaleDoctor2 from "../../public/img/femaledoctor2.png";
import maleDoctor from "../../public/img/maledoctor.png";
import maleDoctor2 from "../../public/img/maledoctor2.png";
import hospital from "../../public/img/hospital.png";
import hospital6 from "../../public/img/hospital6.png";
import hospital2 from "../../public/img/hospital2.png";
import hospital3 from "../../public/img/hospital3.png";
import hospital4 from "../../public/img/hospital4.png";
import hospital5 from "../../public/img/hospital5.png";
import ambelreview from "../../public/icons/ambelreview.png";
import trustpilot from "../../public/icons/trustpilot.png";
import googleReview from "../../public/icons/googlereview.png";
import reviewimage from "../../public/icons/reviewimage.png";
import leftarrow from "../../public/icons/leftarrow.png";
import rightarrow from "../../public/icons/rightarrow.png";
import ratings from "../../public/icons/ratings.png";
import phonecallfill from "../../public/icons/phonecallfill.png";
import headphone from "../../public/icons/headphone.png";
import mailfill from "../../public/icons/mailfill.png";
import flower from "../../public/icons/flower.png";
import qoute from "../../public/icons/qoute.png";
import mapicon from "../../public/icons/mapicon.png";
import map from "../../public/icons/map.png";
import clocktime from "../../public/icons/clocktime.png";
import medicine from "../../public/icons/medicine.png";
import cardiology from "../../public/icons/cardiology.png";
import neurology from "../../public/icons/neurology.png";
import psychiatry from "../../public/icons/psychiatry.png";
// import ReactSimplyCarousel from "react-simply-carousel";
import ReactSimplyCarousel from "../Carousel/index.jsx";
import MapView from "../Dashboard/Map/MapView";

const Home = (props) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const { orgData } = props;
  const { departments } = orgData;
  const [filteredDepartments, setFilteredDepartments] = useState(departments);
  const { branches } = orgData;

  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    if (props.branch === "-1") {
      setFilteredDepartments(departments);
      setFilteredDoctors([]);
    } else {
      setFilteredDepartments(

        departments.filter((department) => {
          return department.branches.includes(props.branch);
        })
      );
    }
  }, [props.branch]);

  return (
    <div className="relative">
      <div className="flex flex-row justify-between relative mb-8 px-[28px] pt-[20px]">
        <div className="pt-[50px]">
          <div className="max-w-[492px]">
            <text className="block text-[#307172] text-[30px] font-[600]">
              Welcome to
              <br />
            </text>
            <text className="block text-[#000] text-[48px] font-[600] pb-[30px]">
              {orgData.name}
              <br />
            </text>
          </div>
          <text className="block max-w-[501px] text-[20px] text-[#404040] leading-[30px] pb-[60px] tracking-[.05rem]">
            {orgData?.description ||
              `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
            nullam nisl interdum r sit amet, consectetur adipiscing elit..`}
          </text>
          <button className="block bg-[#307172] text-[#FFF] rounded-[10px] text-[18px] px-[35px] py-[20px]">
            Read more
          </button>
        </div>
        <div className={`absolute left-[32%]`}>
          <img
            src={femaleDoctor.src}
            alt="femaleDoctor"
            className="hidden md:block w-[500px] h-[503px] pt-[20px]"
          />
        </div>
        <div className="w-[470px] h-[465px] border-[2px] py-10 px-12 border-[#307172] rounded-[8px]">
          <div className="pb-[40px]">
            <img src={clocktime.src} alt="clocktime" className="pb-[10px]" />
            <text className="block text-[#307172] text-[20px] font-[600] pb-[10px]">
              Opening Hours
            </text>
            <text className="block text-[18px] text-[#404040] pb-[10px]">
              Monday-Friday: 9:00AM-10:00PM
            </text>
            <text className="block text-[18px] text-[#404040]">
              Saturday-Sunday: 9:00AM-01:00PM
            </text>
          </div>
          <div className="pb-[20px]">
            <text className="block text-[#307172] font-[600] pb-[20px]">
              Need Help?
            </text>
            <text className="block text-[18px] text-[#404040] pb-[20px]">
              Make an appointment with one of our experts today
            </text>
            <button className="bg-[#307172] text-[#FFF] rounded-[10px] px-[12px] py-[15px]">
              Get Support
            </button>
          </div>
        </div>
      </div>
      <div className="w-[98%] left-[1%]  z-30 mx-auto flex flex-row">
        <div className="w-[33.3%] bg-[#19525A] text-center py-[40px] rounded-tl-[10px] rounded-bl-[10px]">
          <text className="block text-[24px] leading-[36px] text-[#FFF] pb-[20px]">
            Emergency Service
          </text>
          <text className="block text-[18px] leading-[27px] tracking-[0.1rem] text-[#FFF] pb-[10px]">
            {orgData.phone}
          </text>
          <text className="block text-[18px] leading-[27px] tracking-[0.1rem] text-[#FFF] pb-[10px]">
            {orgData.phone}
          </text>
        </div>
        <div className="w-[33.3%] bg-[#0089C9] text-center py-[40px]">
          <text className="block text-[24px] leading-[36px] text-[#FFF] pb-[20px]">
            Appointment
          </text>
          <text className="block text-[18px] leading-[27px] tracking-[0.1rem] text-[#FFF] pb-[10px]">
            {orgData.email}
          </text>
          <text className="block text-[18px] leading-[27px] tracking-[0.1rem] text-[#FFF] pb-[10px]">
            {orgData.phone}
          </text>
        </div>
        <div className="w-[33.3%] bg-[#19525A] text-center py-[40px] rounded-tr-[10px] rounded-br-[10px]">
          <text className="block text-[24px] leading-[36px] text-[#FFF] pb-[20px]">
            Direction
          </text>
          <text className="block text-[18px] leading-[27px] tracking-[0.1rem] text-[#FFF] pb-[10px]">
            Find us on map
          </text>
        </div>
      </div>
      <div className="w-[95%] mx-auto pt-[50px]">
        <div className="text-center pb-[50px]">
          <text className="block text-[48px] text-[#000] font-[500]">
            Departments
          </text>
          <text className="block w-[70%] mx-auto text-[24px] leading-[40px] text-[#404040] font-[500]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum
            pretium, ultrices sed faucibus nulla. Egestas scque nat cursus arcu,
            diam.
          </text>
        </div>
      </div>
      <div className="flex flex-wrap gap-[40px] justify-start">
        {/* departments card */}
        {filteredDepartments?.map((department) => (
          <div key={department._id} className="w-[300px] he-[300px] px-[25px] pt-[30px] text-center rounded-[8px] shadow-[0_2px_10px_1px_rgba(0,0,0,0.25)]">
            <div className="w-[72px] h-[82px] text-center  mx-auto">
              {department.coverOrIcon ? (
                <img
                  src={department?.coverOrIcon}
                  alt="department Logo"
                  className="inline-block medicallogo w-[72px] h-[82px]"
                />
              ) : (
                <div className="flex w-[72px] h-[82px]  font-bold  justify-center items-center text-[50px] bg-[#5b5b5b] text-white">
                  {(department?.name ?? "Ambel")[0].toUpperCase()}
                </div>
              )}
              <br />
            </div>
            <text className="inline-block text-[#19525A] text-[24px] leading-[36px] font-[600] border-b-[1px] border-[#19525A] pt-[15px] mb-[20px]">
              {department?.name}
            </text>
            <text className="block text-[12px] leading-[18px] text-[#5B5B5B] pb-[30px]">
              {department?.description}
            </text>
            <button className="w-[180px] h-[30px] bg-[#19525A] text-[12px] text-[#FFF] rounded-[8px] mb-[20px]">
              View Details
            </button>
          </div>
        ))}
      </div>

      <div className="mt-[50px]">
        <div className="text-center pb-[50px]">
          <text className="block text-[48px] text-[#000] font-[500]">
            Our Doctors
          </text>
          <text className="block w-[70%] mx-auto text-[24px] leading-[40px] text-[#404040] font-[500]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum
            pretium, ultrices sed faucibus nulla. Egestas scque nat cursus arcu,
            diam.
          </text>
        </div>
        <div className="w-[95%] mx-auto">
          <ReactSimplyCarousel
            containerProps={{
              style: {
                width: "1368px",
                justifyContent: "space-between",
                userSelect: "text",
              },
            }}
            innerProps={{
              style: {
                display: "flex",
                justifyItems: "space-between",
                justifyContent: "space-between",
                maxWidth: "1368px",
              },
            }}
            activeSlideIndex={activeSlideIndex}
            onRequestChange={setActiveSlideIndex}
            itemsToShow={4}
            itemsToScroll={4}
            responsiveProps={[
              {
                itemsToShow: 4,
                itemsToScroll: 4,
                minWidth: 768,
              },
            ]}
            dotsNav={{
              show: true,
              itemBtnProps: {
                style: {
                  height: 10,
                  width: 10,
                  borderRadius: "50%",
                  backgroundColor: "#DCDBDC",
                  border: 0,
                  margin: "0 10px",
                },
              },
              activeItemBtnProps: {
                style: {
                  height: 10,
                  width: 10,
                  borderRadius: "50%",
                  backgroundColor: "#19525A",
                  border: 0,
                  margin: "0 10px",
                },
              },
            }}
            speed={400}
            easing="linear"
          >
            {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}
            <div>
              <div className="w-[300px] mr-[56px]">
                <div>
                  <img src={maleDoctor.src} alt="doctor" />
                </div>
                <div className="text-[#FFF] bg-[#19525A] px-[10px] rounded-[5px] relative -top-[80px]">
                  <text className="block text-[24px] leading-[157%] font-[500] pb-[5px]">
                    Dr.Smith
                  </text>
                  <text className="block text-[14px] leading-[157%] font-[500] text-[#00F0FF] pb-[20px]">
                    MBBS, BSC(Health),MD(PED)
                  </text>
                  <text className="block text-[14px] pb-[15px]">
                    Medicine, Liver & Gastroenterology Specialist
                  </text>
                </div>
              </div>
            </div>
            <div>
              <div className="w-[300px] mr-[56px]">
                <div>
                  <img src={femaleDoctor2.src} alt="doctor" />
                </div>
                <div className="text-[#FFF] bg-[#19525A] px-[10px] rounded-[5px] relative -top-[80px]">
                  <text className="block text-[24px] leading-[157%] font-[500] pb-[5px]">
                    Dr.Smith
                  </text>
                  <text className="block text-[14px] leading-[157%] font-[500] text-[#00F0FF] pb-[20px]">
                    MBBS, BSC(Health),MD(PED)
                  </text>
                  <text className="block text-[14px] pb-[15px]">
                    Medicine, Liver & Gastroenterology Specialist
                  </text>
                </div>
              </div>
            </div>
            <div>
              <div className="w-[300px] mr-[56px]">
                <div>
                  <img src={maleDoctor.src} alt="doctor" />
                </div>
                <div className="text-[#FFF] bg-[#19525A] px-[10px] rounded-[5px] relative -top-[80px]">
                  <text className="block text-[24px] leading-[157%] font-[500] pb-[5px]">
                    Dr.Smith
                  </text>
                  <text className="block text-[14px] leading-[157%] font-[500] text-[#00F0FF] pb-[20px]">
                    MBBS, BSC(Health),MD(PED)
                  </text>
                  <text className="block text-[14px] pb-[15px]">
                    Medicine, Liver & Gastroenterology Specialist
                  </text>
                </div>
              </div>
            </div>
            <div>
              <div className="w-[300px] mr-[56px]">
                <div>
                  <img src={femaleDoctor3.src} alt="doctor" />
                </div>
                <div className="text-[#FFF] bg-[#19525A] px-[10px] rounded-[5px] relative -top-[80px]">
                  <text className="block text-[24px] leading-[157%] font-[500] pb-[5px]">
                    Dr.Smith
                  </text>
                  <text className="block text-[14px] leading-[157%] font-[500] text-[#00F0FF] pb-[20px]">
                    MBBS, BSC(Health),MD(PED)
                  </text>
                  <text className="block text-[14px] pb-[15px]">
                    Medicine, Liver & Gastroenterology Specialist
                  </text>
                </div>
              </div>
            </div>
            <div>
              <div className="w-[300px] mr-[56px]">
                <div>
                  <img src={maleDoctor2.src} alt="doctor" />
                </div>
                <div className="text-[#FFF] bg-[#19525A] px-[10px] rounded-[5px] relative -top-[80px]">
                  <text className="block text-[24px] leading-[157%] font-[500] pb-[5px]">
                    Dr.Smith
                  </text>
                  <text className="block text-[14px] leading-[157%] font-[500] text-[#00F0FF] pb-[20px]">
                    MBBS, BSC(Health),MD(PED)
                  </text>
                  <text className="block text-[14px] pb-[15px]">
                    Medicine, Liver & Gastroenterology Specialist
                  </text>
                </div>
              </div>
            </div>
          </ReactSimplyCarousel>
          {/* <div className="flex flex-row justify-between">
            <div className="w-[300px]">
              <div>
                <img src={maleDoctor.src} alt="doctor" />
              </div>
              <div className="text-[#FFF] bg-[#19525A] px-[10px] rounded-[5px] relative -top-[80px]">
                <text className="block text-[24px] leading-[157%] font-[500] pb-[5px]">
                  Dr.Smith
                </text>
                <text className="block text-[14px] leading-[157%] font-[500] text-[#00F0FF] pb-[20px]">
                  MBBS, BSC(Health),MD(PED)
                </text>
                <text className="block text-[14px] pb-[15px]">
                  Medicine, Liver & Gastroenterology Specialist
                </text>
              </div>
            </div>
            <div className="w-[300px]">
              <div>
                <img src={femaleDoctor2.src} alt="doctor" />
              </div>
              <div className="text-[#FFF] bg-[#19525A] px-[10px] rounded-[5px] relative -top-[80px]">
                <text className="block text-[24px] leading-[157%] font-[500] pb-[5px]">
                  Dr.Smith
                </text>
                <text className="block text-[14px] leading-[157%] font-[500] text-[#00F0FF] pb-[20px]">
                  MBBS, BSC(Health),MD(PED)
                </text>
                <text className="block text-[14px] pb-[15px]">
                  Medicine, Liver & Gastroenterology Specialist
                </text>
              </div>
            </div>
            <div className="w-[300px]">
              <div>
                <img src={maleDoctor2.src} alt="doctor" />
              </div>
              <div className="text-[#FFF] bg-[#19525A] px-[10px] rounded-[5px] relative -top-[80px]">
                <text className="block text-[24px] leading-[157%] font-[500] pb-[5px]">
                  Dr.Smith
                </text>
                <text className="block text-[14px] leading-[157%] font-[500] text-[#00F0FF] pb-[20px]">
                  MBBS, BSC(Health),MD(PED)
                </text>
                <text className="block text-[14px] pb-[15px]">
                  Medicine, Liver & Gastroenterology Specialist
                </text>
              </div>
            </div>
            <div className="w-[300px]">
              <div>
                <img src={femaleDoctor3.src} alt="doctor" />
              </div>
              <div className="text-[#FFF] bg-[#19525A] px-[10px] rounded-[5px] relative -top-[80px]">
                <text className="block text-[24px] leading-[157%] font-[500] pb-[5px]">
                  Dr.Smith
                </text>
                <text className=z"block text-[14px] leading-[157%] font-[500] text-[#00F0FF] pb-[20px]">
                  MBBS, BSC(Health),MD(PED)
                </text>
                <text className="block text-[14px] pb-[15px]">
                  Medicine, Liver & Gastroenterology Specialist
                </text>
              </div>
            </div>
          </div>
          <div className="mx-auto text-center relative -top-[50px]">
            <div className="inline-block bg-[#19525A] w-[10px] h-[10px] rounded-[50%] mr-[8px]">
              {" "}
            </div>
            <div className="inline-block bg-[#DCDBDC] w-[10px] h-[10px] rounded-[50%] mr-[8px]">
              {" "}
            </div>
            <div className="inline-block bg-[#DCDBDC] w-[10px] h-[10px] rounded-[50%] mr-[8px]">
              {" "}
            </div>
            <div className="inline-block bg-[#DCDBDC] w-[10px] h-[10px] rounded-[50%] mr-[8px]">
              {" "}
            </div>
          </div> */}
        </div>
      </div>
      <div className="w-[95%] mx-auto">
        <div className="text-center pb-[50px]">
          <text className="block text-[48px] text-[#000] font-[500]">
            Hospital Gallery
          </text>
          <text className="block w-[70%] mx-auto text-[24px] leading-[40px] text-[#404040] font-[500]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum
            pretium, ultrices sed faucibus nulla. Egestas scque nat cursus arcu,
            diam.
          </text>
        </div>
        <div className="flex flex-row justify-evenly">
          <img
            src={hospital.src}
            alt="hospital"
            className="w-[400px] h-[400px] rounded-[8px]"
          />
          <img
            src={hospital2.src}
            alt="hospital"
            className="w-[400px] h-[400px] rounded-[8px]"
          />
          <img
            src={hospital3.src}
            alt="hospital"
            className="w-[400px] h-[400px] rounded-[8px]"
          />
        </div>
        <div className="flex flex-row justify-evenly pt-[40px]">
          <img
            src={hospital4.src}
            alt="hospital"
            className="w-[400px] h-[400px] rounded-[8px]"
          />
          <img
            src={hospital5.src}
            alt="hospital"
            className="w-[400px] h-[400px] rounded-[8px]"
          />
          <img
            src={hospital6.src}
            alt="hospital"
            className="w-[400px] h-[400px] rounded-[8px]"
          />
        </div>
        <div className="mx-auto text-center pt-[20px]">
          <div className="inline-block bg-[#19525A] w-[10px] h-[10px] rounded-[50%] mr-[8px]">
            {" "}
          </div>
          <div className="inline-block bg-[#DCDBDC] w-[10px] h-[10px] rounded-[50%] mr-[8px]">
            {" "}
          </div>
          <div className="inline-block bg-[#DCDBDC] w-[10px] h-[10px] rounded-[50%] mr-[8px]">
            {" "}
          </div>
          <div className="inline-block bg-[#DCDBDC] w-[10px] h-[10px] rounded-[50%] mr-[8px]">
            {" "}
          </div>
        </div>
      </div>
      <div className="">
        <div className="w-full p-[5%] mx-auto mt-[30px] pt-[50px] bg-gradient-to-r from-[#FEFAF5] to-[#F7F6F4]">
          <div className="flex flex-row justify-between">
            <div className="w-[50%]">
              <p className="text-[#19525A] text-[48px] leading-[167%] tracking-[0.02rem]">
                Patient Review
              </p>
              <p className="text-[#404040] text-[24px] leading-[167%] tracking-[0.02rem]">
                Only verifed reviews are included here. The reviews are
                authentic and provide by real customers through ambel, google
                and trustpilot
              </p>
              <p className="text-[#19525A] text-center text-[30px] tracking-[0.02rem] font-[500] pt-[30px] pb-[30px]">
                4.8 out of 30 reviews
              </p>
              <div className="flex flex-row justify-between">
                <img src={ambelreview.src} alt="review" />
                <img src={trustpilot.src} alt="review" />
                <img src={googleReview.src} alt="review" />
              </div>
            </div>
            <div className="w-[45%] bg-[#FFF] rounded-[80px] rounded-bl-[0px] shadow-[0_4px_4px_5px_rgba(0,0,0,0.15)] pl-[60px] pt-[50px] relative">
              <img
                src={qoute.src}
                alt="quote"
                className="absolute left-[300px] -top-[25px]"
              />

              <p className="text-[#404040] text-[24px] leading-[167%] tracking-[0.02rem] pr-[10px] pb-[15px]">
                Healthcare Medical hospital dolor sit amet, consectetur
                adipiscing elit. tincidunt et scelerisque etiam. Blandit
                hendrerit id nec elementum ligula et.
              </p>
              <div className=" pb-[15px]">
                <div className="inline-block">
                  <img
                    src={reviewimage.src}
                    alt="reviewuser"
                    className="rounded-[50%] w-[100px]"
                  />
                </div>
                <div className="inline-block relative -top-[15px] pl-[10px]">
                  <text className="block text-[24px] text-[#000] tracking-[0.02rem] font-[600]">
                    David Mark
                  </text>
                  <text className="block text-[24px] text-[#404040] tracking-[0.02rem]">
                    Patient
                  </text>
                  <div>
                    <img src={ratings.src} className="inline-block mr-[5px]" />
                    <img src={ratings.src} className="inline-block mr-[5px]" />
                    <img src={ratings.src} className="inline-block mr-[5px]" />
                    <img src={ratings.src} className="inline-block mr-[5px]" />
                    <img src={ratings.src} className="inline-block mr-[5px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-[14px] flex flex-row justify-end pt-[20px] pr-[100px]">
          <img src={leftarrow.src} alt="left-arrow" className="mr-[10px]" />
          <p className="mr-[20px]">Previous</p>
          <p className="text-[#19525A] mr-[10px] border-b-[2px] border-[#19525A]">
            1
          </p>
          <p className="text-[#5B5B5B] mr-[10px]">2</p>
          <p className="text-[#5B5B5B] mr-[10px]">3</p>
          <p className="text-[#5B5B5B] mr-[10px]">4</p>
          <p className="text-[#5B5B5B] mr-[10px]">....</p>
          <p className="text-[#19525A] mr-[10px]">Next</p>
          <img src={rightarrow.src} alt="right-arrow" />
        </div>
      </div>
      <div className="w-[80%] mx-auto">
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
          {branches?.map((branch) => (
            <div key={branch._id} className="w-[350px]">
              <div>
                <p className="text-[24px] text-[#19525A] font-[600] pb-[20px]">
                  {branch.name}
                </p>
                <div className="flex flex-row pb-[20px]">
                  <img
                    src={mapicon.src}
                    alt="map-icon"
                    className="w-[20px] h-[20px]"
                  />{" "}
                  <p className="text-[#5B5B5B] text-[14px]">
                    {branch.address}
                    <br /> {branch.city}
                  </p>
                </div>
              </div>
              <div className="">
                <MapView
                  mapCoordinate={branch.mapCoordinate}
                  canSelectLocation={false}
                  width={"300px"}
                  height={"200px"}
                />
              </div>
            </div>
          ))}
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
                <br /> {orgData.phone}
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
                {orgData.email}
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
    </div>
  );
};

export default Home;
