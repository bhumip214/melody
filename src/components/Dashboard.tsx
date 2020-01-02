import React, { useState, useEffect, useRef } from "react";
import SideNavBar from "./SideNavBar";
import Profile from "./Profile";
import Album from "./Album";
import Playlist from "./Playlist";
import Category from "./Category";
import Player from "./Player";
import NewReleases from "./NewReleases";
import Categories from "./Categories";
import FeaturedList from "./FeaturedList";
import { Route, Switch } from "react-router-dom";
import { styled } from "baseui";
import { IAlbum, AlbumItem, PlaylistTrack } from "./api";

const MainContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  height: "100vh"
});

const TopContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  overflow: "hidden",
  height: "100%"
});

const SideNavBarContainer = styled("div", {
  overflow: "scroll",
  width: "240px",
  borderRight: "1px solid grey"
});

const RightContainer = styled("div", {
  marginleft: "255px",
  overflow: "scroll",
  width: "100%"
});

interface IPlayerContext {
  isPlaying: boolean;
  setIsPlaying: Function;
  currentTrack: AlbumItem;
  playTrack: Function;
  currentAlbum: IAlbum;
  playQueue: AlbumItem[] | PlaylistTrack[];
  addToPlayQueue: Function;
}

export const PlayerContext = React.createContext<IPlayerContext>(
  {} as IPlayerContext
);

const Dashboard = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [currentAlbum, setcurrentAlbum] = useState<any>(null);
  const [playQueue, setplayQueue] = useState<AlbumItem[] | PlaylistTrack[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }
    audioRef.current.addEventListener("timeupdate", event => {
      const { currentTime, duration } = audioRef.current as HTMLAudioElement;

      if (currentTime && duration) {
        setProgress((currentTime / duration) * 100);
        setDuration(duration);
      }
    });

    audioRef.current.addEventListener("ended", event => {
      setIsPlaying(false);
    });
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (currentTrack) {
        audioRef.current.src = currentTrack.preview_url;
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  const playTrack = (track: AlbumItem | PlaylistTrack, album: IAlbum) => {
    if (currentTrack && currentTrack.id === track.id) {
      setIsPlaying(!isPlaying);
      setcurrentAlbum(album);
    } else {
      setIsPlaying(true);
      setCurrentTrack(track);
      setcurrentAlbum(album);
    }
  };

  const addToPlayQueue = (
    tracks: AlbumItem[] | PlaylistTrack[],
    album: IAlbum
  ) => {
    setplayQueue(tracks);
    playTrack(tracks[0], album);
  };

  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        currentTrack,
        playTrack,
        currentAlbum,
        playQueue,
        addToPlayQueue
      }}
    >
      <MainContainer>
        <TopContainer>
          <SideNavBarContainer>
            <SideNavBar />
          </SideNavBarContainer>

          <RightContainer>
            <Profile />
            <Switch>
              <Route path="/playlists/:playlistId" component={Playlist} />
              <Route path="/albums/:albumId" component={Album} />

              <Route path="/categories/:categoryId" component={Category} />

              <Route path="/new-releases" component={NewReleases} />
              <Route path="/featured-list" component={FeaturedList} />
              <Route path="/categories" component={Categories} />
            </Switch>
          </RightContainer>
        </TopContainer>
        <Player progress={progress} duration={duration} />

        <audio ref={audioRef}>
          <source />
        </audio>
      </MainContainer>
    </PlayerContext.Provider>
  );
};

export default Dashboard;
