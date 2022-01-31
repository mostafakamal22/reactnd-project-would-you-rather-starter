import React from 'react'
import { Button , Image,Container,Nav } from 'react-bootstrap'
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
                    <Nav.Item  className='mx-2'>
                        <Link data-active={path==="/"}  className="text-decoration-none shadow rounded p-3" to="/" >
                            Home
                        </Link>
                    </Nav.Item>
                    
                    <Nav.Item  className='mx-2'>
                        <Link data-active={path==="/add"} className="text-decoration-none shadow rounded p-3" to="/add" >
                            New Question
                        </Link>
                    </Nav.Item>

                    <Nav.Item  className='mx-2'>
                        <Link data-active={path==="/leaderboard"} className="text-decoration-none shadow rounded p-3" to="/leaderboard">
                            Leader Board
                        </Link>
                    </Nav.Item>
                      
                    <Nav.Item className="mx-2 ms-auto">
                        <p className="d-inline shadow rounded  my-0" > Hello, {UserInfo.userName} </p>
                        <Image 
                        className='shadow'
                        roundedCircle  
                        style={{maxWidth:40}} 
                        src={UserInfo.userAvatar} 
                        alt="userAvatar"/>
                    </Nav.Item>
                    
                    
                    <Nav.Item  className="mx-2">
                        <Link to="/">
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