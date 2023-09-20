import Link from "next/link";
import Image from "next/image";
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
  return (
    <div
      className={`${styles.content} group mt-4 md:mt-5 lg:mt-6 shadow-md rounded-[16px]`}
    >
      {path === "/profile" ? (
        <div
          className={`h-[72px] md:h-[88px] sm:h-20 lg:px-8 flex justify-between items-center bg-white rounded-[16px] ${
            path !== "/profile" && "group-hover:rounded-b-none"
          } relative ${
            path === "/profile" && status === "pending" && "opacity-40"
          }`}
        >
          <Image
            src={picture}
            alt="Group picture"
            width={160}
            height={80}
            className={`w-24 sm:w-32 md:w-36 lg:w-40 h-full absolute left-0 rounded-l-[16px] object-cover ${
              path !== "/profile" && "group-hover:rounded-b-none"
            } `}
          />
          <div className="lg:p-5 sm:p-4 sm:ml-32 p-3 ml-24 md:ml-36 flex items-end">
            <h3 className="mr-1.5 sm:mr-2.5 md:mr-3.5 lg:mr-4.5 md:text-[22px] text-lg sm:text-xl lg:text-2xl font-bold">
              {name}
            </h3>
            {status === "pending" && (
              <p className="font-medium sm:text-base text-sm md:text-lg text-[#787777]">
                ( {count} / 9 )
              </p>
            )}
          </div>
          <Tag category={category} location={location} area={area} />
        </div>
      ) : (
        <div>
          <div
            className={`h-[72px] md:h-[88px] sm:h-20 lg:px-8 flex justify-between items-center bg-white rounded-[16px] ${
              path !== "/profile" && "group-hover:rounded-b-none"
            } relative ${
              path === "/profile" && status === "pending" && "opacity-40"
            }`}
          >
            <Image
              src={picture}
              alt="Group picture"
              width={160}
              height={80}
              className={`w-24 sm:w-32 md:w-36 lg:w-40 h-full absolute left-0 rounded-l-[16px] object-cover ${
                path !== "/profile" && "group-hover:rounded-b-none"
              } `}
            />
            <div className="lg:p-5 sm:p-4 sm:ml-32 p-3 ml-24 md:ml-36 flex items-end">
              <h3 className="mr-1.5 sm:mr-2.5 md:mr-3.5 lg:mr-4.5 md:text-[22px] text-lg sm:text-xl lg:text-2xl font-bold">
                {name}
              </h3>
              <p className="font-medium sm:text-base text-sm md:text-lg text-[#787777]">
                ( {count} / 9 )
              </p>
            </div>
            <Tag category={category} location={location} area={area} />
          </div>
          <div className="w-full opacity-0 transform translate-y-[-10px] transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            <div className="hidden group-hover:flex sm:p-4 p-3 md:p-5 lg:p-6 flex-col bg-white rounded-b-[20px]">
              <p className="w-full md:text-[17px] px-1.5 mb-1.5 md:mb-3.5 sm:mb-2.5 bg-white rounded-t-[20px]">
                {description}
              </p>
              <Link
                href={`/joinGroup/${groupId}`}
                className="w-20 sm:w-24 sm:py-1 md:py-1 py-0.5 lg:w-28 lg:py-1.5 text-white self-end bg-primaryColor dark:bg-darkPrimaryColor text-center text-lg sm:text-[19px] md:text-xl font-bold bg:text-white rounded-[20px] shrink-0 hover:animate-buttonPush"
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
