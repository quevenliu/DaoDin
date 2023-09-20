import { createContext, useEffect, useState } from "react";

import "@/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const AudioContext = createContext();

export default function App({ Component, pageProps }) {
  const [audios, setAudios] = useState({});

  useEffect(() => {
    const audioFiles = {
      dong: new Audio("/dong.wav"),
      hedgehogCry: new Audio("/hedgehogSound.mp3"),
    };

    setAudios(audioFiles);
  }, []);

  return (
    <AudioContext.Provider value={audios}>
      <Component {...pageProps} />
    </AudioContext.Provider>
  );
}
