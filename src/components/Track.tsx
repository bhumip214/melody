import React, { useState, useEffect, useRef } from "react";
import { Item } from "./api";
import { styled, useStyletron } from "baseui";
import { ListItem, ListItemLabel } from "baseui/list";

// const List = styled("div", {
//   marginBottom: "5px"
// });

interface TrackProps {
  track: Item;
}
const Track = (props: TrackProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [css, theme] = useStyletron();

  const track = props.track;

  // below code ignores an error of ListFormat since not all bowser supports it
  // @ts-ignore
  const formatter = new Intl.ListFormat("en", {
    style: "short",
    type: "conjunction"
  });

  const artists = track.artists.map(artist => {
    return artist.name;
  });

  const convertMstoMinsSec = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Number(((ms % 60000) / 1000).toFixed(0));
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  useEffect(() => {
    console.log(isPlaying, track, track.preview_url);
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, track]);

  return (
    <ListItem
      // @ts-ignore
      overrides={{
        Root: {
          props: {
            className: track.preview_url ? "trackListItem" : null,
            onDoubleClick: () => {
              if (track.preview_url !== null) {
                setIsPlaying(!isPlaying);
              }
            }
          },
          style: ({ $theme }) => {
            if (isPlaying) {
              return {
                backgroundColor: $theme.colors.listBodyFill,
                color: $theme.colors.positive,
                marginBottom: "5px"
              };
            }
            return {
              backgroundColor: "none",
              marginBottom: "5px",
              ":hover": {
                backgroundColor: $theme.colors.listBodyFill
              }
            };
          }
        }
      }}
      artwork={() => (
        <>
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-pause-circle"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="10" y1="15" x2="10" y2="9"></line>
              <line x1="14" y1="15" x2="14" y2="9"></line>
            </svg>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-music"
              >
                <path d="M9 18V5l12-2v13"></path>
                <circle cx="6" cy="18" r="3"></circle>
                <circle cx="18" cy="16" r="3"></circle>
              </svg>
              {track.preview_url && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-play"
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              )}
            </>
          )}
        </>
      )}
      endEnhancer={() => convertMstoMinsSec(track.duration_ms)}
    >
      <ListItemLabel description={formatter.format(artists)}>
        <span
          className={css({ color: isPlaying ? theme.colors.positive : "" })}
        >
          {track.name}
        </span>
        {track.preview_url && (
          <audio ref={audioRef}>
            <source src={track.preview_url} />
          </audio>
        )}
      </ListItemLabel>
    </ListItem>
  );
};

export default Track;
