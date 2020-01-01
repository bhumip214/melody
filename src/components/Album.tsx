import React, { useState, useEffect } from "react";
import Track from "./Track";
import { IAlbum } from "./api";
import Axios from "axios";
import { styled } from "baseui";
import Profile from "./Profile";

const AlbumContainer = styled("div", {
  display: "flex",
  margin: "10px 120px"
});

const AlbumInfo = styled("div", {
  marginRight: "120px",
  marginTop: "15px",
  textAlign: "center"
});

const Ul = styled("ul", {
  width: "800px",
  marginBottom: "40px"
});

interface AlbumProps {
  match: any;
}
const Album = (props: AlbumProps) => {
  const [album, setAlbum] = useState<IAlbum | null>(null);

  useEffect(() => {
    const id = props.match.params.albumId;
    Axios.get(`https://api.spotify.com/v1/albums/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => {
      setAlbum(res.data);
    });
  }, [props.match.params.albumId]);

  // @ts-ignore
  const formatter = new Intl.ListFormat("en", {
    style: "short",
    type: "conjunction"
  });

  let artists;
  if (album) {
    artists = album.artists.map(artist => {
      return artist.name;
    });
  }

  return (
    <>
      <Profile />
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
            <span>{album.copyrights[0].text}</span>
          </AlbumInfo>
          <div>
            <Ul>
              {album.tracks &&
                album.tracks.items.map(track => {
                  return (
                    <Track
                      key={track.id}
                      name={track.name}
                      artists={track.artists}
                      preview_url={track.preview_url}
                      duration_ms={track.duration_ms}
                    />
                  );
                })}
            </Ul>
          </div>
        </AlbumContainer>
      )}
    </>
  );
};

export default Album;
