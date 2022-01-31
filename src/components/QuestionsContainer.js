import React, { Component } from 'react'
import { Alert, Button, Col, Container, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import QuestionOverview from './QuestionOverview'

class QuestionsContainer extends Component {
    state = {
        unAnswered: true
    }
    handleClick = (bool)=> {
        this.setState({
            unAnswered: bool
        })
    }
    render() {
        const {answeredQuestionsData, UnansweredQuestionsData } = this.props
        const { unAnswered } = this.state
        return (
            <Container className='border border-dark bg-info bg-gradient shadow rounded my-4'>

                <Row className='text-center border rounded bg-light bg-gradient mb-5 p-3'>
                    <Col style={{maxWidth:400}} className='mx-auto'>
                        <Button 
                            style={{fontWeight:"bold"}}
                            className='w-100' 
                            variant={unAnswered?"dark":"outline-dark"} 
                            onClick={()=>this.handleClick(true)}> 
                            Unanswered Questions 
                        </Button>
                    </Col>
                    <Col style={{maxWidth:400}} className='mx-auto'>
                        <Button
                            style={{fontWeight:"bold"}}
                            variant={unAnswered?"outline-dark":"dark"} 
                            className='w-100 outline-none' 
                            onClick={()=>this.handleClick(false)}> 
                            Answered Questions
                        </Button>
                    </Col>
                </Row>
                
                {unAnswered
                ?
                UnansweredQuestionsData.map(q => 
                    <QuestionOverview 
                    key={q.id}
                    avatarURL={q.avatarURL}
                    qID={q.id}
                    Answered={false}
                    name={q.name}
                    selectedOption={q.optionOne.text} 
                />
                )
                :answeredQuestionsData.map(q => 
                    <QuestionOverview 
                    key={q.id}
                    avatarURL={q.avatarURL}
                    qID={q.id}
                    name={q.name}
                    Answered={true}
                    selectedOption={q[q.selectedOption].text} 
                />
                )}
                
                {(UnansweredQuestionsData.length===0&&unAnswered===true)&&(
                    <Alert style={{maxWidth:700, fontWeight:"bold"}} className='p-2 my-3 text-center mx-auto border shadow rounded' variant='success'>
                        <p>WOW! You Have Answered All Available Questions.</p>
                        <p>There are no more questions for now!</p>
                        <p>Try creating your own questions from <Link to='/add'>Here</Link></p>
                    </Alert>
                )}
            </Container>
        )
    }
}

function mapStateToProps({authedUser, questions, users } ) {
    //get authed user 
    const theAuthedUser =  Object.keys(users).find(user => user === authedUser.authed )
    let answeredQuestions = {}
    let answeredQuestionsData = []
    // get all answered questions of the authed user
    for (const user in users) {
            if (user=== theAuthedUser){
                answeredQuestions = users[user].answers
            }
    }
         // getting answered questions //
    // collect all the data we need about every answered question
    for (const ansQuestion in answeredQuestions) {
        // basic data
        const wantedData = {...questions[ansQuestion]}
        // avatar 
        wantedData.avatarURL= users[wantedData.author].avatarURL
        // author's name
        wantedData.name= users[wantedData.author].name
        // selected answer for the question
        wantedData.selectedOption = answeredQuestions[ansQuestion]
        // putting all data together  
        answeredQuestionsData.push(wantedData)
    }   
    // sorting the answered questions based on the timestamp(the newest at top)
    answeredQuestionsData.sort((a, b)=>  b.timestamp - a.timestamp)



       // getting unanswered questions // 
    //initial data 
    let UnansweredQuestions = Object.values(questions)
    let UnansweredQuestionsData = []
    //start filtering all answered questions by authed users to get only unanswered
    for (const ansQuestion in answeredQuestions){
        const filtered = UnansweredQuestions.find(q => q.id === ansQuestion)
        const filteredID = UnansweredQuestions.indexOf(filtered)
        UnansweredQuestions.splice(filteredID, 1)
    }
    // collect all the data we need about every unanswered question
    for (const unansQuestion in UnansweredQuestions){
        // basic data
       const wantedData= UnansweredQuestions[unansQuestion]
       // avatar 
       wantedData.avatarURL= users[wantedData.author].avatarURL
       // author's name
       wantedData.name= users[wantedData.author].name
       // putting all data together  
       UnansweredQuestionsData.push(wantedData)
    }
    // sorting the unanswered questions based on the timestamp(the newest at top)
        UnansweredQuestionsData.sort((a, b)=>  b.timestamp - a.timestamp)


    return {
        answeredQuestionsData,
        UnansweredQuestionsData
    }
}

export default connect(mapStateToProps)(QuestionsContainer)
