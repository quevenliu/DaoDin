import Image from "next/image";
import styles from "../styles/font.module.scss";

export default function Member({ picture, nickname }) {
  return (
    <div className={`${styles.content} mt-5 flex items-center `}>
      {picture === "" ? (
        <div className="w-[60px] h-[60px] bg-primaryColor rounded-full mr-5 object-cover shrink-0" />
      ) : (
        <Image
          src={picture}
          alt="Profile picture"
          className="w-[60px] h-[60px] rounded-full mr-5 shrink-0"
          width={60}
          height={60}
        />
      )}
      <p className="text-[22px] font-semibold">{nickname}</p>
    </div>
  );
}
