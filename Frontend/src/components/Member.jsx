import Image from "next/image";
import styles from "../styles/font.module.scss";

export default function Member({ picture, nickname }) {
  return (
    <div className={`${styles.content} mt-5 flex items-center gap-1`}>
      {picture === "" ? (
        <div className="w-[60px] h-[60px] bg-primaryColor rounded-full mr-5 object-cover shrink-0" />
      ) : (
        <Image
          src={picture}
          alt="Profile picture"
          className="w-[60px] h-[60px] rounded-full shrink-0 mr-4"
          width={60}
          height={60}
        />
      )}
      <p className="text-[22px] font-semibold break-word">{nickname}</p>
    </div>
  );
}
