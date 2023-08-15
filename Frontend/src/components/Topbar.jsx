import Image from "next/image";
import styles from "../styles/font.module.scss";

export default function Topbar() {
  return (
    <div className="px-14 h-16 flex justify-between items-center bg-primaryColor">
      <h1 className={`${styles.title} text-5xl text-white`}>DaoDin</h1>
      <div className="flex gap-4">
        <button type="button">
          <Image
            src="/event.svg"
            alt="setting"
            className="w-10 h-10 p-2 bg-white rounded-full"
            width={40}
            height={40}
          />
        </button>
        <button type="button">
          <Image
            src="/avatar.svg"
            alt="setting"
            className="w-10 h-10 p-2 bg-white rounded-full"
            width={40}
            height={40}
          />
        </button>
        <button type="button">
          <Image
            src="/setting.svg"
            alt="setting"
            className="w-10 h-10"
            width={40}
            height={40}
          />
        </button>
      </div>
    </div>
  );
}
