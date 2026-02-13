"use client";

import { useState, useRef } from "react";


export default function Page() {
  const audioRef = useRef(null);
  const rylleImages = [
    "/images/rylle/IMG_20251021_184401.jpg",
    "/images/rylle/IMG_20251116_153750.jpg",
    "/images/rylle/IMG_20251122_110604.jpg",
    "/images/rylle/IMG_20260207_140207.jpg",
    "/images/rylle/IMG_20260128_171634.jpg",
    "/images/rylle/IMG_20251219_164327.jpg",
    "/images/rylle/IMG_20251123_075744.jpg",
    "/images/rylle/IMG_20251123_075732.jpg",
    "/images/rylle/IMG_20251123_075711.jpg",
    "/images/rylle/IMG_20251123_072415.jpg",
    "/images/rylle/IMG_20251122_172012.jpg",
    "/images/rylle/IMG_20251122_172011.jpg",
    "/images/rylle/IMG_20251122_172004.jpg",
    "/images/rylle/IMG_20251122_112725.jpg",
  ];

  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const yesButtonSize = noCount * 20 + 16;

  const handleNoClick = () => {
    setNoCount(noCount + 1);
    setImageIndex((prev) => (prev + 1) % rylleImages.length);
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Sure ka?",
      "Sige na pls",
      "Huna hunaa sa",
      "Last chance na ni",
      "Sure na jud ka?",
      "Basig magmahay ka",
      "Huna hunaa sa usab!",
      "Sigurado ba jud ka?",
      "Ngano cold kayka?!?",
      "Maluoy ka pls",
      "Tagaan takag kiss pag yes :)",
      "Please reconsider.",
      "Final warning.",
      "SIGE NA BA",
      ":C"
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  const handleYesClick = () => {
    setYesPressed(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen -mt-16">
      <audio ref={audioRef} src="/sounds/loveyou.mp3" preload="auto" />
      {yesPressed ? (
        <>
          <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" />
          <div className="text-4xl font-bold my-4">Hehehe asa ta ugma</div>
        </>
      ) : (
        <>
          <img className="w-1/3 mb-4 h-1/2 object-contain" src={rylleImages[imageIndex]} alt="rylle" />
          <h1 className="text-4xl my-4">Hi Rylle, will you be my Valentine?</h1>
          <div>
            <button
              className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4`}
              style={{ fontSize: yesButtonSize }}
              onClick={handleYesClick}
            >
              Yes
            </button>
            <button
              onClick={handleNoClick}
              className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              {noCount === 0 ? "No" : getNoButtonText()}
            </button>
          </div>
        </>
      )}
    </div>
  );
}