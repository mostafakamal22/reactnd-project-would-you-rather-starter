import React from 'react'
import { Col, Container, Row ,Image } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useLocation } from 'react-router'
import NotFound from './NotFound'
import QuestionForm from './QuestionForm'


function Question(props)  {

    const { questions, authedUser, users }= props
    const location = useLocation()
    const question_id = location.pathname.split('/')[location.pathname.split('/').length - 1]
    let Answered = null
    let questionData = {}
    //checking for selcted option
    let checkVoteOne= ''
    let checkVoteTwo= ''

    if (questions[question_id] !== undefined){

        const author = questions[question_id].author
        const avatarURL = users[author].avatarURL
        const name = users[author].name
             
        if(Object.keys(users[authedUser.authed].answers).includes(question_id)){
            Answered = true
        }
        else{
            Answered = false
        }
        
        //collecting the question data we need to display
        
        if(Answered===true){
            
            questionData.question_id= question_id
            questionData.name= name
            questionData.avatar= avatarURL
            questionData.optionOne= questions[question_id].optionOne.text
            questionData.voteForOne= questions[question_id].optionOne.votes.length
            questionData.optionTwo= questions[question_id].optionTwo.text
            questionData.voteForTwo= questions[question_id].optionTwo.votes.length
            questionData.totalVotes= questions[question_id].optionOne.votes.length+ questions[question_id].optionTwo.votes.length
            questionData.votePercentForOne= ((questionData.voteForOne/questionData.totalVotes)*100).toFixed(2)
            questionData.votePercentForTwo= ((questionData.voteForTwo/questionData.totalVotes)*100).toFixed(2)
            questionData.selectedOption= users[authedUser.authed].answers[question_id]
        }
        else{
            
            questionData.question_id= question_id
            questionData.name= name
            questionData.avatar= avatarURL
            questionData.optionOne= questions[question_id].optionOne.text
            questionData.optionTwo= questions[question_id].optionTwo.text
        }
        

        if(questionData.selectedOption==="optionOne"){
            checkVoteOne="true"
        }
        else{
            checkVoteTwo="true"
        }

    } else{
         Answered = null
    }
    

        return (
            <>
           
               {Answered===true?
                    (<Container className='border border-dark bg-info bg-gradient shadow rounded my-3 p-3'>
                        <Row style={{maxWidth:750}} className='border border-dark rounded bg-light pb-3 my-3 mx-auto'>
                            <h4 className='bg-dark py-2 px-5 text-light'> Asked by {questionData.name} :- </h4>       
                            <Col className='text-center my-auto' md={4}>
                                <Image 
                                style={{maxWidth:100}}
                                src={questionData.avatar} 
                                alt="user-avatar" 
                                roundedCircle/>
                            </Col>
                            
                            <Col className='border-start' md={8}>
                                <h5 style={{fontWeight:'bold'}} className='ms-1'>Results:-</h5>
                                <Row 
                                selectedoption={checkVoteOne}
                                className='border border-warning border-2 rounded mx-1 mb-2 p-2 vote'>
                                    <span className='mb-2' style={{fontWeight:'bold'}}>Would you rather {questionData.optionOne}?</span>
                                    <span className='border rounded bg-secondary p-0'>
                                        <span style={{width:questionData.votePercentForOne+"%"}} className='bg-warning d-inline-block text-center py-1 rounded'>{questionData.votePercentForOne}%</span>
                                    </span>
                                    <span style={{fontWeight:'bold'}}className='text-center'>{questionData.voteForOne} out of {questionData.totalVotes} votes</span>
                                </Row>
                                <Row 
                                selectedoption={checkVoteTwo}
                                className='border border-warning border-2 rounded mx-1 p-2 vote'>
                                    <span className='mb-2' style={{fontWeight:'bold'}}>Would you rather {questionData.optionTwo}?</span>
                                    <span className='border rounded bg-secondary p-0'>
                                        <span style={{width:questionData.votePercentForTwo+"%"}} className='bg-warning d-inline-block text-center py-1 rounded'>{questionData.votePercentForTwo}%</span>
                                    </span> 
                                    <span style={{fontWeight:'bold'}}className='text-center'>{questionData.voteForTwo} out of {questionData.totalVotes} votes</span>
                                </Row>
                            </Col>
                        
                        </Row>
                    </Container>)
                    : 
                    ( Answered===null?
                        <NotFound />
                    :
                    <Container className='border border-dark bg-info bg-gradient shadow rounded my-3 p-3'>
                        <Row style={{maxWidth:750}} className='border border-dark rounded bg-light pb-3 my-3 mx-auto'>
                            <h4 className='bg-dark py-2 px-5 text-light'> {questionData.name} asks :- </h4>
                            <Col className='text-center my-auto' md={4}>
                                <Image 
                                style={{maxWidth:100}}
                                roundedCircle
                                src={questionData.avatar} 
                                alt="user-avatar"/>
                            </Col>
                            <Col className='border-start border-1'>
                                <h3 style={{fontWeight:'bold'}} className='ms-1'>Would You Rather...</h3>
                                <>
                                    <QuestionForm questionData={questionData} authedUser={authedUser} />
                                </>
                            </Col>
                        </Row>
                    </Container>)
                }
            </>
        )
}
const mapStateToProps = ({ questions, authedUser, users }) => {

    return {
        questions,
        authedUser,
        users
    }
}
export default connect(mapStateToProps)(Question)
