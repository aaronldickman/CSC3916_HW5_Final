import React, { Component } from 'react';
import { fetchMovies } from '../actions/movieActions';
import { setMovie } from '../actions/movieActions';
import {connect} from "react-redux";
import { Image } from 'react-bootstrap'
import { Carousel } from 'react-bootstrap'
import { Glyphicon } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

class MovieList extends Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchMovies());
    }

    handleSelect(selectedIndex, e) {
        const {dispatch} = this.props;
        dispatch(setMovie(this.props.movies[selectedIndex]));
    }

    handleClick = (movie) => {
        const {dispatch} = this.props;
        dispatch(setMovie(movie));
    }

    render() {
        const MovieListCarousel= ({movieList}) => {
            if (!movieList) { // evaluates to true if currentMovie is null
                return <div>Loading...</div>;
            }

            return (
                <Carousel style={{height: "50%"}} onSelect={this.handleSelect}>
                    {movieList.map((movie) =>
                        <Carousel.Item key={movie.Title}>
                            <div>
                                <LinkContainer to={'/movie/'+movie.Title} onClick={()=>this.handleClick(movie)}>
                                    <Image className="d-block w-100 poster" src={movie.imageUrl} thumbnail />
                                </LinkContainer>
                            </div>
                            <Carousel.Caption style={{position: "relative", left: 0, top: 0}}>
                                <h3>{movie.Title}</h3>
                                <Glyphicon glyph={'star'} /> {movie.AvgRating ? movie.AvgRating.toFixed(2) : "No Ratings"} &nbsp;&nbsp; {movie.Year}
                            </Carousel.Caption>
                            <br></br><br></br>
                        </Carousel.Item>
                    )}
                </Carousel>)
        }

        return (<MovieListCarousel movieList={this.props.movies} />
        );
    }
}

const mapStateToProps = state => {
    return {
        movies: state.movie.movies
    }
}

export default connect(mapStateToProps)(MovieList);