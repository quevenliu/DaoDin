import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Swal from "sweetalert2";
import styles from "../styles/font.module.scss";
import { removeCookie } from "../utils/cookie";

const apiUrl = process.env.API_URL;

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

export default function Topbar({ token }) {
  const [events, setEvents] = useState([]);
  const [isEventOpen, setIsEventOpen] = useState(false);
  const [unreadEventCount, setUnreadEventCount] = useState(0);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const router = useRouter();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const getEvent = async () => {
    await axios
      .get(`${apiUrl}/event/`, config)
      .then((res) => {
        setEvents(res.data.events);

        const unreadCount = res.data.events.filter(
          (event) => event.is_read === 0
        ).length;
        setUnreadEventCount(unreadCount);
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
  };

  const readEvent = async (eventId, isRead) => {
    if (!isRead) {
      await axios
        .post(`${apiUrl}/event/${eventId}/read`, {}, config)
        .then((res) => {
          console.log(res.data);
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

  useEffect(() => {
    getEvent();
  }, []);

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });
  const handleSwitchMode = () => {
    setDarkMode(!darkMode);
  };
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleLogout = async () => {
    await removeCookie("userInfo");
    await router.push("/login");
    setDarkMode(false);
  };

  return (
    <div className="px-14 h-16 flex justify-between items-center relative">
      <Link href="/">
        <h1
          className={`${styles.title} text-5xl text-white hover:animate-pulse`}
        >
          DaoDin
        </h1>
      </Link>
      <div className={`${styles.content} flex gap-4`}>
        <button type="button" className="relative">
          <div className="hover:animate-bounce">
            <Image
              src={darkMode ? "/darkEvent.svg" : "/event.svg"}
              alt="event"
              className="w-10 h-10 p-2 bg-white rounded-full hover:animate-bounce"
              width={40}
              height={40}
              onClick={() => {
                setIsEventOpen(!isEventOpen);
                setIsSettingOpen(false);
              }}
            />
            {unreadEventCount === 0 ? null : (
              <div className="text-white bg-red-500 rounded-full text-sm w-6 h-6 pt-[2px] absolute top-[-8px] right-[-10px]">
                {unreadEventCount}
              </div>
            )}
          </div>
          {isEventOpen && (
            <div className="absolute w-72 top-16 right-[-120px] rounded-[20px] z-[1000]">
              <div
                className="bg-primaryColor dark:bg-darkPrimaryColor 
 text-white py-2 rounded-t-[20px] text-[22px] font-medium"
              >
                Notification
              </div>
              {events.length === 0 ? (
                <div className="rounded-b-[20px] overflow-auto">
                  <p className="bg-[#F9EDED] p-4">You have no notifications.</p>
                </div>
              ) : (
                <div className="rounded-b-[20px] overflow-auto">
                  {events.map((event) => (
                    <Link
                      key={event.event_id}
                      href={`/subgroup/${event.group_id}`}
                      onClick={() => readEvent(event.event_id, event.is_read)}
                      className="w-full"
                    >
                      <div
                        className={`${
                          event.is_read ? "text-[#A4A3A3]" : null
                        } p-4 flex bg-[#F9EDED] dark:bg-[#EDF2FB]`}
                      >
                        <Image
                          src={event.picture}
                          alt="Group picture"
                          width={48}
                          height={48}
                          className="rounded-full mr-4 shrink-0 w-12 h-12 object-cover"
                        />
                        <div className="flex flex-col items-start">
                          <p className="text-base text-left mb-1">
                            {event.message}
                          </p>
                          <p className="text-sm">{event.created_at}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </button>
        <Link href="/profile">
          <Image
            src={darkMode ? "/darkAvatar.svg" : "/avatar.svg"}
            alt="avatar"
            className="w-10 h-10 p-2 bg-white rounded-full hover:animate-bounce"
            width={40}
            height={40}
          />
        </Link>
        <button
          type="button"
          className="hover:animate-spin-slow"
          onClick={() => {
            setIsSettingOpen(!isSettingOpen);
            setIsEventOpen(false);
          }}
        >
          <Image
            src="/setting.svg"
            alt="setting"
            className="w-10 h-10"
            width={40}
            height={40}
          />
        </button>
        {isSettingOpen && (
          <div className="absolute w-40 top-[76px] right-14 rounded-[20px] z-[1000]">
            <div className="bg-primaryColor dark:bg-darkPrimaryColor text-center text-white py-2 rounded-t-[19px] text-[22px] font-medium">
              Setting
            </div>
            <div className="rounded-b-[19px] overflow-auto">
              <button
                type="button"
                className="w-full py-2 text-lg bg-[#F9EDED] dark:bg-[#EDF2FB] border-b border-[#BFBFBF]  border-solid"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
                type="button"
                className="w-full py-2 bg-[#F9EDED] dark:bg-[#EDF2FB]"
              >
                <MaterialUISwitch
                  onClick={handleSwitchMode}
                  checked={darkMode}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
