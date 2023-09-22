import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import Dropdown from "../../../Dropdown";
import { City } from "country-state-city";
import { createBusinessBranch } from "../../../../store/actions/business";
import { PulseLoader } from "react-spinners";
import PhoneCodeDropdown from "../../../Dropdown/PhoneCodeDropdown";
import {
  getAllCountries,
  getCityByCountryCode,
} from "../../../../utils/int_phone_code";
import dynamic from "next/dynamic";
const MapView = dynamic(import("../../Map/MapView"), { ssr: false });

const CreateBranchModal = (props) => {
  const [cityList, setCityList] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAlertMessage, setShowAlertMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [countryCode, setCountryCode] = React.useState("");

  const [info, setInfo] = useState({
    business: props.business?._id,
    name: "",
    address: "",
    city: "Select city",
    zipCode: "",
    openingStartAt: "Start",
    openingEndAt: "End",
    openingStartDay: "Start",
    openingEndDay: "End",
    branchPhoneNumber: {
      phoneCode: null,
      phoneNumber: "",
    },
    branchEmail: "",
    mapCoordinate: {
      lattitude: null,
      longitude: null,
    },

    status: "Select status",
    onlineBooking: true,
  });

  // console.log(props.business?.location, countryCode);
  // console.log(City.getAllCities());
  // console.log(getCityByCountryCode("bn"));
  useEffect(() => {
    var country = getAllCountries().find(
      (item) =>
        item.name === props.business?.location ?? props.business?.user?.country
    );
    const citeis = City.getAllCities()
      .filter(
        (e) => e.countryCode?.toLowerCase() == country?.isoCode?.toLowerCase()
      )
      .map((e) => e.name);
    setInfo({
      ...info,
      branchPhoneNumber: {
        ...info.branchPhoneNumber,
        phoneCode: country?.phonecode,
      },
    });
    setCountryCode(country?.phonecode);
    setCityList(citeis);
  }, []);

  const resetInfo = () => {
    setInfo({
      business: props.business?._id,
      name: "",
      address: "",
      city: "Select city",
      zipCode: "",
      openingStartAt: "Start",
      openingEndAt: "End",
      openingStartDay: "Start",
      openingEndDay: "End",
      branchPhoneNumber: {
        phoneCode: countryCode ?? "1",
        phoneNumber: "",
      },
      branchEmail: "",
      mapCoordinate: {
        lattitude: 12.1,
        longitude: 12.0,
      },

      status: "Select status",
      onlineBooking: true,
    });
    setShowErrorMessage(false);
    setShowAlertMessage(false);
  };

  useEffect(() => {
    setInfo({ ...info, ...props.info });
    setShowErrorMessage(false);
  }, []);

  return (
    <div className="max-w-[580px] h-[1100px] mt-[20px] z-100 lg:min-w-[580px] flex flex-col items-center bg-white p-5 rounded-md">
      <div className="w-full flex justify-end items-start">
        <span
          onClick={() => {
            resetInfo();
            props.setOpenCreateModal(false);
          }}
          className="text-2xl text-[#5B5B5B] cursor-pointer"
        >
          ✖
        </span>
      </div>
      <span className="text-[#5B5B5B] text-[24px] mt-5">Add a new branch</span>
      <div className="w-full mt-3">
        <span className="text-[16px] text-[#5B5B5B]">Branch name</span>
        <input
          value={info.name}
          onChange={(e) => {
            setInfo((prevState) => {
              prevState["name"] = e.target.value;
              return { ...prevState };
            });
          }}
          type="text"
          className="w-full outline-none rounded-md border-2 py-2 px-4"
        />
      </div>
      <div className="w-full mt-3">
        <span className="text-[16px] text-[#5B5B5B] mt-3">Branch Address</span>
        <input
          value={info.address}
          onChange={(e) => {
            setInfo((prevState) => {
              prevState["address"] = e.target.value;
              return { ...prevState };
            });
          }}
          type="text"
          className="w-full outline-none rounded-md border-2 py-2 px-4"
        />
      </div>
      <div className="w-full mt-3">
        <span className="text-[16px] text-[#5B5B5B]">City</span>

        <Dropdown
          items={cityList}
          selected={info.city}
          onSelected={(selected) => {
            setInfo((prevState) => {
              prevState["city"] = selected;
              return { ...prevState };
            });
          }}
        />
      </div>
      <div className="w-full mt-3">
        <span className="text-[16px] text-[#5B5B5B]">Zip Code</span>
        <input
          value={info.zipCode}
          onChange={(e) => {
            setInfo((prevState) => {
              prevState["zipCode"] = e.target.value;
              return { ...prevState };
            });
          }}
          type="text"
          className="w-full outline-none rounded-md border-2 py-2 px-4"
        />
      </div>
      <div className="w-full mt-3">
        <span className="text-[16px] text-[#5B5B5B]">Branch Phone Number</span>
        <div className="w-full flex">
          <PhoneCodeDropdown
            width={"90px"}
            items={getAllCountries()}
            selected={info.branchPhoneNumber.phoneCode ?? countryCode ?? "880"}
            onSelected={(selected) => {
              setInfo((prevState) => {
                prevState["branchPhoneNumber"] = {
                  ...prevState["branchPhoneNumber"],
                  phoneCode: selected,
                };
                return { ...prevState };
              });
            }}
          />
          <input
            type="text"
            name="phoneNumber"
            value={info.branchPhoneNumber.phoneNumber}
            onChange={(e) => {
              setInfo((prevState) => {
                prevState["branchPhoneNumber"] = {
                  ...prevState["branchPhoneNumber"],
                  phoneNumber: e.target.value,
                };
                return { ...prevState };
              });
            }}
            required
            placeholder={props.label}
            className="text-[14px] w-full ml-1 h-[40px] outline-none rounded-[8px] border-2 border-gray-300 py-2 px-4 focus:ring-1 focus:ring-gray-400"
          />
        </div>
      </div>
      <div className="w-full mt-3">
        <span className="text-[16px] text-[#5B5B5B]">Branch Email</span>
        <input
          value={info.branchEmail}
          onChange={(e) => {
            setInfo((prevState) => {
              prevState["branchEmail"] = e.target.value;
              return { ...prevState };
            });
          }}
          type="email"
          className="w-full outline-none rounded-md border-2 py-2 px-4"
        />
      </div>
      <div className="w-full flex justify-between mt-3">
        <div className="">
          <span className="text-[16px] text-[#5B5B5B]">Opened Day</span>
          <div className="flex items-center">
            <Dropdown
              width={"120px"}
              items={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
              selected={info.openingStartAt}
              onSelected={(selected) => {
                setInfo((prevState) => {
                  prevState["openingStartAt"] = selected;
                  return { ...prevState };
                });
              }}
            />
            <span className="text-[16px] text-[#5B5B5B] mx-3">to</span>
            <Dropdown
              width={"120px"}
              items={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
              selected={info.openingEndAt}
              onSelected={(selected) => {
                setInfo((prevState) => {
                  prevState["openingEndAt"] = selected;
                  return { ...prevState };
                });
              }}
            />
          </div>
        </div>

        <div className="">
          <span className="text-[16px] text-[#5B5B5B]">Opened Hour</span>
          <div className="flex items-center">
            <Dropdown
              width={"95px"}
              items={["8 AM", "9 AM", "10 AM", "11 AM"]}
              selected={info.openingStartDay}
              onSelected={(selected) => {
                setInfo((prevState) => {
                  prevState["openingStartDay"] = selected;
                  return { ...prevState };
                });
              }}
            />
            <span className="text-[16px] text-[#5B5B5B] mx-3">to</span>
            <Dropdown
              width={"95px"}
              items={["5 PM", "6 PM", "7 PM", "8 PM"]}
              selected={info.openingEndDay}
              onSelected={(selected) => {
                setInfo((prevState) => {
                  prevState["openingEndDay"] = selected;
                  return { ...prevState };
                });
              }}
            />
          </div>
        </div>
      </div>
      <div className="w-full mt-3">
        <span className="text-[16px] text-[#5B5B5B]">
          Branch Location on Map
        </span>
        <div className="w-full my-3">
          <MapView
            info={info}
            setInfo={setInfo}
            mapCoordinate={info.mapCoordinate}
            canSelectLocation={true}
          />
        </div>
      </div>

      <div className="w-full mt-3">
        <span className="text-[16px] text-[#5B5B5B]">Status</span>
        <Dropdown
          items={["Active", "Inactive"]}
          selected={info.status}
          onSelected={(selected) => {
            setInfo((prevState) => {
              prevState["status"] = selected;
              return { ...prevState };
            });
          }}
        />
      </div>
      <div className=" w-full flex justify-start mt-3">
        <label className="text-[14px] text-[#5B5B5B]">
          <input
            type="checkbox"
            className="mr-2 h- w-5"
            checked={info.onlineBooking}
            onChange={(e) => {
              setInfo((prevState) => {
                prevState["onlineBooking"] = e.target.checked;
                return { ...prevState };
              });
            }}
          />
          Enable Online Booking
        </label>
      </div>
      {showAlertMessage && (
        <small className="text-rose-500">FIll all the required fields</small>
      )}
      {showSuccess && (
        <div className="text-emerald-600">Branch Successfully Added</div>
      )}
      {showErrorMessage && (
        <div className="text-rose-500">
          Some error occured while registering the branch
        </div>
      )}
      <div className="flex w-full justify-end">
        <button
          onClick={() => {
            resetInfo();
            props.setOpenCreateModal(false);
          }}
          className="px-4 py-2 text-[16px] border-[.5px] border-black bg-white text-black rounded-[8px] mr-4"
        >
          Cancel
        </button>
        {
          <button
            className="px-4 py-2 text-[16px]  text-white bg-[#19525A] rounded-[8px]"
            onClick={() => {
              if (
                !info.name ||
                !info.address ||
                !info.zipCode ||
                info.city.startsWith("Select") ||
                info.status.startsWith("Select")
              ) {
                setShowAlertMessage(true);
                return;
              }
              props.createBusinessBranch(info).then((res) => {
                props.setOpenCreateModal(false);
                props.getBranches();
              });
            }}
          >
            {props.loading ? (
              <PulseLoader color="#ffffff" size={12} />
            ) : info._id ? (
              "Update"
            ) : (
              "Save"
            )}
          </button>
        }
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
  business: state.business?.info?.business,
  loading: state.business?.loading,
});
export default connect(mapStateToProps, { createBusinessBranch })(
  CreateBranchModal
);
// export default CreateBranchModal;
