import React, { useEffect } from "react";

export default function Success() {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 2000);
  }, []);
  return <div>Payment was successful</div>;
}
