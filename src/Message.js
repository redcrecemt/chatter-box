import React from 'react'
import{Card,CardContent,Typography}from "@material-ui/core"
import './Message.css'

function Message(props) {
    return (
        

    <Card className="message" >
        <CardContent >
            <Typography color="textSecondary" gutterBottom  >
                {props.userMessage.name}
            </Typography>
            <Typography variant="h5" component="h2"  >
                {props.userMessage.text}
            </Typography>

        </CardContent>
    </Card> 
    )
}

export default Message