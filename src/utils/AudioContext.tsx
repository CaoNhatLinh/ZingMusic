import React, { createContext, useContext, useRef, useState, ReactNode, FC } from 'react';
import Sound from 'react-native-sound';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { changeIconPlay, setCurrentTime, setCurrnetIndexPlaylist, setDuration, setSongId } from '../redux/features/audioSlice';

interface AudioContextType {
  audioRef: React.MutableRefObject<Sound | null>;
  intervalRef: React.MutableRefObject<NodeJS.Timeout | null>;
  status: AudioStatusType;
  errorMessage: string;
  initializeAudio: (url: string) => void;
  playAudio: (isLoop: boolean) => void;
  pauseAudio: () => void;
  stopAudio: () => void;
  nextSong:(playlistSong:any,currnetIndexPlaylist:number) => void;
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

export const AudioProvider: FC<AudioProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<AudioStatusType >('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const audioRef = useRef<Sound | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const initializeAudio = (url: string) => {
    if (audioRef.current) {
      stopAudio();
    }
    const sound = new Sound(url, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        setStatus('error');
        setErrorMessage(error.message);
      } else {
        setStatus('success');
        setErrorMessage('');
        dispatch(setCurrentTime(0));
        dispatch(setDuration(sound.getDuration()));
        audioRef.current = sound;
        sound.setVolume(1);
        playAudio(false);
      }
    });
  };
  const nextSong = ({playlistSong,currnetIndexPlaylist}: { playlistSong: any, currnetIndexPlaylist: number }) => {
    console.log(playlistSong)
    console.log(currnetIndexPlaylist)
    if (playlistSong !== undefined && playlistSong.length > 0) {
      let currentIndex;
      
      console.log(currnetIndexPlaylist)
      if (currnetIndexPlaylist === playlistSong.length - 1) {
        currentIndex = 0;
      } else {
        console.log(currnetIndexPlaylist)
        currentIndex = currnetIndexPlaylist + 1;
        dispatch(setCurrnetIndexPlaylist(currentIndex));
        console.log("setCurrnetIndexPlaylist")
        dispatch(setSongId(playlistSong[currentIndex].encodeId));
        console.log("setSongId")
        dispatch(changeIconPlay(true));
        console.log("changeIconPlay")
      }
     
    }
  };
  const playAudio = (isLoop:boolean) => {
    const loop = isLoop ? -1 : 0;
    audioRef.current?.setNumberOfLoops(loop).play((success) => {
      if (success) {
        stopAudio();
        setStatus('loading');
      } else {
        setStatus('error');
        setErrorMessage('Error playing audio');
      }
    });
    setStatus('play');
    
    intervalRef.current = setInterval(() => {
      if (audioRef.current) {
        audioRef.current.getCurrentTime((seconds) => {
          dispatch(setCurrentTime(seconds));
        });
      }
    }, 1000);
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
      nextSong
    }}
    >
      {children}
    </AudioContext.Provider>
  );
};
