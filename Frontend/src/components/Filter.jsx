export default function Filter({
  setIsFilterOpen,
  activeLocation,
  setActiveLocation,
  activeCategory,
  setActiveCategory,
}) {
  function toggleLocation(tagName) {
    if (activeLocation === tagName) {
      setActiveLocation("");
    } else {
      setActiveLocation(tagName);
    }
  }

  function toggleCategory(tagName) {
    if (activeCategory === tagName) {
      setActiveCategory("");
    } else {
      setActiveCategory(tagName);
    }
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
              className={`${activeLocation === "臺北" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleLocation("臺北");
              }}
            >
              臺北
            </button>
            <button
              type="button"
              className={`${activeLocation === "新北" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleLocation("新北");
              }}
            >
              新北
            </button>
            <button
              type="button"
              className={`${activeLocation === "基隆" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleLocation("基隆");
              }}
            >
              基隆
            </button>
            <button
              type="button"
              className={`${activeLocation === "新竹" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleLocation("新竹");
              }}
            >
              新竹
            </button>
            <button
              type="button"
              className={`${activeLocation === "桃園" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleLocation("桃園");
              }}
            >
              桃園
            </button>
            <button
              type="button"
              className={`${activeLocation === "宜蘭" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleLocation("宜蘭");
              }}
            >
              宜蘭
            </button>
          </div>
          <div className="flex text-xl items-center mb-2">
            <p className="mr-3">中部</p>
            <button
              type="button"
              className={`${activeLocation === "臺中" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleLocation("臺中");
              }}
            >
              臺中
            </button>
            <button
              type="button"
              className={`${activeLocation === "苗栗" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleLocation("苗栗");
              }}
            >
              苗栗
            </button>
            <button
              type="button"
              className={`${activeLocation === "彰化" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleLocation("彰化");
              }}
            >
              彰化
            </button>
            <button
              type="button"
              className={`${activeLocation === "南投" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleLocation("南投");
              }}
            >
              南投
            </button>
            <button
              type="button"
              className={`${activeLocation === "雲林" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleLocation("雲林");
              }}
            >
              雲林
            </button>
          </div>
          <div className="flex text-xl items-center mb-2">
            <p className="mr-3">南部</p>
            <button
              type="button"
              className={`${activeLocation === "高雄" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleLocation("高雄");
              }}
            >
              高雄
            </button>
            <button
              type="button"
              className={`${activeLocation === "臺南" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleLocation("臺南");
              }}
            >
              臺南
            </button>
            <button
              type="button"
              className={`${activeLocation === "嘉義" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleLocation("嘉義");
              }}
            >
              嘉義
            </button>
            <button
              type="button"
              className={`${activeLocation === "屏東" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleLocation("屏東");
              }}
            >
              屏東
            </button>
            <button
              type="button"
              className={`${activeLocation === "澎湖" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleLocation("澎湖");
              }}
            >
              澎湖
            </button>
          </div>
          <div className="flex text-xl items-center mb-2">
            <p className="mr-3">東部</p>
            <button
              type="button"
              className={`${activeLocation === "花蓮" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleLocation("花蓮");
              }}
            >
              花蓮
            </button>
            <button
              type="button"
              className={`${activeLocation === "臺東" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleLocation("臺東");
              }}
            >
              臺東
            </button>
          </div>
          <div className="flex text-xl items-center mb-2">
            <p className="mr-3">其他</p>
            <button
              type="button"
              className={`${activeLocation === "金門" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleLocation("金門");
              }}
            >
              金門
            </button>
            <button
              type="button"
              className={`${activeLocation === "連江" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleLocation("連江");
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
              className={`${activeCategory === "野餐" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleCategory("野餐");
              }}
            >
              野餐
            </button>
            <button
              type="button"
              className={`${activeCategory === "登山" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleCategory("登山");
              }}
            >
              登山
            </button>
            <button
              type="button"
              className={`${activeCategory === "踏青" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleCategory("踏青");
              }}
            >
              踏青
            </button>
          </div>
          <div className="flex text-xl items-center mb-2">
            <p className="mr-3">運動</p>
            <button
              type="button"
              className={`${activeCategory === "慢跑" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleCategory("慢跑");
              }}
            >
              慢跑
            </button>
            <button
              type="button"
              className={`${activeCategory === "球類" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleCategory("球類");
              }}
            >
              球類
            </button>
            <button
              type="button"
              className={`${activeCategory === "健身" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleCategory("健身");
              }}
            >
              健身
            </button>
            <button
              type="button"
              className={`${activeCategory === "水上" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleCategory("水上");
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
                activeCategory === "演唱會" ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleCategory("演唱會");
              }}
            >
              演唱會
            </button>
            <button
              type="button"
              className={`${
                activeCategory === "音樂會" ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleCategory("音樂會");
              }}
            >
              音樂會
            </button>
            <button
              type="button"
              className={`${activeCategory === "展覽" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleCategory("展覽");
              }}
            >
              展覽
            </button>
            <button
              type="button"
              className={`${activeCategory === "電影" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleCategory("電影");
              }}
            >
              電影
            </button>
            <button
              type="button"
              className={`${activeCategory === "戲劇" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleCategory("戲劇");
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
                activeCategory === "讀書會" ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleCategory("讀書會");
              }}
            >
              讀書會
            </button>
          </div>
          <div className="flex text-xl items-center mb-2">
            <p className="mr-3">遊戲</p>
            <button
              type="button"
              className={`${activeCategory === "桌遊" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleCategory("桌遊");
              }}
            >
              桌遊
            </button>
            <button
              type="button"
              className={`${activeCategory === "電玩" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleCategory("電玩");
              }}
            >
              電玩
            </button>
            <button
              type="button"
              className={`${activeCategory === "棋藝" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleCategory("棋藝");
              }}
            >
              棋藝
            </button>
            <button
              type="button"
              className={`${
                activeCategory === "密室逃脫" ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleCategory("密室逃脫");
              }}
            >
              密室逃脫
            </button>
          </div>
          <div className="flex text-xl items-center mb-2">
            <p className="mr-3">休閒</p>
            <button
              type="button"
              className={`${activeCategory === "KTV" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleCategory("KTV");
              }}
            >
              KTV
            </button>
            <button
              type="button"
              className={`${activeCategory === "逛街" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleCategory("逛街");
              }}
            >
              逛街
            </button>
          </div>
          <div className="flex text-xl items-center mb-2">
            <p className="mr-3">飲食</p>
            <button
              type="button"
              className={`${activeCategory === "美食" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleCategory("美食");
              }}
            >
              美食
            </button>
            <button
              type="button"
              className={`${activeCategory === "酒吧" ? "active-tag" : "tag"}`}
              onClick={() => {
                toggleCategory("酒吧");
              }}
            >
              酒吧
            </button>
            <button
              type="button"
              className={`${
                activeCategory === "咖啡廳" ? "active-tag" : "tag"
              }`}
              onClick={() => {
                toggleCategory("咖啡廳");
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
