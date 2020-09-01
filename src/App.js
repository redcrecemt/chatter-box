import React, { useState,useEffect } from "react";
import {
  FormControl,
  Input,
  IconButton
} from "@material-ui/core";
import Message from "./Message"
import  "./App.css";
import db from "./firebase";
import firebase from "firebase"
import FlipMove from "react-flip-move"
import SendIcon from '@material-ui/icons/Send';

function App() {
  const [input, setInput] = useState("");

  const [messages, setMessage] = useState([]);

  const [userName,setUserName]=useState([]);



  useEffect(()=>{
    setUserName(prompt("Enter your user"))
  },[]);

useEffect(()=>{

   db.collection('message').orderBy('timestamp','asc').onSnapshot(snapshot=>{
    setMessage(snapshot.docs.map(
        doc=>({ id:doc.id, message: doc.data()})
      ));
  });

},[]);



  const sendMessage = (event) => {
    event.preventDefault();
    db.collection('message').add({
      username:userName,
       message: input,
       timestamp:firebase.firestore.FieldValue.serverTimestamp()
      

    });
    setInput("");
    // const Id=lastId+1;
    // setLastId(Id);
    // console.log(Id);
    // setMessage([...messages, { id:Id,  username:userName, message: input }]);
    // setInput("");
  };

  return (
    <div className="App">
      <h2>The Chatter Box</h2>
      <h2>Welcome {userName}</h2>

      <form onSubmit={sendMessage} className="app__form" >
      <FormControl className="app__formControl" >
        <Input
        placeholder="Enter a message"
          variant="contained"
          type="text"
          value={input}
          className="app__input"
          onChange={(event) => setInput(event.target.value)}
        />
        <IconButton color="primary" aria-label="Send Message" 
          disabled={!input}
          className="app__iconButton"
          onClick={sendMessage}  >
  <SendIcon />
</IconButton>

        </FormControl>

        </form>

        <FlipMove>
        {

         
          messages.map(({id,message})  => (
           
          <Message name={userName} message={message} key={id} />

          ))
        }
      </FlipMove>
    </div>
  );
}

export default App;
