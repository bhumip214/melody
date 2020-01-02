import React, { useContext } from "react";
import { useStyletron } from "baseui";
import { ListItem, ListItemLabel } from "baseui/list";
import { PlayerContext } from "./Dashboard";
import { convertMstoMinsSec, formatter } from "../helpers/utilis";

interface TrackProps {
  name: string;
  id: string;
  preview_url: string | null;
  artists: Array<{ name?: string }>;
  duration_ms: number;
  onDoubleClick: Function;
}

const Track = (props: TrackProps) => {
  const [css, theme] = useStyletron();

  const player = useContext(PlayerContext);

  const isTrackPlaying = player.currentTrack
    ? player.currentTrack.id === props.id && player.isPlaying
    : false;

  const artists = props.artists.map(artist => {
    return artist.name;
  });

  return (
    <ListItem
      // @ts-ignore
      overrides={{
        Root: {
          props: {
            className: props.preview_url ? "trackListItem" : null,
            onDoubleClick: () => {
              if (props.preview_url !== null) {
                props.onDoubleClick();
              }
            }
          },
          style: ({ $theme }) => {
            if (isTrackPlaying) {
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
          {isTrackPlaying ? (
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
              {props.preview_url && (
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
      endEnhancer={() => convertMstoMinsSec(props.duration_ms)}
    >
      <ListItemLabel description={formatter.format(artists)}>
        <span
          className={css({
            color: isTrackPlaying ? theme.colors.positive : ""
          })}
        >
          {props.name}
        </span>
      </ListItemLabel>
    </ListItem>
  );
};

export default Track;
