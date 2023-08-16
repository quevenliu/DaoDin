import Image from "next/image";
import styles from "../styles/font.module.scss";

export default function Message({
  message,
  user_id,
  sent_at,
  picture,
  nickname,
}) {
  const myId = 19;

  return (
    <div>
      {user_id === myId ? (
        <div className={`${styles.content} mt-6 flex justify-end`}>
          <div className="flex items-end text-lg font-normal mb-3">
            {sent_at}
          </div>

          <div className=" px-4 py-3 bg-secondaryColor rounded-[20px] ml-3">
            <p className="text-[22px] font-semibold mb-1">{nickname}</p>
            <p className="text-xl font-normal">{message}</p>
          </div>
        </div>
      ) : (
        <div className={`${styles.content} mt-6 flex `}>
          {picture === "" ? (
            <div className="w-14 h-14 bg-primaryColor rounded-full mr-4 shrink-0" />
          ) : (
            <Image
              src={picture}
              alt="Profile picture"
              className="w-[65px] h-[65px] rounded-full mr-6 object-cover shrink-0"
              width={65}
              height={65}
            />
          )}
          <div className=" px-4 py-3 bg-secondaryColor rounded-[20px] mr-3">
            <p className="text-[22px] font-semibold mb-1">{nickname}</p>
            <p className="text-xl font-normal">{message}</p>
          </div>
          <div className="flex items-end text-lg font-normal mb-3">
            {sent_at}
          </div>
        </div>
      )}
    </div>
  );
}
