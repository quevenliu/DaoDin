import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import Topbar from "@/components/Topbar";
import styles from "../../styles/font.module.scss";
import { getServerCookie } from "../../utils/cookie";

const apiUrl = process.env.API_URL;

export default function JoinGroupPage({ token, groupId }) {
  const [group, setGroup] = useState({});
  const router = useRouter();
  const nicknameRef = useRef("");
  const introRef = useRef("");
  const msgRef = useRef("");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const resetForm = () => {
    nicknameRef.current.value = "";
    introRef.current.value = "";
    msgRef.current.value = "";
  };

  const getGroup = async () => {
    await axios
      .get(`${apiUrl}/group/${groupId}`, config)
      .then((res) => {
        setGroup(res.data);
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

  const joinGroup = async () => {
    const payload = {
      self_intro: introRef.current.value,
      match_msg: msgRef.current.value,
      nickname: nicknameRef.current.value,
    };
    await axios
      .post(`${apiUrl}/group/${groupId}/join`, payload, config)
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: "You'll be notified after getting matched!",
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

  const handleJoinGroup = async () => {
    await joinGroup();
    resetForm();
    router.push("/");
  };

  useEffect(() => {
    getGroup();
  });

  return (
    <>
      <Head>
        <title>Join Group {groupId} Page</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="description" content="Generated by create next app" />
      </Head>
      <main
        className={`${styles.content} min-h-screen bg-gradient-to-br from-[#D14444] to-[#F77B54] dark:from-darkPrimaryColor dark:to-darkSecondaryColor p-14 pt-0`}
      >
        <Topbar token={token} />
        <div className="mt-8 w-[90%] max-w-5xl bg-primaryColor dark:bg-darkSecondaryColor text-white m-auto rounded-t-[20px] text-center py-3 text-[26px] font-bold">
          {group.name || "Mystery Group"}
        </div>
        <div className="w-[90%] max-w-5xl bg-white m-auto mb-10 px-12 py-8 rounded-b-[20px] flex">
          <form className="w-full px-2.5 mb-6 flex flex-col justify-between gap-5">
            <label
              htmlFor="nickname"
              className="text-[28px] font-semibold flex flex-col"
            >
              Nickname
              <input
                type="text"
                id="nickname"
                name="nickname"
                className="mt-2 p-2.5 text-lg font-normal border border-solid border-primaryColor dark:border-darkPrimaryColor rounded-[20px] ring-1 ring-inset ring-primaryColor dark:ring-darkPrimaryColor focus:outline-none focus:ring-2 focus:ring-primaryColor dark:focus:ring-darkPrimaryColor"
                ref={nicknameRef}
              />
            </label>
            <label
              htmlFor="intro"
              className="text-[28px] font-semibold flex flex-col"
            >
              Tell me about yourself
              <textarea
                id="intro"
                name="intro"
                rows="6"
                className="mt-2 p-2.5 text-lg font-normal border border-solid border-primaryColor dark:border-darkPrimaryColor rounded-[20px] resize-none overflow-hidden ring-1 ring-inset ring-primaryColor dark:ring-darkPrimaryColor focus:outline-none focus:ring-2 focus:ring-primaryColor dark:focus:ring-darkPrimaryColor"
                ref={introRef}
              />
            </label>
            <label
              htmlFor="tendency"
              className="text-[28px] font-semibold flex flex-col"
            >
              What kind of people would you like to meet
              <textarea
                id="tendency"
                name="tendency"
                rows="6"
                className="mt-2 p-2.5 text-lg font-normal border border-solid border-primaryColor dark:border-darkPrimaryColor rounded-[20px] resize-none overflow-hidden ring-1 ring-inset ring-primaryColor dark:ring-darkPrimaryColor focus:outline-none focus:ring-2 focus:ring-primaryColor dark:focus:ring-darkPrimaryColor"
                ref={msgRef}
              />
            </label>
            <div className="self-end flex gap-3">
              <button
                type="button"
                className="w-32 py-2 text-center text-2xl font-semibold text-white bg-[#BFBFBF] rounded-[50px]"
                onClick={resetForm}
              >
                Cancel
              </button>
              <button
                type="button"
                className="w-32 py-2 text-center text-2xl font-semibold text-white bg-primaryColor dark:bg-darkPrimaryColor rounded-[50px]"
                onClick={handleJoinGroup}
              >
                Join
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const token = getServerCookie("userInfo", "token", context.req);
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
    props: { token, groupId },
  };
}
