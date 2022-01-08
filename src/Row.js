import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Row.css';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";
// const base_url = "https://image.tmdb.org/t/p/w185/";

function Row({ title, fetchUrl, isLargeRow }) {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            // console.table(request.data.results);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "400",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    }

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        }
        else {
            movieTrailer(movie?.title || movie?.name || movie?.original_title || "")
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

    return (
        <div className='row'>
            <h2>{title}</h2>

            <div className='row__posters'>

                {movies.map(movie => (
                    <img
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={`${base_url}${movie.name}`} />

                ))}

            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row
