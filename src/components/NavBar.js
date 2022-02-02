import React from 'react'
import { Button , Image,Container,Nav, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

function NavBar(props){
    const location= useLocation()
    const path = location.pathname
    //log out 
   const handleClick = (event)=> {
        event.preventDefault()
        const {dispatch} = props
        dispatch(setAuthedUser(null))
    }
    const {UserInfo} = props
    return (
             <Container className="border container border-dark rounded shadow bg-info bg-gradient px-2 py-2 mt-2">
                <Nav className="justify-content-start  align-items-center">
                    <Col 
                    id='left-nav-col'
                    className='d-flex justify-content-start align-items-center'
                    sm={12} xs={12} md={8}>
                        <Nav.Item
                            data-active={path==="/would-you-rather-starter"}  
                            className='mx-2 p-3 rounded text-center'>
                            <Link  className="text-decoration-none" to="/would-you-rather-starter" >
                                Home
                            </Link>
                        </Nav.Item>
                        
                        <Nav.Item  
                            data-active={path==="/would-you-rather-starter/add"}
                            className='mx-2 p-3 rounded text-center'>
                            <Link className="text-decoration-none " to="/would-you-rather-starter/add" >
                                New Question
                            </Link>
                        </Nav.Item>

                        <Nav.Item  
                             data-active={path==="/would-you-rather-starter/leaderboard"}
                            className='mx-2 p-3 rounded text-center'>
                            <Link  className="text-decoration-none" to="/would-you-rather-starter/leaderboard">
                                Leader Board
                            </Link>
                        </Nav.Item>
                    </Col>
                    
                    <Col 
                    id='right-nav-col'
                    className='d-flex justify-content-center align-items-center'
                    sm={12} xs={12} md={4}>
                        <Nav.Item className="mx-2 text-center">
                            <p className="d-inline rounded  my-0" > Hello, {UserInfo.userName} </p>
                            <Image 
                            className='shadow'
                            roundedCircle  
                            style={{maxWidth:40}} 
                            src={UserInfo.userAvatar} 
                            alt="userAvatar"/>
                        </Nav.Item>
                        
                        
                        <Nav.Item  className="mx-2">
                            <Link to="/would-you-rather-starter">
                                <Button
                                style={{fontWeight:"bold"}} 
                                className='rounded'
                                size="sm"
                                onClick={handleClick} 
                                variant='outline-danger' >
                                    Log Out
                                </Button>
                            </Link>
                        </Nav.Item>
                    </Col>
                    
                    
                </Nav>       
            </Container>
    )
}

function mapStateToProps( {authedUser , users} ){
    const loggedInUser= authedUser.authed
    const UserInfo = {}
    if(loggedInUser !== undefined && loggedInUser !== null){
        UserInfo.userName = users[loggedInUser].name
        UserInfo.userAvatar =  users[loggedInUser].avatarURL
    }
    
    return{
        loggedInUser,
        UserInfo
    }

}
export default connect(mapStateToProps)(NavBar)