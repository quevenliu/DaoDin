import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import styles from "../styles/font.module.scss";
import { removeCookie } from "../utils/cookie";

const apiUrl = process.env.API_URL;

export default function Topbar({ token }) {
  const [events, setEvents] = useState([]);
  const [isEventOpen, setIsEventOpen] = useState(false);
  const [unreadEventCount, setUnreadEventCount] = useState(0);
  const router = useRouter();
  const handleLogout = () => {
    removeCookie("userInfo");
    router.push("/login");
  };

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
        console.log(res.data.events);
        setEvents(res.data.events);

        const unreadCount = res.data.events.filter(
          (event) => event.is_read === 0
        ).length;
        setUnreadEventCount(unreadCount);
      })
      .catch((err) => {
        console.log(err);
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
        });
    }
  };

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <div className="px-14 h-16 flex justify-between items-center bg-primaryColor relative">
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
              src="/event.svg"
              alt="setting"
              className="w-10 h-10 p-2 bg-white rounded-full"
              width={40}
              height={40}
              onClick={() => setIsEventOpen(!isEventOpen)}
            />
            {unreadEventCount === 0 ? null : (
              <div className="text-white bg-red-500 rounded-full text-sm w-6 h-6 pt-[2px] absolute top-[-8px] right-[-10px]">
                {unreadEventCount}
              </div>
            )}
          </div>
          {isEventOpen ? (
            <div className="absolute w-72 top-16 right-[-120px] rounded-[20px] border z-[1000]">
              <div className="bg-primaryColor text-white py-2 rounded-t-[20px] text-[22px] font-medium">
                Notification
              </div>
              {events.length === 0 ? (
                <div className="rounded-b-[20px] overflow-auto">
                  <p className="bg-white p-4">You have no notifications.</p>
                </div>
              ) : (
                <div className="rounded-b-[20px] overflow-auto">
                  {events.map((event) => (
                    <button
                      type="button"
                      key={event.event_id}
                      onClick={() => readEvent(event.event_id, event.is_read)}
                      className="w-full"
                    >
                      <div
                        className={`${
                          event.is_read ? "bg-white" : "bg-backgroundColor"
                        } p-4 flex`}
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
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </button>
        <Link href="/profile">
          <Image
            src="/avatar.svg"
            alt="setting"
            className="w-10 h-10 p-2 bg-white rounded-full hover:animate-bounce"
            width={40}
            height={40}
          />
        </Link>
        <button
          type="button"
          className="hover:animate-spin-slow"
          onClick={handleLogout}
        >
          <Image
            src="/setting.svg"
            alt="setting"
            className="w-10 h-10"
            width={40}
            height={40}
          />
        </button>
      </div>
    </div>
  );
}
