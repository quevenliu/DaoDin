import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import Swal from "sweetalert2";

import styles from "../../styles/font.module.scss";
import { setCookie, getServerCookie } from "../../utils/cookie";

const apiUrl = process.env.API_URL;

const emailRule = /^.+@.+$/;
const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const signIn = async (payload) => {
  await axios
    .post(`${apiUrl}/user/signin`, payload)
    .then((res) => {
      const { token, user_id, name } = res.data;
      setCookie("userInfo", { token, user_id, name }, 1800);
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
      }).fire({
        title: "Successful login!",
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
      if (err.response.status === 400) {
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
        }).fire({
          title: "Invalid email or password.",
          padding: "1.2em",
          background: "#fadee5",
          customClass: {
            title: "swal_title",
            confirmButton: "swal_confirm_fail",
            container: "swal_container",
            popup: "swal_popup",
          },
        });
      } else {
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
      }
    });
};

const signUp = async (payload) => {
  await axios
    .post(`${apiUrl}/user/signup`, payload)
    .then((res) => {
      console.log(res);
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
      }).fire({
        title: "Successful signup!",
        padding: "1.2em",
        background: "#D1E6D2",
        customClass: {
          title: "swal_title",
          confirmButton: "swal_confirm_fail",
          container: "swal_container",
          popup: "swal_popup",
        },
      });
    })
    .catch((err) => {
      if (err.response.status === 400) {
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
        }).fire({
          title: "Email already exists.",
          padding: "1.2em",
          background: "#fadee5",
          customClass: {
            title: "swal_title",
            confirmButton: "swal_confirm_fail",
            container: "swal_container",
            popup: "swal_popup",
          },
        });
      } else {
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
      }
    });
};

