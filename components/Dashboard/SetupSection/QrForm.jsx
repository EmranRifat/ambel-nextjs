/* eslint-disable react/display-name */
// @ts-nocheck
import React from 'react';
import ambelImg from '../../../assets/ambel.png'
import vector from '../../../assets/Vector (4).png'
import { QrCode } from "../../QrCode";
import { TfiDownload } from 'react-icons/tfi';
import { BsPrinter } from 'react-icons/bs';
import Image from 'next/image';
import { useRef } from 'react';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import Link from 'next/link';

const QrForm = React.forwardRef(({ businessData }) => {

  const componentRef = useRef();
  const handleDownloadPDF = () => {
    html2canvas(componentRef.current).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('my-document.pdf');
    });
  };
  console.log(businessData)
  return (
    <div ref={componentRef}>
      <div className="print-container">
        <div
          className="w-[660px] bg-white rounded-[8px]"
        >
          <div className="flex justify-center items-center flex-col p-10">
            <div className="text-center">
              <p className="text-[#003F48] text-[24px] ">Self checking system by </p>
              <Image
                src={ambelImg}
                alt="ambelImg"
                width={240}
                height={100}
                objectFit="cover"
                className="mx-auto"
              />
            </div>
            <div className="text-center">
              <p className="text-[#5B5B5B] text-[24px]">Self Checking at</p>
              <p className="text-[#00AAF3] text-[32px]">{businessData?.business?.name}</p>
            </div>
            <div
              className="text-center mt-[39px] text-[#5B5B5B] text-[24px]"
            >
              <span>Visit</span>
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://ambel.ca/organizations/${businessData?.business?.name}/home`}
                className="mb-[10px] cursor-pointer">https://ambel.ca/organizations/{businessData?.business?.name}/home</a>
              <Image
                src={vector}
                alt="vectorImg"
                width={41}
                height={66}
                objectFit="cover"
                className="my-[9px]"
              />
              <p>Or Login your account and use
                <br />
                your camera to self checking</p>
            </div>
          </div>
          <div className="flex justify-center items-center mt-[31px] ">
            <QrCode />
          </div>
          <div className="w-full flex justify-end items-center gap-3 mt-[60px] pb-[26px] pr-[25px]">
            <button
              onClick={handleDownloadPDF}
              className="h-[40px] w-[118px] text-[16px]  px-4 text-white bg-[#19525A] rounded-[8px] flex justify-center items-center gap-3">
              <TfiDownload
                className="text-[22px] font-[600]"
              />
              Save
            </button>
            <ReactToPrint
              pageStyle={`@media print {
              body {
                width: 100vw;
              }
              button {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }`}
              trigger={() => <button
                // onClick={()=>setWidthImg(true)}
                className="h-[40px] w-[118px] text-[16px]  px-4 text-white bg-[#19525A] rounded-[8px] flex justify-center items-center gap-3">
                <BsPrinter
                  className="text-[22px] font-[600]"
                />
                Print
              </button>}
              content={() => componentRef.current}
            />

          </div>

        </div>
      </div>
    </div>
  )
})

export default QrForm;
