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
import { Route, Switch, Redirect } from "react-router-dom";
import { styled } from "baseui";
import { IAlbum, AlbumItem, PlayableTrack } from "./api";

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
  currentTrack: AlbumItem;
  currentAlbum: IAlbum;
  playQueue: PlayableTrack[];
  playableTracks: PlayableTrack[];
  setIsPlaying(isPlaying: boolean): void;
  setPlayableTracks(playableTracks: PlayableTrack[]): void;
  playTrack(track: PlayableTrack, album: IAlbum): void;
  addToPlayQueue(tracks: PlayableTrack[]): void;
  playNext(): void;
  playPrevious(): void;
}

export const PlayerContext = React.createContext<IPlayerContext>(
  {} as IPlayerContext
);

const Dashboard = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [currentAlbum, setcurrentAlbum] = useState<any>(null);
  const [playQueue, setplayQueue] = useState<PlayableTrack[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playableTracks, setPlayableTracks] = useState<PlayableTrack[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playTrack = (track: PlayableTrack, album: IAlbum) => {
    if (currentTrack && currentTrack.id === track.id) {
      setIsPlaying(!isPlaying);
      setcurrentAlbum(album);
    } else {
      setIsPlaying(true);
      setCurrentTrack(track);
      setcurrentAlbum(album);
    }
  };

  const addToPlayQueue = (tracks: PlayableTrack[]) => {
    setplayQueue(tracks);
    setCurrentIndex(0);
  };

  const playNext = () => {
    if (playQueue.length - 1 === currentIndex) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currIndex => {
        return currIndex + 1;
      });
    }
  };

  const playPrevious = () => {
    if (currentIndex === 0) {
      setCurrentIndex(playQueue.length - 1);
    } else {
      setCurrentIndex(currIndex => {
        return currIndex - 1;
      });
    }
  };

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }
    const handleTimeUpdate = () => {
      const { currentTime, duration } = audioRef.current as HTMLAudioElement;

      if (currentTime && duration) {
        setProgress((currentTime / duration) * 100);
        setDuration(duration);
      }
    };
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);

    const handleTrackEnded = () => {
      if (playQueue.length !== 0) {
        if (playQueue.length - 1 === currentIndex) {
          setCurrentIndex(0);
        } else {
          setCurrentIndex(currIndex => {
            return currIndex + 1;
          });
        }
      } else {
        setIsPlaying(false);
      }
    };

    audioRef.current.addEventListener("ended", handleTrackEnded);

    return () => {
      audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
      audioRef.current?.removeEventListener("ended", handleTrackEnded);
    };
  }, [playQueue, currentTrack]);

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

  useEffect(() => {
    if (playQueue.length !== 0 && currentIndex !== -1) {
      playTrack(playQueue[currentIndex], playQueue[currentIndex].album);
    }
  }, [currentIndex, playQueue]);

  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        currentTrack,
        currentAlbum,
        playQueue,
        playableTracks,
        setIsPlaying,
        setPlayableTracks,
        playTrack,
        addToPlayQueue,
        playNext,
        playPrevious
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
              <Route path="/albums/:albumId" component={Album} />
              <Route path="/playlists/:playlistId" component={Playlist} />
              <Route path="/categories/:categoryId" component={Category} />
              <Route path="/new-releases" component={NewReleases} />
              <Route path="/featured-list" component={FeaturedList} />
              <Route path="/categories" component={Categories} />
              <Redirect to="/new-releases" />
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
