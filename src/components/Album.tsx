import React, { useState, useEffect, useContext } from "react";
import Track from "./Track";
import { IAlbum, AlbumItem } from "./api";
import Axios from "axios";
import { styled } from "baseui";
import { Button, SIZE, SHAPE } from "baseui/button";
import { PlayerContext } from "./Dashboard";
import { formatter } from "../helpers/utilis";
import { AuthContext } from "../App";
import { match } from "react-router-dom";

export const AlbumContainer = styled("div", {
  display: "flex",
  margin: "10px 120px"
});

export const AlbumInfo = styled("div", {
  marginRight: "120px",
  marginTop: "15px",
  textAlign: "center"
});

export const Ul = styled("ul", {
  width: "800px",
  marginBottom: "40px"
});

interface AlbumProps {
  match: match<{ albumId: string }>;
}

const Album = (props: AlbumProps) => {
  const [album, setAlbum] = useState<IAlbum | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const auth = useContext(AuthContext);
  const player = useContext(PlayerContext);

  useEffect(() => {
    const id = props.match.params.albumId;

    setIsLoading(true);
    Axios.get(`https://api.spotify.com/v1/albums/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => {
        setIsLoading(false);
        setAlbum(res.data);
      })
      .catch(error => {
        console.log(error);
        auth.setTokenStatus("invalid");
        setError(true);
      });
  }, [props.match.params.albumId, auth]);

  let artists;
  if (album) {
    artists = album.artists.map(artist => {
      return artist.name;
    });
  }

  const handleDoubleClick = (track: AlbumItem, album: IAlbum) => {
    player.playTrack({ ...track, album });
  };

  const playableTracks =
    album &&
    album.tracks.items
      .filter(item => {
        return item.preview_url !== null;
      })
      .map(track => {
        const newTrack = { ...track, album: album };
        return newTrack;
      });

  useEffect(() => {
    if (playableTracks) {
      player.setPlayableTracks(playableTracks);
    }
  }, [album]);

  return (
    <>
      {isLoading ? (
        <AlbumContainer>Loading...</AlbumContainer>
      ) : error ? (
        <div>Something went wrong try again!</div>
      ) : (
        <>
          {album && (
            <AlbumContainer>
              <AlbumInfo>
                <img src={album.images[1].url} alt={album.name} />
                <h3>{album.name}</h3>
                <p>{formatter.format(artists)}</p>
                <p>
                  {album.total_tracks} Tracks ·{" "}
                  {new Date(album.release_date).getFullYear()}
                </p>

                {playableTracks &&
                  playableTracks.length > 0 &&
                  (player.isPlaying && player.currentAlbum.id === album.id ? (
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
              </AlbumInfo>
              <div>
                <Ul>
                  {album.tracks &&
                    album.tracks.items.map(track => {
                      return (
                        <Track
                          key={track.id}
                          id={track.id}
                          name={track.name}
                          artists={track.artists}
                          preview_url={track.preview_url}
                          duration_ms={track.duration_ms}
                          onDoubleClick={() => handleDoubleClick(track, album)}
                        />
                      );
                    })}
                </Ul>
                <span style={{ padding: "20px" }}>
                  {album.copyrights[0].text}
                </span>
              </div>
            </AlbumContainer>
          )}
        </>
      )}
    </>
  );
};

export default Album;
