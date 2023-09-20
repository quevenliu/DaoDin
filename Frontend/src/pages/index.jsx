import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
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
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(true);
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
    setIsLoading(false);
  };

  const getGroupsByCursor = async () => {
    if (isDefault) {
      setIsLoading(true);
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
    setIsLoading(false);
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
        className={`relative ${styles.content} lg:p-12 sm:p-6 sm:pt-0 md:p-8 md:pt-0.5 lg:pt-0 p-4 pt-0 min-h-screen bg-gradient-to-br from-[#D14444] to-[#F77B54] dark:from-darkPrimaryColor dark:to-darkSecondaryColor`}
      >
        <Topbar token={token} isFilterOpen={isFilterOpen} />
        <div className="lg:pt-4.5 md:pt-4 sm:pt-3 pt-2 pb-5 max-w-4xl m-auto">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => {
                setIsFilterOpen(true);
              }}
              className="md:mr-5 sm:mr-4 mr-3 w-24 sm:w-[100px] md:w-28 lg:w-[120px] py-1 border border-solid md:border-2 md:text-2xl text-white text-lg sm:text-xl lg:max-w-5xl font-bold border-white rounded-[50px] hover:animate-filterShake"
            >
              Filter
            </button>
            <Image
              src="/pal-1.png"
              alt="pal"
              width={50}
              height={42.58}
              onMouseEnter={playHedgehogCrySound}
              className="w-0 md:w-11 sm:w-10 mr-1 md:mr-1.5 lg:mr-2 hover:animate-homepagePing"
            />
            <Image
              src="/pal-1.png"
              alt="pal"
              width={50}
              height={42.58}
              onMouseEnter={playHedgehogCrySound}
              className="w-0 md:w-11 sm:w-10 mr-1 md:mr-1.5 lg:mr-2 hover:animate-homepagePing opacity-90"
            />
            <Image
              src="/pal-1.png"
              alt="pal"
              width={50}
              height={42.58}
              onMouseEnter={playHedgehogCrySound}
              className="w-0 md:w-11 sm:w-10 mr-1 md:mr-1.5 lg:mr-2 hover:animate-homepagePing opacity-80"
            />
            <Image
              src="/pal-1.png"
              alt="pal"
              width={50}
              height={42.58}
              onMouseEnter={playHedgehogCrySound}
              className="w-0 md:w-11 sm:w-10 mr-1 md:mr-1.5 lg:mr-2 hover:animate-homepagePing opacity-70"
            />
            <Image
              src="/pal-1.png"
              alt="pal"
              width={50}
              height={42.58}
              onMouseEnter={playHedgehogCrySound}
              className="w-0 md:w-11 sm:w-10 mr-1 md:mr-1.5 lg:mr-2 hover:animate-homepagePing opacity-60"
            />
            <Image
              src="/pal-1.png"
              alt="pal"
              width={50}
              height={42.58}
              onMouseEnter={playHedgehogCrySound}
              className="w-0 md:w-11 sm:w-10 hover:animate-homepagePing mr-auto opacity-50"
            />

            <div className="text-lg sm:text-[19px] md:text-xl font-medium flex">
              <button
                type="button"
                onClick={() => setIsDefault(true)}
                className={`${
                  isDefault ? "text-white" : "text-slate-600"
                } mr-2 underline hover:animate-togglePop`}
              >
                Recent
              </button>
              <p className="dark:text-[#EDF2FB]">|</p>
              <button
                type="button"
                onClick={() => setIsDefault(false)}
                className={`${isDefault ? "text-slate-600" : "text-white"} 
                ml-2 underline hover:animate-togglePop`}
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

          {isLoading ? (
            <SkeletonTheme baseColor="#DDD" highlightColor="#FFF" padding="0px">
              <Skeleton
                count={5}
                style={{
                  width: "100%",
                  borderRadius: "16px",
                }}
                className="h-[72px] sm:h-[80px] md:h-[88px] mt-4 md:mt-5 lg:mt-6"
              />
            </SkeletonTheme>
          ) : (
            <div>
              {filterGroups.length === 0 ? (
                <div>
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
                <div>
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
