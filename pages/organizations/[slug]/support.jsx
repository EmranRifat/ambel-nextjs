import React, { useEffect, useState } from "react";
import HeadComp from "../../../components/FindProfessional/Head";
import Footer from "../../../components/FindProfessional/Footer/index";
import Support from "../../../components/FindProfessional/Support.jsx";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "../../../utils/axios.js";
const FindProfessionals = (props) => {
  const [loading, setLoading] = React.useState(true);
  const [branch, setBranch] = React.useState("-1");

  useEffect(() => {
    if (
      props.orgData === null &&
      props.orgData === undefined &&
      props.orgData === "" &&
      props.slug === null &&
      props.slug === undefined &&
      props.slug === ""
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [props]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  return (
    <div className="max-w-[1440px] mx-auto">
      <Head>
        <title>{props.slug} | Ambel</title>
      </Head>
      <HeadComp userName={props.slug} orgData={props.orgData} branch={branch} setBranch={setBranch} />
      <Support />
      <Footer />
    </div>
  );
};
export async function getServerSideProps(ctx) {
  const { slug } = ctx.params;
  let data;
  try {
    data = await axios.get(`/view/organizations/${slug}/home`);
    console.log(data.data.data.departments);
  } catch (err) {
    console.log(err);
    if (err.response.status === 404) {
      return {
        notFound: true,
      };
    }
  }
  if (data.data.status === "success") {
    return {
      props: {
        slug,
        orgData: data?.data?.data,
      }, // will be passed to the page component as props
    };
  } else {
    return {
      notFound: true,
    };
  }
}
export default FindProfessionals;
