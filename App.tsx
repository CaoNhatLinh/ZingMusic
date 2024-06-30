
import React,{useEffect,useRef,useState} from 'react';
import { Button, Alert } from 'react-native';
import userSevices from './src/services/UserService';
import { Container } from 'inversify';
import container from './src/dependencies/dependencies';
import { PostClient } from './src/networking/PostClient';

function App(): React.JSX.Element {
 const userSevices = container.get<userSevices>('userSevices');
 const postClient = container.get<PostClient>('PostClient');
  return (
      <>
      <Button title="Click me" onPress={()=>{
       postClient.fetchPost().then(posts=>{
        posts.forEach(post=>{
          console.log(post.id);
        })
        })
      }}
      />
      </>
  );
}

export default App;
