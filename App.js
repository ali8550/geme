import React, { useState } from "react";
import Navbar from "./components/Navbar";
import GameRoom from "./components/GameRoom";
import RoomList from "./components/RoomList";

function App() {
    const [isMicOn, setMicOn] = useState(true);
    const [currentRoom, setCurrentRoom] = useState(null);

    const toggleMic = () => {
        setMicOn(!isMicOn);
    };

    const joinRoom = (room) => {
        setCurrentRoom(room);
    };

    return (
        <div className="App">
            <Navbar />
            {!currentRoom ? (
                <RoomList joinRoom={joinRoom} />
            ) : (
                <GameRoom room={currentRoom} isMicOn={isMicOn} toggleMic={toggleMic} />
            )}
        </div>
    );
}

export default App;