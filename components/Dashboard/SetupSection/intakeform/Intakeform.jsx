import React, { useState } from "react";
import Modal from "../../../Modal";
import IntakeHeaderModal from "./IntakeHeaderModal";
import NewIntake from "./NewIntake";

const Intakeform = ({ intakeDetails, setIntakeDetails }) => {
  const [preview, setPreview] = useState(false);
  return (
    <React.Fragment>
      {preview && (
        <Modal onClick={setPreview} closeOnOutsideClick={true}>
          <IntakeHeaderModal setPreview={setPreview} />
        </Modal>
      )}
      <div className="w-full flex justify-between">
        <span className=" text-[#5B5B5B] text-[32px]">Intake form</span>
        {!intakeDetails ? (
          <button
            onClick={() => setIntakeDetails(!intakeDetails)}
            className="text-[20px] h-[49px] w-[184px] bg-[#19525A] text-white rounded-[10px]"
          >
            New Intake form
          </button>
        ) : (
          <button
            onClick={() => setIntakeDetails(!intakeDetails)}
            className="text-[18px] px-6 py-2 bg-[#19525A] text-white rounded-[10px]"
          >
            Go back
          </button>
        )}
      </div>
      {!intakeDetails ? (
        <>
          {/* 1st div */}
          <div className="w-full bg-white mt-3 pb-4 rounded-[8px]">
            <div className="p-4  border-b-[2px] border-gray-400">
              <p className="text-[16px] text-[#5B5B5B]">
                Online Intake form allows you to collect contact information,
                problems, family and other related history that attached with
                the services provided to the customers. The customer response
                will become part of their profile, chart, services that they
                taken from your organization and practitioners.
              </p>
              <p className="text-[16px] text-[#5B5B5B] mt-6">
                When new customer do their first visit, the intake form will
                automatically prompt up to their profile and also send in
                attached email. Learn more
              </p>
            </div>

            <div className="flex justify-between border-b-[2px] border-gray-400 px-5">
              <div className="flex p-5 w-[50%]">
                <span className="p-2 bg-[#C4DBCC] text-center h-11 w-16 rounded-full text-lg font-bold ">
                  1
                </span>
                <div className="flex flex-col ml-5">
                  <span className="text-[20px] text-[#195947]">
                    Health history
                  </span>
                  <p className="text-left text-[16px] text-[#5B5B5B]">
                    All customer for first booking Included customer
                    informations, 2 questioneris and 3 consents Signature
                    required.
                  </p>
                  <p className="text-[#5B5B5B]">
                    Action: Autometically prompt Up.
                  </p>
                  <p className="text-[#5B5B5B]">
                    Status : <span className="text-[#19525A]">Active</span>
                  </p>
                </div>
              </div>
              <div className="mt-5 flex items-center">
                <button className="h-[28px] w-[77px] text-[12px] text-white bg-[#19525A] rounded-[8px] mr-4">
                  Duplicate
                </button>
                <button
                  onClick={() => setPreview(true)}
                  className="h-[28px] w-[77px] text-[12px] text-white bg-[#19525A] rounded-[8px] mr-4"
                >
                  Preview
                </button>
                <button className="h-[28px] w-[77px] text-[12px] text-white bg-[#19525A] rounded-[8px]">
                  Edit
                </button>
              </div>
            </div>
            {/* <div className="border-[1px] border-black"></div> */}
            <div className="flex justify-between items-center px-5">
              <div className="flex p-5 w-[50%]">
                <span className="p-2 bg-[#C4DBCC] text-center h-11 w-16 rounded-full text-lg font-bold ">
                  2
                </span>
                <div className="flex flex-col ml-5">
                  <span className="text-[20px] text-[#195947]">
                    Health history
                  </span>
                  <p className="text-left text-[16px] text-[#5B5B5B]">
                    All customer for first booking Included customer
                    informations, 2 questioneris and 3 consents Signature
                    required.
                  </p>
                  <p className="text-[#5B5B5B]">
                    Action: Autometically prompt Up.
                  </p>
                  <p className="text-[#5B5B5B]">
                    Status : <span className="text-[#19525A]">Active</span>
                  </p>
                </div>
              </div>
              <div className="mt-5 flex items-center">
                <button className="h-[28px] w-[77px] text-[12px] text-white bg-[#19525A] rounded-[8px] mr-4">
                  Duplicate
                </button>
                <button
                  onClick={() => setPreview(true)}
                  className="h-[28px] w-[77px] text-[12px] text-white bg-[#19525A] rounded-[8px] mr-4"
                >
                  Preview
                </button>
                <button className="h-[28px] w-[77px] text-[12px] text-white bg-[#19525A] rounded-[8px]">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <NewIntake />
      )}
    </React.Fragment>
  );
};

export default Intakeform;
