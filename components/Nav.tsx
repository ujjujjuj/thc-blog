import Link from "next/link";
import { FC, useState } from "react";
import Router, { useRouter } from "next/router";
import { IconContext } from "react-icons";
import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";
import { BiMenu } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import useWindowWidth from "../hooks/useWindowWidth";

interface NavLinkProps {
  href: string;
  text: string;
}

const NavLink: FC<NavLinkProps> = ({ href, text }) => {
  const router = useRouter();

  return (
    <div
      className={`transition-colors hover:text-white ${
        router.pathname === href ? "text-white" : "text-gray-500"
      }`}
    >
      <Link href={href}>{text}</Link>
    </div>
  );
};

const Nav = () => {
  const [navActive, setNavActive] = useState(false);
  const width = useWindowWidth();

  return (
    <>
      <div className="relative z-10 px-10 py-4  md:pb-0 bg-darker md:bg-dark border-y-2 border-neutral-900">
        <div className="flex justify-between items-center">
          <div>
            <span
              className="text-3xl font-bold cursor-pointer font-logo"
              onClick={() => Router.push("/")}
            >
              thc
            </span>
          </div>
          <div
            className={`flex flex-1 md:ml-20 justify-between items-center gap-5 flex-col md:flex-row absolute md:static left-0 right-0 bottom-0 translate-y-full md:transform-none pb-6 md:pb-0 bg-darker md:bg-dark border-y-2 border-neutral-900 md:border-0 pt-5 md:pt-0 z-20 ${
              navActive || width >= 768 ? "" : "hidden  "
            }`}
          >
            <div className="flex flex-col gap-4 items-center font-bold md:gap-10 lg:gap-16 md:flex-row font-poppins">
              <NavLink href="/about" text="ABOUT" />
              <NavLink href="/" text="BLOGS" />
              <NavLink href="/memories" text="MEMORIES" />
              <NavLink href="/trips" text="TRIPS" />
              <NavLink href="/aaa" text="404" />
            </div>
            <IconContext.Provider value={{ size: "1.4rem" }}>
              <div className="flex gap-5 items-center cursor-pointer">
                <a target="_blank" href="https://www.instagram.com/thc.nsut/">
                  <FiFacebook className="opacity-70 transition-opacity hover:opacity-100" />
                </a>
                <a target="_blank" href="https://www.instagram.com/thc.nsut/">
                  <FiInstagram className="opacity-70 transition-opacity hover:opacity-100" />
                </a>
                <a
                  target="_blank"
                  href="https://www.youtube.com/channel/UCHhz9XGrUHrN8w3Hq6-2Cmw"
                >
                  <FiYoutube className="opacity-70 transition-opacity hover:opacity-100" />
                </a>
              </div>
            </IconContext.Provider>
          </div>
          <div
            className="cursor-pointer md:hidden"
            onClick={() => setNavActive(!navActive)}
          >
            {navActive ? <FaTimes size="1.8rem" /> : <BiMenu size="2.2rem" />}
          </div>
        </div>
        {width >= 768 ? (
          <div className="mt-5 w-full h-px bg-gray-800"></div>
        ) : null}
      </div>
    </>
  );
};

export default Nav;
