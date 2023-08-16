/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "www.alphateam.tw",
      "cdn2.ettoday.net",
      "static.popdaily.com.tw",
      "i.chzbgr.com",
      "pic.happytify.cc",
      "image.presslogic.com",
      "preview.redd.it",
      "k.sinaimg.cn",
      "encrypted-tbn0.gstatic.com",
      "p5.itc.cn",
      "cwtob.oss-cn-beijing.aliyuncs.com",
    ],
  },
};

module.exports = nextConfig;
