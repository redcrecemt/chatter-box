import React, { useState,useEffect,useRef } from "react";
import {
  FormControl,
  Input,
  IconButton,
  Card,
  CardActions,
  FormLabel,
  Paper,
Grid,
  TextField,
  AppBar,
  Toolbar,
  Button,
  Typography,
  CardContent,
  CardHeader,
  
} from "@material-ui/core";
import Message from "./Message"
import  "./App.css";
import db from "./firebase";
import firebase from "firebase"
import FlipMove from "react-flip-move"
import SendIcon  from '@material-ui/icons/Send';
import MenuIcon from '@material-ui/icons/Menu';

function App() {
  const [input, setInput] = useState("");

  const [messages, setMessage] = useState([]);

  const [userName,setUserName]=useState([]);

  const[islogin,setLogin]=useState(false);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // useEffect(()=>{
  //   setUserName(prompt("Enter your user"))
  // },[]);

useEffect(()=>{

  
   db.collection('message').orderBy('timestamp','asc').onSnapshot(snapshot=>{
    setMessage(snapshot.docs.map(
        doc=>({ id:doc.id, message: doc.data()})
      ));
  });

},[]);


useEffect(scrollToBottom, [messages]);


  const sendMessage = (event) => {
    event.preventDefault();
    db.collection('message').add({
      username:userName,
       message: input,
       timestamp:firebase.firestore.FieldValue.serverTimestamp()
      

    });
    setInput("");
  };

  return (





    <div className="App">


<div  className={'login ' + (islogin && 'card__hidden')} >
<Grid container spacing={3}>
        <Grid item xs={4}>
          &nbsp;
        </Grid>

        <Grid item xs={3}>
        <AppBar position="static">
  <Toolbar>
    
    <Typography variant="h6" >
      Login
    </Typography>
    
  </Toolbar>
</AppBar>
<FormControl className="app__form">
  <Grid container spacing={1} >
  <Grid item xs={9}>
  <Input 
  placeholder="Enter name"
          variant="contained"
          type="text"
          value={userName}
          className="input__form"
          onChange={(event)=>{ setUserName(event.target.value);}}
        />
  </Grid>
  <Grid item xs={3}>
  <IconButton color="primary" aria-label="Send Message" 
          disabled={!userName}
          className="app__iconButton"
          onClick={event=>setLogin(true)} autoFocus  >
  <SendIcon />
  </IconButton>
  </Grid>
  </Grid>
  </FormControl>
        </Grid>
        </Grid>
</div>


    <Card className={ !islogin && 'card__hidden'} > 
      <h2>The Chatter Box</h2>
      <h2>Welcome {userName}</h2>

      
        <FlipMove>
        {

         
          messages.map(({id,message})  => (
           
          <Message name={userName} message={message} key={id} />

          ))
        }
      </FlipMove>


      <CardActions>
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
          onClick={sendMessage} autoFocus  >
  <SendIcon />
</IconButton>

        </FormControl>
        <div ref={messagesEndRef} />
        </form>
      </CardActions>


      </Card>
    </div>
  );
}

export default App;
