import Banner from "components/Banner";

const Abc = () => {
  return (
    <>
      <Banner
        images={[
          { src: "https://aware.brownbag.one/images/aware/aware-logo.png", alt: "어웨어" },
          { src: "https://aware.brownbag.one/images/aware/aware-logo.png", alt: "어웨어" },
        ]}
        height={"200px"}
      />
    </>
  );
};

export default Abc;
