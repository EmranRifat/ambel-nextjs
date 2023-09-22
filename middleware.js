import jwtDecode from "jwt-decode";
import { NextResponse } from "next/server";
import { unAuthorizedProtectedPaths } from "./constants";
import { hasPermission } from "./utils/permissions";

export default function middleware(req) {
  const token = req.cookies.get("jwt");
  const url = req.nextUrl;
  // console.log(url);

  const user = token ? jwtDecode(token) : null;
  // console.log("User", user);

  const isProtectedPath = () => {
    if (!token) {
      return unAuthorizedProtectedPaths.some((path) =>
        url.pathname.includes(path)
      );
    } else {
      return false;
    }
  };

  if (isProtectedPath()) {
    return NextResponse.redirect(url.origin + "?requireLogin=true");
  } else {
    if (url.pathname.includes("setup-profile")) {
      // @ts-ignore
      if (user?.registrationComplete) {
        const dashBoardPath = "/user-dashboard";
        return NextResponse.redirect(url.origin + dashBoardPath);
      } else {
        return NextResponse.next();
      }
    } else if (url.pathname.endsWith("-dashboard")) {
      // @ts-ignore
      if (user?.registrationComplete) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(url.origin + "/profile/setup-profile");
      }
    } else if (url.pathname.endsWith("confirm")) {
      // console.log("Hello");
      const dashBoardPath = "/user-dashboard";
      // console.log(dashBoardPath);
      return NextResponse.redirect(url.origin + dashBoardPath);
    }
    return NextResponse.next();
  }
}
