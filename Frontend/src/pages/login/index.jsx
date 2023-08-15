import { useState } from "react";

import styles from "../../styles/font.module.scss";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleToLogin = () => {
    setIsLogin(true);
  };
  const toggleToRegister = () => {
    setIsLogin(false);
  };

  return (
    <>
      <div className="pt-12 px-8 bg-backgroundColor">
        <div className="w-8/12 mx-auto p-9 flex justify-between bg-primaryColor rounded-[20px]">
          <div>PIC</div>
          <div className="w-5/12 p-7 flex flex-col items-center bg-white rounded-[20px]">
            <h1
              className={`${styles.title} text-6xl font-normal text-primaryColor`}
            >
              DaoDin
            </h1>
            <div className="w-full my-10 flex justify-center gap-12 text-xl font-bold border-b border-solid">
              <button
                className={`px-3.5 py-2 ${
                  isLogin && "border-b-2 border-solid border-primaryColor"
                }`}
                onClick={toggleToLogin}
              >
                會員登入
              </button>
              <button
                className={`px-3.5 py-2 ${
                  !isLogin && "border-b-2 border-solid border-primaryColor"
                }`}
                onClick={toggleToRegister}
              >
                會員註冊
              </button>
            </div>
            {isLogin ? (
              <form className="w-full flex flex-col gap-7">
                <div>
                  <h4 className="text-lg font-medium">電子郵件</h4>
                  <input
                    type="email"
                    className="w-full mt-2.5 px-3 py-1 placeholder-[#BFBFBF] border border-solid border-primaryColor rounded-[20px]"
                    placeholder="例: shirney@appworks.tw"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-medium">密碼</h4>
                  <input
                    type="password"
                    className="w-full mt-2.5 px-3 py-1 border border-solid border-primaryColor rounded-[20px]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-4/12 px-7 py-2 self-center bg-primaryColor text-lg text-white rounded-[20px]"
                >
                  登入
                </button>
              </form>
            ) : (
              <form className="w-full flex flex-col gap-7">
                <div>
                  <h4 className="text-lg font-medium">使用者名稱</h4>
                  <input
                    type="text"
                    className="w-full mt-2.5 px-3 py-1 placeholder-[#BFBFBF] border border-solid border-primaryColor rounded-[20px]"
                    placeholder="例: Chou Chou Hu"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-medium">電子郵件</h4>
                  <input
                    type="email"
                    className="w-full mt-2.5 px-3 py-1 placeholder-[#BFBFBF] border border-solid border-primaryColor rounded-[20px]"
                    placeholder="例: shirney@appworks.tw"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-medium">密碼</h4>
                  <input
                    type="password"
                    className="w-full mt-2.5 px-3 py-1 border border-solid border-primaryColor rounded-[20px]"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-medium">再次輸入密碼</h4>
                  <input
                    type="password"
                    className="w-full mt-2.5 px-3 py-1 border border-solid border-primaryColor rounded-[20px]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-4/12 px-7 py-2 self-center bg-primaryColor text-lg text-white rounded-[20px]"
                >
                  註冊
                </button>
              </form>
            )}
          </div>
        </div>
        <p className="w-8/12 mx-auto mt-4 text-right ttext-base text-[#525252]">
          關於我們 · 隱私權條款 · Cookie 條款 · © 2023 DaoDin, Inc.
        </p>
      </div>
    </>
  );
}
