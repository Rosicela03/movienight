import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import "./MovieList.css";
import MovieCard from './MovieCard';
import FilteredGroup from './FilteredGroup';


export const MovieList = ({type, title}) => {

  const [movies, setMovies] = useState([]);
  const [filteredMovies, setfilteredMovies] = useState([]);
  const [minRating, setMinrating] = useState(0);
  const [sort, setSort] = useState({
    by: "default",
    order: "asc",

  })


  useEffect(()=> {
    fetchMovies();

  }, []);

  useEffect(()=>{
    if (sort.by !== "default") {
     const sortedMovies =  _.orderBy(filteredMovies, [sort.by], [sort.order])
     setfilteredMovies(sortedMovies)
      
    }

  }, [sort])





  const fetchMovies = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=b23b282b061c132e3bc1d4df16d34dd0`
    );
    const data = await response.json();
    setMovies(data.results);
    setfilteredMovies(data.results);
  };

  const handleFilter = rate => {
    if (rate===minRating) {
      setMinrating(0);
      setfilteredMovies(movies)
      
    }else{
      setMinrating(rate)

      const filtered = movies.filter(movie => movie.vote_average >= rate)
      setfilteredMovies(filtered);
    }

    };

    const handleSort = e => {
      const{name, value} = e.target;
      setSort((prev) => ({...prev, [name]: value})); 

      };



  return ( 
    <section className='movie_list' id={type}>
      <header className='align_center movie_list_header'>
        <h2 className='align_center movie_list_heading'>{title}</h2>
        
        <div className='align_center movie_list_fs'>

          <FilteredGroup 
          minRating={minRating} 
          onRatingClick= {handleFilter}
          ratings={[8,7,6]}
          /> 
          

          <select name="by" id="" onChange={handleSort} value={sort.by} className="movie_sorting">
            <option value="default">Sort by</option>
            <option value="release_date">Date</option>
            <option value="vote_average">Rating</option>
          </select>
          <select name="order" id="" onChange={handleSort} value={sort.order} className="movie_sorting">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>

      
        </div>
      </header>
      <div className="movie_cards">
       {filteredMovies.map(movie => (
          <MovieCard key={movie.id} movie = {movie}/>
        ))}
      </div>
    </section>
  );
};

export default MovieList;