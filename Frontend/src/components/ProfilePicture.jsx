import Image from "next/image";
import { useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const apiUrl = process.env.API_URL;
let file;

export default function Profile({ picture, token, getProfile }) {
  const [isPictureEditing, setIsPictureEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  const resetFile = () => {
    setPreviewImage(null);
    fileInputRef.current = null;
  };

  const toggleEditingAvatar = () => {
    setIsPictureEditing(!isPictureEditing);
    if (isPictureEditing) {
      resetFile();
    }
  };
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

  const handleUpdatePicture = async () => {
    const formData = new FormData();
    formData.append("picture", file);
    await axios
      .put(`${apiUrl}/user/profile/picture`, formData, config)
      .then((res) => {
        console.log(res);
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
        }).fire({
          title: "Profile picture updated ✅",
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
    toggleEditingAvatar();
    getProfile();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    [file] = e.dataTransfer.files;
    showPreview();
  };

  return (
    <div>
      <div className="w-32 h-32 relative shrink-0">
        <Image
          src={picture || "/myphoto.svg"}
          alt="avatar"
          className="w-32 h-32 rounded-full object-cover object-center shrink-0"
          width={180}
          height={180}
        />
        {isPictureEditing ? (
          <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex items-center z-[999]">
            <div
              className="m-auto w-[400px] flex flex-col items-center relative dark:bg-darkLayoutColor border-solid border-black dark:border-darkBorderColor rounded-[20px] shadow-lg bg-backgroundColor"
              onDrop={handleDrop}
              onDragEnter={(e) => e.preventDefault()}
              onDragOver={(e) => e.preventDefault()}
            >
              <h3 className="text-2xl bg-primaryColor dark:bg-darkPrimaryColor w-full p-2 rounded-t-[20px] text-white text-center">
                Update Profile Picture
              </h3>
              <button
                type="button"
                onClick={toggleEditingAvatar}
                className="top-2.5 right-5 w-6 h-6 absolute dark:text-darkPrimaryColor text-center bg-white text-primaryColor text-base rounded-full ring-inset focus:outline-none focus:ring-2 focus:ring-primaryColor dark:focus:ring-[#BFBFBF] hover:animate-buttonPush"
              >
                X
              </button>
              <div className="p-5 w-full bg-white rounded-b-[20px]">
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt="Preview"
                    className="w-full mb-5"
                    width={280}
                    height={280}
                  />
                ) : (
                  <div className="mb-5 h-80 flex flex-col items-center justify-center dark:border-darkPrimaryColor border border-dashed border-primaryColor px-2 py-4  rounded-md cursor-pointer text-lg">
                    <p className="text-center">
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
                      className="text-primaryColor dark:text-darkSecondaryColor underline focus:outline-none focus:ring-2 focus:ring-primaryColor dark:focus:ring-darkPrimaryColor"
                    >
                      點擊選擇圖片
                    </button>
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleUpdatePicture}
                  className="flex justify-center m-auto dark:bg-darkPrimaryColor text-xl bg-primaryColor w-28 p-1 rounded-[50px] text-white text-center ring-inset focus:outline-none focus:ring-2 focus:ring-[#BFBFBF] hover:animate-buttonPush"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <div className="w-full h-full absolute top-0 left-0 border-2 border-solid border-primaryColor dark:border-darkSecondaryColor rounded-full opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-50">
          <button
            type="button"
            className="w-full h-full absolute top-1/2 left-1/2 text-lg text-white underline opacity-0 hover:opacity-100 transform -translate-x-1/2 -translate-y-1/2 transition-opacity"
            onClick={() => {
              toggleEditingAvatar();
            }}
          >
            編輯大頭貼
          </button>
        </div>
      </div>
    </div>
  );
}
