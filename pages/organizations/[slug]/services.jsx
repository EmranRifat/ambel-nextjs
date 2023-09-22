import React, { useState } from "react";
import Services from "../../../components/FindProfessional/Services.jsx";
import { useRouter } from "next/router";
import { useEffect } from "react";
import HeadComp from "../../../components/FindProfessional/Head/index.js";
import Footer from "../../../components/FindProfessional/Footer/index.js";
import axios from "../../../utils/axios.js";
import Head from "next/head";

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
      <Services services={props.orgData.services||[]} />
      <Footer />
    </div>
  );
};

// export async function getServerSideProps(ctx) {
//   const { slug } = ctx.params;
//   // console.log(ctx.params, ctx.query);
//   let data;
//   try {
//     data = await axios.get(`/view/organizations/${slug}/services`);
//     // console.log("server", data.data.data);
//   } catch (err) {
//     // console.log(err);
//   }
//   if (!data?.data?.data) {
//     return {
//       notFound: true,
//     };
//     // return {
//     //   redirect: {
//     //     destination: "/404",
//     //     permanent: false,
//     //   },
//     // };
//   }
//   return {
//     props: { services: data.data.data }, // will be passed to the page component as props
//   };
// }
export async function getServerSideProps(ctx) {
  const { slug } = ctx.params;
  let data;
  try {
    data = await axios.get(`/view/organizations/${slug}/services`);
	console.log(data.data.data);
  } catch (err) {
    console.log(err);
    if (err.response.status === 404) {
      return {
        notFound: true,
      };
    }
  }
  if (data?.data?.status === "success") {
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
