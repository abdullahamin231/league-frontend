import React from "react";
import { Link } from "react-router-dom";
const PlayerList = ({ players }) => {
    return (
        <div className="scrollhide py-4 px-8 flex items-center justify-center flex-row flex-wrap  gap-2">
            {players.map((player) => (
                <div
                    className="
                flex flex-col px-2 py-4 rounded-md items-start h-40 w-64 font-poppins bg-white shadow-sm
                transition duration-300 hover:text-background cursor-pointer hover:bg-[#EFEDFF] hover:rounded-md hover:scale-105
                "
                    key={player._id}>
                    <p className="text-2xl">{player.rank} <span className="font-bold ">{player.firstName} {player.lastName}</span></p>
                    <p>{player.squad} {player.position} </p>
                    <p>{player.nation}</p>
                    <Link className="text-secondary" to={"/players/" + player.firstName + "/" + player.lastName}>More Info</Link>
                </div>
            ))}
        </div>
    );
};

export default PlayerList