import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";
import { AudioContext } from "./_app";
import Topbar from "@/components/Topbar";
import Group from "@/components/Group";
import styles from "../styles/font.module.scss";
import { getServerCookie } from "../utils/cookie";
import MultiFilter from "@/components/MultiFilter";

const apiUrl = process.env.API_URL;

export default function Home({ token }) {
  const [allGroups, setAllGroups] = useState([]);
  const [filterGroups, setFilterGroups] = useState([]);
  const router = useRouter();
  const path = router.pathname;
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeLocations, setActiveLocations] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);
  const [isDefault, setIsDefault] = useState(true);

  const audios = useContext(AudioContext);
  const playHedgehogCrySound = () => {
    const { hedgehogCry } = audios;
    if (hedgehogCry) {
      hedgehogCry.play().catch((error) => {
        console.error("Failed to play audio:", error);
      });
    }
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const [cursor, setCursor] = useState("");
  const [isGettingGroupsByCursor, setIsGettingGroupsByCursor] = useState(false);
  const getGroups = async () => {
    if (isDefault) {
      await axios
        .get(`${apiUrl}/group/search?isJoined=0&sort=recent`, config)
        .then((res) => {
          console.log(res.data.groups);
          setAllGroups(res.data.groups);
          setCursor(res.data.next_cursor);
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: `${err.message}\nPlease try again later or notify our engineering team.`,
            padding: "1.2em",
            background: "#fadee5",
            customClass: {
              title: "swal_title",
              confirmButton: "swal_confirm_fail",
              container: "swal_container",
              popup: "swal_popup",
            },
          });
        });
    } else {
      await axios
        .get(`${apiUrl}/group/search?isJoined=0&sort=popular`, config)
        .then((res) => {
          setAllGroups(res.data.groups);
          setCursor(res.data.next_cursor);
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: `${err.message}\nPlease try again later or notify our engineering team.`,
            padding: "1.2em",
            background: "#fadee5",
            customClass: {
              title: "swal_title",
              confirmButton: "swal_confirm_fail",
              container: "swal_container",
              popup: "swal_popup",
            },
          });
        });
    }
  };

  const getGroupsByCursor = async () => {
    if (isDefault) {
      await axios
        .get(
          `${apiUrl}/group/search?cursor=${cursor}&isJoined=0&sort=recent`,
          config
        )
        .then((res) => {
          setAllGroups([...allGroups, ...res.data.groups]);
          setCursor(res.data.next_cursor);
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: `${err.message}\nPlease try again later or notify our engineering team.`,
            padding: "1.2em",
            background: "#fadee5",
            customClass: {
              title: "swal_title",
              confirmButton: "swal_confirm_fail",
              container: "swal_container",
              popup: "swal_popup",
            },
          });
        });
    } else {
      await axios
        .get(
          `${apiUrl}/group/search?cursor=${cursor}&isJoined=0&sort=popular`,
          config
        )
        .then((res) => {
          setAllGroups([...allGroups, ...res.data.groups]);
          setCursor(res.data.next_cursor);
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: `${err.message}\nPlease try again later or notify our engineering team.`,
            padding: "1.2em",
            background: "#fadee5",
            customClass: {
              title: "swal_title",
              confirmButton: "swal_confirm_fail",
              container: "swal_container",
              popup: "swal_popup",
            },
          });
        });
    }
    setIsGettingGroupsByCursor(false);
  };

  const isScrolling = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }
    setIsGettingGroupsByCursor(true);
  };

  useEffect(() => {
    getGroups();
    window.addEventListener("scroll", isScrolling);
    return () => window.removeEventListener("scroll", isScrolling);
  }, [isDefault]);

  useEffect(() => {
    if (isGettingGroupsByCursor) {
      if (cursor !== null) {
        getGroupsByCursor();
      } else {
        Swal.fire({
          title:
            "Haven't found the group you're looking for?\nWhat about creating one🤩?!",
          padding: "1.2em",
          background: "#fadee5",
          customClass: {
            title: "swal_title",
            confirmButton: "swal_confirm_fail",
            container: "swal_container",
            popup: "swal_popup",
          },
        });
      }
    }
  }, [isGettingGroupsByCursor, isDefault]);

  return (
    <>
      <Head>
        <title>DaoDin</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="description" content="Generated by create next app" />
      </Head>
      <main
        className={`${styles.content} min-h-screen bg-gradient-to-br from-[#D14444] to-[#F77B54] dark:from-darkPrimaryColor dark:to-darkSecondaryColor`}
      >
        <Topbar token={token} />
        <div className="w-[90%] pt-8 pb-5 max-w-5xl m-auto">
          <div className="h-[100px] bg-secondaryColor dark:bg-darkSecondaryColor rounded-[20px] mb-6 flex items-center justify-center ">
            <Image
              src="/pal-1.png"
              alt="pal"
              width={120}
              height={120}
              onMouseEnter={playHedgehogCrySound}
              className="hover:animate-homepage-ping"
            />
            <Image
              src="/pal-1.png"
              alt="pal"
              width={120}
              height={120}
              onMouseEnter={playHedgehogCrySound}
              className="hover:animate-homepage-ping"
            />
            <Image
              src="/pal-1.png"
              alt="pal"
              width={120}
              height={120}
              onMouseEnter={playHedgehogCrySound}
              className="hover:animate-homepage-ping"
            />
            <Image
              src="/pal-1.png"
              alt="pal"
              width={120}
              height={120}
              onMouseEnter={playHedgehogCrySound}
              className="hover:animate-homepage-ping"
            />
            <Image
              src="/pal-1.png"
              alt="pal"
              width={120}
              height={120}
              onMouseEnter={playHedgehogCrySound}
              className="hover:animate-homepage-ping"
            />
            <Image
              src="/pal-1.png"
              alt="pal"
              width={120}
              height={120}
              onMouseEnter={playHedgehogCrySound}
              className="hover:animate-homepage-ping"
            />
            <Image
              src="/pal-1.png"
              alt="pal"
              width={120}
              height={120}
              onMouseEnter={playHedgehogCrySound}
              className="hover:animate-homepage-ping"
            />
            <Image
              src="/pal-1.png"
              alt="pal"
              width={120}
              height={120}
              onMouseEnter={playHedgehogCrySound}
              className="hover:animate-homepage-ping"
            />
          </div>

          <div className="mb-6 flex justify-between items-center">
            <button
              type="button"
              onClick={() => {
                setIsFilterOpen(true);
              }}
              className="w-32 px-6 py-1 bg-[#F9EDED] dark:white text-[26px] font-bold text-primaryColor dark:text-darkPrimaryColor rounded-[50px]"
            >
              Filter
            </button>
            <div className="text-xl font-medium flex">
              <button
                type="button"
                onClick={() => setIsDefault(true)}
                className={`${
                  isDefault ? "text-white" : "text-slate-600"
                } mr-2 underline`}
              >
                Recent
              </button>
              <p>|</p>
              <button
                type="button"
                onClick={() => setIsDefault(false)}
                className={`${isDefault ? "text-slate-600" : "text-white"} 
                ml-2 underline`}
              >
                Popular
              </button>
            </div>
          </div>
          {isFilterOpen && (
            <MultiFilter
              token={token}
              setIsFilterOpen={setIsFilterOpen}
              setFilterGroups={setFilterGroups}
              activeLocations={activeLocations}
              setActiveLocations={setActiveLocations}
              activeCategories={activeCategories}
              setActiveCategories={setActiveCategories}
            />
          )}

          {filterGroups.length === 0 ? (
            <div className=" px-12 pt-2 pb-8 bg-[#F9EDED] dark:white rounded-[20px]">
              {allGroups?.map((group) => (
                <Group
                  path={path}
                  key={group.group_id}
                  groupId={group.group_id}
                  name={group.name}
                  category={group.category}
                  location={group.location}
                  description={group.description}
                  status={group.status}
                  picture={group.picture}
                  area={group.area}
                  count={group.count}
                />
              ))}
            </div>
          ) : (
            <div className=" px-12 pt-2 pb-8 bg-[#F9EDED] rounded-[20px]">
              {filterGroups.map((group) => (
                <Group
                  path={path}
                  key={group.group_id}
                  groupId={group.group_id}
                  name={group.name}
                  category={group.category}
                  location={group.location}
                  description={group.description}
                  status={group.status}
                  picture={group.picture}
                  area={group.area}
                  count={group.count}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const token = getServerCookie("userInfo", "token", context.req);
  const userId = getServerCookie("userInfo", "user_id", context.req);
  const name = getServerCookie("userInfo", "name", context.req);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { token, userId, name },
  };
}
