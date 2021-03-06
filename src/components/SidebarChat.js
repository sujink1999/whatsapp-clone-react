import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './SidebarChat.css'
import db from '../firebase/firebase'
import { Link } from 'react-router-dom'

function SidebarChat({ name, id, addNewChat, active, setActive }) {

    const [seed, setSeed] = useState(0)


    const [messages, setMessages] = useState("");

    useEffect(() => {
        if (id) {
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map((doc) => doc.data()))
            })
        }
    }, [id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    const createChat = () => {
        console.log(seed);
        const roomName = prompt("Enter a name for the chat");

        if (roomName) {
            db.collection('rooms').add({
                name: roomName
            })
        }
    }

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className={`sidebarChat ${active ? "active" : ""}`} onClick={() => setActive(id)}>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className={`sidebarChat__info `}>
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>

            </div>
            <div className="sidebarChat__separator"></div>
        </Link>
    ) : (
        <div onClick={createChat} className="addNewChat">
            <h3>Add Room</h3>
        </div>
    );
}

export default SidebarChat;