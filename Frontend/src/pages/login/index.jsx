import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import styles from "../../styles/font.module.scss";

const emailRule = /^.+@.+$/;
const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleToLogin = () => {
    setIsLogin(true);
  };
  const toggleToRegister = () => {
    setIsLogin(false);
  };

  return (
    <div className="h-screen pt-12 px-8 bg-backgroundColor">
      <div className="w-8/12 mx-auto p-9 flex justify-between bg-primaryColor rounded-[20px]">
        <div>PIC</div>
        <div className="w-5/12 p-7 flex flex-col items-center bg-white rounded-[20px]">
          <h1
            className={`${styles.title} text-6xl font-normal text-primaryColor`}
          >
            DaoDin
          </h1>
          <div />
          <div className="w-full my-10 flex justify-center gap-12 text-xl font-bold border-b border-solid">
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
                  provider: "native",
                  email: `${values.email.trim()}`,
                  password: `${values.password.trim()}`,
                };
                console.log(payload);
                // handleSubmit(payload);
                resetForm();
              }}
            >
              {({ isSubmitting }) => (
                <Form className="w-full flex flex-col gap-7">
                  <div>
                    <label htmlFor="email" className="text-lg font-medium">
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
                      className="w-full mt-2.5 px-3 py-1 placeholder-[#BFBFBF] border border-solid border-primaryColor rounded-[20px]"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="text-lg font-medium">
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
                      placeholder="大小寫英文及數字且8碼以上"
                      className="w-full mt-2.5 px-3 py-1 border border-solid border-primaryColor rounded-[20px]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="ww-4/12 px-7 py-2 self-center bg-primaryColor text-lg text-white rounded-[20px]"
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
                  provider: "native",
                  name: `${values.name.trim()}`,
                  email: `${values.email.trim()}`,
                  password: `${values.secondPassword.trim()}`,
                };
                // handleSubmit(payload);
                console.log(payload);
                resetForm();
              }}
            >
              {({ isSubmitting }) => (
                <Form className="w-full flex flex-col gap-5">
                  <div>
                    <label htmlFor="name" className="text-lg font-medium">
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
                      placeholder="例: shirney@appworks.tw"
                      className="w-full mt-2.5 px-3 py-1 placeholder-[#BFBFBF] border border-solid border-primaryColor rounded-[20px]"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-lg font-medium">
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
                      className="w-full mt-2.5 px-3 py-1 placeholder-[#BFBFBF] border border-solid border-primaryColor rounded-[20px]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="firstPassword"
                      className="text-lg font-medium"
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
                      placeholder="大小寫英文及數字且8碼以上"
                      className="w-full mt-2.5 px-3 py-1 placeholder-[#BFBFBF] border border-solid border-primaryColor rounded-[20px]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="secondPassword"
                      className="text-lg font-medium"
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
                      placeholder="大小寫英文及數字且8碼以上"
                      className="w-full mt-2.5 px-3 py-1 placeholder-[#BFBFBF] border border-solid border-primaryColor rounded-[20px]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-4/12 px-7 py-2 self-center bg-primaryColor text-lg text-white rounded-[20px]"
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
      <p className="w-8/12 mx-auto mt-4 text-right ttext-base text-[#525252]">
        關於我們 · 隱私權條款 · Cookie 條款 · © 2023 DaoDin, Inc.
      </p>
    </div>
  );
}
