import Image from "next/image";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HeaderLink from "./HeaderLink";
import GroupIcon from "@mui/icons-material/Group";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import { Avatar } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

const Header = () => {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme, theme } = useTheme();
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  const checkPath = (url) => {
    if (router.pathname === url) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 bg-white dark:bg-[#1d2226] flex items-center justify-around py-1.5 px-3 focus-within:shadow-lg`}
    >
      {/* Left */}
      <div className="flex items-center w-full max-w-xs space-x-2">
        {mounted && (
          <>
            {resolvedTheme === "dark" ? (
              <Image src="https://rb.gy/bizvqj" width={45} height={45} />
            ) : (
              <Image src="https://rb.gy/dpmd9s" width={55} height={55} />
            )}
          </>
        )}

        <div className="flex space-x-1 items-center dark:md:bg-gray-700 py-2.5 px-4 rounded w-full">
          <SearchRoundedIcon />
          <input
            type="text"
            placeholder="Search"
            className="flex-grow hidden text-sm bg-transparent md:inline-flex focus:outline-none placeholder-black/70 dark:placeholder-white/75"
          />
        </div>
      </div>
      {/* Right */}
      <div className="flex items-center space-x-6">
        <HeaderLink
          Icon={HomeRoundedIcon}
          text="Home"
          feed
          active={checkPath("/")}
          url={"/"}
        />
        <HeaderLink Icon={GroupIcon} text="My Network" feed />
        <HeaderLink Icon={BusinessCenterIcon} text="Jobs" feed hidden />
        <HeaderLink Icon={ChatIcon} text="Messaging" feed />
        <HeaderLink Icon={NotificationsIcon} text="Notifications" feed />
        <HeaderLink
          Icon={Avatar}
          text="Me"
          feed
          avatar
          hidden
          url={session?.user?.uid}
        />
        <HeaderLink Icon={AppsOutlinedIcon} text="Work" feed hidden />

        {/* Dark Mode toggle */}
        {mounted && (
          <div
            className={`bg-gray-600 flex items-center px-0.5 rounded-full h-6 w-12 cursor-pointer flex-shrink-0 relative ${
              resolvedTheme === "dark" ? "justify-end" : "justify-start"
            }`}
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            <span className="absolute left-0">🌜</span>
            <motion.div
              className="z-40 w-5 h-5 bg-white rounded-full"
              layout
              transition={spring}
            />
            <span className="absolute right-0.5">🌞</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
