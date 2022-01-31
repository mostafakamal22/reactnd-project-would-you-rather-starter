import React, { Component } from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import first from '../img/leaderBoard/first-place.png'
import second from '../img/leaderBoard/second-place.png'
import third from '../img/leaderBoard/third-place.png'


class LeaderBoard extends Component {
    render() {
        const { LeaderBoardData } = this.props
        return (
            <ul className='container border border-1 border-dark shadow rounded bg-info bg-gradient my-4'>

                {LeaderBoardData[0] !== undefined && (LeaderBoardData.map((user,index)=> 
                    <li style={{maxWidth:700}} className='row align-items-center border border-1 border-dark rounded px-2 shadow bg-light bg-gradient my-3 mx-auto py-2' key={user.userId}>
                        <Col md={4} className='text-center'>
                            <Image
                            className='me-2'
                            style={{maxWidth:70}}
                            rounded 
                            src={index===0?first:(index===1?second:third)} 
                            alt="user-rank-badge"/>
                            <Image 
                            style={{maxWidth:120}}
                            roundedCircle 
                            src={user.userAvatar} 
                            alt="user-avatar"/>
                        </Col>

                        <Col style={{fontWeight:"bold"}} md={6} className='text-left'>
                            <h3 style={{fontWeight:"bold"}}>{user.userName}</h3>
                            <Row className='bg-success rounded text-light py-1  mb-1 align-items-center'>
                                <Col className='col-8'>Answered Questions</Col>
                                <Col className='text-end col-4'>{user.answeredQuestions}</Col>
                            </Row>
                            <Row className='bg-warning rounded text-light py-1 align-items-center'>
                                <Col className='col-8'>Created Questions</Col>
                                <Col className='text-end col-4'>{user.createdQuestions}</Col>
                            </Row>
                        </Col>

                        <Col style={{fontWeight:"bold"}} md={2} className='text-center rounded mt-4'>
                            <h5 className='bg-dark text-light  py-2 m-0'>Score</h5>
                            <span className='d-block  bg-info py-2 '>{user.score}</span>
                        </Col>
                    </li>
                    ))
                }
             </ul>
        )
    }
}

const  mapStateToProps =  ( { users } ) => {
    let LeaderBoardData = []
    for (const user in users){
        let userData = {}
        userData.userName= users[user].name
        userData.userId=users[user].id
        userData.userAvatar= users[user].avatarURL
        userData.answeredQuestions= Object.keys(users[user].answers).length
        userData.createdQuestions= users[user].questions.length
        userData.score= userData.createdQuestions+ userData.answeredQuestions
        LeaderBoardData.push(userData)
    }
    // sorting the leaderBoard based on score (the best at top)
    // and filtering the leaderBoard so that only remained are the top three 
    LeaderBoardData.sort( (b,a)=> a.score - b.score ).length=3
    return{
        LeaderBoardData
    }
}
export default connect(mapStateToProps)(LeaderBoard)
