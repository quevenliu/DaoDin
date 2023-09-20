import Image from "next/image";
import styles from "../styles/font.module.scss";

export default function Tag({ category, location, area }) {
  let color = "primaryColor";
  let icon = "caution.svg";

  if (area === 1) {
    color = "bg-[#F85F56]";
  } else if (area === 2) {
    color = "bg-[#FDB833]";
  } else if (area === 3) {
    color = "bg-[#80AFF4]";
  } else if (area === 4) {
    color = "bg-[#5AC177]";
  } else {
    color = "bg-[#9953DF]";
  }

  if (category === "野餐") {
    icon = "/apple.svg";
  } else if (category === "登山") {
    icon = "/mountain.svg";
  } else if (category === "踏青") {
    icon = "/forest.svg";
  } else if (category === "慢跑") {
    icon = "/jogging.svg";
  } else if (category === "球類") {
    icon = "/basketball.svg";
  } else if (category === "健身") {
    icon = "/workout.svg";
  } else if (category === "水上") {
    icon = "/wave.svg";
  } else if (category === "演唱會") {
    icon = "/concert.svg";
  } else if (category === "音樂會") {
    icon = "/music.svg";
  } else if (category === "展覽") {
    icon = "/ticket.svg";
  } else if (category === "電影") {
    icon = "/movie.svg";
  } else if (category === "戲劇") {
    icon = "/drama.svg";
  } else if (category === "讀書會") {
    icon = "/notebook.svg";
  } else if (category === "桌遊") {
    icon = "/cube.svg";
  } else if (category === "電玩") {
    icon = "/game.svg";
  } else if (category === "棋藝") {
    icon = "/dashboard.svg";
  } else if (category === "密室逃脫") {
    icon = "/lock.svg";
  } else if (category === "KTV") {
    icon = "/ktv.svg";
  } else if (category === "逛街") {
    icon = "/cart.svg";
  } else if (category === "美食") {
    icon = "/hamburger.svg";
  } else if (category === "酒吧") {
    icon = "/wine.svg";
  } else if (category === "咖啡廳") {
    icon = "/coffee.svg";
  }

  return (
    <div
      className={`${styles.content} absolute lg:top-3.5 sm:top-3 sm:right-4 top-2 right-3 lg:right-6`}
    >
      <div
        className={`${color} px-3 sm:px-3.5 lg:px-4 sm:py-1 py-0.5 rounded-[20px] flex items-center`}
      >
        <Image
          src={icon}
          alt="icon"
          width={24}
          height={24}
          className="w-5 h-5 sm:w-[22px] sm:h-[22px] text-center"
        />
        <p className="text-white sm:text-[17px] lg:text-[19px] ml-1 lg:ml-2">
          {location}
        </p>
      </div>
    </div>
  );
}
