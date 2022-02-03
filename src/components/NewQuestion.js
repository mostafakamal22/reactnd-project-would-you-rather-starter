import React, { Component } from 'react'
import { Button, Container, FloatingLabel, Form, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleSaveQuestion } from '../actions/questions'

class NewQuestion extends Component {
    state= {
        optionOneText:"",
        optionTwoText:"",
        questionSubmitted: false
    }
    handleChangeOne = (event)=> {
        this.setState({
            optionOneText: event.target.value
        })
    }
    handleChangeTwo = (event)=> {
        this.setState({
            optionTwoText: event.target.value
        })
    }
    handleSubmit = (event)=> {
        event.preventDefault()
        const auther = this.props.authedUser
        this.props.dispatch(handleSaveQuestion({...this.state, ...auther }))
        setTimeout( () => this.setState({
            questionSubmitted:true
        })
        ,1500 )    
    }
    render() {
        const { questionSubmitted } = this.state
        return (
            <Container className='border border-dark rounded shadow bg-info bg-gradient my-4 pb-3'>
                <Row>
                    <h3 className='bg-dark text-light py-2'>Create New Question</h3>
                </Row>
                
                <Row className='text-center'>
                    <p style={{fontWeight:"bold"}}>Would You Rather....</p>
                </Row>
                
                <Row style={{maxWidth:750}} className='text-center mx-auto'>
                    <Form onSubmit={this.handleSubmit}>
                        <FloatingLabel  controlId="floatingInput" label="Please Enter The First Option" className="mb-3">
                            <Form.Control 
                            required
                            type="text"
                            placeholder="Please Enter The First Option"
                            value={this.state.optionOneText}
                            onChange={this.handleChangeOne}/>
                        </FloatingLabel>

                        <p> OR </p>

                        <FloatingLabel  controlId="floatingInput" label="Please Enter The Second Option" className="mb-3">
                            <Form.Control 
                            required
                            type="text"
                            placeholder="Please Enter The Second Option"
                            value={this.state.optionTwoText}
                            onChange={this.handleChangeTwo}/>
                        </FloatingLabel>
                        
                        <Button 
                            className='border border-dark border-1' 
                            variant='light' 
                            type="submit">
                            Submit Question
                        </Button>
                        {questionSubmitted &&  <Redirect to="/would-you-rather-starter/" /> }
                    </Form>
                </Row>
                
            </Container>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return { authedUser }
}
export default connect(mapStateToProps)(NewQuestion)
