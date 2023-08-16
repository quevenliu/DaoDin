import Image from "next/image";
import styles from "../styles/font.module.scss";

export default function Member({ picture, nickname }) {
  return (
    <div className={`${styles.content} mt-8 flex items-center `}>
      {picture === "" ? (
        <div className="w-16 h-16 bg-primaryColor rounded-full mr-6 object-cover shrink-0" />
      ) : (
        <Image
          src={picture}
          alt="Profile picture"
          className="w-[65px] h-[65px] rounded-full mr-6 shrink-0"
          width={65}
          height={65}
        />
      )}
      <p className="text-[26px] font-medium">{nickname}</p>
    </div>
  );
}
