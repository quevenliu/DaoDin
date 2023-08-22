import Link from "next/link";
import Image from "next/image";
import styles from "../styles/font.module.scss";
import Tag from "./Tag";

export default function Group({
  path,
  groupId,
  creatorId,
  userId,
  name,
  category,
  location,
  description,
  status,
  picture,
  area,
}) {
  const playHoverSound = () => {
    const audio = new Audio("/dong.wav");
    audio.play();
  };

  return (
    <div className={`${styles.content} group mt-6`}>
      <div
        className={`h-20 px-8 flex justify-between items-center bg-backgroundColor rounded-[16px] ${
          path !== "/profile" && "group-hover:rounded-b-none"
        } relative ${
          path === "/profile" && status === "pending" && "opacity-40"
        }`}
        onMouseEnter={path !== "/profile" ? playHoverSound : undefined}
      >
        <Image
          src={picture}
          alt="Group picture"
          width={160}
          height={80}
          className={`w-40 h-full absolute left-0 rounded-l-[16px] object-cover ${
            path !== "/profile" && "group-hover:rounded-b-none"
          } `}
        />
        <h3 className="p-5 ml-36 text-[26px] font-bold">{name}</h3>
        <Tag category={category} location={location} area={area} />
      </div>
      {path !== "/profile" && (
        <div className="w-full opacity-0 transform translate-y-[-10px] transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          <div className="hidden group-hover:flex px-6 py-5 flex-col bg-[#BFBFBF] rounded-b-[20px]">
            <p className="w-full text-[17px] px-5 py-4 bg-backgroundColor rounded-t-[20px]">
              {description}
            </p>
            <Link
              href={`/joinGroup/${groupId}`}
              className="w-full py-1.5 self-end bg-primaryColor text-center text-xl font-bold text-white rounded-b-[20px] shrink-0"
            >
              Join
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
