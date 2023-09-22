import React, { useEffect, useState } from "react";
import { setCookie } from "cookies-next";
import FormGroup from "./FormGroup";
import Image from "next/image";
import rocket from "./icons/rocket.png";
import axios from "../../utils/axios";
import { useRouter } from "next/router";
import { CircleLoader, PulseLoader } from "react-spinners";
import dynamic from "next/dynamic";
const OTPInput = dynamic(() => import("otp-input-react"), { ssr: false });

function Verification(props) {
  const [error, setError] = useState("");
  const router = useRouter();
  const [OTP, setOTP] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [timer, setTimer] = useState(30);
  const [over, setOver] = React.useState(false);

  const sendVeifyCode = async () => {
    setIsLoading(true);
    try {
      const device_name = navigator.platform;
      const res = await axios.get(
        `users/verify/${OTP}`,
        {
          params: {
            device_name,
          },
        }
        // {}
      );
      if (res.data.status == "success") {
        setCookie("jwt", res.data.token);
        setIsLoading(false);
        setError("");
        if (props.invitation?.inviteType == "Staff") {
          axios.put(
            `/staff/${props.invitation.staffId}`,
            // @ts-ignore
            { status: "active", user: res.data.data.user._id },
            {
              withCredentials: true,
              headers: { Authorization: `Bearer ${res.data.token}` },
            }
          );
        } else if (props.invitation?.inviteType == "Practitioner") {
          axios.put(
            `/practitioner/acceptprops.invitation/${props.invitation.practitionerId}`,
            // @ts-ignore
            { userId: res.data.data.user._id },
            {
              withCredentials: true,
              headers: { Authorization: `Bearer ${res.data.token}` },
            }
          );
        } else if (props.invitation?.inviteType == "Customer") {
          axios.put(
            `/customer/acceptInvitation/${props.invitation.customerId}`,
            // @ts-ignore
            { email: res.data.data.user.email },
            {
              withCredentials: true,
              headers: { Authorization: `Bearer ${res.data.token}` },
            }
          );
        }
        router.push("/profile/setup-profile");
        props.setOpenVerificationModal(false);
      } else {
        setIsLoading(false);
        setError(res?.data?.err?.message);
      }
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleVerifyAgain = async (event) => {
    event.preventDefault();
    setSendingEmail(true);
    try {
      const result = await axios.post("users/verifyAgain", {
        email: props.email,
      });

      if (result.data.status == "success") {
        setSendingEmail(false);
      } else {
      }
      // setTimeout(() => {
      // 	setSendingEmail(false)
      // 	reset()
      // }, 5000)
    } catch (err) {
      setSendingEmail(false);
    }
  };

  const tick = () => {
    if (over) return;
    if (timer === 1) setOver(true);
    else {
      setTimer(timer - 1);
    }
  };

  const reset = () => {
    setTimer(30);
    setOver(false);
  };

  React.useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  return (
    <div className="w-full sm:w-1/3 my-12 py-6 px-10 z-50 bg-white shadow mx-auto rounded-2xl">
      <form className="w-full mx-auto text-center">
        <div className=" flex justify-center py-4">
          <div
            className={`p-8 bg-gradient-to-r from-orange-400 to-orange-600 h-24 w-24 rounded-full`}
          >
            <Image src={rocket} alt="patient" height={60} width={60} />
          </div>
        </div>
        <div className="pb-8">
          <h1 className="font-bold text-4xl text-slate-600">
            2-Step Verification
          </h1>
          <p className="mt-3">
            Enter the verification code sent to your email <b>{props.email}</b>
          </p>
        </div>

        <OTPInput
          value={OTP}
          inputClassName="border border-gray-300 text-2xl font-bold text-center form-control rounded-lg"
          onChange={setOTP}
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "1rem",
            textAlign: "center",
          }}
          inputStyles={{ width: "100%", height: "60px" }}
          autoFocus
          OTPLength={4}
          otpType="number"
          disabled={false}
        />
        <div className="mt-4">
          {/* </div> */}
          {error && (
            <span className="inline-flex">
              <p className="text-rose-700">{error}</p>{" "}
            </span>
          )}
          <FormGroup className="my-2">
            <button
              type="button"
              onClick={() => {
                sendVeifyCode();
              }}
              style={{ color: "#ffffff" }}
              className="w-full rounded-lg border-0 text-white text-sm h-11 bg-gradient-to-r from-orange-400 to-orange-600"
            >
              {isLoading ? (
                <div className="p-2 flex items-center justify-center">
                  <PulseLoader color="#ffffff" size={12} />
                </div>
              ) : (
                <p className="inline-block " style={{ color: "#ffffff" }}>
                  VERIFY
                </p>
              )}
            </button>
          </FormGroup>
        </div>
        <div className="pt-1 pb-2 flex justify-center items-center gap-1">
          Haven&apos;t received it?{" "}
          <p
            className={`${sendingEmail || !over ? "" : "cursor-pointer"
              } text-slate-800 font-bold`}
            onClick={(event) => {
              if (!sendingEmail && over) handleVerifyAgain(event);
            }}
          >
            Resend a new code
          </p>
          {sendingEmail ? (
            <CircleLoader size={12} color="#2175FE" />
          ) : over ? (
            <></>
          ) : (
            <p className="text-[#2175FE] font-semibold">{timer}</p>
          )}
        </div>
      </form>
    </div>
  );
}

export default Verification;
