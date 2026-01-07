import { useState } from "react";
import { FaSistrix } from "react-icons/fa6";

// https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=10&language=en&format=json
const Search = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    return (
        <section className="w-full flex flex-col items-center gap-8 mt-12">
            <h1 className=" text-3xl lg:text-6xl text-center font-bold">How's the sky looking today?</h1>
            <div className="flex flex-wrap gap-3 text-xl w-full justify-center">
                <div className="flex items-center bg-gray-600 rounded-md px-6 py-3 gap-3 w-full lg:w-3/4 md:w-1/2 max-w-2xl">
                    <FaSistrix />
                    <input type="text" 
                    placeholder="Search for a place..." 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="bg-transparent outline-none" />
                </div>
                <button onClick={() => onSearch(query)}
                className="bg-blue-700 rounded-md px-6 py-3 w-full lg:w-auto">Search</button>

            </div>

        </section>
    );
}
export default Search;