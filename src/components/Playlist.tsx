import React, { useState, useEffect, useContext } from "react";
import Track from "./Track";
import { IPlaylist, PlayableTrack } from "./api";
import Axios from "axios";
import { Button, SIZE, SHAPE } from "baseui/button";
import {
  AlbumContainer as PlaylistContainer,
  AlbumInfo as PlaylistInfo,
  Ul
} from "./Album";
import { PlayerContext } from "./Dashboard";
import { AuthContext } from "../App";
import { match } from "react-router-dom";

interface PlaylistProps {
  match: match<{ playlistId: string }>;
}
const Playlist = (props: PlaylistProps) => {
  const [playlist, setPlaylist] = useState<IPlaylist | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const auth = useContext(AuthContext);
  const player = useContext(PlayerContext);

  useEffect(() => {
    const id = props.match.params.playlistId;

    setIsLoading(true);
    Axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => {
        setIsLoading(false);
        setPlaylist(res.data);
      })
      .catch(error => {
        console.log(error);
        auth.setTokenStatus("invalid");
        setError(true);
      });
  }, [props.match.params.playlistId, auth]);

  const handleDoubleClick = (track: PlayableTrack) => {
    player.playTrack(track);
  };

  const playableTracks =
    playlist &&
    playlist.tracks.items
      .filter(item => {
        return item.track.preview_url !== null;
      })
      .map(item => {
        return item.track;
      });

  useEffect(() => {
    if (playableTracks) {
      player.setPlayableTracks(playableTracks);
    }
  }, [playlist]);

  return (
    <>
      {isLoading ? (
        <PlaylistContainer>Loading...</PlaylistContainer>
      ) : error ? (
        <div>Something went wrong try again!</div>
      ) : (
        <>
          {playlist && (
            <PlaylistContainer>
              <PlaylistInfo>
                <img
                  height="300px"
                  width="300px"
                  src={playlist.images[0].url}
                  alt={playlist.name}
                />
                <h3>{playlist.name}</h3>
                <p>{playlist.description}</p>

                <p>{playlist.tracks.total} Songs</p>

                {playableTracks &&
                  playableTracks.length > 0 &&
                  (player.isPlaying &&
                  player.currentAlbum.id === playlist.id ? (
                    <Button
                      onClick={() => player.setIsPlaying(false)}
                      size={SIZE.compact}
                      shape={SHAPE.pill}
                    >
                      Pause
                    </Button>
                  ) : (
                    <Button
                      onClick={() => player.addToPlayQueue(playableTracks)}
                      size={SIZE.compact}
                      shape={SHAPE.pill}
                    >
                      Play
                    </Button>
                  ))}
              </PlaylistInfo>
              <div>
                <Ul>
                  {playlist &&
                    playlist.tracks.items.map(item => {
                      return (
                        <Track
                          key={item.track.id}
                          id={item.track.id}
                          name={item.track.name}
                          artists={item.track.artists}
                          preview_url={item.track.preview_url}
                          duration_ms={item.track.duration_ms}
                          onDoubleClick={() => handleDoubleClick(item.track)}
                        />
                      );
                    })}
                </Ul>
              </div>
            </PlaylistContainer>
          )}
        </>
      )}
    </>
  );
};

export default Playlist;
