import { signOut, useSession } from "next-auth/react"
import {ChevronDoubleDownIcon} from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import {shuffle} from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import {playlistIdState, playlistState } from "@/atoms/playlistAtom";
import useSpotify from "@/Hooks/useSpotify";
import Songs from "./songs";


const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
];


function Center(){
    
    const {data: session} = useSession();
    const spotifyApi = useSpotify();
    const [color , setColor] = useState(null);
    const playlistId = useRecoilValue(playlistIdState);
    const[playlist, setPlaylist] = useRecoilState(playlistState);

    useEffect(() => {
        const number = Math.floor(Math.random() * colors.length);
        const randomColor = colors[number];
        setColor(randomColor);
      }, [playlistId]);

    useEffect(() => {
        spotifyApi
        .getPlaylist(playlistId)
        .then(async (data) => {
            setPlaylist(data.body);
        });
    }, [spotifyApi, playlistId]);

    console.log(playlist);

    const handleLogout = async () => {
        console.log("done");
        await signOut({
            callbackUrl: "/login"
        })
      };


    return(
        <div className="flex-grow text-white h-screen overflow-y-scroll">
            <header className="absolute top-5 right-8">
                <div className="flex items-center bg-black space-x-3 
                opacity-90 hover:opacity-80 rounded-full 
                cursor-pointer p-1 pr-2 "
                onClick={handleLogout}
                >
                    <img className="rounded-full w-10 h-10" 
                    src={session?.user.image} 
                    alt="user-image"  />
                    <h2 className="text-white">{session?.user.name}</h2>
                    <ChevronDoubleDownIcon className="h-5 w-5"/>
                </div>
            </header>

            <section className= {`flex items-end space-x-7 bg-gradient-to-b to-black ${color}  h-80 text-white p-8 `}>
                <img className="h-44 w-44 shadow-2xl" src={playlist?.images?.[0]?.url} alt="" />
                <div>
                    <p>PLAYLIST</p>
                    <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
                </div>
            </section>

           <div>
            <Songs/>
           </div>
        </div>
    )

}

export default Center