import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AudioState {
  isPlay: boolean;
  isMute: boolean;
  songId: string;
  currnetIndexPlaylist: number;
  infoSongPlayer: {
    title: string;
    thumbnail: string;
    thumbnailM: string;
    artistsNames: string;
    artists: Array<object>;
  };
  srcAudio: string;
  currentTime: number;
  duration: number;
  volume: number;
  isLoop: boolean;
  isShuffle:boolean,
  autoPlay: boolean;
  playlistSong: Array<object>;
  isLyric: boolean;
  titlePlayList: string;
  isShowAudioBox: boolean;
}

const initialState: AudioState = {
  isPlay: false,
  isMute: false,
  songId: "",
  currnetIndexPlaylist: 0,
  infoSongPlayer: {
    title: "",
    thumbnail: "",
    thumbnailM: "",
    artistsNames: "",
    artists: [],
  },
  srcAudio: "",
  currentTime: 0,
  duration: 0,
  volume: 0.5,
  isLoop: false,
  isShuffle: false,
  autoPlay: false,
  playlistSong: [],
  isLyric: false,
  titlePlayList: "",
  isShowAudioBox: true,
};

const audioSlice = createSlice({
  
  name: "audio",
  initialState,
  reducers: {
    changeIconPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    changeIconVolume: (state, action: PayloadAction<boolean>) => {
      state.isMute = action.payload;
    },
    setSongId: (state, action: PayloadAction<string>) => {
      
      state.songId = action.payload;
     
    },
    setInfoSongPlayer: (state, action: PayloadAction<object>) => {
      state.infoSongPlayer = {
        ...state.infoSongPlayer,
        ...action.payload,
      };
    },
    setSrcAudio: (state, action: PayloadAction<string>) => {
      state.srcAudio = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    setLoop: (state, action: PayloadAction<boolean>) => {
      state.isLoop = action.payload;
    },
    setShuffle: (state, action: PayloadAction<boolean>) => {
      state.isShuffle = action.payload;
    },
    setAutoPlay: (state, action: PayloadAction<boolean>) => {
      state.autoPlay = action.payload;
    },
    setPlaylistSong: (state, action: PayloadAction<Array<object>>) => {
      state.playlistSong = action.payload;
    },
    setCurrnetIndexPlaylist: (state, action: PayloadAction<number>) => {
      state.currnetIndexPlaylist = action.payload;
     
    },
    setOpenLyric: (state, action: PayloadAction<boolean>) => {
      state.isLyric = action.payload;
    },
    
    SetTitlePlayList: (state, action: PayloadAction<string>) => {
      state.titlePlayList = action.payload;
    },
    setShowAudioBox: (state, action: PayloadAction<boolean>) => {
      state.isShowAudioBox = action.payload;
    },
  },
});

export const {
  changeIconPlay,
  changeIconVolume,
  setSongId,
  setInfoSongPlayer,
  setCurrentTime,
  setDuration,
  setVolume,
  setLoop,
  setShuffle,
  setSrcAudio,
  setAutoPlay,
  setPlaylistSong,
  setCurrnetIndexPlaylist,
  setOpenLyric,
  SetTitlePlayList,
  setShowAudioBox,
} = audioSlice.actions;
export default audioSlice.reducer;