const getRandomNumber = (x) => Math.floor(Math.random() * x) + 1;

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const [isSlip, setIsSlip] = useState(false);
  const toggleToLogin = () => {
    setIsLogin(true);
    setIsSlip(false);
  };
  const toggleToRegister = () => {
    setIsLogin(false);
    setTimeout(() => {
      setIsSlip(true);
    }, 200);
  };

  const handleSubmit = async (payload) => {
    if (isLogin) {
      await signIn(payload);
      router.push("/");
    } else {
      await signUp(payload);
      router.push("/login");
    }
    setIsLogin(true);
  };

  const [angle1, setAngle1] = useState(0);
  const [angle2, setAngle2] = useState(0);
  const [angle3, setAngle3] = useState(0);
  const [angle4, setAngle4] = useState(0);
  const [angle5, setAngle5] = useState(0);
  const [angle6, setAngle6] = useState(0);
  const [angle7, setAngle7] = useState(0);
  const [angle8, setAngle8] = useState(0);
  const [angle9, setAngle9] = useState(0);
  const [angle10, setAngle10] = useState(0);
  const [angle11, setAngle11] = useState(0);
  const [angle12, setAngle12] = useState(0);
  useEffect(() => {
    setAngle1(getRandomNumber(360));
    setAngle2(getRandomNumber(360));
    setAngle3(getRandomNumber(360));
    setAngle4(getRandomNumber(360));
    setAngle5(getRandomNumber(360));
    setAngle6(getRandomNumber(360));
    setAngle7(getRandomNumber(360));
    setAngle8(getRandomNumber(360));
    setAngle9(getRandomNumber(360));
    setAngle10(getRandomNumber(360));
    setAngle11(getRandomNumber(360));
    setAngle12(getRandomNumber(360));
  }, [isSlip]);

  return (
    <>
      <Head>
        <title>Login</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="description" content="Generated by create next app" />
      </Head>
      <div className="sm:p-7 md:p-9 min-h-screen lg:p-11 bg-[#F9EDED] p-5">
        <div className="mx-auto lg:p-9 p-7 md:p-8 md:max-w-3xl flex justify-between bg-gradient-to-br from-[#D14444] to-[#F77B54] rounded-[20px]">
          <div className="relative flex-1">
            {isLogin ? (
              <>
                <Image
                  src="/pal-1.png"
                  alt="pal-1"
                  width={180}
                  height={180}
                  className="w-0 sm:w-28 md:w-32 lg:w-36 absolute top-0 lg:right-1/4 right-1/3 hover:animate-loginShake"
                  style={{
                    transform: `rotate(${angle1}deg)`,
                  }}
                />
                <Image
                  src="/pal-1.png"
                  alt="pal-1"
                  width={180}
                  height={180}
                  className="w-0 sm:w-28 md:w-32 lg:w-36 absolute -top-6 lg:top-0 left-2/3 hover:animate-loginShake"
                  style={{ transform: `rotate(${angle2}deg)` }}
                />
                <Image
                  src="/pal-1.png"
                  alt="pal-1"
                  width={180}
                  height={180}
                  className="w-0 sm:w-28 md:w-32 lg:w-36 absolute -bottom-7 -left-[10%] hover:animate-loginShake"
                  style={{ transform: `rotate(${angle3}deg)` }}
                />
                <Image
                  src="/pal-2.png"
                  alt="pal-2"
                  width={180}
                  height={180}
                  className="w-0 sm:w-28 md:w-32 lg:w-36 absolute -bottom-6 lg:left-1/2 left-[60%] hover:animate-loginShake"
                  style={{ transform: `rotate(${angle4}deg)` }}
                />
                <Image
                  src="/pal-2.png"
                  alt="pal-2"
                  width={180}
                  height={180}
                  className="w-0 sm:w-28 md:w-32 lg:w-36 absolute top-24 right-2/3 hover:animate-loginShake"
                  style={{ transform: `rotate(${angle5}deg)` }}
                />
                <Image
                  src="/pal-2.png"
                  alt="pal-2"
                  width={180}
                  height={180}
                  className="w-0 sm:w-28 md:w-32 lg:w-36 absolute -bottom-5 lg:bottom-10 right-[40%] hover:animate-loginShake"
                  style={{ transform: `rotate(${angle6}deg)` }}
                />
                <Image
                  src="/pal-3.png"
                  alt="pal-3"
                  width={180}
                  height={180}
                  className="w-0 sm:w-28 md:w-32 lg:w-36 absolute top-0 -left-[6%] lg:-top-3 hover:animate-loginShake"
                  style={{ transform: `rotate(${angle7}deg)` }}
                />
                <Image
                  src="/pal-3.png"
                  alt="pal-3"
                  width={180}
                  height={180}
                  className="w-0 sm:w-28 md:w-32 lg:w-36 absolute bottom-28 lg:bottom-32 right-[62%] lg:right-2/3 hover:animate-loginShake"
                  style={{ transform: `rotate(${angle8}deg)` }}
                />
                <Image
                  src="/pal-3.png"
                  alt="pal-3"
                  width={180}
                  height={180}
                  className="w-0 sm:w-28 md:w-32 lg:w-36 absolute bottom-16 lg:bottom-24 right-[20%] lg:right-[5%] hover:animate-loginShake"
                  style={{ transform: `rotate(${angle9}deg)` }}
                />
                <Image
                  src="/pal-4.png"
                  alt="pal-4"
                  width={180}
                  height={180}
                  className="w-0 sm:w-28 md:w-32 lg:w-36 absolute top-52 left-2/3 lg:left-[20%] lg:top-56 hover:animate-loginShake"
                  style={{ transform: `rotate(${angle10}deg)` }}
                />
                <Image
                  src="/pal-4.png"
                  alt="pal-4"
                  width={180}
                  height={180}
                  className="w-0 sm:w-28 md:w-32 lg:w-36 absolute top-28 lg:top-48 lg:-right-6 right-0 hover:animate-loginShake"
                  style={{ transform: `rotate(${angle11}deg)` }}
                />
                <Image
                  src="/pal-4.png"
                  alt="pal-4"
                  width={180}
                  height={180}
                  className="w-0 sm:w-28 md:w-32 lg:w-36 absolute top-36 lg:top-32 left-1/3 hover:animate-loginShake"
                  style={{ transform: `rotate(${angle12}deg)` }}
                />
              </>
            ) : (
              <div className="h-full flex flex-col justify-end items-center">
                <div>
                  <Image
                    src="/pal-3.png"
                    alt="pal-3"
                    width={180}
                    height={180}
                    className={`w-0 sm:w-28 md:w-32 lg:w-36 transition-transform transform duration-500 delay-[900ms] ease-out ${
                      isSlip ? "translate-y-6" : "-translate-y-[600%]"
                    }`}
                  />
                </div>
                <div>
                  <Image
                    src="/pal-1.png"
                    alt="pal-1"
                    width={180}
                    height={180}
                    className={`w-0 sm:w-28 md:w-32 lg:w-36 transition-transform transform duration-500 delay-[600ms] ease-out ${
                      isSlip ? "translate-y-4" : "-translate-y-[600%]"
                    }`}
                  />
                </div>
                <div>
                  <Image
                    src="/pal-2.png"
                    alt="pal-2"
                    width={180}
                    height={180}
                    className={`w-0 sm:w-28 md:w-32 lg:w-36 transition-transform transform duration-500 delay-300 ease-out ${
                      isSlip ? "translate-y-2" : "-translate-y-[600%]"
                    }`}
                  />
                </div>
                <div>
                  <Image
                    src="/pal-4.png"
                    alt="pal-4"
                    width={180}
                    height={180}
                    className={`w-0 sm:w-28 md:w-32 lg:w-36 transition-transform transform duration-500 ease-out ${
                      isSlip ? "translate-y-0" : "-translate-y-[600%]"
                    }`}
                  />
                </div>
                <div>
                  <Image
                    src="/chouchou.png"
                    alt="chouchou"
                    width={180}
                    height={180}
                    className="lg:w-52 w-0 sm:w-40 md:w-44 animate-breaking"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="w-full sm:w-1/2 md:w-[55%] lg:p-9 md:p-7 p-5 flex flex-col items-center bg-white rounded-[20px]">
            <h1
              className={`${styles.title} md:text-6xl text-5xl lg:text-7xl font-normal text-primaryColor`}
            >
              DaoDin
            </h1>
            <div />
            <div className="w-full lg:my-9 my-5 md:my-7 flex justify-center lg:gap-16 md:gap-12 gap-8 lg:text-[21px] md:text-[19px] text-[17px] font-bold border-b border-solid">
              <button
                className={`px-3.5 py-2 ${
                  isLogin && "border-b-2 border-solid border-primaryColor"
                }`}
                onClick={toggleToLogin}
                type="button"
              >
                會員登入
              </button>
              <button
                className={`px-3.5 py-2 ${
                  !isLogin && "border-b-2 border-solid border-primaryColor"
                }`}
                onClick={toggleToRegister}
                type="button"
              >
                會員註冊
              </button>
            </div>
            {isLogin ? (
              <Formik
                key="signInForm"
                initialValues={{ email: "", password: "" }}
                validate={(values) => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = "Email must not be empty";
                  } else if (!emailRule.test(values.email)) {
                    errors.email = "Please enter a valid email";
                  }
                  if (!values.password) {
                    errors.password = "Password must not be empty";
                  } else if (!passwordRule.test(values.password)) {
                    errors.password = "Please enter a valid password";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  setSubmitting(false);
                  const payload = {
                    email: `${values.email.trim()}`,
                    password: `${values.password.trim()}`,
                  };
                  handleSubmit(payload);
                  resetForm();
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="mt-1 w-full flex flex-col lg:gap-7 md:gap-6 gap-5">
                    <div>
                      <label
                        htmlFor="email"
                        className="lg:text-lg md:text-[17px] text-base font-medium"
                      >
                        電子郵件
                      </label>
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="inline-block sm:inline sm:ml-2 px-2 py-0.5 text-xs sm:text-base text-red-500 bg-red-100 rounded-md"
                      />
                      <Field
                        type="email"
                        name="email"
                        placeholder="例: shirney@appworks.tw"
                        className="text-[15px] md:text-base w-full md:mt-2.5 mt-2 px-3 py-1 placeholder-[#BFBFBF] border border-solid border-primaryColor ring-primaryColor focus:outline-none focus:ring-1 focus:ring-primaryColor rounded-[15px] lg:rounded-[20px]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="lg:text-lg md:text-[17px] text-base font-medium"
                      >
                        密碼
                      </label>
                      <ErrorMessage
                        name="password"
                        component="p"
                        className="inline-block sm:inline sm:ml-2 px-2 py-0.5 text-xs sm:text-base text-red-500 bg-red-100 rounded-md"
                      />
                      <Field
                        type="password"
                        name="password"
                        placeholder="大小寫英文及數字且 8 碼以上"
                        className="w-full md:mt-2.5 mt-2 placeholder-[#BFBFBF] text-[15px] md:text-base px-3 py-1 border border-solid border-primaryColor ring-primaryColor focus:outline-none focus:ring-1 focus:ring-primaryColor rounded-[15px] lg:rounded-[20px]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-3 md:mt-4 px-7 py-2 self-center bg-primaryColor text-[17px] md:text-[19px] text-white rounded-[20px] hover:animate-buttonPush"
                      disabled={isSubmitting}
                    >
                      登入
                    </button>
                  </Form>
                )}
              </Formik>
            ) : (
              <Formik
                key="signUpForm"
                initialValues={{
                  name: "",
                  email: "",
                  firstPassword: "",
                  secondPassword: "",
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.name) {
                    errors.name = "Name must not be empty";
                  }
                  if (!values.email) {
                    errors.email = "Email must not be empty";
                  } else if (!emailRule.test(values.email)) {
                    errors.email = "Please enter a valid email";
                  }
                  if (!values.firstPassword) {
                    errors.firstPassword = "Password must not be empty";
                  } else if (!passwordRule.test(values.firstPassword)) {
                    errors.firstPassword = "Please enter a valid password";
                  }
                  if (!values.secondPassword) {
                    errors.secondPassword = "Password must not be empty";
                  } else if (!passwordRule.test(values.secondPassword)) {
                    errors.secondPassword = "Please enter a valid password";
                  } else if (values.firstPassword !== values.secondPassword) {
                    errors.secondPassword = "Passwords must be equal";
                  }

                  return errors;
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  setSubmitting(false);
                  const payload = {
                    name: `${values.name.trim()}`,
                    email: `${values.email.trim()}`,
                    password: `${values.secondPassword.trim()}`,
                  };
                  handleSubmit(payload);
                  resetForm();
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="w-full flex flex-col gap-5 lg:gap-7 mt-1 md:gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="lg:text-lg md:text-[17px] text-base font-medium"
                      >
                        使用者名稱
                      </label>
                      <ErrorMessage
                        name="name"
                        component="p"
                        className="inline-block sm:inline sm:ml-2 px-2 py-0.5 text-xs sm:text-base text-red-500 bg-red-100 rounded-md"
                      />
                      <Field
                        type="text"
                        name="name"
                        placeholder="例: Chou Chou"
                        className="w-full mt-2 text-[15px] md:text-base md:mt-2.5 px-3 py-1 placeholder-[#BFBFBF] border border-solid border-primaryColor ring-primaryColor focus:outline-none focus:ring-1 focus:ring-primaryColor rounded-[15px] lg:rounded-[20px]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="text-base lg:text-lg md:text-[17px] font-medium"
                      >
                        電子郵件
                      </label>
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="inline-block sm:inline sm:ml-2 px-2 py-0.5 text-xs sm:text-base text-red-500 bg-red-100 rounded-md"
                      />
                      <Field
                        type="text"
                        name="email"
                        placeholder="例: shirney@appworks.tw"
                        className="text-[15px] md:text-base mt-2 w-full md:mt-2.5 px-3 py-1 placeholder-[#BFBFBF] border border-solid border-primaryColor ring-primaryColor focus:outline-none focus:ring-1 focus:ring-primaryColor rounded-[15px] lg:rounded-[20px]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="firstPassword"
                        className="text-base lg:text-lg md:text-[17px] font-medium"
                      >
                        密碼
                      </label>
                      <ErrorMessage
                        name="firstPassword"
                        component="p"
                        className="inline-block sm:inline sm:ml-2 px-2 py-0.5 text-xs sm:text-base text-red-500 bg-red-100 rounded-md"
                      />
                      <Field
                        type="password"
                        name="firstPassword"
                        placeholder="大小寫英文及數字且 8 碼以上"
                        className="w-full text-[15px] md:text-base mt-2 md:mt-2.5 px-3 py-1 placeholder-[#BFBFBF] border border-solid border-primaryColor ring-primaryColor focus:outline-none focus:ring-1 focus:ring-primaryColor rounded-[15px] lg:rounded-[20px]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="secondPassword"
                        className="text-base lg:text-lg md:text-[17px] font-medium"
                      >
                        再次輸入密碼
                      </label>
                      <ErrorMessage
                        name="secondPassword"
                        component="p"
                        className=" inline-block sm:inline sm:ml-2 px-2 py-0.5 text-xs sm:text-base text-red-500 bg-red-100 rounded-md"
                      />
                      <Field
                        type="password"
                        name="secondPassword"
                        placeholder="大小寫英文及數字且 8 碼以上"
                        className="w-full text-[15px] md:text-base mt-2 md:mt-2.5 px-3 py-1 placeholder-[#BFBFBF] border border-solid border-primaryColor ring-primaryColor focus:outline-none focus:ring-1 focus:ring-primaryColor rounded-[15px] lg:rounded-[20px]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="md:mt-4 mt-3 px-7 py-2 self-center bg-primaryColor text-[17px] md:text-[19px] text-white rounded-[20px] hover:animate-buttonPush"
                      disabled={isSubmitting}
                    >
                      註冊
                    </button>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>
        <p className="text-center max-w-3xl mx-auto mt-4 md:mt-5 lg:text-right lg:text-base md:text-[15px] text-sm text-[#525252] pb-8">
          關於我們 · 隱私權條款 · Cookie 條款 · © 2023 DaoDin, Inc.
        </p>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const token = getServerCookie("userInfo", "token", context.req);
  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
