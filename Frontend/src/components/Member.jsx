import Image from "next/image";
import styles from "../styles/font.module.scss";

export default function Member({ picture, nickname }) {
  return (
    <div className={`${styles.content} mb-5 flex items-center gap-3`}>
      {picture === "" ? (
        <div className="w-14 h-14 lg:w-[60px] lg:h-[60px] bg-primaryColor rounded-full mr-5 object-cover shrink-0" />
      ) : (
        <Image
          src={picture}
          alt="Profile picture"
          className="w-14 h-14 lg:w-[60px] lg:h-[60px] rounded-full shrink-0 mr-4 "
          width={60}
          height={60}
        />
      )}
      <p className="text-lg lg:text-xl font-semibold break-word">{nickname}</p>
    </div>
  );
}
