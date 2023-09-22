import Router from "next/router";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { connect } from "react-redux";
import arrow from "../../../public/icons/arrow122.svg";
import { getBusinessInfo } from "../../../store/actions/business";

const recommendations = [
  {
    title: "Add stuff member and practitioner",
    description:
      "Looks like you didn’t add any stuff member or practitioner in your business. If you are solo practitioner, please skip this step.",
    button1: "Invite Staff and Member",
    button1link: "/business-dashboard/staffs?show=1",
  },
  {
    title: "Practitioner information missing",
    description:
      "Looks like your practitioners are missing their general information which will display of your online booking page.",
    missing: "Profile photo, Description",
    missingTitle: "Tazul Islam:",
    button1: "Notify Them",
    button1link: "/business-dashboard/staffs?show=2",
  },
  {
    title: "Missing Organization Info",
    description:
      "Looks like you didn’t add any stuff member or practitioner in your business. If you are solo practitioner, please skip this step.",
    missing: "Email, Location, website",
    missingTitle: "Missing:",
    button1: "Add Missing Info",
    button1link: "/business-dashboard/setup?show=3",
  },
  {
    title: "Create schedule",
    description:
      "Looks like you business and your practitioner doesn’t set up any schedule for online appointment and booking. Please create your schedule and request your practitioner to create their own schedule to eligible for online appointment booking.",
    button1: "Create Schedule",
    button1link: "/business-dashboard/schedule",
  },
  {
    title: "Add Discpline",
    description:
      "Looks like you didn’t add any discpline for your business that you and your practitioners are specilazed in. Add discpline in your business.",
    button1: "Add a New Discipline",
    button1link: "/business-dashboard/setup?show=11",
  },
  {
    title: "Create services and classes",
    description:
      "Looks like you and your practitioner didn’t create any services and classes that your offer for your customer. Add services and classes that your business will provide for your customers.",
    button1: "Create Service and Class",
    button1link: "/business-dashboard/setup?show=12",
  },
  {
    title: "Set Up website widget",
    description:
      "How do you Want your online booking page appears in front of your customer? Set up your online booking page appearance and website widget that you will connect with your website.",
    button1: "Customize Website Widget",
    button1link: "/business-dashboard/setup?show=13",
  },
  {
    title: "Set Up payment method",
    description:
      "To take online payments from your customers, Pay your staff payments and withdraw your available balance please set up your payment methods. ",
    button1: "Set Payment Method",
    button1link: "/business-dashboard/payment",
  },
  {
    title: "Create Branches",
    description:
      "To operate your business, you must create at least one branch, complete with location and branch information. If they do related business, you can open up multiple branches simultaneously.",
    button1: "Create Your Branches",
    button1link: "/business-dashboard/setup?show=3",
  },
  {
    title: "Install Your Resources",
    description:
      "To make your customer happy and give them a organized instruction, you need to install several resources as per your business and customers needs.",
    button1: "Install Your Resources",
    button1link: "/business-dashboard/setup?show=18",
  },
];
const AccountRecom = (props) => {
  useEffect(() => {
    if (!props.info?.business) props.getBusinessInfo();
  }, [props.info?.business]);

  return (
    <div>
      <div className="w-full text-center mb-10 mt-2">
        <h1 className="text-[32px] font-[700] mb-1 text-[#494949]">
          Account Recommendations
        </h1>
        <p className="w-[420px] text-[16px] font-normal m-auto">
          Here are the few steps or suggestions that you need to follow to
          complete your Ambel account
        </p>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 pb-5">
        {recommendations.map((recommendation, index) => (
          <div
            key={index}
            className="flex flex-col justify-between shadow rounded-[12px] bg-white p-4 text-center"
          >
            <div className="flex flex-col justify-center">
              <div className="flex justify-between">
                <AiOutlineQuestionCircle className="my-auto text-xl text-[#19525A]" />
                {(index === 2 || index === 9) && (
                  <Image
                    src={arrow}
                    alt="image"
                    width={"16"}
                    height={"14"}
                    className="my-auto"
                  />
                )}
              </div>
              <p className="text-[20px] mt-2 font-[600] text-[#515151]">
                {recommendation.title}
              </p>
              <p className="text-[16px] mt-8 text-[#5B5B5B] text-center">
                {recommendation.description}
              </p>
              {recommendation.missing && recommendation.missingTitle && (
                <p className="text-[16px] mt-8 text-[#5B5B5B] text-center">
                  <b>{recommendation.missingTitle}</b> {recommendation.missing}
                </p>
              )}
            </div>
            <div className="flex w-full  justify-center mt-[30px] mb-8	">
              <button
                onClick={() => Router.push(recommendation.button1link)}
                className="bg-[#19525A] shadow-md text-[16px] py-[6px] h-[36px] w-[280px] text-white rounded-[8px] ring-2 ring-[#b1c2c5]"
              >
                {recommendation.button1}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    info: state?.business?.info,
    loading: state?.business?.loading,
    // branchLoading:state?.busin
  };
};
export default connect(mapStateToProps, {
  getBusinessInfo,
})(AccountRecom);
