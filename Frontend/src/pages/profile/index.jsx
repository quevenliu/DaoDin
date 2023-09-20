import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import styles from "../../styles/font.module.scss";
import { getServerCookie } from "../../utils/cookie";
import Group from "@/components/Group";
import Topbar from "@/components/Topbar";
import ProfilePicture from "@/components/ProfilePicture";
import "react-loading-skeleton/dist/skeleton.css";

const apiUrl = process.env.API_URL;

export default function ProfilePage({ token, userId }) {
  const [profileData, setProfileData] = useState({});
  const [myGroups, setMyGroups] = useState([]);
  const [myGroupsCursor, setMyGroupCursor] = useState("");
  const [isGettingMyGroupsByCursor, setIsGettingMyGroupsByCursor] =
    useState(false);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [joinedGroupsCursor, setJoinedGroupCursor] = useState("");
  const [isGettingJoinedGroupsByCursor, setIsGettingJoinedGroupsByCursor] =
    useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isShowMyGroups, setIsShowMyGroups] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const path = router.pathname;

  const nameRef = useRef(null);
  const introRef = useRef(null);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const getProfile = async () => {
    setIsLoading(true);
    await axios
      .get(`${apiUrl}/user/profile?user_id=${userId}`, config)
      .then((res) => {
        setProfileData(res.data);
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
    setIsLoading(false);
  };

  const getMyGroups = async () => {
    setIsLoading(true);
    await axios
      .get(`${apiUrl}/group/search?creator_id=1`, config)
      .then((res) => {
        setMyGroups(res.data.groups);
        setMyGroupCursor(res.data.next_cursor);
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
    setIsLoading(false);
  };
  const getMyGroupsByCursor = async () => {
    await axios
      .get(
        `${apiUrl}/group/search?creator_id=1&cursor=${myGroupsCursor}&sort=recent`,
        config
      )
      .then((res) => {
        setMyGroups([...myGroups, ...res.data.groups]);
        setMyGroupCursor(res.data.next_cursor);
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
    setIsGettingMyGroupsByCursor(false);
  };
  const getJoinedGroups = async () => {
    setIsLoading(true);
    await axios
      .get(`${apiUrl}/group/search?isJoined=1`, config)
      .then((res) => {
        setJoinedGroups(res.data.groups);
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
    setIsLoading(false);
  };
  const getJoinedGroupsByCursor = async () => {
    await axios
      .get(
        `${apiUrl}/group/search?isJoined=1&cursor=${joinedGroupsCursor}`,
        config
      )
      .then((res) => {
        setJoinedGroups([...joinedGroups, ...res.data.groups]);
        setJoinedGroupCursor(res.data.next_cursor);
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
    setIsGettingJoinedGroupsByCursor(false);
  };
  const isScrolling = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }
    if (isShowMyGroups) {
      setIsGettingMyGroupsByCursor(true);
    } else {
      setIsGettingJoinedGroupsByCursor(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", isScrolling);
    return () => window.removeEventListener("scroll", isScrolling);
  }, [isShowMyGroups]);

  useEffect(() => {
    if (isGettingMyGroupsByCursor) {
      if (myGroupsCursor !== null) {
        getMyGroupsByCursor();
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
  }, [isGettingMyGroupsByCursor]);
  useEffect(() => {
    if (isGettingJoinedGroupsByCursor) {
      if (joinedGroupsCursor !== null) {
        getJoinedGroupsByCursor();
      } else {
        Swal.fire({
          title:
            "Haven't found the group you're looking for?\nWhat about joining one🤩?!",
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
  }, [isGettingJoinedGroupsByCursor]);

  const toggleToMyGroups = async () => {
    await getMyGroups();
    await setJoinedGroups([]);
    setIsShowMyGroups(true);
  };
  const toggleToJoinedGroups = async () => {
    await getJoinedGroups();
    await setMyGroups([]);
    setIsShowMyGroups(false);
  };

  useEffect(() => {
    getProfile();
    getMyGroups();
  }, []);

  const putProfile = async (payload) => {
    await axios
      .put(`${apiUrl}/user/profile?user_id=${userId}`, payload, config)
      .then((res) => {
        console.log(res.data);
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
        }).fire({
          title: "Personal profile updated ✅",
          padding: "1.2em",
          background: "#D1E6D2",
          customClass: {
            title: "swal_title",
            confirmButton: "swal_confirm_success",
            container: "swal_container",
            popup: "swal_popup",
          },
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
        }).fire({
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
  };

  const handleEdit = async () => {
    if (isEditing) {
      await putProfile({
        name: nameRef.current.value,
        self_intro: introRef.current.value,
      });
      await getProfile();
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const leaveJoinedGroup = async (groupId) => {
    await axios
      .delete(`${apiUrl}/group/${groupId}/leave`, config)
      .then((res) => {
        console.log(res);
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
        }).fire({
          title: "Success leave ✅",
          padding: "1.2em",
          background: "#D1E6D2",
          customClass: {
            title: "swal_title",
            confirmButton: "swal_confirm_success",
            container: "swal_container",
            popup: "swal_popup",
          },
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
        }).fire({
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
  };

  const handleLeaveJoinedGroup = async (e, groupId) => {
    e.preventDefault();
    await leaveJoinedGroup(groupId);
    await getJoinedGroups();
  };

  const pendingGroupAlert = () => {
    Swal.fire({
      title: "You'll be notified after getting matched!",
      padding: "1.2em",
      background: "#fadee5",
      customClass: {
        title: "swal_title",
        confirmButton: "swal_confirm_fail",
        container: "swal_container",
        popup: "swal_popup",
      },
    });
  };

  return (
    <>
      <Head>
        <title>Profile Page</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="description" content="Generated by create next app" />
      </Head>
      <div
        className={`${styles.content} lg:p-12 sm:p-6 sm:pt-0 md:p-8 md:pt-0.5 lg:pt-0 min-h-screen bg-gradient-to-br from-[#D14444] to-[#F77B54] dark:from-darkPrimaryColor dark:to-darkSecondaryColor p-4 pt-0`}
      >
        <Topbar token={token} />
        <div className="relative group max-w-4xl flex gap-3 sm:gap-5 md:gap-6 lg:gap-7 bg-white m-auto mt-2 sm:mt-3 md:mt-4 lg:mt-5 mb-5 md:mb-6 lg:mb-7 md:px-8 md:py-6 sm:px-7 sm:py-5 px-5 py-4 lg:px-9 lg:py-7 rounded-[20px]">
          <ProfilePicture
            picture={profileData.picture}
            token={token}
            getProfile={getProfile}
          />
          <div className="w-full">
            <div className="flex justify-between items-center px-2.5 mb-2.5 sm:mb-3.5 md:mb-4 lg:mb-5">
              <p
                className={`${styles.content} text-xl sm:text-[22px] md:text-2xl lg:text-[26px] font-bold`}
              >
                {profileData.name || "anonymous"}
              </p>
              <div className="flex gap-1.5 sm:gap-2 md:gap-2.5">
                <Link
                  href="https://www.facebook.com/chouchouler?mibextid=LQQJ4d"
                  target="_blank"
                >
                  <Image
                    src="/line.png"
                    alt="Line"
                    width={42}
                    height={42}
                    className="w-7 sm:w-8 md:w-9"
                  />
                </Link>
                <Link
                  href="https://www.facebook.com/chouchouler?mibextid=LQQJ4d"
                  target="_blank"
                >
                  <Image
                    src="/facebook.png"
                    alt="Facebook"
                    width={42}
                    height={42}
                    className="w-7 sm:w-8 md:w-9"
                  />
                </Link>
                <Link
                  href="https://www.facebook.com/chouchouler?mibextid=LQQJ4d"
                  target="_blank"
                >
                  <Image
                    src="/instagram.png"
                    alt="Instagram"
                    width={42}
                    height={42}
                    className="w-7 sm:w-8 md:w-9"
                  />
                </Link>
              </div>
            </div>
            <p
              className={`${
                styles.content
              } w-full px-3 py-2 sm:px-4 md:px-5 md:mb-2 md:py-3 min-h-[70px] sm:min-h-[85px] md:min-h-[100px] sm:text-lg md:text-[19px] lg:text-xl bg-[#E6E6E6] ${
                !profileData.self_intro && "text-[#a2a1a1] whitespace-pre-line"
              } rounded-[15px] lg:rounded-[20px]`}
            >
              {profileData.self_intro ||
                "你目前還沒有自我介紹喔\n （點擊右上角編輯！）"}
            </p>
            {isEditing && (
              <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex items-center z-[999]">
                <div className="w-[90%] max-w-[520px] m-auto bg-white rounded-[20px] relative">
                  <p className="text-[19px] sm:text-xl md:text-[22px] bg-primaryColor dark:bg-darkPrimaryColor w-full p-2 md:p-2.5 rounded-t-[20px] text-white text-center">
                    Edit Profile
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="absolute top-2.5 md:top-3 right-5 w-5 h-5 md:w-6 md:h-6 text-center bg-white text-primaryColor dark:text-darkSecondaryColor text-sm md:text-base rounded-full hover:animate-buttonPush"
                  >
                    X
                  </button>
                  <div className="p-5 md:p-6">
                    <div className="flex items-center pr-2.5 mb-3 sm:mb-3.5 md:mb-5">
                      <p className="w-28 text-lg sm:text-[19px] md:text-xl mr-1.5 lg:mr-3 shrink-0">
                        User Name
                      </p>
                      <textarea
                        name="name"
                        id="name"
                        rows="1"
                        className="w-full px-2.5 text-lg md:text-[19px] md:py-0.5 md:rounded-[15px] border border-solid border-primaryColor dark:border-darkPrimaryColor ring-1 ring-inset ring-primaryColor dark:ring-darkPrimaryColor focus:outline-none focus:ring-2 focus:ring-primaryColor dark:focus:ring-darkPrimaryColor rounded-[12px] resize-none overflow-hidden"
                        defaultValue={profileData.name}
                        ref={nameRef}
                      />
                    </div>
                    <div className="flex pr-2.5">
                      <p className="w-28 text-lg sm:text-[19px] md:text-[22px] mr-1.5 lg:mr-3 shrink-0">
                        Bio
                      </p>
                      <textarea
                        name="self_intro"
                        id="self_intro"
                        rows="4"
                        className="mb-3 sm:mb-4 md:mb-5 w-full py-2 px-2.5 text-lg md:text-[19px] md:rounded-[15px] font-normal border border-solid border-primaryColor dark:border-darkPrimaryColor ring-1 ring-inset ring-primaryColor dark:ring-darkPrimaryColor focus:outline-none focus:ring-2 focus:ring-primaryColor dark:focus:ring-darkPrimaryColor rounded-[12px] resize-none overflow-hidden"
                        defaultValue={profileData.self_intro}
                        ref={introRef}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="flex justify-center m-auto text-lg sm:text-[19px] md:text-[21px] bg-primaryColor dark:bg-darkPrimaryColor w-24 md:w-[100px] md:py-2 p-1 rounded-[50px] text-white text-center ring-inset focus:outline-none focus:ring-2 focus:ring-[#BFBFBF] hover:animate-buttonPush"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            className="hidden group-hover:block absolute top-2 sm:top-2.5 sm:right-2.5 md:top-3 right-2 md:right-3 hover:animate-editGrowRotate"
            onClick={handleEdit}
          >
            <Image
              src="/edit.svg"
              alt="edit"
              width={30}
              height={30}
              className="w-5 h-5 md:w-[22px] md:h-[22px] lg:w-6 lg:h-6 p-1 bg-primaryColor dark:bg-darkPrimaryColor rounded-[3px]"
            />
          </button>
        </div>

        <div className="max-w-4xl m-auto">
          <div className="flex justify-between">
            <div className="flex">
              <button
                type="button"
                className={`${styles.content} h-12 md:h-14 lg:h-[60px] ${
                  isShowMyGroups
                    ? "text-primaryColor dark:text-darkPrimaryColor bg-white"
                    : "text-white bg-primaryColor dark:bg-darkPrimaryColor border-l-2 border-t-2 border-r-2 border-solid border-white"
                }
                  text-lg sm:text-xl md:text-[22px] lg:text-2xl font-bold px-3 sm:px-4 md:px-5 lg:px-6 rounded-t-[20px] flex items-center `}
                onClick={() => {
                  toggleToMyGroups();
                }}
              >
                My Groups
              </button>
              <button
                type="button"
                className={`${styles.content} h-12 md:h-14 lg:h-[60px] ${
                  isShowMyGroups
                    ? "text-white bg-primaryColor dark:bg-darkPrimaryColor border-l-2 border-t-2 border-r-2 border-solid border-white"
                    : "text-primaryColor dark:text-darkPrimaryColor bg-white"
                } text-lg sm:text-xl md:text-[22px] lg:text-2xl font-bold px-3 sm:px-4 md:px-5 lg:px-6 rounded-t-[20px] flex items-center`}
                onClick={() => {
                  toggleToJoinedGroups();
                }}
              >
                Joined Groups
              </button>
            </div>
            <Link
              href="/createGroup"
              className={`${styles.content} h-9 md:h-10 lg:h-11 text-white dark:text-darkPrimaryColor text-lg sm:text-xl md:text-[22px] lg:text-2xl font-bold bg-primaryColor dark:bg-white px-4 lg:px-5 rounded-[50px] flex items-center ring-inset focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-[#BFBFBF] hover:animate-buttonPush`}
            >
              Create
            </Link>
          </div>
          {isLoading ? (
            <div className="bg-white rounded-tr-[20px] rounded-b-[20px] px-4 sm:px-6 md:px-8 lg:px-10 pt-2 pb-8">
              <SkeletonTheme baseColor="#DDD" highlightColor="#FFF">
                <Skeleton
                  count={5}
                  style={{
                    width: "100%",
                    borderRadius: "16px",
                  }}
                  className="h-[72px] sm:h-[80px] md:h-[88px] mt-4 md:mt-5 lg:mt-6"
                />
              </SkeletonTheme>
            </div>
          ) : (
            <div className="bg-white rounded-tr-[20px] rounded-b-[20px] px-4 sm:px-6 md:px-8 lg:px-10 pt-2 pb-8">
              {isShowMyGroups
                ? myGroups.map((myGroup) => (
                    <Link
                      href={`/editGroup/${myGroup.group_id}`}
                      key={myGroup.group_id}
                      className="group relative"
                    >
                      <Group
                        path={path}
                        name={myGroup.name}
                        category={myGroup.category}
                        location={myGroup.location}
                        description={myGroup.description}
                        status={myGroup.status}
                        picture={myGroup.picture}
                        area={myGroup.area}
                        count={myGroup.count}
                      />
                      <div className="sm:text-xl md:text-[22px] hidden group-hover:flex w-24 sm:w-32 md:w-36 lg:w-40 h-[72px] md:h-[88px] sm:h-20 absolute bottom-0 left-0 justify-center items-center text-lg lg:text-2xl text-white bg-primaryColor dark:bg-darkPrimaryColor rounded-l-[16px] animate-tagSweepToLeft">
                        Edit
                      </div>
                    </Link>
                  ))
                : joinedGroups.map((joinedGroup) => (
                    <div key={joinedGroup.group_id}>
                      {joinedGroup.status === "complete" ? (
                        <Link
                          href={`/subgroup/${joinedGroup.group_id}`}
                          className="group relative"
                        >
                          <Group
                            path={path}
                            name={joinedGroup.name}
                            category={joinedGroup.category}
                            location={joinedGroup.location}
                            description={joinedGroup.description}
                            status={joinedGroup.status}
                            picture={joinedGroup.picture}
                            area={joinedGroup.area}
                            count={joinedGroup.count}
                          />
                          <button
                            type="button"
                            className="hidden group-hover:block w-24 sm:w-32 md:w-36 lg:w-40 h-[72px] md:h-[88px] sm:h-20 absolute bottom-0 left-0 text-lg lg:text-2xl text-white bg-red-500 rounded-l-[16px] animate-tagSweepToLeft sm:text-xl md:text-[22px]"
                            onClick={(e) => {
                              handleLeaveJoinedGroup(e, joinedGroup.group_id);
                            }}
                          >
                            Leave
                          </button>
                        </Link>
                      ) : (
                        <div className="group relative">
                          <button
                            type="button"
                            className="w-full"
                            onClick={() => pendingGroupAlert()}
                          >
                            <Group
                              path={path}
                              name={joinedGroup.name}
                              category={joinedGroup.category}
                              location={joinedGroup.location}
                              description={joinedGroup.description}
                              status={joinedGroup.status}
                              picture={joinedGroup.picture}
                              area={joinedGroup.area}
                              count={joinedGroup.count}
                            />
                          </button>
                          <button
                            type="button"
                            className="sm:text-xl md:text-[22px] hidden group-hover:block w-24 sm:w-32 md:w-36 lg:w-40 h-[72px] md:h-[88px] sm:h-20 absolute bottom-0 left-0 text-lg lg:text-2xl text-white bg-red-500 rounded-l-[16px] animate-tagSweepToLeft"
                            onClick={(e) => {
                              handleLeaveJoinedGroup(e, joinedGroup.group_id);
                            }}
                          >
                            Leave
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>
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
