import { Link } from "react-router-dom";
import "./primary.css"
const NavBar = () => {
    return (
        <nav className="font-poppins text-center px-4 py-2">
            <h1 className="font-bold text-text text-8xl">Premier League Statistics</h1>
        </nav>
    );
}

export default function Nothing() {
    return (
        <div className="h-screen flex flex-col justify-center gap-8 items-center magicpattern font-poppins">

            <NavBar />
            <div className="flex flex-row items-center gap-4">
                <Link to={"/players"}>
                    <p class="bg-secondary shadow-sm px-4 py-2 text-text font-500 text-2xl transition duration-200 hover:bg-accent hover:rounded-md hover:scale-105">
                        View all Players
                    </p>
                </Link>
                <Link to={"/squads"}>
                    <p class="bg-secondary shadow-sm px-4 py-2 text-text font-500 text-2xl transition duration-200 hover:bg-accent hover:rounded-md hover:scale-105">
                        View all Squads
                    </p>
                </Link>
                <Link to={"/code"}>
                    <p class="bg-secondary shadow-sm px-4 py-2 text-text font-500 text-2xl transition duration-200 hover:bg-accent hover:rounded-md hover:scale-105">
                        Review the Code!
                    </p>
                </Link>
            </div>
        </div>
    );
}