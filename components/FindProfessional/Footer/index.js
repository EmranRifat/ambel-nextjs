import ambel from "../../../public/icons/ambelfooter.svg";
import facebook from "../../../public/icons/facebook.png";
import linkedin from "../../../public/icons/linkedIn.png";
import whatsapp from "../../../public/icons/whatsapp.png";
import tweeter from "../../../public/icons/tweeter.png";
import skype from "../../../public/icons/skype.png";

const Footer=()=>{
    return (
        <div className="bg-[#FFF] py-[40px]">
        <div className="w-[80%] text-center mx-auto flex flex-col">
            <p className="inline-block text-[36px] text-[#5B5B5B] text-center">
              Powered By
            </p>
            <div className="mx-auto h-[80px] relative -top-[25px]">
              <img src={ambel.src} alt="ambel" className="" />
            </div>
        </div>

        <div className="flex justify-end">
          <div className="pl-[30px]">
            <button className="text-[14px] text-[#0089C9] mr-[20px]">
              Terms and condition
            </button>
            <button className="text-[14px] text-[#0089C9] mr-[20px]">
              Privacy policy
            </button>
            <button className="text-[14px] text-[#0089C9]">Get support</button>
          </div>
          <div className="inline-block ml-[290px] mr-[50px]">
            <a>
              <img
                src={linkedin.src}
                alt=""
                className="inline-block mr-[20px]"
              />
            </a>
            <a>
              {" "}
              <img
                src={tweeter.src}
                alt=""
                className="inline-block mr-[20px]"
              />
            </a>
            <a>
              {" "}
              <img
                src={facebook.src}
                alt=""
                className="inline-block mr-[20px]"
              />
            </a>
            <a>
              <img
                src={whatsapp.src}
                alt=""
                className="inline-block w-[30px] mr-[20px]"
              />
            </a>
            <a>
              {" "}
              <img src={skype.src} alt="" className="inline-block w-[30px]" />
            </a>
          </div>
        </div>
      </div>
    )
}

export default Footer;