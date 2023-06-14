import {
    HomeIcon,
    SearchIcon,
    PlusCircleIcon,
    HeartIcon,
    RssIcon,
    ColorSwatchIcon,
    } from "@heroicons/react/outline";
import {signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import useSpotify from "@/Hooks/useSpotify";
import { playlistIdState } from "@/atoms/playlistAtom";
function Sidebar(){

    const spotifyApi = useSpotify();
    const {data: session, status} = useSession();

    const [playLists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);


    useEffect(() => {
        if(spotifyApi.getAccessToken()){
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            });
        }
    }, [session, spotifyApi]);

    const handleLogout = async () => {
        console.log("done");
        await signOut({
            callbackUrl: "/login"
        })
      };

    return(
        <div className="text-gray-500 p-5 text-xs lg:text-sm 
        border-r border-gray-900 overflow-y-scroll 
        scrollbar-hide h-screen sm:max-w[15rem] hidden 
        md:inline-flex pb-36">
            <div className="space-y-4" >
                
                <button 
                    className="flex  items-center space-x-2 hover:text-white"
                    onClick={handleLogout}
                >
                    <p>Logout</p>     
                </button>

                <button className="flex  items-center space-x-2 hover:text-white">
                    <HomeIcon className="h-5 w-5" />  
                    <p>Home</p>     
                </button>
                
                <button className="flex  items-center space-x-2 hover:text-white">
                    <SearchIcon className="h-5 w-5" />  
                    <p>Search</p>     
                </button>
                
                <button className="flex  items-center space-x-2 hover:text-white">
                    <ColorSwatchIcon className="h-5 w-5" />  
                    <p>Your Library</p>     
                </button>
            <hr className="border-t-[0.1px] border-l-gray-900"/>
                
                <button className="flex  items-center space-x-2 hover:text-white">
                    <PlusCircleIcon className="h-5 w-5" />  
                    <p>Create playList</p>     
                </button>

                <button className="flex  items-center space-x-2 hover:text-white">
                    <HeartIcon className="h-5 w-5" />  
                    <p>Liked Songs</p>     
                </button>

                <button className="flex  items-center space-x-2 hover:text-white">
                    <RssIcon className="h-5 w-5" />  
                    <p>Your Episodes</p>     
                </button>
            <hr className="border-t-[0.1px] border-l-gray-900"/>

            {
                playLists?.map((playList) => (
                    <p key={playList.id} onClick={ () => setPlaylistId(playList.id)} className="cursor-pointer hover:text-white">{playList.name}</p>
                ))
            }  
            </div>
        </div>
    );
}

export default Sidebar