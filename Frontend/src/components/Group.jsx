import Link from "next/link";
import styles from "../styles/font.module.scss";
import Tag from "./Tag";

export default function Group({
  path,
  groupId,
  name,
  category,
  location,
  description,
  status,
  area,
}) {
  const playHoverSound = () => {
    const audio = new Audio("/dong.wav");
    audio.play();
  };

  return (
    <div className={`${styles.content} group mt-6`}>
      {path === "/profile" ? (
        <div className="p-5 flex justify-between items-center bg-backgroundColor rounded-[20px] relative">
          <h3 className="px-8 text-[26px] font-bold">{name}</h3>
          <Tag category={category} location={location} area={area} />
        </div>
      ) : (
        <>
          <div
            className="px-8 flex justify-between items-center bg-backgroundColor rounded-[20px] group-hover:rounded-b-none relative"
            onMouseEnter={playHoverSound}
          >
            <h3 className="p-5 text-[26px] font-bold">{name}</h3>
            <Tag category={category} location={location} area={area} />
          </div>
          <div className="w-full opacity-0 transform translate-y-[-10px] transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            <div className="hidden group-hover:flex px-6 py-5 justify-between gap-5 bg-[#BFBFBF] rounded-b-[20px]">
              <p className="w-full text-[17px] px-4 py-3 bg-backgroundColor rounded-[20px]">
                {description}
              </p>
              <Link
                href={`/joinGroup/${groupId}`}
                className="w-[10%] px-6 py-2 self-end bg-primaryColor text-center text-xl font-bold text-white rounded-[50px] shrink-0"
              >
                Join
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
