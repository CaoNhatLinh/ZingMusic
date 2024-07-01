import { createContext, ReactNode, useContext, useEffect,useReducer } from "react";
import { Button, Text, View } from "react-native";


interface UserContextType {
  Username: string;
  hanlderChange: () => void;
  handlerStart: () => void;
  handlerStop: () => void;
  count: number;
}


const SRART = 'Start';
const STOP = 'Stop';
const reducer = (state: number, action: string) => {
  console.log(action);
  switch (action) {
    case SRART:
      return state + 1;
    case STOP:
      return state - 1; 
    default:
      return state;
  }
}
export const UserContext = createContext<UserContextType>({} as UserContextType);

export const ProfileComponent = () => {
  
  return (
    <HeaderComponent/>
  );
}

const HeaderComponent = () => {
  return (
      <AvatarComponent />
  );
}
const AvatarComponent = () => {
  
const initialState = 0;
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <View>
      <Button title="Start" onPress={()=>dispatch(SRART)} />
      <Button title="Stop" onPress={()=>dispatch(STOP)} />
      <Text>{state}</Text>
    </View>
  );
} 