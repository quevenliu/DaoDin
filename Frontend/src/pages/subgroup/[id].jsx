import Head from "next/head";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import Slider from "react-slick";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../styles/font.module.scss";
import { getServerCookie } from "../../utils/cookie";
import Topbar from "@/components/Topbar";
import Member from "@/components/Member";
import Message from "@/components/Message";

const apiUrl = process.env.API_URL;

export default function Subgroup({ token, userId, groupId }) {
  const router = useRouter();
  const [groupName, setGroupName] = useState("Group Name");
  const [members, setMembers] = useState([]);
  const [chats, setChats] = useState([]);
  const newChatRef = useRef("");
  const chatroomRef = useRef(null);
  const [cursor, setCursor] = useState("");
  const [isGettingGroupsByCursor, setIsGettingGroupsByCursor] = useState(false);
  const [isScrollToBottom, serIsScrollToBottom] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [, setActiveSlide] = useState(0);
  const [enableCarousel, setEnableCarousel] = useState(false);

  const checkWindowWidth = () => {
    setEnableCarousel(window.innerWidth <= 640);
  };

  const sliderSettings = {
    dots: true,
    infinite: !enableCarousel,
    speed: 500,
    slidesToShow: enableCarousel ? 1 : 2,
    slidesToScroll: 1,
    initialSlide: 0,
    beforeChange: (current, next) => setActiveSlide(next),
  };

  const socket = new WebSocket(
    `wss://canchu.online/api/chat/socket?group_id=${groupId}`
  );
  socket.onopen = (event) => {
    console.log("WebSocket connection opened.", event);
  };
  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
    Swal.fire({
      title:
        "Something's wrong.\nPlease try again later or notify our engineering team.",
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
  socket.onclose = (event) => {
    console.log("WebSocket connection closed.", event);
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const scrollToBottom = () => {
    if (chatroomRef.current) {
      const { scrollHeight } = chatroomRef.current;
      const height = chatroomRef.current.clientHeight;
      const maxScrollTop = scrollHeight - height;
      chatroomRef.current.scrollTo(0, maxScrollTop);
    }
  };

  const getMatchList = async () => {
    await axios
      .get(`${apiUrl}/match/${groupId}`, config)
      .then((res) => {
        setMembers(res.data.users);
        setGroupName(res.data.group_name);
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

  const getChatList = async () => {
    setIsLoading(true);
    await axios
      .get(`${apiUrl}/chat/${groupId}`, config)
      .then((res) => {
        setChats(res.data.chats.sort((a, b) => a.chat_id - b.chat_id));
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
    setIsLoading(false);
  };

  const getChatListByCursor = async () => {
    await axios
      .get(`${apiUrl}/chat/${groupId}?cursor=${cursor}`, config)
      .then((res) => {
        setChats([
          ...res.data.chats.sort((a, b) => a.chat_id - b.chat_id),
          ...chats,
        ]);
        setCursor(res.data.next_cursor);
        serIsScrollToBottom(false);
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
    setIsGettingGroupsByCursor(false);
  };

  const isScrolling = () => {
    if (chatroomRef.current.scrollTop !== 0) {
      return;
    }
    setIsGettingGroupsByCursor(true);
  };

  useEffect(() => {
    getChatList();
    getMatchList();
    const element = chatroomRef.current;
    element.addEventListener("scroll", isScrolling);
    return () => {
      element.removeEventListener("scroll", isScrolling);
    };
  }, []);
  useEffect(() => {
    if (isGettingGroupsByCursor && cursor !== 0) {
      getChatListByCursor();
    }
  }, [isGettingGroupsByCursor]);
  useEffect(() => {
    if (isScrollToBottom) {
      scrollToBottom();
    } else {
      chatroomRef.current.scrollTo({ top: 1700, behavior: "instant" });
    }
    serIsScrollToBottom(true);
  }, [chats]);
  useEffect(() => {
    checkWindowWidth();

    window.addEventListener("resize", checkWindowWidth);
    return () => {
      window.removeEventListener("resize", checkWindowWidth);
    };
  }, []);

  socket.onmessage = async (event) => {
    console.log("Received message from WebSocket:", event.data);
    await getChatList();
  };

  const [isSendActivated, setIsSendActivated] = useState(false);
  const handleSendInput = () => {
    if (newChatRef?.current?.value?.length > 0) {
      setIsSendActivated(true);
    } else {
      setIsSendActivated(false);
    }
  };
  const sendChat = async () => {
    await socket.send(
      JSON.stringify({
        Authorization: `Bearer ${token}`,
        message: newChatRef.current.value,
      })
    );
  };
  const resetNewChat = () => {
    newChatRef.current.value = "";
  };
  const handleCreateChat = async () => {
    await sendChat();
    await getChatList();
    resetNewChat();
  };

  const handleLeaveMatch = async () => {
    await axios
      .delete(`${apiUrl}/group/${groupId}/leave`, config)
      .then((res) => {
        console.log(res);
        router.push("/");
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

  return (
    <>
      <Head>
        <title>SubGroup Page</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="description" content="Generated by create next app" />
      </Head>
      <div className="lg:p-12 sm:p-6 sm:pt-0 md:p-8 md:pt-0.5 lg:pt-0 relative min-h-screen bg-gradient-to-br from-[#D14444] to-[#F77B54] dark:from-darkPrimaryColor dark:to-darkSecondaryColor p-4 pt-0">
        <Topbar token={token} />
        <div className="flex justify-between max-w-4xl mt-2 m-auto items-center">
          <div
            className={`${styles.content} text-lg sm:text-[19px] md:text-xl lg:text-[22px] font-bold text-white`}
          >
            {groupName}
          </div>
          <button
            type="button"
            className={`${styles.content} text-[17px] sm:text-lg md:text-[19px] lg:text-xl font-normal text-white underline hover:animate-togglePop`}
            onClick={handleLeaveMatch}
          >
            Leave
          </button>
        </div>
        <div className="m-auto">
          {enableCarousel ? (
            <Slider {...sliderSettings}>
              <div className="rounded-[20px] text-center m-auto">
                <div
                  className={`${styles.content} max-w-xs m-auto mt-2 rounded-t-[20px] text-center p-2 text-[22px] font-bold text-white bg-primaryColor dark:bg-darkSecondaryColor`}
                >
                  Members
                </div>
                <div className="bg-white max-w-xs m-auto px-8 pb-3 rounded-b-[20px] pt-6">
                  {isLoading ? (
                    <div>
                      <div className="flex items-center mb-5 shrink-0">
                        <SkeletonTheme
                          baseColor="#DDD"
                          highlightColor="#FFF"
                          padding="0px"
                        >
                          <Skeleton
                            circle
                            width={56}
                            height={56}
                            style={{
                              marginRight: "28px",
                              verticalAlign: "top",
                            }}
                          />
                          <Skeleton
                            style={{
                              width: "60px",
                              height: "25px",
                              borderRadius: "6px",
                            }}
                          />
                        </SkeletonTheme>
                      </div>
                      <div className="flex items-center mb-5 shrink-0">
                        <SkeletonTheme
                          baseColor="#DDD"
                          highlightColor="#FFF"
                          padding="0px"
                        >
                          <Skeleton
                            circle
                            width={56}
                            height={56}
                            style={{
                              marginRight: "28px",
                              verticalAlign: "top",
                            }}
                          />
                          <Skeleton
                            style={{
                              width: "60px",
                              height: "25px",
                              borderRadius: "6px",
                            }}
                          />
                        </SkeletonTheme>
                      </div>
                      <div className="flex items-center mb-5 shrink-0">
                        <SkeletonTheme
                          baseColor="#DDD"
                          highlightColor="#FFF"
                          padding="0px"
                        >
                          <Skeleton
                            circle
                            width={56}
                            height={56}
                            style={{
                              marginRight: "28px",
                              verticalAlign: "top",
                            }}
                          />
                          <Skeleton
                            style={{
                              width: "60px",
                              height: "25px",
                              borderRadius: "6px",
                            }}
                          />
                        </SkeletonTheme>
                      </div>
                      <div className="flex items-center mb-5 shrink-0">
                        <SkeletonTheme
                          baseColor="#DDD"
                          highlightColor="#FFF"
                          padding="0px"
                        >
                          <Skeleton
                            circle
                            width={56}
                            height={56}
                            style={{
                              marginRight: "28px",
                              verticalAlign: "top",
                            }}
                          />
                          <Skeleton
                            style={{
                              width: "60px",
                              height: "25px",
                              borderRadius: "6px",
                            }}
                          />
                        </SkeletonTheme>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {members.map((member) => (
                        <Member
                          key={member.user_id}
                          picture={member.picture}
                          nickname={member.nickname}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="rounded-[20px]">
                <div
                  className={`${styles.content} mt-2 rounded-t-[20px] text-center p-2 text-[22px] font-bold text-white bg-primaryColor dark:bg-darkSecondaryColor`}
                >
                  Chat
                </div>
                <div className="flex h-[620px] rounded-b-[20px] pb-8 bg-white relative justify-center pt-3 px-5 py-4">
                  <div
                    className="h-[535px] overflow-y-scroll w-full"
                    ref={chatroomRef}
                  >
                    <div>
                      {chats.map((chat) => (
                        <Message
                          key={chat.chat_id}
                          message={chat.message}
                          userId={userId}
                          chatUserId={chat.user_id}
                          sent_at={chat.sent_at}
                          picture={chat.picture}
                          nickname={chat.nickname}
                        />
                      ))}
                    </div>
                  </div>
                  <textarea
                    className="h-9 w-[calc(100%-40px)] rounded-[20px] bg-[#F3F3F3] pl-5 pt-1 pr-10 text-lg absolute bottom-6 resize-none overflow-hidden dark:ring-darkPrimaryColor focus:outline-none focus:ring-2 focus:ring-primaryColor dark:focus:ring-darkPrimaryColor"
                    placeholder="Leave a message"
                    ref={newChatRef}
                    onChange={handleSendInput}
                  />
                  <button type="button" onClick={handleCreateChat}>
                    <Image
                      src={
                        isSendActivated ? "/sendActivated.svg" : "/sendGrey.svg"
                      }
                      alt="Send button"
                      className={`absolute bottom-[30px] right-8 ${
                        isSendActivated && "animate-sendGrowRotateOpposite"
                      } w-6 h-6`}
                      width={28}
                      height={28}
                    />
                  </button>
                </div>
              </div>
            </Slider>
          ) : (
            <div className="flex max-w-4xl m-auto">
              <div className="w-1/3 rounded-[20px] text-center mr-5 md:mr-6 lg:mr-7 shrink-0 mt-3 md:mt-4 lg:mt-5">
                <div
                  className={`${styles.content} rounded-t-[20px] max-w-[800px] m-auto p-2 md:p-2.5 lg:p-3 text-[22px] md:text-2xl lg:text-[26px] font-bold text-white bg-primaryColor dark:bg-darkSecondaryColor`}
                >
                  Members
                </div>
                <div className="pb-3 p-6 md:p-7 md:pb-4 lg:p-8 lg:pb-5 bg-white rounded-b-[20px]">
                  {isLoading ? (
                    <div>
                      <div className="flex items-center mb-5 lg:mb-6 shrink-0">
                        <SkeletonTheme
                          baseColor="#DDD"
                          highlightColor="#FFF"
                          padding="0px"
                        >
                          <Skeleton
                            circle
                            style={{
                              width: "3.5rem",
                              height: "3.5rem",
                              marginRight: "28px",
                              verticalAlign: "top",
                            }}
                          />
                          <Skeleton
                            style={{
                              width: "4rem",
                              height: "1.5rem",
                              borderRadius: "6px",
                            }}
                          />
                        </SkeletonTheme>
                      </div>
                      <div className="flex items-center mb-5 lg:mb-6 shrink-0">
                        <SkeletonTheme
                          baseColor="#DDD"
                          highlightColor="#FFF"
                          padding="0px"
                        >
                          <Skeleton
                            circle
                            style={{
                              width: "3.5rem",
                              height: "3.5rem",
                              marginRight: "28px",
                              verticalAlign: "top",
                            }}
                          />
                          <Skeleton
                            style={{
                              width: "4rem",
                              height: "1.5rem",
                              borderRadius: "6px",
                            }}
                          />
                        </SkeletonTheme>
                      </div>
                      <div className="flex items-center mb-5 lg:mb-6 shrink-0">
                        <SkeletonTheme
                          baseColor="#DDD"
                          highlightColor="#FFF"
                          padding="0px"
                        >
                          <Skeleton
                            circle
                            style={{
                              width: "3.5rem",
                              height: "3.5rem",
                              marginRight: "28px",
                              verticalAlign: "top",
                            }}
                          />
                          <Skeleton
                            style={{
                              width: "4rem",
                              height: "1.5rem",
                              borderRadius: "6px",
                            }}
                          />
                        </SkeletonTheme>
                      </div>
                      <div className="flex items-center mb-5 lg:mb-6 shrink-0">
                        <SkeletonTheme
                          baseColor="#DDD"
                          highlightColor="#FFF"
                          padding="0px"
                        >
                          <Skeleton
                            circle
                            style={{
                              width: "3.5rem",
                              height: "3.5rem",
                              marginRight: "28px",
                              verticalAlign: "top",
                            }}
                          />
                          <Skeleton
                            style={{
                              width: "4rem",
                              height: "1.5rem",
                              borderRadius: "6px",
                            }}
                          />
                        </SkeletonTheme>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {members.map((member) => (
                        <Member
                          key={member.user_id}
                          picture={member.picture}
                          nickname={member.nickname}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full rounded-[20px]">
                <div
                  className={`${styles.content} rounded-t-[20px] max-w-[800px] m-auto p-2 md:p-2.5 lg:p-3 text-[22px] md:text-2xl lg:text-[26px] font-bold text-center text-white bg-primaryColor dark:bg-darkSecondaryColor mt-3 md:mt-4 lg:mt-5`}
                >
                  Chat
                </div>
                <div className="flex h-[650px] md:h-[750px] lg:h-[850px] rounded-b-[20px] pb-8 bg-white relative justify-center pt-3 px-5 md:px-6 lg:pt-4">
                  <div
                    className="w-full h-[565px] md:h-[660px] lg:h-[750px] overflow-y-scroll"
                    ref={chatroomRef}
                  >
                    {chats.map((chat) => (
                      <Message
                        key={chat.chat_id}
                        message={chat.message}
                        userId={userId}
                        chatUserId={chat.user_id}
                        sent_at={chat.sent_at}
                        picture={chat.picture}
                        nickname={chat.nickname}
                      />
                    ))}
                  </div>
                  <textarea
                    className="h-9 w-[calc(100%-40px)] lg:w-[90%] md:h-10 lg:h-[42px] rounded-[20px] bg-[#F3F3F3] pl-5 pt-1 pr-10 md:pt-1.5 lg:pr-14 text-lg absolute bottom-6 lg:bottom-7 resize-none overflow-hidden dark:ring-darkPrimaryColor focus:outline-none focus:ring-2 focus:ring-primaryColor dark:focus:ring-darkPrimaryColor"
                    placeholder="Leave a message"
                    ref={newChatRef}
                    onChange={handleSendInput}
                  />
                  <button type="button" onClick={handleCreateChat}>
                    <Image
                      src={
                        isSendActivated ? "/sendActivated.svg" : "/sendGrey.svg"
                      }
                      alt="Send button"
                      className={`absolute bottom-[30px] md:bottom-8 right-8 lg:right-11 lg:bottom-9 ${
                        isSendActivated && "animate-sendGrowRotateOpposite"
                      } w-6 h-6 lg:w-7 lg:h-7`}
                      width={28}
                      height={28}
                    />
                  </button>
                </div>
              </div>
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
  const groupId = Number(context.params.id);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { token, userId, name, groupId },
  };
}
