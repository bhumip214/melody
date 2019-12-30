import React, { useState, useEffect } from "react";
import Track from "./Track";
import { IAlbum, ITracks } from "./api";
import Axios from "axios";
import { styled } from "baseui";

const AlbumContainer = styled("div", {
  display: "flex",
  margin: "120px"
});

const AlbumInfo = styled("div", {
  marginRight: "120px",
  marginTop: "15px",
  textAlign: "center"
});

const Ul = styled("ul", {
  width: "800px"
});

interface AlbumProps {
  match: any;
}
const Album = (props: AlbumProps) => {
  const [album, setAlbum] = useState<IAlbum | null>(null);
  const [tracks, setTracks] = useState<ITracks | null>(null);

  useEffect(() => {
    const id = props.match.params.id;
    Axios.get(`https://api.spotify.com/v1/albums/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => {
      setAlbum(res.data);
      setTracks(res.data.tracks);
    });
  }, [props.match.params.id]);

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
          </AlbumInfo>
          <div>
            <Ul>
              {tracks &&
                tracks.items.map(track => {
                  return <Track key={track.id} track={track} />;
                })}
            </Ul>
            <span>{album.copyrights[0].text}</span>
          </div>
        </AlbumContainer>
      )}
    </>
  );
};

export default Album;