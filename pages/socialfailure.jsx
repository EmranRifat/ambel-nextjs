import { async } from "@firebase/util";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { scoialLogin } from "../store/actions/auth";
import axios from "../utils/axios";

const SocialFailure = (props) => {
  const router = useRouter();
  const errorNotify = (msg) => {
    toast.warn(msg, {
      progress: 0,
    });
    router.push("/");
  };

  useEffect(() => {
    errorNotify("Something went very wrong.Try again later.");
  }, []);
  return (
    <></>
  );
};



export default SocialFailure;
