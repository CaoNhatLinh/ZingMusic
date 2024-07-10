import React, { createContext, useContext, useRef, useState, ReactNode, FC } from 'react';
import Sound from 'react-native-sound';
import { useAppDispatch } from '../hooks/redux';
import { setCurrentTime, setDuration } from '../redux/features/audioSlice';

interface AudioContextType {
  audioRef: React.MutableRefObject<Sound | null>;
  intervalRef: React.MutableRefObject<NodeJS.Timeout | null>;
  status: AudioStatusType;
  errorMessage: string;
  initializeAudio: (url: string) => void;
  playAudio: () => void;
  pauseAudio: () => void;
  stopAudio: () => void;
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
        dispatch(setDuration(sound.getDuration()));
        audioRef.current = sound;
        playAudio();
      }
    });
  };

  const playAudio = () => {
    audioRef.current?.play((success) => {
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
          console.log('seconds', seconds);
          dispatch(setCurrentTime(seconds));
        });
      }
    }, 1000);
    console.log('play', intervalRef.current);
  };

  const pauseAudio = () => {
    audioRef.current?.pause();
    if (intervalRef.current) {
      console.log(' pause', intervalRef.current);
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
    }}
    >
      {children}
    </AudioContext.Provider>
  );
};
