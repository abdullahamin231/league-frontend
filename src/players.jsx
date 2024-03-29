import React, { useState, useEffect } from "react";
import 'ldrs/dotWave'
import 'ldrs/mirage'
import "./primary.css"
import { Link } from "react-router-dom";
import Pagination from "./pagination";

import PlayerList from "./playerList";

export default function Players() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [choice, setChoice] = useState();
    const [query, setQuery] = useState();
    const [show, showFilter] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(12);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const nPages = Math.ceil(data.length / recordsPerPage)

    const fetchData = async (url) => {
        try {
            const response = await fetch(url, { mode: 'cors' });
            const pl = await response.json();

            if (!response.ok) {
                throw new Error("Error getting players.");
            }
            setData(pl);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = `https://www.premierleaguebackend.up.railway.app/players/search?${query}=${choice}`
        setLoading(true)
        fetchData(url);
    }

    useEffect(() => {
        fetchData('https://www.premierleaguebackend.up.railway.app/players');
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
        <div className=" scrollhide magicpattern text-center font-poppins">
            <h1 className="text-6xl font-bold text-text py-8">Players</h1>            
            <p className="pb-2">
                <span className="bg-white text-secondary text-md mx-2 px-2 cursor-pointer">
                <Link to={"/"}>Home</Link>
                    
                    </span>
                <span className="bg-white text-secondary text-md mx-2 px-2 cursor-pointer">
                    <Link to={"/squads"}>Squads</Link>
                </span>
            </p>
            <div className="w-[60%] grid place-items-center mx-auto">
                <button className="text-xl bg-white px-2 text-secondary" onClick={() => showFilter(!show)}>Filter </button >
                {
                    show && 
                    <form 
                    onSubmit={handleSubmit} 
                    className="py-2 flex flex-row items-center gap-2" 
                    action="">
                        <select 
                        onChange={(e) => setQuery(e.target.value)} 
                        value={query} 
                        name="query" 
                        id="query">
                            <option value="position">Position</option>
                            <option value="squad">Squad</option>
                            <option value="nation">Nation</option>
                            <option value="lastName">Last Name</option>
                        </select>
                        <input 
                        className="font-poppins outline-none px-2 py-2" 
                        value={choice}
                        onChange={(e) => setChoice(e.target.value)} 
                        type="text" 
                        name="choice" 
                        id="choice" />
                        <button type="submit" className="text-lg bg-white py-1 px-2 text-secondary">Submit</button>
                    </form>
                }
            </div>
            <div className="h-[530px] scrollhide overflow-y-auto">
                {
                    loading ? <div className="grid place-items-center">
                    <l-dot-wave
                        size="150"
                        speed="1"   
                        color="white"
                    ></l-dot-wave>
                    <p className="font-poppins text-2xl text-text font-bold">
                        Fetching player data...
                    </p>
                </div> : <PlayerList players={data.slice(indexOfFirstRecord, indexOfLastRecord)} />
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
