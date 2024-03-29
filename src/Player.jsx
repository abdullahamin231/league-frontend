import { useParams } from "react-router-dom";
import "./primary.css"
import { useEffect, useState } from "react";
import PlayerList from "./playerList";
import { Link } from "react-router-dom";


const AllPlayers = ({setShowPlayers, squadName}) => {
    const [playerData, setPlayerData] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await fetch(`https://www.premierleaguebackend.up.railway.app/search?squad=${squadName}`, { mode: 'cors' });
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
            <div className="flex flex-row bg-[rgb(189,209,254)] text-background px-4 py-2  items-center justify-between">
                <p className="font-bold text-2xl">Players in {squadName}</p> <button onClick={() => setShowPlayers(false)}>Close</button>
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

export default function Player() {
    const first = useParams().first;
    const last = useParams().last;
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [squadName, setSquadName] = useState()
    const [showPlayers, setShowPlayers] = useState()

    const fetchData = async () => {
        try {
            const response = await fetch(`https://www.premierleaguebackend.up.railway.app/${first}/${last}`, { mode: 'cors' });
            const pl = await response.json();

            if (!response.ok) {
                throw new Error("Error getting player.");
            }

            setData(pl);
            setLoading(false);
            console.log(data);

        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

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
        <div className="scrollhide h-screen grid place-items-center magicpattern font-poppins">
            {
                loading ? <div className="">
                    <l-dot-wave
                        size="100"
                        speed="1"
                        color="white"
                    ></l-dot-wave>
                    <p className="font-poppins text-2xl text-text font-bold">
                        Fetching player data...
                    </p>
                </div> :
                    <div className="flex flex-col items-center font-poppins">
                        <div className="bg-[#F1F4FA] text-secondary px-4 rounded-sm mb-2 py-2 font-bold font-inter text-xl">

                        <Link to={"/players"}>Back</Link>
                        </div>
                        {data.length >= 1 ? (
                            <div className="text-3xl bg-[#F1F4FA] text-[#282C34] ">
                                {data.map((player, index) => (
                                    <div key={index} className="border px-16 py-8 mb-4">
                                        <h2 className="font-bold text-5xl mb-2">
                                            {player.firstName} {player.lastName}
                                        </h2>
                                        <p>Rank: {player.rank}</p>
                                        <p>Nation: {player.nation}</p>
                                        <p>Position: {player.position}</p>
                                        <p  onClick={() => {
                                            setShowPlayers(true);
                                            setSquadName(player.squad);
                                        }}>Squad: {player.squad}</p>
                                        <p>Goals: {player.goals}</p>
                                        <p>Assists: {player.asts}</p>
                                        
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No data available.</p>
                        )}
                    </div>
            }
            {
                        showPlayers && <AllPlayers setShowPlayers={setShowPlayers} squadName={squadName} />
                }
        </div>
    );
}