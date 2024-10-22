import React, { createContext, useContext, useRef, useState, ReactNode, FC, useCallback } from 'react';
import Sound from 'react-native-sound';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { changeIconPlay, setCurrentTime, setCurrnetIndexPlaylist, setDuration, setInfoSongPlayer, setLoop, setSongId, setSrcAudio } from '../redux/features/audioSlice';
import { getSong, getInfoSong } from "../api/song"
interface AudioContextType {
  audioRef: React.MutableRefObject<Sound | null>;
  intervalRef: React.MutableRefObject<NodeJS.Timeout | null>;
  status: AudioStatusType;
  errorMessage: string;
  initializeAudio: (url: string) => void;
  playAudio: () => void;
  pauseAudio: () => void;
  stopAudio: () => void;
  handleRepeat: () => void;
  nextSong: (playlistSong: any, currnetIndexPlaylist: number) => void;
  previousSong: (playlistSong: any, currnetIndexPlaylist: number) => void;
}

type AudioStatusType = 'loading' | 'success' | 'error' | 'play' | 'pause' | 'stop';

const AudioContext = createContext<AudioContextType | null>(null);
export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
interface AudioProviderProps {
  children: ReactNode;
}
interface songType {
  [key: number]: string
  title: string
  infoSong: string
  thumbnail: string
  thumbnailM: string
  artistsNames: string
  artists: []
}
const getRandomIndex = (max: number) => {
  return Math.floor(Math.random() * max);
};
export const AudioProvider: FC<AudioProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<AudioStatusType>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const audioRef = useRef<Sound | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const playlistSong = useAppSelector((state) => state.audio.playlistSong);
  const currnetIndexPlaylist = useAppSelector((state) => state.audio.currnetIndexPlaylist);
  const isLoop = useAppSelector((state) => state.audio.isLoop);
  const isShuffle = useAppSelector((state) => state.audio.isShuffle);
  const initializeAudio = (songID: string) => {
    if (audioRef.current) {
      stopAudio();
    }
    (async () => {
      const [url, infoSong] = await Promise.all([getSong(songID), getInfoSong(songID)]);
      url[128] ? dispatch(setSrcAudio(url[128])) : dispatch(setSrcAudio(""))
      dispatch(setInfoSongPlayer(
        {
          title: infoSong.title,
          thumbnail: infoSong.thumbnail,
          thumbnailM: infoSong.thumbnailM,
          artistsNames: infoSong.artistsNames,
          artists: infoSong.artists,
        }
      ))

      dispatch(setSongId(songID))
      const sound = new Sound(url[128], Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          setErrorMessage(error.message);
          setStatus('error');
        } else {

          setErrorMessage('');
          dispatch(setCurrentTime(0));
          dispatch(setDuration(sound.getDuration()));
          sound.setVolume(1);
          audioRef.current = sound;
          setStatus('success');
          playAudio()
        }
      });
    })();
  };



  const nextSong = (playlistSong: any, currnetIndexPlaylist: number) => {
    if (playlistSong !== undefined && playlistSong.length > 0) {
      let currentIndex;
      if (currnetIndexPlaylist === playlistSong.length - 1) {
        currentIndex = 0;
      } else {
        if (isShuffle) {
          currentIndex = getRandomIndex(playlistSong.length);
        } else {
          currentIndex = (currnetIndexPlaylist + 1) % playlistSong.length;
        }
        dispatch(setCurrnetIndexPlaylist(currentIndex));
        initializeAudio(playlistSong[currentIndex].encodeId);
      }
    }
  };
  const previousSong = (playlistSong: any, currnetIndexPlaylist: number) => {
    if (playlistSong !== undefined && playlistSong.length > 0) {
      let currentIndex;
      if (currnetIndexPlaylist === playlistSong.length - 1) {
        currentIndex = 0;
      } else {
        currentIndex = (currnetIndexPlaylist - 1) % playlistSong.length;
        dispatch(setCurrnetIndexPlaylist(currentIndex));
        dispatch(setSongId(playlistSong[currentIndex].encodeId));


      }
    }
  };
  const playAudio = () => {
    dispatch(changeIconPlay(true));
    audioRef.current?.play((success) => {
      if (success) {
        nextSong(playlistSong, currnetIndexPlaylist);
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
    intervalRef.current = setInterval(() => {
      if (audioRef.current) {
        audioRef.current.getCurrentTime((seconds) => {
          return dispatch(setCurrentTime(parseFloat(seconds.toFixed(3))));
        });
      }
    }, 1000);
    setStatus('play');
  };

  const pauseAudio = () => {
    audioRef.current?.pause();
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setStatus('pause');
  };

  const stopAudio = () => {
    audioRef.current?.stop();
    audioRef.current?.release();
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setStatus('stop');
  };

  const handleRepeat = () => {
    dispatch(setLoop(!isLoop));
    audioRef.current?.setNumberOfLoops(!isLoop ? -1 : 0);
  };


  return (
    <AudioContext.Provider value={{
      audioRef,
      intervalRef,
      status,
      errorMessage,
      initializeAudio,
      playAudio,
      pauseAudio,
      stopAudio,
      nextSong,
      previousSong,
      handleRepeat,
    }}
    >
      {children}
    </AudioContext.Provider>
  );
};
