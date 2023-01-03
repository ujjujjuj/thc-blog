import Cookies from "cookies";
import { GetServerSideProps } from "next";

const Logout = () => {
  return null;
};

export default Logout;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);
  cookies.set("auth", "", { maxAge: 0, overwrite: true });
  return {
    redirect: {
      destination: "/admin/login",
      permanent: false,
    },
  };
};
