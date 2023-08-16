import Image from "next/image";
import Link from "next/link";
import styles from "../styles/font.module.scss";

export default function Topbar() {
  return (
    <div className="px-14 h-16 flex justify-between items-center bg-primaryColor">
      <Link href="/">
        <h1
          className={`${styles.title} text-5xl text-white hover:animate-pulse`}
        >
          DaoDin
        </h1>
      </Link>
      <div className="flex gap-4">
        <button type="button">
          <Image
            src="/event.svg"
            alt="setting"
            className="w-10 h-10 p-2 bg-white rounded-full hover:animate-bounce"
            width={40}
            height={40}
          />
        </button>
        <Link href="/profile">
          <Image
            src="/avatar.svg"
            alt="setting"
            className="w-10 h-10 p-2 bg-white rounded-full hover:animate-bounce"
            width={40}
            height={40}
          />
        </Link>
        <button type="button" className="hover:animate-spin-slow">
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
