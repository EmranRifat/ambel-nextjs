import { async } from "@firebase/util";
import Image from "next/image";
import React, { useState } from "react";
import axios from "../../../utils/axios";

const uploadImages = [
  {
    id: 1,
    title: "Good",
    photo: "/img/good.png",
  },
  {
    id: 2,
    title: "Not Cut",
    photo: "/img/notcut.png",
  },
  {
    id: 3,
    title: "Not Blurry",
    photo: "/img/notblurry.png",
  },
  {
    id: 4,
    title: "Not Reflective",
    photo: "/img/notref.png",
  },
];

const rules = [
  {
    id: 1,
    title: "Government issued",
    icon: "/img/tick.png",
  },
  {
    id: 2,
    title: "Orginal full size, Unedited documents",
    icon: "/img/tick.png",
  },
  {
    id: 3,
    title: "Place document against the single-colored background ",
    icon: "/img/tick.png",
  },
  {
    id: 4,
    title: "Readable, well-Lit, colored images",
    icon: "/img/tick.png",
  },
  {
    id: 5,
    title: "No Black and white image",
    icon: "/img/cross.png",
  },
  {
    id: 6,
    title: "No edited or expired documents",
    icon: "/img/cross.png",
  },
];
const IdentityVerify2 = ({ setVerification }) => {
  const [frontImageOfDocumentFile, setFrontImageOfDocumentFile] =
    useState(null);
  const [backImageOfDocumentFile, setBackImageOfDocumentFile] = useState(null);
  const [frontImageOfDocumentUrl, setFrontImageOfDocumentUrl] = useState(null);
  const [backImageOfDocumentUrl, setBackImageOfDocumentUrl] = useState(null);
  const handleFIleUpload = async () => {
    const formData = new FormData();
    formData.append("frontImageOfDocument", frontImageOfDocumentFile);
    formData.append("backImageOfDocument", backImageOfDocumentFile);
    // const response=await axios.post('/users/')
  };
  return (
    <React.Fragment>
      <div className="w-full flex justify-center items-center px-5 border-b-2 border-gray-300">
        <span className="text-[#5B5B5B] text-[32px]">
          Identity Verification
        </span>
      </div>

      <div className="flex flex-col px-6 mt-3">
        <span className="text-[#5B5B5B] text-[16px]">
          Upload Image of ID Card{" "}
        </span>
        <div className="w-full flex justify-between">
          {uploadImages.map((upl) => (
            <div key={upl.id} className="flex flex-col items-center mt-3 px-2">
              <Image src={upl.photo} height={63} width={87} alt="alt" />
              <span className="text-[#5B5B5B] text-[14px]">{upl.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col px-5 py-2 mt-3">
        {rules.map((rule) => (
          <div key={rule.id} className="flex justify-start items-center mt-2">
            <Image src={rule.icon} height={12} width={15} alt="alt" />
            <span className="text-[#5B5B5B] text-[14px] ml-2">
              {rule.title}
            </span>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-around mt-5 px-5">
        <label className="w-[252px] h-[120px] text-[20px] px-3 py-2 flex flex-col items-center bg-[#EFEFEF] rounded-lg cursor-pointer">
          {frontImageOfDocumentUrl ? (
            <div className="w-full h-full">
              <Image
                src={frontImageOfDocumentUrl}
                height={120}
                width={252}
                alt="alt"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center mt-5">
              <div>
                <Image src="/img/camera.png" height={28} width={34} alt="alt" />
              </div>
              <span className="text-[14px] text-[#5B5B5B] text-base leading-normal">
                Upload front page
              </span>
            </div>
          )}

          <input
            type="file"
            className="hidden"
            onChange={(event) => {
              // console.log(event), console.log(frontImageOfDocumentFile);
              // setBackImageOfDocumentFile(event.target.files[0]);
              if (event.target.files[0]) {
                const fr = new FileReader();
                fr.addEventListener("load", () => {
                  setFrontImageOfDocumentUrl(fr.result);
                });
                fr.readAsDataURL(event.target.files[0]);
                setVerification((prevState) => {
                  return {
                    ...prevState,
                    frontImageOfDocument: event.target.files[0],
                  };
                });
              }
            }}
          />
        </label>
        <label className="w-[252px] h-[120px] text-[20px] px-3 py-2 flex flex-col items-center bg-[#EFEFEF] rounded-lg cursor-pointer">
          {backImageOfDocumentUrl ? (
            <div className="w-full h-full">
              <Image
                src={backImageOfDocumentUrl}
                height={120}
                width={252}
                alt="alt"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center mt-5">
              <div>
                <Image src="/img/camera.png" height={28} width={34} alt="alt" />
              </div>
              <span className="text-[14px] text-[#5B5B5B] text-base leading-normal">
                Upload back page
              </span>
            </div>
          )}

          <input
            type="file"
            className="hidden"
            onChange={(event) => {
              // console.log(event), console.log(frontImageOfDocumentFile);
              // setBackImageOfDocumentFile(event.target.files[0]);
              if (event.target.files[0]) {
                const fr = new FileReader();
                fr.addEventListener("load", () => {
                  setBackImageOfDocumentUrl(fr.result);
                });
                fr.readAsDataURL(event.target.files[0]);
                setVerification((prevState) => {
                  return {
                    ...prevState,
                    backImageOfDocument: event.target.files[0],
                  };
                });
              }
            }}
          />
        </label>
      </div>
    </React.Fragment>
  );
};

export default IdentityVerify2;
