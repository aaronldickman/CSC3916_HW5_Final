import React, { Component }  from 'react';
import { connect } from "react-redux";
import { Glyphicon, Panel, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Image } from 'react-bootstrap'
import { withRouter } from "react-router-dom";
import { fetchMovie } from "../actions/movieActions";
import ReviewForm from "./reviewForm"

//support routing by creating a new component

class Movie extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie === null || this.props.selectedMovie === []) {
            dispatch(fetchMovie(this.props.Title));
        }
    }

    render() {
        const ActorInfo = ({actors}) => {
            return actors.map((actor, i) =>
                <p key={i}>
                    <b>{actor.ActorName}</b> {actor.CharacterName}
                </p>
            )
        }

        const ReviewInfo = ({reviews}) => {
            if(!reviews) {
                return <p>No reviews for this movie at this time.</p>
            }
            else {
                return reviews.map((review, i) =>
                    <p key={i}>
                        <b>{review.Reviewer}</b> {review.Blurb}
                        <Glyphicon glyph={'star'}/>  {review.Rating}
                    </p>
                )
            }
        }


        const DetailInfo = ({currentMovie}) => {
            if (!currentMovie) { //if not could still be fetching the movie
                return <div>Loading...</div>;
            }
            return (
              <Panel>
                  <Panel.Heading>Movie Detail</Panel.Heading>
                  <Panel.Body><Image className="poster" src={currentMovie.imageUrl} thumbnail /></Panel.Body>
                  <ListGroup>
                      <ListGroupItem>{currentMovie.Title}</ListGroupItem>
                      <ListGroupItem><ActorInfo actors={currentMovie.LeadActors}/></ListGroupItem>
                      <ListGroupItem><h4><Glyphicon glyph={'star'}/> {currentMovie.AvgRating ? currentMovie.AvgRating.toFixed(2) : "No Ratings"} </h4></ListGroupItem>
                  </ListGroup>
                  <Panel.Body><ReviewInfo reviews={currentMovie.reviews} />
                  </Panel.Body>
              </Panel>
            );
        }

        return (
            <>
            <DetailInfo currentMovie={this.props.selectedMovie} />
            <ReviewForm currentMovie={this.props.selectedMovie} Title={this.props.Title}/>
            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        selectedMovie: state.movie.selectedMovie,
        Title: ownProps.match.params.Title
    }
}

export default withRouter(connect(mapStateToProps)(Movie));