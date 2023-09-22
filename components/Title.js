import Head from "next/head";

const Title = (props) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>{props.title}</title>
    </Head>
  );
};

export default Title;
