import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const apiUrl = process.env.API_URL;

export default function Filter({
  token,
  setIsFilterOpen,
  setFilterGroups,
  activeLocations,
  setActiveLocations,
  activeCategories,
  setActiveCategories,
}) {
  const [locationList, setLocationList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  function toggleLocationList(tagName) {
    if (locationList.includes(tagName)) {
      setLocationList(locationList.filter((tag) => tag !== tagName));
    } else {
      setLocationList([...locationList, tagName]);
    }
  }

  function toggleCategoryList(tagName) {
    if (categoryList.includes(tagName)) {
      setCategoryList(categoryList.filter((tag) => tag !== tagName));
    } else {
      setCategoryList([...categoryList, tagName]);
    }
  }

  function toggleActiveLocations(tagName) {
    if (activeLocations.includes(tagName)) {
      setActiveLocations(activeLocations.filter((tag) => tag !== tagName));
    } else {
      setActiveLocations([...activeLocations, tagName]);
    }
  }

  function toggleActiveCategories(tagName) {
    if (activeCategories.includes(tagName)) {
      setActiveCategories(activeCategories.filter((tag) => tag !== tagName));
    } else {
      setActiveCategories([...activeCategories, tagName]);
    }
  }

  function toggleLocation() {
    const updatedLocations = [...activeLocations];
    locationList.forEach((location) => {
      if (updatedLocations.includes(location)) {
        const index = updatedLocations.indexOf(location);
        updatedLocations.splice(index, 1);
      } else {
        updatedLocations.push(location);
      }
    });
    setActiveLocations(updatedLocations);
  }

  function toggleCategory() {
    const updatedCategories = [...activeCategories];
    categoryList.forEach((category) => {
      if (updatedCategories.includes(category)) {
        const index = updatedCategories.indexOf(category);
        updatedCategories.splice(index, 1);
      } else {
        updatedCategories.push(category);
      }
    });
    setActiveCategories(updatedCategories);
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const getFilterGroups = async () => {
    if (activeCategories.length === 0) {
      await axios
        .get(
          `${apiUrl}/group/search?&location=${activeLocations.join(
            ","
          )}&isJoined=0`,
          config
        )
        .then((res) => {
          console.log(res);
          setFilterGroups(res.data.groups);

          if (res.data.groups.length === 0) {
            Swal.fire({
              title:
                "We don't have the group now:(\nWhat about creating one🤩?!",
              padding: "1.2em",
              background: "#fadee5",
              customClass: {
                title: "swal_title",
                confirmButton: "swal_confirm_fail",
                container: "swal_container",
                popup: "swal_popup",
              },
            });
          }
        })
        .catch((err) => {
          console.log(err);
          // Swal.fire({
          //   title: `${err.message}\nPlease try again later or notify our engineering team.`,
          //   padding: "1.2em",
          //   background: "#fadee5",
          //   customClass: {
          //     title: "swal_title",
          //     confirmButton: "swal_confirm_fail",
          //     container: "swal_container",
          //     popup: "swal_popup",
          //   },
          // });
        });
    } else if (activeLocations.length === 0) {
      await axios
        .get(
          `${apiUrl}/group/search?category=${activeCategories.join(
            ","
          )}&isJoined=0`,
          config
        )
        .then((res) => {
          console.log(res);
          setFilterGroups(res.data.groups);

          if (res.data.groups.length === 0) {
            Swal.fire({
              title:
                "We don't have the group now:(\nWhat about creating one🤩?!",
              padding: "1.2em",
              background: "#fadee5",
              customClass: {
                title: "swal_title",
                confirmButton: "swal_confirm_fail",
                container: "swal_container",
                popup: "swal_popup",
              },
            });
          }
        })
        .catch((err) => {
          console.log(err);
          // Swal.fire({
          //   title: `${err.message}\nPlease try again later or notify our engineering team.`,
          //   padding: "1.2em",
          //   background: "#fadee5",
          //   customClass: {
          //     title: "swal_title",
          //     confirmButton: "swal_confirm_fail",
          //     container: "swal_container",
          //     popup: "swal_popup",
          //   },
          // });
        });
    } else {
      await axios
        .get(
          `${apiUrl}/group/search?category=${activeCategories.join(
            ","
          )}&location=${activeLocations.join(",")}&isJoined=0`,
          config
        )
        .then((res) => {
          console.log(res);
          setFilterGroups(res.data.groups);

          if (res.data.groups.length === 0) {
            Swal.fire({
              title:
                "We don't have the group now:(\nWhat about creating one🤩?!",
              padding: "1.2em",
              background: "#fadee5",
              customClass: {
                title: "swal_title",
                confirmButton: "swal_confirm_fail",
                container: "swal_container",
                popup: "swal_popup",
              },
            });
          }
        })
        .catch((err) => {
          console.log(err);
          // Swal.fire({
          //   title: `${err.message}\nPlease try again later or notify our engineering team.`,
          //   padding: "1.2em",
          //   background: "#fadee5",
          //   customClass: {
          //     title: "swal_title",
          //     confirmButton: "swal_confirm_fail",
          //     container: "swal_container",
          //     popup: "swal_popup",
          //   },
          // });
        });
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex items-center z-[999]">
      <div className="w-fit px-12 py-8 m-auto bg-white rounded-[20px] ">
        <div className="mb-5">
          <p className="text-2xl font-bold mb-3">Location</p>
          <div className="flex text-xl items-center mb-2">
            <p className="mr-3">北部</p>
            <button
              type="button"
              className={`${
                activeLocations.includes("臺北")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveLocations("臺北");
                toggleLocationList("臺北");
              }}
            >
              臺北
            </button>
            <button
              type="button"
              className={`${
                activeLocations.includes("新北")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveLocations("新北");
                toggleLocationList("新北");
              }}
            >
              新北
            </button>
            <button
              type="button"
              className={`${
                activeLocations.includes("基隆")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveLocations("基隆");
                toggleLocationList("基隆");
              }}
            >
              基隆
            </button>
            <button
              type="button"
              className={`${
                activeLocations.includes("新竹")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveLocations("新竹");
                toggleLocationList("新竹");
              }}
            >
              新竹
            </button>
            <button
              type="button"
              className={`${
                activeLocations.includes("桃園")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveLocations("桃園");
                toggleLocationList("桃園");
              }}
            >
              桃園
            </button>
            <button
              type="button"
              className={`${
                activeLocations.includes("宜蘭")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveLocations("宜蘭");
                toggleLocationList("宜蘭");
              }}
            >
              宜蘭
            </button>
          </div>
          <div className="flex text-xl items-center mb-2">
            <p className="mr-3">中部</p>
            <button
              type="button"
              className={`${
                activeLocations.includes("臺中")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveLocations("臺中");
                toggleLocationList("臺中");
              }}
            >
              臺中
            </button>
            <button
              type="button"
              className={`${
                activeLocations.includes("苗栗")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveLocations("苗栗");
                toggleLocationList("苗栗");
              }}
            >
              苗栗
            </button>
            <button
              type="button"
              className={`${
                activeLocations.includes("彰化")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveLocations("彰化");
                toggleLocationList("彰化");
              }}
            >
              彰化
            </button>
            <button
              type="button"
              className={`${
                activeLocations.includes("南投")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveLocations("南投");
                toggleLocationList("南投");
              }}
            >
              南投
            </button>
            <button
              type="button"
              className={`${
                activeLocations.includes("雲林")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveLocations("雲林");
                toggleLocationList("雲林");
              }}
            >
              雲林
            </button>
          </div>
          <div className="flex text-xl items-center mb-2">
            <p className="mr-3">南部</p>
            <button
              type="button"
              className={`${
                activeLocations.includes("高雄")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveLocations("高雄");
                toggleLocationList("高雄");
              }}
            >
              高雄
            </button>
            <button
              type="button"
              className={`${
                activeLocations.includes("臺南")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveLocations("臺南");
                toggleLocationList("臺南");
              }}
            >
              臺南
            </button>
            <button
              type="button"
              className={`${
                activeLocations.includes("嘉義")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveLocations("嘉義");
                toggleLocationList("嘉義");
              }}
            >
              嘉義
            </button>
            <button
              type="button"
              className={`${
                activeLocations.includes("屏東")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveLocations("屏東");
                toggleLocationList("屏東");
              }}
            >
              屏東
            </button>
            <button
              type="button"
              className={`${
                activeLocations.includes("澎湖")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveLocations("澎湖");
                toggleLocationList("澎湖");
              }}
            >
              澎湖
            </button>
          </div>
          <div className="flex text-xl items-center mb-2">
            <p className="mr-3">東部</p>
            <button
              type="button"
              className={`${
                activeLocations.includes("花蓮")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveLocations("花蓮");
                toggleLocationList("花蓮");
              }}
            >
              花蓮
            </button>
            <button
              type="button"
              className={`${
                activeLocations.includes("臺東")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveLocations("臺東");
                toggleLocationList("臺東");
              }}
            >
              臺東
            </button>
          </div>
          <div className="flex text-xl items-center mb-2">
            <p className="mr-3">其他</p>
            <button
              type="button"
              className={`${
                activeLocations.includes("金門")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveLocations("金門");
                toggleLocationList("金門");
              }}
            >
              金門
            </button>
            <button
              type="button"
              className={`${
                activeLocations.includes("連江")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveLocations("連江");
                toggleLocationList("連江");
              }}
            >
              連江
            </button>
          </div>
        </div>

        <div>
          <p className="text-2xl font-bold mb-3">Category</p>
          <div className="flex text-xl items-center mb-2">
            <p className="mr-3">戶外</p>
            <button
              type="button"
              className={`${
                activeCategories.includes("野餐")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveCategories("野餐");
                toggleCategoryList("野餐");
              }}
            >
              野餐
            </button>
            <button
              type="button"
              className={`${
                activeCategories.includes("登山")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveCategories("登山");
                toggleCategoryList("登山");
              }}
            >
              登山
            </button>
            <button
              type="button"
              className={`${
                activeCategories.includes("踏青")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveCategories("踏青");
                toggleCategoryList("踏青");
              }}
            >
              踏青
            </button>
          </div>
          <div className="flex text-xl items-center mb-2">
            <p className="mr-3">運動</p>
            <button
              type="button"
              className={`${
                activeCategories.includes("慢跑")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveCategories("慢跑");
                toggleCategoryList("慢跑");
              }}
            >
              慢跑
            </button>
            <button
              type="button"
              className={`${
                activeCategories.includes("球類")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveCategories("球類");
                toggleCategoryList("球類");
              }}
            >
              球類
            </button>
            <button
              type="button"
              className={`${
                activeCategories.includes("健身")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveCategories("健身");
                toggleCategoryList("健身");
              }}
            >
              健身
            </button>
            <button
              type="button"
              className={`${
                activeCategories.includes("水上")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveCategories("水上");
                toggleCategoryList("水上");
              }}
            >
              水上
            </button>
          </div>
          <div className="flex text-xl items-center mb-2">
            <p className="mr-3">藝文</p>
            <button
              type="button"
              className={`${
                activeCategories.includes("演唱會")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveCategories("演唱會");
                toggleCategoryList("演唱會");
              }}
            >
              演唱會
            </button>
            <button
              type="button"
              className={`${
                activeCategories.includes("音樂會")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveCategories("音樂會");
                toggleCategoryList("音樂會");
              }}
            >
              音樂會
            </button>
            <button
              type="button"
              className={`${
                activeCategories.includes("展覽")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveCategories("展覽");
                toggleCategoryList("展覽");
              }}
            >
              展覽
            </button>
            <button
              type="button"
              className={`${
                activeCategories.includes("電影")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveCategories("電影");
                toggleCategoryList("電影");
              }}
            >
              電影
            </button>
            <button
              type="button"
              className={`${
                activeCategories.includes("戲劇")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveCategories("戲劇");
                toggleCategoryList("戲劇");
              }}
            >
              戲劇
            </button>
          </div>
          <div className="flex text-xl items-center mb-2">
            <p className="mr-3">學習</p>
            <button
              type="button"
              className={`${
                activeCategories.includes("讀書會")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveCategories("讀書會");
                toggleCategoryList("讀書會");
              }}
            >
              讀書會
            </button>
          </div>
          <div className="flex text-xl items-center mb-2">
            <p className="mr-3">遊戲</p>
            <button
              type="button"
              className={`${
                activeCategories.includes("桌遊")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveCategories("桌遊");
                toggleCategoryList("桌遊");
              }}
            >
              桌遊
            </button>
            <button
              type="button"
              className={`${
                activeCategories.includes("電玩")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveCategories("電玩");
                toggleCategoryList("電玩");
              }}
            >
              電玩
            </button>
            <button
              type="button"
              className={`${
                activeCategories.includes("棋藝")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveCategories("棋藝");
                toggleCategoryList("棋藝");
              }}
            >
              棋藝
            </button>
            <button
              type="button"
              className={`${
                activeCategories.includes("密室逃脫")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveCategories("密室逃脫");
                toggleCategoryList("密室逃脫");
              }}
            >
              密室逃脫
            </button>
          </div>
          <div className="flex text-xl items-center mb-2">
            <p className="mr-3">休閒</p>
            <button
              type="button"
              className={`${
                activeCategories.includes("KTV")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveCategories("KTV");
                toggleCategoryList("KTV");
              }}
            >
              KTV
            </button>
            <button
              type="button"
              className={`${
                activeCategories.includes("逛街")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveCategories("逛街");
                toggleCategoryList("逛街");
              }}
            >
              逛街
            </button>
          </div>
          <div className="flex text-xl items-center mb-2">
            <p className="mr-3">飲食</p>
            <button
              type="button"
              className={`${
                activeCategories.includes("美食")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveCategories("美食");
                toggleCategoryList("美食");
              }}
            >
              美食
            </button>
            <button
              type="button"
              className={`${
                activeCategories.includes("酒吧")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveCategories("酒吧");
                toggleCategoryList("酒吧");
              }}
            >
              酒吧
            </button>
            <button
              type="button"
              className={`${
                activeCategories.includes("咖啡廳")
                  ? "active-tag dark:bg-darkPrimaryColor dark:border-darkPrimaryColor dark:hover:border-[#bfbfbf]"
                  : "tag"
              } dark:hover:border-darkPrimaryColor`}
              onClick={() => {
                toggleActiveCategories("咖啡廳");
                toggleCategoryList("咖啡廳");
              }}
            >
              咖啡廳
            </button>
          </div>
          <div className="flex mt-5">
            <button
              type="button"
              onClick={() => {
                setLocationList([]);
                setCategoryList([]);
                setActiveLocations([]);
                setActiveCategories([]);
                setFilterGroups([]);
              }}
              className="flex w-28 justify-center py-1.5 mr-auto text-[22px] font-bold bg-[#BFBFBF] rounded-[50px] text-white mr-3"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={() => {
                setIsFilterOpen(false);
                toggleLocation();
                toggleCategory();
              }}
              className="flex w-28 justify-center py-1.5 text-[22px] font-bold bg-[#BFBFBF] rounded-[50px] text-white mr-3"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                setIsFilterOpen(false);
                getFilterGroups();
              }}
              className="flex w-28 justify-center py-1.5 text-[22px] font-bold bg-primaryColor dark:bg-darkPrimaryColor rounded-[50px] text-white"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
