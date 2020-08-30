import React, { useState,useEffect } from "react";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
} from "@material-ui/core";
import Message from "./Message"
import style from "./App.css";

function App() {
  const [input, setInput] = useState("");

  const [message, setMessage] = useState([{id:1,name:'Shafaq',text:'Hi'}]);

  const [userName,setUserName]=useState([]);

  const [lastId,setLastId]=useState(1);

  // console.log(input); console.log(message);



useEffect(()=>{
  setUserName(prompt("Enter your user"))
},[]);

  const sendMessage = (event) => {
    event.preventDefault();
    
    
    const Id=lastId+1;
    setLastId(Id);
    console.log(Id);
    setMessage([...message, { id:Id,  name:userName, text: input }]);
    setInput("");
  };

  return (
    <div className="App">
      <h2>The Chatter Box</h2>
      <h2>Welcome {userName}</h2>
      <FormControl  >
        <InputLabel>Enter a Message...</InputLabel>
        <Input
          variant="outlined"
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <Button
          disabled={!input}
          onClick={sendMessage}
          variant="contained"
          color="primary"
        >
          Send Message
        </Button>
        </FormControl>
        {message.map((m) => (
       <Message name={userName} userMessage={m} key={m.id} />
        ))}

    </div>
  );
}

export default App;
