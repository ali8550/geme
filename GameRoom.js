import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function GameRoom({ room, isMicOn, toggleMic }) {
    const [role, setRole] = useState("لاعب");
    const [rulesVisible, setRulesVisible] = useState(false);

    useEffect(() => {
        socket.emit("joinRoom", room);

        socket.on("micStatus", (status) => {
            console.log("الميكروفون", status ? "مفتوح" : "مغلق");
        });

        return () => {
            socket.off("micStatus");
        };
    }, [room]);

    const handleMicToggle = () => {
        toggleMic();
        socket.emit("toggleMic", !isMicOn);
    };

    const switchRole = () => {
        setRole(role === "قائد" ? "لاعب" : "قائد");
    };

    const toggleRules = () => {
        setRulesVisible(!rulesVisible);
    };

    return (
        <div className="game-room">
            <h2>الغرفة: {room}</h2>
            <h3>الدور الحالي: {role}</h3>
            <button onClick={switchRole}>{role === "قائد" ? "تحول إلى لاعب" : "تحول إلى قائد"}</button>
            <button onClick={toggleRules}>{rulesVisible ? "إخفاء القواعد" : "عرض القواعد"}</button>
            {rulesVisible && (
                <div className="rules">
                    <h4>قواعد اللعبة:</h4>
                    <p>يجب على القائد إعطاء كلمة مفتاح لفرقته لتخمين الكلمات الصحيحة.</p>
                    <p>الفريق الذي يخمن كل الكلمات أولاً يفوز.</p>
                </div>
            )}
            <button onClick={handleMicToggle}>
                {isMicOn ? "إغلاق الميكروفون" : "فتح الميكروفون"}
            </button>
        </div>
    );
}

export default GameRoom;