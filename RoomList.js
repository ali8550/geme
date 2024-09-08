import React, { useState } from "react";

function RoomList({ joinRoom }) {
    const [rooms, setRooms] = useState([]);
    const [newRoom, setNewRoom] = useState("");

    const handleCreateRoom = () => {
        if (newRoom) {
            setRooms([...rooms, newRoom]);
            setNewRoom("");
        }
    };

    return (
        <div>
            <h2>اختر غرفة للانضمام أو أنشئ غرفة جديدة:</h2>
            <input
                type="text"
                value={newRoom}
                placeholder="أدخل اسم الغرفة"
                onChange={(e) => setNewRoom(e.target.value)}
            />
            <button onClick={handleCreateRoom}>إنشاء غرفة</button>
            <ul>
                {rooms.map((room, index) => (
                    <li key={index}>
                        <button onClick={() => joinRoom(room)}>{room}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RoomList;