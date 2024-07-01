
import React,{useEffect,useRef,useState} from 'react';
import { Button, Alert } from 'react-native';
import userSevices from './src/services/UserService';
import { Container } from 'inversify';
import container from './src/dependencies/dependencies';
import { PostClient } from './src/networking/PostClient';
import { ProfileComponent } from './src/presentation/compoments/UseContentExample';

function App(): React.JSX.Element {
  const userSevices = container.get<userSevices>('userSevices');
  const postClient = container.get<PostClient>('PostClient');
  return (
    <>
     <ProfileComponent />
    </>
  );
}

export default App;
