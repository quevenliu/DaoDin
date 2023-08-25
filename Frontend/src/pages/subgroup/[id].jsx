import Head from "next/head";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
// import Swal from "sweetalert2";
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

  const socket = new WebSocket(
    `wss://canchu.online/api/chat/socket?group_id=${groupId}`
  );
  socket.onopen = (event) => {
    console.log("WebSocket connection opened.", event);
  };
  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
    // Swal.fire({
    //   title:
    //     "Something's wrong.\nPlease try again later or notify our engineering team.",
    //   padding: "1.2em",
    //   background: "#fadee5",
    //   customClass: {
    //     title: "swal_title",
    //     confirmButton: "swal_confirm_fail",
    //     container: "swal_container",
    //     popup: "swal_popup",
    //   },
    // });
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
        // Swal.fire({
        //   title: `${err.message}\nPlease try again later or notify our engineering team.`,
        //   padding: "1.2em",
        //   background: "#fadee5",
        //   customClass: {
        //     title: "swal_title",
        //     confirmButton: "swal_confirm_fail",
        //     container: "swal_container",
        //     popup: "swal_popup",
        //   },
        // });
      });
  };

  const getChatList = async () => {
    await axios
      .get(`${apiUrl}/chat/${groupId}`, config)
      .then((res) => {
        setChats(res.data.chats.sort((a, b) => a.chat_id - b.chat_id));
        setCursor(res.data.next_cursor);
      })
      .catch((err) => {
        console.log(err);
        // Swal.fire({
        //   title: `${err.message}\nPlease try again later or notify our engineering team.`,
        //   padding: "1.2em",
        //   background: "#fadee5",
        //   customClass: {
        //     title: "swal_title",
        //     confirmButton: "swal_confirm_fail",
        //     container: "swal_container",
        //     popup: "swal_popup",
        //   },
        // });
      });
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
        // Swal.fire({
        //   title: `${err.message}\nPlease try again later or notify our engineering team.`,
        //   padding: "1.2em",
        //   background: "#fadee5",
        //   customClass: {
        //     title: "swal_title",
        //     confirmButton: "swal_confirm_fail",
        //     container: "swal_container",
        //     popup: "swal_popup",
        //   },
        // });
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
        // Swal.fire({
        //   title: `${err.message}\nPlease try again later or notify our engineering team.`,
        //   padding: "1.2em",
        //   background: "#fadee5",
        //   customClass: {
        //     title: "swal_title",
        //     confirmButton: "swal_confirm_fail",
        //     container: "swal_container",
        //     popup: "swal_popup",
        //   },
        // });
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
      <div className="min-h-screen bg-gradient-to-br from-[#D14444] to-[#F77B54] dark:from-darkPrimaryColor dark:to-darkSecondaryColor p-8 pt-0">
        <Topbar token={token} />
        <div className="flex justify-between w-[90%] max-w-5xl mt-5 px-10 m-auto items-center">
          <div className={`${styles.content} text-[26px] font-bold text-white`}>
            {groupName}
          </div>
          <button
            type="button"
            className={`${styles.content} text-2xl font-normal text-white underline hover:animate-togglePop`}
            onClick={handleLeaveMatch}
          >
            Leave
          </button>
        </div>
        <div className="flex justify-between w-[90%] max-w-5xl m-auto pt-5 items-start">
          <div className="w-1/4 rounded-[20px] text-center mr-12 shrink-0">
            <div
              className={`${styles.content} rounded-t-[20px] py-3 text-[26px] font-bold text-white bg-primaryColor dark:bg-darkSecondaryColor`}
            >
              Members
            </div>
            <div className="px-5 pt-px pb-10 bg-white rounded-b-[20px]">
              {members.map((member) => (
                <Member
                  key={member.user_id}
                  picture={member.picture}
                  nickname={member.nickname}
                />
              ))}
            </div>
          </div>
          <div className="w-full rounded-[20px]">
            <div
              className={`${styles.content} rounded-t-[20px] p-3 text-[26px] font-bold text-center text-white bg-primaryColor dark:bg-darkSecondaryColor`}
            >
              Chat
            </div>
            <div className="flex h-[900px] rounded-b-[20px] pb-8 bg-white relative justify-center">
              <div
                className="w-[90%] h-[800px] pt-2 overflow-y-scroll"
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
                className="w-[90%] h-12 rounded-[20px] bg-[#F3F3F3] pl-5 pr-16 py-2 text-xl absolute bottom-8 resize-none overflow-hidden dark:ring-darkPrimaryColor focus:outline-none focus:ring-2 focus:ring-primaryColor dark:focus:ring-darkPrimaryColor"
                placeholder="Leave a message"
                ref={newChatRef}
                onChange={handleSendInput}
              />
              <button type="button" onClick={handleCreateChat}>
                <Image
                  src={isSendActivated ? "/sendActivated.svg" : "/sendGrey.svg"}
                  alt="Send button"
                  className={`absolute bottom-[42px] right-16 ${
                    isSendActivated && "animate-sendGrowRotateOpposite"
                  }`}
                  width={28}
                  height={28}
                />
              </button>
            </div>
          </div>
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
