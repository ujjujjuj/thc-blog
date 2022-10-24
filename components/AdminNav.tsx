import Link from "next/link";
import { BiMenu } from "react-icons/bi";
import { useEffect, useState } from "react";
import Router from "next/router";

const AdminNav = () => {
  const [navActive, setNavActive] = useState(false);
  const width = useWindowWidth();

  return (
    <>
      <div className="flex relative z-10 justify-between justify-self-start items-center px-10 py-4 w-full shadow-md bg-darker">
        <div>
          <span
            className="text-2xl font-bold cursor-pointer font-logo"
            onClick={() => Router.push("/admin/")}
          >
            thc
          </span>
        </div>
        <div
          className={`flex items-center gap-4 md:gap-10 flex-col md:flex-row absolute md:static left-0 right-0 bottom-0 translate-y-full md:transform-none pb-3 md:pb-0 bg-darker ${
            navActive || width >= 768 ? "" : "hidden  "
          }`}
        >
          <Link href="/admin/">Dashboard</Link>
          <Link href="/admin/profile">Profile</Link>
          <Link href="/admin/logout">Log out</Link>
        </div>
        <BiMenu
          className="block cursor-pointer md:hidden hover:opacity-60"
          fontSize="1.8rem"
          onClick={() => setNavActive(!navActive)}
        />
      </div>
      <div
        className={`fixed inset-0 bg-black opacity-5 ${
          navActive && width < 768 ? "" : "hidden"
        }`}
        onClick={() => setNavActive(false)}
      ></div>
    </>
  );
};

const useWindowWidth = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const listener = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", listener);
    listener();
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  return width;
};

export default AdminNav;
