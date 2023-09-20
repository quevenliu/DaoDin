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
  return (
    <div>
      {userId === chatUserId ? (
        <div className={`${styles.content} mt-2 md:mt-2.5 flex justify-end`}>
          <div className="flex items-end text-sm md:text-[15px] lg:text-base font-normal mb-1.5 lg:mb-2">
            {sent_at}
          </div>
          <div className="max-w-[60%] flex flex-col items-end px-3 py-1.5 lg:px-4 lg:py-2 dark:text-white bg-secondaryColor dark:bg-[#424868] rounded-[18px] lg:rounded-[20px] ml-2 lg:ml-3">
            <p className="text-[17px] lg:text-lg font-semibold mb-px">
              {nickname}
            </p>
            <p className="lg:text-[17px] font-normal break-all">{message}</p>
          </div>
        </div>
      ) : (
        <div className={`${styles.content} mt-2 md:mt-2.5  flex`}>
          {picture === "" ? (
            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-[60px] lg:h-[60px] bg-primaryColor dark:bg-[#222a4f] rounded-full mr-2 md:mr-2.5 lg:mr-3 shrink-0" />
          ) : (
            <Image
              src={picture}
              alt="Profile picture"
              className="w-12 h-12 md:w-14 md:h-14 lg:w-[60px] lg:h-[60px] rounded-full mr-2 md:mr-2.5 lg:mr-3 object-cover shrink-0"
              width={60}
              height={60}
            />
          )}
          <div className="max-w-[60%] px-3 py-1.5 lg:px-4 lg:py-2 dark:text-white bg-secondaryColor dark:bg-[#222a4f] rounded-[18px] lg:rounded-[20px] mr-2 lg:mr-3">
            <p className="text-[17px] lg:text-lg font-semibold mb-px">
              {nickname}
            </p>
            <p className="lg:text-[17px] font-normal break-all">{message}</p>
          </div>
          <div className="flex items-end text-sm md:text-[15px] lg:text-base font-normal mb-1.5 lg:mb-2">
            {sent_at}
          </div>
        </div>
      )}
    </div>
  );
}
