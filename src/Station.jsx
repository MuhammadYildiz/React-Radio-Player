
import React, { useEffect, useState } from 'react'
import axios from 'axios';
export default function Station() {
    const [stations, setStations] = useState([])
    const [item, setItem] = useState(0)
    const [channel, setchannel] = useState(true)
    const getMoreData = () => {
        setchannel(true)
        setItem(item + 1)
    }
    useEffect(() => {
        const getStationData = async () => {
            const response = await axios.get("https://api.sr.se/api/v2/channels?format=json&size=100")
            /* const data = await response.json() */
            setStations(response.data.channels)
        }
        getStationData()
        getMoreData()
    }, [])
    return (
        <div>
            <h1 className='text-center text-[40px] p-3 top-0 sticky bg-white z-50'>Radio Player <br />
                <button
                    className='bg-red-600 text-lg py-2 font-bold hover:bg-black px-5 text-white  rounded-3xl mt-3'
                    onClick={() => setchannel(false)}
                >
                    Clear All
                </button>
            </h1>

            <div id='up'>
                {stations.slice(0, item).map((station) => (
                    <div key={station.id}
                    >
                        {channel &&
                            <div style={{ backgroundColor: `#${station.color}` }}
                                className="flex flex-col md:flex-row md:justify-between w-[98%] m-auto my-5  justify-center rounded-3xl">
                                <div className='flex flex-col sm:flex-row justify-center items-center'>
                                    <img className="max-w-[200px] max-h-[150px]  p-5  rounded-3xl bg-white m-2"
                                        src={station.image} alt="" />
                                    <p className='text-white m-3 p-3 rounded-3xl  min-h-[120px]'>
                                        <span className='text-xl'>Tagline:</span> <br />
                                        {station.tagline}
                                    </p>
                                </div>
                                <div className='flex flex-col sm:flex-row md:flex-col  m-3 p-3 rounded-xl'>
                                    <h1 className='text-center text-2xl w-[230px]  m-auto bg-white py-2 rounded-full mb-3'
                                        style={{ color: `#${station.color}` }}>
                                        {station.name}
                                    </h1>
                                    <audio controls className='w-[230px] m-auto mb-3'>
                                        <source src={station.liveaudio.url} type="audio/mpeg" />
                                    </audio>
                                </div>
                            </div>
                        }
                    </div>
                ))}
            </div>
            <div className='w-[230px] text-center m-auto mb-10 '>
                <a href="#btn">
                    <button id='btn' className='bg-blue-600 py-3 font-bold hover:bg-black px-5 text-white  rounded-3xl '
                        onClick={getMoreData}
                    >
                        Get More Channels
                    </button>
                </a>

                {item >= stations.length &&
                    <a href="#up">
                        <button id='btn' className='bg-blue-600 py-3 font-bold hover:bg-black px-5 text-white  rounded-3xl  mt-3'
                        >
                            Go Up
                        </button>
                    </a>
                }
            </div>
        </div>
    )
}
