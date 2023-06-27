const devOnly = () => {
  if (process.env.NODE_ENV === "production") {
    return {
      redirct: {
        permanent: false,
        destination: "/404",
      },
    };
  }

  return { props: {} };
};

export default devOnly;
