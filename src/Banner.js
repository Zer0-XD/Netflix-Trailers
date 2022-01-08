import React, { useState, useEffect } from 'react'
import axios from './axios';
import requests from './requests';
import './Banner.css'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

function Banner() {

    const [movie, setMovie] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useState(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            const random_movie = Math.floor((Math.random() * request.data.results.length - 1));
            setMovie(request.data.results[random_movie]);
            // console.log(request.data.results[random_movie]);
            return request;
        }

        fetchData()
    }, []);

    // console.log(movie)

    function truncate(str, max) {
        return str?.length > max ? str.substr(0, max - 1) + '…' : str;
    }

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        }
        else {
            movieTrailer(movie?.title || movie?.name || movie?.original_title || movie?.original_name || "")
                .then((url) => {
                    console.log(movie);
                    // const urlParams = new URL(url).search;
                    const urlParams = new URLSearchParams(new URL(url).search);
                    // urlParams.get('v');
                    setTrailerUrl(urlParams.get('v'));
                })
                .catch((error) => console.log(error));
        }
    }

    const opts = {
        height: "100%",
        width: "100%",
        playerVars: {
            autoplay: 1,
            fullscreen: 1,
        },
    }

    return (
        <header
            className='banner'
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundPosition: "center center",
            }}
        >
            <div className='banner__contents'>
                <h1 className='banner__title'>
                    {movie?.title || movie?.name || movie?.original_name || movie?.original_title}
                </h1>

                <div className="banner__buttons">
                    <button className="banner__button" onClick={() => handleClick(movie)}>Play</button>
                    <button className="banner__button">My List</button>
                </div>

                <h1 className="banner__description">
                    {truncate(movie?.overview, 150)}
                </h1>

            </div>
            {trailerUrl && <YouTube
                videoId={trailerUrl}
                opts={opts}
            // onPlay={() => (fullScreen: {})}
            />
            }

            <div className="banner__fade"></div>
        </header>
    )
}

export default Banner
