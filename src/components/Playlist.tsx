import React, { useState, useEffect } from "react";
import Track from "./Track";
import { IPlaylist } from "./api";
import Axios from "axios";
import { styled } from "baseui";
import Profile from "./Profile";

const PlaylistContainer = styled("div", {
  display: "flex",
  margin: "10px 120px"
});

const PlaylistInfo = styled("div", {
  marginRight: "120px",
  marginTop: "15px",
  textAlign: "center"
});

const Ul = styled("ul", {
  width: "800px"
});

interface PlaylistProps {
  match: any;
}
const Playlist = (props: PlaylistProps) => {
  const [playlist, setPlaylist] = useState<IPlaylist | null>(null);

  useEffect(() => {
    const id = props.match.params.playlistId;

    Axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => {
      setPlaylist(res.data);
    });
  }, [props.match.params.playlistId]);

  return (
    <>
      <Profile />
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
  );
};

export default Playlist;
