import React, { useState, useEffect } from "react";
import 'ldrs/dotWave';
import 'ldrs/mirage';
import { Link } from "react-router-dom";
import "./primary.css";

import Pagination from "./pagination";
import PlayerList from "./playerList";



const SquadList = ({ squads, setShowPlayers, setSquadName }) => {
    return (
        <div className="scrollhide py-4 px-8 flex items-center justify-center flex-row flex-wrap gap-2">
            {squads.map((squad) => (
                <div
                    className="
                        flex flex-col px-2 py-4 rounded-md items-start h-20 w-64 font-poppins bg-white shadow-sm
                        transition duration-300 hover:text-background cursor-pointer hover:bg-[#EFEDFF] hover:rounded-md hover:scale-105
                    "
                    key={squad._id}>
                    <p className="text-2xl"><span className="font-bold ">{squad.name}</span></p>
                    <p className="text-secondary" onClick={() => { setShowPlayers(true); setSquadName(squad.name); }}>Current Players</p>
                </div>
            ))}
        </div>
    );
};

const Player = ({ setShowPlayers, squadName }) => {
    const [playerData, setPlayerData] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://premierleaguebackend.up.railway.app/players/search?squad=${encodeURIComponent(squadName)}`, {
                    method: 'GET',
                    mode: 'cors',
                });
                const pl = await response.json();

                if (!response.ok) {
                    throw new Error("Error getting players.");
                }
                setPlayerData(pl);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchData();

    })
    return (
        <div className="w-[750px]   font-poppins shadow-lg  h-[550px] modal">
            <div className="flex flex-row bg-[#BDD1FE] text-background px-4 py-2  items-center justify-between">
                <p className="font-bold text-2xl">Players</p> <button onClick={() => setShowPlayers(false)}>Close</button>
            </div>
            <div className="h-full magicpattern2 overflow-y-scroll">
                {
                    loading ? <div className="grid place-items-center">
                        <l-dotWave
                            size="150"
                            speed="3.5"
                            color="white"
                        ></l-dotWave>
                        <p className="font-poppins text-2xl text-text font-bold">
                            Fetching player data...
                        </p>
                    </div> : <PlayerList players={playerData} />
                }
            </div>

        </div>
    );
}

export default function Squads() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(12);
    const [showPlayers, setShowPlayers] = useState(false);
    const [squadName, setSquadName] = useState('');

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const nPages = Math.ceil(data.length / recordsPerPage);

    const fetchSquads = async (url) => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                mode: 'cors',
            });
            const pl = await response.json();

            if (!response.ok) {
                throw new Error("Error getting squads.");
            }
            setData(pl);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSquads('https://premierleaguebackend.up.railway.app/squads');
    }, []);

    if (error) {
        return (
            <div className="h-screen bg-background grid place-items-center">
                <l-mirage
                    size="150"
                    speed="2.5"
                    color="white"
                ></l-mirage>
                <p className="font-poppins text-2xl text-text font-bold">
                    Error: {error}
                </p>
            </div>
        );
    }

    return (
        <div className="scrollhide magicpattern text-center py-8 font-poppins">
            <h1 >

                <span className="text-6xl text-center font-bold text-text py-8">

                    Squads
                </span>

            </h1>
            <p className="pt-4">
                <span className="bg-white text-secondary text-md mx-2 px-2 cursor-pointer">
                    <Link to={"/"}>Home</Link>

                </span>
                <span className="bg-white text-secondary text-md mx-2 px-2 cursor-pointer">
                    <Link to={"/players"}>Players</Link>
                </span>
            </p>
            {
                showPlayers &&
                <Player setShowPlayers={setShowPlayers} squadName={squadName} />
            }
            <div className="h-[530px] scrollhide overflow-y-auto">
                {
                    loading ? (
                        <div className="grid place-items-center">
                            <l-helix
                                size="150"
                                speed="3.5"
                                color="white"
                            ></l-helix>
                            <p className="font-poppins text-2xl text-text font-bold">
                                Fetching squad data...
                            </p>
                        </div>
                    ) : (
                        <SquadList
                            squads={data.slice(indexOfFirstRecord, indexOfLastRecord)}
                            setShowPlayers={setShowPlayers}
                            setSquadName={setSquadName}
                        />
                    )
                }
            </div>

            <div className="w-[60%] grid place-items-center mx-auto pb-8 scrollhide overflow-x-scroll">
                {
                    !loading &&
                    <Pagination
                        nPages={nPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                }
            </div>
        </div>
    );
}
