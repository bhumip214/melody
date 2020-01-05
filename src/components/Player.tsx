import React, { useContext } from "react";
import { styled } from "baseui";
import { ProgressBar } from "baseui/progress-bar";
import { PlayerContext } from "./Dashboard";
import { convertMstoMinsSec } from "../helpers/utilis";

const PlayerContainer = styled("div", {
  bottom: "0",
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "300px 1fr 300px",
  padding: "0px 80px",
  alignItems: "center",
  width: "100%",
  height: "100px",
  backgroundColor: "#1F1F1F",
  justifyContent: "space-between"
});

const PlayerInfo = styled("div", {
  display: "flex",
  alignItems: " center"
});

const Img = styled("img", {
  marginRight: "20px",
  flexShrink: 0
});

const PlayerIcons = styled("div", {
  display: "grid",
  gridAutoFlow: "column",
  gap: "40px",
  alignItems: "center",
  justifyContent: "center"
});

const PlayerBar = styled("div", {
  display: "flex",
  alignItems: "center"
});

interface PlayerProps {
  progress: number;
  duration: number;
}
const Player = (props: PlayerProps) => {
  const player = useContext(PlayerContext);
  const duration = 30000;

  const handlePlayClick = () => {
    if (player.playQueue.length === 0 && player.playableTracks) {
      player.addToPlayQueue(player.playableTracks);
    } else {
      player.setIsPlaying(true);
    }
  };

  const handlePauseClick = () => {
    player.setIsPlaying(false);
  };

  const handleSkipForward = () => {
    player.playNext();
  };

  const handleSkipBackward = () => {
    player.playPrevious();
  };
  return (
    <PlayerContainer>
      <div>
        {player.currentAlbum && player.currentTrack && (
          <PlayerInfo>
            <Img
              width="80px"
              height="80px"
              src={player.currentAlbum.images[0].url}
              alt={player.currentAlbum.name}
            />

            <p>{player.currentTrack.name}</p>
          </PlayerInfo>
        )}
      </div>
      <div style={{ width: "60%", margin: "0 auto" }}>
        <PlayerIcons>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-skip-back"
            onClick={handleSkipBackward}
          >
            <polygon points="19 20 9 12 19 4 19 20"></polygon>
            <line x1="5" y1="19" x2="5" y2="5"></line>
          </svg>

          {player.isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-pause-circle"
              onClick={handlePauseClick}
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="10" y1="15" x2="10" y2="9"></line>
              <line x1="14" y1="15" x2="14" y2="9"></line>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-play-circle"
              onClick={handlePlayClick}
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="10 8 16 12 10 16 10 8"></polygon>
            </svg>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-skip-forward"
            onClick={handleSkipForward}
          >
            <polygon points="5 4 15 12 5 20 5 4"></polygon>
            <line x1="19" y1="5" x2="19" y2="19"></line>
          </svg>
        </PlayerIcons>

        <PlayerBar>
          <span>0</span>
          <ProgressBar value={props.progress} />
          <span>
            {player.currentTrack ? convertMstoMinsSec(duration) : "0:00"}
          </span>
        </PlayerBar>
      </div>
    </PlayerContainer>
  );
};

export default Player;
