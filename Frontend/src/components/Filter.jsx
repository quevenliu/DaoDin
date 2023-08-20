import { useState } from "react";

export default function Filter({
  setIsFilterOpen,
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

  function toggleLocation() {
    locationList.forEach((location) => {
      if (activeLocations.includes(location)) {
        setActiveLocations(activeLocations.filter((tag) => tag !== location));
      } else {
        setActiveLocations([...activeLocations, location]);
      }
    });
  }

  function toggleCategory() {
    categoryList.forEach((category) => {
      if (activeCategories.includes(category)) {
        setActiveCategories(activeCategories.filter((tag) => tag !== category));
      } else {
        setActiveCategories([...activeCategories, category]);
      }
    });
  }

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
                locationList.includes("臺北") ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleLocationList("臺北");
              }}
            >
              臺北
            </button>
            <button
              type="button"
              className={`${
                locationList.includes("新北") ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleLocationList("新北");
              }}
            >
              新北
            </button>
            <button
              type="button"
              className={`${
                locationList.includes("基隆") ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleLocationList("基隆");
              }}
            >
              基隆
            </button>
            <button
              type="button"
              className={`${
                locationList.includes("新竹") ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleLocationList("新竹");
              }}
            >
              新竹
            </button>
            <button
              type="button"
              className={`${
                locationList.includes("桃園") ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleLocationList("桃園");
              }}
            >
              桃園
            </button>
            <button
              type="button"
              className={`${
                locationList.includes("宜蘭") ? "active-tag" : "tag"
              }`}
              onClick={() => {
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
                locationList.includes("臺中") ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleLocationList("臺中");
              }}
            >
              臺中
            </button>
            <button
              type="button"
              className={`${
                locationList.includes("苗栗") ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleLocationList("苗栗");
              }}
            >
              苗栗
            </button>
            <button
              type="button"
              className={`${
                locationList.includes("彰化") ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleLocationList("彰化");
              }}
            >
              彰化
            </button>
            <button
              type="button"
              className={`${
                locationList.includes("南投") ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleLocationList("南投");
              }}
            >
              南投
            </button>
            <button
              type="button"
              className={`${
                locationList.includes("雲林") ? "active-tag" : "tag"
              }`}
              onClick={() => {
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
                locationList.includes("高雄") ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleLocationList("高雄");
              }}
            >
              高雄
            </button>
            <button
              type="button"
              className={`${
                locationList.includes("臺南") ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleLocationList("臺南");
              }}
            >
              臺南
            </button>
            <button
              type="button"
              className={`${
                locationList.includes("嘉義") ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleLocationList("嘉義");
              }}
            >
              嘉義
            </button>
            <button
              type="button"
              className={`${
                locationList.includes("屏東") ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleLocationList("屏東");
              }}
            >
              屏東
            </button>
            <button
              type="button"
              className={`${
                locationList.includes("澎湖") ? "active-tag" : "tag"
              }`}
              onClick={() => {
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
                locationList.includes("花蓮") ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleLocationList("花蓮");
              }}
            >
              花蓮
            </button>
            <button
              type="button"
              className={`${
                locationList.includes("臺東") ? "active-tag" : "tag"
              }`}
              onClick={() => {
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
                locationList.includes("金門") ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleLocationList("金門");
              }}
            >
              金門
            </button>
            <button
              type="button"
              className={`${
                locationList.includes("連江") ? "active-tag" : "tag"
              }`}
              onClick={() => {
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
                categoryList.includes("野餐") ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleCategoryList("野餐");
              }}
            >
              野餐
            </button>
            <button
              type="button"
              className={`${
                categoryList.includes("登山") ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleCategoryList("登山");
              }}
            >
              登山
            </button>
            <button
              type="button"
              className={`${
                categoryList.includes("踏青") ? "active-tag" : "tag"
              }`}
              onClick={() => {
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
                categoryList.includes("慢跑") ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleCategoryList("慢跑");
              }}
            >
              慢跑
            </button>
            <button
              type="button"
              className={`${
                categoryList.includes("球類") ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleCategoryList("球類");
              }}
            >
              球類
            </button>
            <button
              type="button"
              className={`${
                categoryList.includes("健身") ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleCategoryList("健身");
              }}
            >
              健身
            </button>
            <button
              type="button"
              className={`${
                categoryList.includes("水上") ? "active-tag" : "tag"
              }`}
              onClick={() => {
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
                categoryList.includes("演唱會") ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleCategoryList("演唱會");
              }}
            >
              演唱會
            </button>
            <button
              type="button"
              className={`${
                categoryList.includes("音樂會") ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleCategoryList("音樂會");
              }}
            >
              音樂會
            </button>
            <button
              type="button"
              className={`${
                categoryList.includes("展覽") ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleCategoryList("展覽");
              }}
            >
              展覽
            </button>
            <button
              type="button"
              className={`${
                categoryList.includes("電影") ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleCategoryList("電影");
              }}
            >
              電影
            </button>
            <button
              type="button"
              className={`${
                categoryList.includes("戲劇") ? "active-tag" : "tag"
              }`}
              onClick={() => {
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
                categoryList.includes("讀書會") ? "active-tag" : "tag"
              }`}
              onClick={() => {
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
                categoryList.includes("桌遊") ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleCategoryList("桌遊");
              }}
            >
              桌遊
            </button>
            <button
              type="button"
              className={`${
                categoryList.includes("電玩") ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleCategoryList("電玩");
              }}
            >
              電玩
            </button>
            <button
              type="button"
              className={`${
                categoryList.includes("棋藝") ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleCategoryList("棋藝");
              }}
            >
              棋藝
            </button>
            <button
              type="button"
              className={`${
                categoryList.includes("密室逃脫") ? "active-tag" : "tag"
              }`}
              onClick={() => {
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
                categoryList.includes("KTV") ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleCategoryList("KTV");
              }}
            >
              KTV
            </button>
            <button
              type="button"
              className={`${
                categoryList.includes("逛街") ? "active-tag" : "tag"
              }`}
              onClick={() => {
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
                categoryList.includes("美食") ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleCategoryList("美食");
              }}
            >
              美食
            </button>
            <button
              type="button"
              className={`${
                categoryList.includes("酒吧") ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleCategoryList("酒吧");
              }}
            >
              酒吧
            </button>
            <button
              type="button"
              className={`${
                categoryList.includes("咖啡廳") ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleCategoryList("咖啡廳");
              }}
            >
              咖啡廳
            </button>
          </div>
          <div className="flex mt-4 justify-end">
            <button
              type="button"
              onClick={() => setIsFilterOpen(false)}
              className="flex w-28 justify-center py-1.5 text-[22px] font-bold bg-[#BFBFBF] rounded-[50px] text-white mr-3"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                setIsFilterOpen(false);
                toggleLocation();
                toggleCategory();
              }}
              className="flex w-28 justify-center py-1.5 text-[22px] font-bold bg-primaryColor rounded-[50px] text-white"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
