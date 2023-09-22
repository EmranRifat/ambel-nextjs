import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "../../../utils/axios";
import cookie from "js-cookie";
import jwtDecode from "jwt-decode";
import { async } from "@firebase/util";

export default function Success() {
  const [close, setClose] = useState(false);

  const getUser = async () => {};
  const router = useRouter();
  const { closeWindow, checkProfile } = router.query;
  if (closeWindow == "true") {
    console.log("hello");
    setTimeout(() => {
      window.close();
    }, 2000);
  } else if (checkProfile == "true") {
    setInterval(() => {}, 2000);
    const data = jwtDecode(cookie.get("jwt"));
    if (data)
      axios
        // @ts-ignore
        .get(`/users/${data.id}`, {
          headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
        })
        .then((response) => {
          if (response.data.data.user.registrationComplete == true)
            router.push("/");
        });

    // console.log(data);
  }
  return <div>Payment was successful</div>;
}
