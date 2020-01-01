import React, { useState, useEffect } from "react";
import Track from "./Track";
import { IPlaylist } from "./api";
import Axios from "axios";
import Profile from "./Profile";
import {
  AlbumContainer as PlaylistContainer,
  AlbumInfo as PlaylistInfo,
  Ul
} from "./Album";

interface PlaylistProps {
  match: any;
}
const Playlist = (props: PlaylistProps) => {
  const [playlist, setPlaylist] = useState<IPlaylist | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

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
        setError(true);
      });
  }, [props.match.params.playlistId]);

  return (
    <>
      <Profile />
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
              </PlaylistInfo>
              <div>
                <Ul>
                  {playlist.tracks &&
                    playlist.tracks.items.map(item => {
                      return (
                        <Track
                          key={item.track.id}
                          name={item.track.name}
                          artists={item.track.artists}
                          preview_url={item.track.preview_url}
                          duration_ms={item.track.duration_ms}
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
