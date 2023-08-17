import React, { useMemo, useState } from "react";
import chillHop from "../music/data.js";
import playButton from "../images/playButton.png";
import pauseButton from "../images/pauseButton.png";
import next from "../images/next.png";
import previous from "../images/previous.png";

let audio;

function Player() {
  const dataChillHop = chillHop();
  const [SelectedSong, setSelectedSong] = useState(-1);
  const [PauseButton, setPauseButton] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const currentSong = useMemo(() => dataChillHop[SelectedSong], [SelectedSong]);
  let dataLength = dataChillHop.length;
  // play the selected music
  const handleButtonClick = () => {
    play(currentSong.audio);
  };

  function play(SelectedAudio) {
    pauseAudio(); // Pause any currently playing
    setPauseButton(true);
    audio = new Audio(); // Save a reference
    audio.src = SelectedAudio;
    audio.play();
    audio.ontimeupdate = () => setPercentage(audio.currentTime);
  }
  function pauseAudio() {
    // If audio is not undefined and if is playing, pause it
    setPauseButton(false);
    if (audio && !audio.paused) {
      audio.pause();
      audio.currentTime = 0; // Rewind track to beginning
    }
  }
  //traking audio duration
  function onChange(e) {
    setPercentage(e.target.value);
    if (!audio) {
      play(currentSong.audio);
    }
    audio.currentTime = e.target.value;
  }
  // next song
  function nextSong() {
    if (SelectedSong + 1 < dataLength) {
      setSelectedSong(SelectedSong + 1);
      play(currentSong.audio);
    } else {
      setSelectedSong(0);
    }
  }
  // previous song
  function previousSong() {
    if (SelectedSong - 1 > 0) {
      setSelectedSong(SelectedSong - 1);
      play(currentSong.audio);
    } else {
      setSelectedSong(dataLength - 1);
    }
  }

  return (
    <div className="App display: flex h-screen">
      <section className="side-section w-1/4">
        {dataChillHop.map((data, index) => (
          <div
            className="hover:bg-sky-100"
            onClick={() => setSelectedSong(index)}
          >
            <div className="song-infos flex items-center" key={data.key}>
              <div>
                <img className="w-20 m-3" src={data.cover} alt="album" />
              </div>
              <div className="inline w-full text-start ml-5 text-slate-600">
                <h1 className="font-bold">{data.name}</h1>
                <h3>{data.artist}</h3>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="main-section inline bg-slate-300 w-3/4 min-h-screen flex justify-center items-center">
        {currentSong ? (
          <div>
            <img
              className="w-1/4 rounded-3xl mx-auto cursor-pointer "
              src={currentSong.cover}
              alt="album"
            />
            <div>
              <h3>{currentSong.artist}</h3>
              <h1 className="font-bold">Player</h1>
              <input
                type="range"
                value={percentage}
                step="0.01"
                className="range"
                onChange={onChange}
              />
              <div className="flex mx-auto mt-10 w-1/2">
                <img
                  className="mx-auto cursor-w-resize"
                  src={previous}
                  onClick={previousSong}
                />
                {PauseButton ? (
                  <img
                    className="mx-auto"
                    src={pauseButton}
                    onClick={() => pauseAudio()}
                  />
                ) : (
                  <img
                    className="mx-auto"
                    src={playButton}
                    onClick={() => handleButtonClick()}
                  />
                )}
                <img
                  className="mx-auto cursor-e-resize	"
                  src={next}
                  onClick={nextSong}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid place-items-center h-screen">
            <h1 className="font-bold text-3xl text-slate-600">
              No song is selected yet !
            </h1>
          </div>
        )}
      </section>
    </div>
  );
}

export default Player;
