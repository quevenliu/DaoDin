import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { AudioContext } from "../pages/_app";

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
  picture,
  area,
  count,
}) {
  const audios = useContext(AudioContext);
  const playDongSound = () => {
    if (path !== "/profile") {
      const { dong } = audios;
      if (dong) {
        dong.play().catch((error) => {
          console.error("Failed to play audio:", error);
        });
      }
    }
  };

  return (
    <div className={`${styles.content} group mt-6 shadow-md rounded-[16px]`}>
      {path === "/profile" ? (
        <div
          className={`h-20 px-8 flex justify-between items-center bg-[#F2B9B9] dark:bg-[#222a4f] rounded-[16px] ${
            path !== "/profile" && "group-hover:rounded-b-none"
          } relative ${
            path === "/profile" && status === "pending" && "opacity-40"
          }`}
          onMouseEnter={playDongSound}
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
          <div className="p-5 ml-36 flex items-end">
            <h3 className="mr-5 text-[26px] font-bold dark:text-white">
              {name}
            </h3>
            {status === "pending" && (
              <p className="font-medium text-lg text-[#787777]">
                ( {count} / 9 )
              </p>
            )}
          </div>
          <Tag category={category} location={location} area={area} />
        </div>
      ) : (
        <div>
          <div
            className={`h-24 px-8 flex justify-between items-center bg-white rounded-[16px] ${
              path !== "/profile" && "group-hover:rounded-b-none"
            } relative ${
              path === "/profile" && status === "pending" && "opacity-40"
            }`}
            onMouseEnter={playDongSound}
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
            <div className="p-5 ml-36 flex items-end">
              <h3 className="mr-5 text-[26px] font-bold">{name}</h3>
              <p className="font-medium text-lg text-[#787777]">
                ( {count} / 9 )
              </p>
            </div>
            <Tag category={category} location={location} area={area} />
          </div>
          <div className="w-full w opacity-0 transform translate-y-[-10px] transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            <div className="hidden group-hover:flex px-6 py-5 flex-col bg-white rounded-b-[20px]">
              <p className="w-full text-lg px-5 py-4 bg-white rounded-t-[20px]">
                {description}
              </p>
              <Link
                href={`/joinGroup/${groupId}`}
                className="w-32 py-1.5 text-white self-end bg-primaryColor dark:bg-darkPrimaryColor text-center text-xl font-bold bg:text-white rounded-[20px] shrink-0"
              >
                Join
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
