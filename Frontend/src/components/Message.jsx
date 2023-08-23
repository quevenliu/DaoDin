import Image from "next/image";
import styles from "../styles/font.module.scss";

export default function Message({
  message,
  userId,
  chatUserId,
  sent_at,
  picture,
  nickname,
}) {
  // const myId = 19;

  return (
    <div>
      {userId === chatUserId ? (
        <div className={`${styles.content} max-w-30 mt-6 flex justify-end`}>
          <div className="flex items-end text-base font-normal mb-3">
            {sent_at}
          </div>
          <div className="max-w-[60%] flex flex-col items-end px-4 py-3 bg-secondaryColor rounded-[20px] ml-3">
            <p className="text-lg font-semibold mb-px">{nickname}</p>
            <p className="text-[17px] font-normal break-all">{message}</p>
          </div>
        </div>
      ) : (
        <div className={`${styles.content} mt-4 flex`}>
          {picture === "" ? (
            <div className="w-[60px] h-[60px] bg-primaryColor rounded-full mr-4 shrink-0" />
          ) : (
            <Image
              src={picture}
              alt="Profile picture"
              className="w-[60px] h-[60px] rounded-full mr-4 object-cover shrink-0"
              width={60}
              height={60}
            />
          )}
          <div className="max-w-[60%] px-4 py-3 bg-secondaryColor rounded-[20px] mr-3">
            <p className="text-lg font-semibold mb-px">{nickname}</p>
            <p className="text-[17px] font-normal break-all">{message}</p>
          </div>
          <div className="flex items-end text-base font-normal mb-3">
            {sent_at}
          </div>
        </div>
      )}
    </div>
  );
}
