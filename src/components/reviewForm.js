import React, { Component } from 'react'
import { Button, Col, ControlLabel, Form, FormControl, FormGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { submitReview } from '../actions/reviewActions'

class ReviewForm extends Component {
    constructor(props) {
        super(props);
        this.updateDetails = this.updateDetails.bind(this);
        this.submit = this.submit.bind(this);

        this.state = {
            submitMessage: '',
            details:{
                Rating: '',
                Blurb: '',
                Movie: ''
            }
        };
    }

    updateDetails(event){
        let updateDetails = Object.assign({}, this.state.details);
        updateDetails[event.target.id] = event.target.value;
        this.setState({
            details: updateDetails
        });
    }

    submit() {
        this.state.details.Movie = this.props.Title; //this is bad but standard update function wouldn't take and didn't have time to find the root cause
        let submittable = (this.state.details.Rating > 0 && this.state.details.Rating <= 5 && this.state.details.Blurb !== '')

        const {dispatch} = this.props;
        if(submittable) {
            dispatch(submitReview(this.state.details));
            this.setState({submitMessage: "Your review has been submitted. Refresh to view."})
        }
        else {
            this.setState({submitMessage: "Please make sure your review has a rating (1-5) and a short description."})
        }
    }

    render(){
        return (
            <Form horizontal>
                <FormGroup controlId="Rating">
                    <Col style={{color: "white"}} componentClass={ControlLabel} sm={2}>
                        Rating
                    </Col>
                    <Col sm={10}>
                        <FormControl onChange={this.updateDetails} value={this.state.details.Rating} type="number" placeholder="Rating (1-5)" />
                    </Col>
                </FormGroup>

                <FormGroup controlId="Blurb">
                    <Col style={{color: "white"}} componentClass={ControlLabel} sm={2}>
                        Review
                    </Col>
                    <Col sm={10}>
                        <FormControl onChange={this.updateDetails} value={this.state.details.Blurb} type="text" placeholder="Review" />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button onClick={this.submit}>Submit</Button>
                    </Col>
                    <p style={{color:"white"}}>{this.state.submitMessage}</p>
                </FormGroup>
            </Form>
        )
    }
}

const mapStateToProps = state => {
    return {
        Title: state.movie.selectedMovie ? state.movie.selectedMovie.Title : null
    }
}

export default connect(mapStateToProps)(ReviewForm);