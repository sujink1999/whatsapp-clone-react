import React, { useState, useEffect } from 'react';
import './Chat.css'

import { Avatar, IconButton } from '@material-ui/core'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router';
import db from '../firebase/firebase'
import { useStateValue } from '../providers/StateProvider';
import firebase from 'firebase'

function Chat(props) {

    const [seed, setSeed] = useState("")
    const [input, setInput] = useState("")
    const { roomId } = useParams()
    const [roomName, setRoomName] = useState("")
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot((snapshot) => {
                setRoomName(snapshot.data().name)
            })

            db.collection('rooms').doc(roomId).collection("messages").orderBy("timestamp", "asc").onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()))
            });
        }

    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("");
    }

    const renderLastActive = (date) => {
        if (!date) return
        return <p>Last active {" "}
            {new Date(
                date
            ).toUTCString()}</p>
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    {renderLastActive(messages[messages.length - 1]?.timestamp?.toDate())}
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    {/* <IconButton>
                        <AttachFile />
                    </IconButton> */}
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map(message => (
                    <p className={`chat__message ${message.name === user.displayName && 'chat__receiver'}`} key={message.timestamp}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toLocaleTimeString()}</span>
                    </p>
                ))}
            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message"></input>
                    <button type="submit" onClick={sendMessage}>Send Message</button>
                </form>
                <MicIcon />

            </div>
        </div>
    );
}

export default Chat;