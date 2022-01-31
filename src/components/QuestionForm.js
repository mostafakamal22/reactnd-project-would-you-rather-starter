import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { handleSaveQuestionAnswer } from '../actions/questions'


class QuestionForm extends Component {
    
    state = {
        selectedOption: "optionOne"
    }
    //handling option change
    handleChange = (event)=>{
        this.setState({
            selectedOption: event.target.value
        })
    }
    //handle submit method for submitting answer
    handleSubmit = (event)=> {
        event.preventDefault()
        const { authed }= this.props.authedUser
        const { question_id } = this.props.questionData
        const { selectedOption } = this.state
        this.props.dispatch(handleSaveQuestionAnswer({authed,question_id,selectedOption}))
    }

    render() {
        const {questionData} = this.props
        const { selectedOption }= this.state
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Check
                className='my-2' 
                type="radio"
                label={questionData.optionOne} 
                value="optionOne"
                onChange={this.handleChange} 
                checked= {selectedOption==="optionOne"}
                />

                <Form.Check
                type="radio"
                label={questionData.optionTwo} 
                value="optionTwo"
                onChange={this.handleChange} 
                checked= {selectedOption==="optionTwo"}
                />

                <Button className='w-75 my-2' variant='dark' type="submit">Submit</Button>
            </Form>
        )
    }
}


export default connect()(QuestionForm)
