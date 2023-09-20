import Head from "next/head";
import Image from "next/image";
import { Fragment, useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import Swal from "sweetalert2";
import styles from "../../styles/font.module.scss";
import { getServerCookie } from "../../utils/cookie";
import Topbar from "@/components/Topbar";

const apiUrl = process.env.API_URL;

const activities = [
  {
    id: 1,
    name: "野餐",
  },
  {
    id: 2,
    name: "登山",
  },
  {
    id: 3,
    name: "踏青",
  },
  {
    id: 4,
    name: "慢跑",
  },
  {
    id: 5,
    name: "球類",
  },
  {
    id: 6,
    name: "健身",
  },
  {
    id: 7,
    name: "水上",
  },
  {
    id: 8,
    name: "演唱會",
  },
  {
    id: 9,
    name: "音樂會",
  },
  {
    id: 10,
    name: "展覽",
  },
  {
    id: 11,
    name: "電影",
  },
  {
    id: 12,
    name: "戲劇",
  },
  {
    id: 13,
    name: "讀書會",
  },
  {
    id: 14,
    name: "桌遊",
  },
  {
    id: 15,
    name: "電玩",
  },
  {
    id: 16,
    name: "棋藝",
  },
  {
    id: 17,
    name: "密室逃脫",
  },
  {
    id: 18,
    name: "KTV",
  },
  {
    id: 19,
    name: "逛街",
  },
  {
    id: 20,
    name: "美食",
  },
  {
    id: 21,
    name: "酒吧",
  },
  {
    id: 22,
    name: "咖啡廳",
  },
];
const cities = [
  {
    id: 1,
    name: "臺北",
  },
  {
    id: 2,
    name: "新北",
  },
  {
    id: 3,
    name: "基隆",
  },
  {
    id: 4,
    name: "新竹",
  },
  {
    id: 5,
    name: "桃園",
  },
  {
    id: 6,
    name: "宜蘭",
  },
  {
    id: 7,
    name: "臺中",
  },
  {
    id: 8,
    name: "苗栗",
  },
  {
    id: 9,
    name: "彰化",
  },
  {
    id: 10,
    name: "南投",
  },
  {
    id: 11,
    name: "雲林",
  },
  {
    id: 12,
    name: "高雄",
  },
  {
    id: 13,
    name: "臺南",
  },
  {
    id: 14,
    name: "嘉義",
  },
  {
    id: 15,
    name: "屏東",
  },
  {
    id: 16,
    name: "澎湖",
  },
  {
    id: 17,
    name: "花蓮",
  },
  {
    id: 18,
    name: "臺東",
  },
  {
    id: 19,
    name: "金門",
  },
  {
    id: 20,
    name: "連江",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const show = (option) => {
  console.log(option);
};

let file;

export default function EditGroupPage({ token, groupId }) {
  const router = useRouter();
  const [groupData, setGroupData] = useState({});
  const groupNameRef = useRef(groupData.name);
  const groupDescriptionRef = useRef(null);
  const [categorySelected, setCategorySelected] = useState("");
  const [locationSelected, setLocationSelected] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  // 圖片預覽
  const showPreview = () => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  // 上傳圖片檔案
  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      [file] = e.target.files;
      showPreview(selectedFile);
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    [file] = e.dataTransfer.files;
    showPreview();
  };
  const resetForm = () => {
    groupNameRef.current.value = "";
    groupDescriptionRef.current.value = "";
    setCategorySelected("");
    setLocationSelected("");
    setPreviewImage(null);
    fileInputRef.current = null;
  };

  const getGroup = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .get(`${apiUrl}/group/${groupId}`, config)
      .then((res) => {
        setGroupData(res.data);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: `${err.message}\nPlease try again later or notify our engineering team.`,
          padding: "1.2em",
          background: "#fadee5",
          customClass: {
            title: "swal_title",
            confirmButton: "swal_confirm_fail",
            container: "swal_container",
            popup: "swal_popup",
          },
        });
      });
  };

  const updateGroup = async (payload) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .put(`${apiUrl}/group/${groupId}`, payload, config)
      .then((res) => {
        console.log(res);
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
        }).fire({
          title: "Group information updated ✅",
          padding: "1.2em",
          background: "#D1E6D2",
          customClass: {
            title: "swal_title",
            confirmButton: "swal_confirm_success",
            container: "swal_container",
            popup: "swal_popup",
          },
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
        }).fire({
          title: `${err.message}\nPlease try again later or notify our engineering team.`,
          padding: "1.2em",
          background: "#fadee5",
          customClass: {
            title: "swal_title",
            confirmButton: "swal_confirm_fail",
            container: "swal_container",
            popup: "swal_popup",
          },
        });
      });
  };

  const handleUpdateGroup = async () => {
    const formData = new FormData();
    formData.append("picture", file);
    formData.append("name", groupNameRef.current.value);
    formData.append("category", categorySelected.name);
    formData.append("location", locationSelected.name);
    formData.append("description", groupDescriptionRef.current.value);
    await updateGroup(formData);
    resetForm();
    router.push("/profile");
  };

  const handleCancel = () => {
    resetForm();
    router.push("/profile");
  };

  useEffect(() => {
    getGroup();
  }, []);

  return (
    <>
      <Head>
        <title>Edit Group Page</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="description" content="Generated by create next app" />
      </Head>
      <main
        className={`${styles.content} min-h-screen bg-gradient-to-br from-[#D14444] to-[#F77B54] dark:from-darkPrimaryColor dark:to-darkSecondaryColor lg:p-12 sm:p-6 sm:pt-0 md:p-8 md:pt-0.5 lg:pt-0 p-4 pt-0`}
      >
        <Topbar token={token} />
        <div className="mt-2 sm:mt-3 md:mt-4 lg:mt-5 max-w-[800px] bg-primaryColor dark:bg-darkSecondaryColor text-white m-auto rounded-t-[20px] text-center p-2 md:p-2.5 lg:p-3 text-[22px] md:text-2xl lg:text-[26px] font-bold">
          Edit Group
        </div>
        <div className="max-w-[800px] bg-white m-auto p-4 sm:p-5 md:p-6 lg:p-7 rounded-b-[20px] flex">
          <div className="w-full">
            <form className="px-2.5 mb-2 lg:mb-6 flex flex-col justify-between gap-3.5 md:gap-4 lg:gap-4.5">
              <label
                htmlFor="groupName"
                className="text-xl md:text-[22px] lg:text-2xl font-semibold flex flex-col"
              >
                Group Name
                <input
                  type="text"
                  id="groupName"
                  name="groupName"
                  className="mt-1 md:mt-1.5 lg:mt-2 py-1 md:py-[5px] px-4 lg:px-5 text-lg lg:text-[19px] font-normal border border-solid border-primaryColor dark:border-darkPrimaryColor rounded-[20px] ring-1 ring-inset ring-primaryColor dark:ring-darkPrimaryColor focus:outline-none focus:ring-2 focus:ring-primaryColor dark:focus:ring-darkPrimaryColor"
                  defaultValue={groupData.name}
                  ref={groupNameRef}
                />
              </label>
              <div className="w-full">
                <Listbox
                  value={categorySelected}
                  onChange={setCategorySelected}
                >
                  {({ open }) => (
                    <>
                      <Listbox.Label className="block text-xl md:text-[22px] lg:text-2xl font-semibold leading-6">
                        Category
                      </Listbox.Label>
                      <div className="relative md:mt-2 mt-1.5 lg:mt-2">
                        <Listbox.Button className="relative w-full cursor-default border border-solid border-primaryColor dark:border-darkPrimaryColor rounded-[20px] bg-white py-1 md:py-[5px] lg:py-1.5 px-4 lg:pl-3 text-left text-gray-900 ring-1 ring-inset ring-primaryColor dark:ring-darkPrimaryColor focus:outline-none focus:ring-2 focus:ring-primaryColor dark:focus:ring-darkPrimaryColor sm:text-sm sm:leading-6">
                          <span className="flex items-center">
                            <span className="lg:ml-2 block truncate text-lg lg:text-[19px]">
                              {categorySelected.name || "請選擇分類"}
                            </span>
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-1 max-h-40 md:max-h-44 lg:max-h-48 w-full overflow-auto rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {activities.map((activity) => (
                              <Listbox.Option
                                key={activity.id}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? "bg-primaryColor dark:bg-darkPrimaryColor text-white"
                                      : "text-gray-900",
                                    "relative cursor-default select-none py-[5px] md:py-[7px] lg:py-[9px] px-4 text-lg lg:text-[19px]"
                                  )
                                }
                                value={activity}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <div className="flex items-center">
                                      <span
                                        className={classNames(
                                          selected
                                            ? "font-semibold"
                                            : "font-normal",
                                          "lg:ml-1.5 block truncate"
                                        )}
                                      >
                                        {activity.name}
                                      </span>
                                    </div>

                                    {selected ? (
                                      <span
                                        className={classNames(
                                          active
                                            ? "text-white"
                                            : "text-indigo-600",
                                          "absolute inset-y-0 right-0 flex items-center pr-4"
                                        )}
                                      >
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                    {selected && show(activity.name)}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
              </div>
              <div className="w-full">
                <Listbox
                  value={locationSelected}
                  onChange={setLocationSelected}
                >
                  {({ open }) => (
                    <>
                      <Listbox.Label className="block text-xl md:text-[22px] lg:text-2xl font-semibold leading-6">
                        Location
                      </Listbox.Label>
                      <div className="relative md:mt-2 mt-1.5 lg:mt-2">
                        <Listbox.Button className="relative w-full cursor-default border border-solid border-primaryColor dark:border-darkPrimaryColor rounded-[20px] bg-white py-1 md:py-[5px] lg:py-1.5 px-4 lg:pl-3 text-left text-gray-900 ring-1 ring-inset ring-primaryColor dark:ring-darkPrimaryColor focus:outline-none focus:ring-2 focus:ring-primaryColor dark:focus:ring-darkPrimaryColor sm:text-sm sm:leading-6">
                          <span className="flex items-center">
                            <span className="lg:ml-2 block truncate text-lg lg:text-xl">
                              {locationSelected.name || "請選擇縣市"}
                            </span>
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-1 max-h-40 md:max-h-44 lg:max-h-48 w-full overflow-auto rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {cities.map((city) => (
                              <Listbox.Option
                                key={city.id}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? "bg-primaryColor dark:bg-darkPrimaryColor text-white"
                                      : "text-gray-900",
                                    "relative cursor-default select-none py-[5px] md:py-[7px] lg:py-[9px] px-4 text-lg lg:text-[19px]"
                                  )
                                }
                                value={city}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <div className="flex items-center">
                                      <span
                                        className={classNames(
                                          selected
                                            ? "font-semibold"
                                            : "font-normal",
                                          "lg:ml-1.5 block truncate"
                                        )}
                                      >
                                        {city.name}
                                      </span>
                                    </div>

                                    {selected ? (
                                      <span
                                        className={classNames(
                                          active
                                            ? "text-white"
                                            : "text-indigo-600",
                                          "absolute inset-y-0 right-0 flex items-center pr-4"
                                        )}
                                      >
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                    {selected && show(city.name)}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
              </div>
              <label
                htmlFor="groupDescription"
                className="text-xl md:text-[22px] lg:text-2xl font-semibold flex flex-col"
              >
                GroupDescription
                <textarea
                  type="text"
                  id="groupDescription"
                  name="groupDescription"
                  rows="4"
                  className="mt-1 md:mt-1.5 lg:mt-2 px-4 py-2 lg:px-4.5 text-lg lg:text-xl font-normal border border-solid border-primaryColor dark:border-darkPrimaryColor ring-1 ring-inset ring-primaryColor dark:ring-darkPrimaryColor focus:outline-none focus:ring-2 focus:ring-primaryColor dark:focus:ring-darkPrimaryColor rounded-[20px] resize-none overflow-hidden"
                  ref={groupDescriptionRef}
                  defaultValue={groupData.description}
                />
              </label>
              <div
                className="p-4 md:p-5 lg:p-6 flex justify-center text-center text-lg md:text-[19px] lg:text-xl font-bold border-2 border-dashed border-primaryColor dark:border-darkPrimaryColor rounded-[20px]"
                onDrop={handleDrop}
                onDragEnter={(e) => e.preventDefault()}
                onDragOver={(e) => e.preventDefault()}
              >
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt="Preview"
                    className="max-h-screen object-fit object-center"
                    width={280}
                    height={280}
                  />
                ) : (
                  <div className="justify-center flex flex-col items-center cursor-pointer">
                    <p className="text-center dark:text-[#BFBFBF]">
                      拖放圖片到此區域上傳
                      <br />
                      or
                    </p>
                    <input
                      type="file"
                      onChange={handleFileInputChange}
                      className="hidden"
                      accept="image/gif, image/jpeg, image/png"
                      ref={fileInputRef}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="text-primaryColor dark:text-darkPrimaryColor underline"
                    >
                      點擊選擇圖片
                    </button>
                  </div>
                )}
              </div>
              <div className="mt-2 self-end flex gap-2 md:gap-2.5 lg:gap-3">
                <button
                  type="button"
                  className="w-24 md:w-28 lg:w-32 text-center py-1 lg:py-2 text-[22px] md:text-[23px] lg:text-2xl font-semibold text-white bg-[#BFBFBF] rounded-[50px] focus:outline-none focus:ring-2 focus:ring-primaryColor dark:focus:ring-darkPrimaryColor hover:animate-buttonPush"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="w-24 md:w-28 lg:w-32 py-1 lg:py-2 text-[22px] md:text-[23px] lg:text-2xl font-semibold text-white bg-primaryColor dark:bg-darkPrimaryColor rounded-[50px] focus:outline-none focus:ring-2 focus:ring-[#BFBFBF] hover:animate-buttonPush"
                  onClick={handleUpdateGroup}
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const token = getServerCookie("userInfo", "token", context.req);
  const userId = getServerCookie("userInfo", "user_id", context.req);
  const name = getServerCookie("userInfo", "name", context.req);
  const groupId = Number(context.params.id);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { token, userId, name, groupId },
  };
}
