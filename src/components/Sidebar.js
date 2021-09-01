import React, { useState, useEffect } from 'react';
import "./Sidebar.css"
import { useParams } from 'react-router';
import { Avatar, IconButton } from '@material-ui/core'
import DonutlargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { SearchOutlined } from '@material-ui/icons'
import SidebarChat from './SidebarChat';

import db from '../firebase/firebase'
import { useStateValue } from '../providers/StateProvider';
import { deepPurple } from '@material-ui/core/colors';


function Sidebar(props) {

    const [rooms, setRooms] = useState([]);
    const [activeRoomId, setActiveRoomId] = useState(null)
    const [{ user }, dispatch] = useStateValue();
    let roomId;

    useEffect(() => {
        db.collection('rooms').onSnapshot((snapshot) => {
            setRooms(
                snapshot.docs.map((doc) => (
                    {
                        id: doc.id,
                        data: doc.data(),
                    }))
            )
        })

    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutlargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Type something here">
                    </input>
                </div>
            </div>

            <div className="sidebar__chats">
                {rooms.map((room) =>
                    <SidebarChat key={room.id} id={room.id} setActive={(id) => setActiveRoomId(id)} active={room.id.toString() === activeRoomId} name={room.data.name} />
                )}
                <SidebarChat addNewChat />
            </div>
        </div>
    );
}

export default Sidebar;