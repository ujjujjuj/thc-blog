import { GetServerSideProps } from "next";
import addAuth from "../../utils/addAuth";

const Manage = () => {
 };

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const user = await addAuth(req, res);
  if (user === null) {
    return { redirect: { statusCode: 302, destination: "/admin/login" } };
  } else if (user.role !== "ADMIN") {
    return { redirect: { statusCode: 302, destination: "/admin/" } };
  }

  return { props: {} };
};

export default Manage;
