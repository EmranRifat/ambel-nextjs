import React, { useEffect } from "react";
import HeadComp from "../../../components/FindProfessional/Head";
import Footer from "../../../components/FindProfessional/Footer/index";
import Home from "../../../components/FindProfessional/Home.jsx";
import axios from "../../../utils/axios";
import Head from "next/head";
import PageLoader from "../../../components/PageLoader";

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
      <PageLoader />
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto">
      <Head>
        <title>{props.slug} | Ambel</title>
      </Head>
      <HeadComp userName={props.slug} orgData={props.orgData} branch={branch} setBranch={setBranch} />
      <Home orgData={props.orgData} branch={branch} />
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
