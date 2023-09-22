import React from "react";
import { useEffect, useRef, useState } from "react";
//  {
//   width: 300,
//   height: 300,
//   image:
//     "/qrLogo.png",
//   dotsOptions: {
//     color: "#4267b2",
//     type: "rounded",
//   },
//   imageOptions: {
//     crossOrigin: "anonymous",
//     margin: 20,
//   },
// };

const qrOptions = {
  width: 300,
  height: 300,
  data: "https://www.ambel.ca/",
  margin: 0,
  image: "/qrLogo.png",
  qrOptions: { typeNumber: "0", mode: "Byte", errorCorrectionLevel: "H" },
  imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 0 },
  dotsOptions: { type: "square", color: "#003f48" },
  backgroundOptions: { color: "#ffffff" },
  dotsOptionsHelper: {
    colorType: { single: true, gradient: false },
    gradient: {
      linear: true,
      radial: false,
      color1: "#6a1a4c",
      color2: "#6a1a4c",
      rotation: "0",
    },
  },
  cornersSquareOptions: { type: "square", color: "#003d48" },
  cornersSquareOptionsHelper: {
    colorType: { single: true, gradient: false },
    gradient: {
      linear: true,
      radial: false,
      color1: "#000000",
      color2: "#000000",
      rotation: "0",
    },
  },
  cornersDotOptions: { type: "", color: "#000000" },
  cornersDotOptionsHelper: {
    colorType: { single: true, gradient: false },
    gradient: {
      linear: true,
      radial: false,
      color1: "#000000",
      color2: "#000000",
      rotation: "0",
    },
  },
  backgroundOptionsHelper: {
    colorType: { single: true, gradient: false },
    gradient: {
      linear: true,
      radial: false,
      color1: "#ffffff",
      color2: "#ffffff",
      rotation: "0",
    },
  },
};
const useQRCodeStyling = (options) => {
  //Only do this on the client
  if (typeof window !== "undefined") {
    const QRCodeStylingLib = require("qr-code-styling");
    // @ts-ignore
    const qrCodeStyling = new QRCodeStylingLib(options);
    return qrCodeStyling;
  }
  return null;
};
export const QrCode = (props) => {
  qrOptions.width = props.width ?? 200;
  qrOptions.height = props.height ?? 200;
  const qrCode = useQRCodeStyling(qrOptions);
  const ref = useRef(null);
  const [fileExt, setFileExt] = useState("png");
  const [url, setUrl] = useState("https://www.ambel.ca/");
  useEffect(() => {
    qrCode?.append(ref.current);
  }, [ref, qrCode]);

  useEffect(() => {
    qrCode?.update({ data: url });
  }, [url, qrCode]);
  const onDownloadClick = () => {
    qrCode?.download({ extension: fileExt });
  };

  return (
    <>
      <div ref={ref} />
      {props.download && <button onClick={onDownloadClick}>Download</button>}
    </>
  );
};
