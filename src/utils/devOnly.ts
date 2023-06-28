const devOnly = () => {
  const isProd = process.env.NODE_ENV === "production";

  if (isProd) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
};

export default devOnly;
