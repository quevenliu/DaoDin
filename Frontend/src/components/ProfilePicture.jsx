import Image from "next/image";
import { useState, useRef } from "react";
import axios from "axios";

const apiUrl = process.env.API_URL;
let file;

export default function ProfilePicture({ picture, token, getProfile }) {
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
      })
      .catch((err) => {
        console.log(err);
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
      {isPictureEditing ? (
        <div
          className="w-full min-h-[200px] sm:max-w-[350px] sm:min-h-[400px] p-2 flex flex-col justify-between items-center relative dark:bg-darkLayoutColor border border-solid border-black dark:border-darkBorderColor rounded-[20px] shadow-lg"
          onDrop={handleDrop}
          onDragEnter={(e) => e.preventDefault()}
          onDragOver={(e) => e.preventDefault()}
        >
          <h3 className="text-2xl font-thin">編輯頭像</h3>
          <button
            type="button"
            onClick={toggleEditingAvatar}
            className="w-6 h-6 absolute top-3 right-5 bg-primaryColor text-white rounded-full"
          >
            X
          </button>
          {previewImage ? (
            <Image
              src={previewImage}
              alt="Preview"
              className="w-full"
              width={280}
              height={280}
            />
          ) : (
            <div className="w-[250px] flex flex-col items-center dark:bg-darkBackgroundColor border border-dashed border-primaryColor p-2 rounded-md cursor-pointer">
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
                className="text-primaryColor"
              >
                點擊選擇圖片
              </button>
            </div>
          )}
          <button
            type="button"
            onClick={handleUpdatePicture}
            className="mt-2 py-2 px-10 bg-primaryColor text-white rounded-md"
          >
            上傳
          </button>
        </div>
      ) : (
        <div className="w-32 h-32 relative shrink-0">
          <Image
            src={picture || "/myphoto.svg"}
            alt="avatar"
            className="w-32 h-32 rounded-full object-cover object-center shrink-0"
            width={180}
            height={180}
          />
          <div className="w-full h-full absolute top-0 left-0 bg-black border-2 border-solid border-primaryColor rounded-full opacity-0 hover:opacity-100 transition-opacity">
            <button
              type="button"
              className="w-full h-full absolute top-1/2 left-1/2 text-base text-white underline transform -translate-x-1/2 -translate-y-1/2 transition-opacity"
              onClick={() => {
                toggleEditingAvatar();
              }}
            >
              編輯大頭貼
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
