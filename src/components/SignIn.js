import React, { Component } from 'react'
import { Alert, Button, Col, Container, FloatingLabel, Form , Image, Row} from 'react-bootstrap'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { handleCreateNewUser } from '../actions/users'
import logo from "../img/logo.jpg"
import { avatarURLs } from '../utils/_DATA'


class SignIn extends Component {
    state= {
      selectedUser:"Select Your UserName",
      newUserName:"",
      newUserId:"",
      alertLogin:"",
      alertSignUp:"",
      avatar:""
    }
    //sign in handle
    handleChange = (event)=> {
      this.setState({
        selectedUser: event.target.value
      })
    }

    handleSubmit = (event)=>{
      event.preventDefault()
      const {dispatch} = this.props
      const {selectedUser} =this.state
      if(selectedUser==="Select Your UserName"){
        this.setState({
          alertLogin:"Please Select Your UserName !"
        })
        return
      }
      dispatch(setAuthedUser(selectedUser))
    }
    // create new user handle
    handleChangeNewName = (event)=>{
      this.setState({
        newUserName: event.target.value
      })
    }

    handleChangeNewId = (event)=>{
      this.setState({
        newUserId: event.target.value
      })
    }

    handleSubmitNew = (event)=>{
      event.preventDefault()
      const {dispatch, usersNames, usersIDs} = this.props
      const {newUserName, newUserId, avatar} =this.state
      if((usersNames.includes(newUserName.trim())) || (usersIDs.includes(newUserId.trim()))){
        this.setState({
          alertSignUp:"Error! The User Name or User ID or both are already taken by another user"
        })
        return
      }
      dispatch(handleCreateNewUser({
        name: newUserName.trim(),
        id: newUserId.trim(),
        avatar
      }))
      this.setState({
        alertSignUp:"Your account has been created!"
      })
    }

    handleChangeAvatar= (event)=>{
      this.setState({
        avatar: event.target.value
      })
    }
    render() {
        const {  usersNames, usersIDs } = this.props
        const { alertLogin, alertSignUp} = this.state
        return (
            <Container 
              fluid 
              style={{height:"100vh", overflowY:"auto"}}
              className='d-flex text-dark bg-info bg-gradient'>
               <Container
                className='d-flex justify-content-center align-items-center flex-column my-auto'
               >
                <Row className='justify-content-center text-center'>
                  <h3 style={{fontWeight:"bold"}} className='border-bottom border-1 border-dark my-3 pb-3'> Welcome To Would You Rather Game</h3>
                  <Image className='my-3' src={logo} roundedCircle style={{maxWidth:250}} />
                </Row>

                <Row
                  className='justify-content-center'
                >
                  <Col lg className='border border-1 my-3 mx-2 my-auto shadow rounded'>
                    <Row className='justify-content-center text-center'>
                      <h2 style={{fontWeight:"bold"}} className='bg-light bg-gradient py-2 mb-3 rounded'>Login</h2>
                      <p style={{fontWeight:"bold"}} className='text-capitalize'>To continue please Log in with your user name from down below </p>
                        <Form style={{maxWidth:300}} className='mb-3' onSubmit={this.handleSubmit}>
                          <Form.Select 
                            className='mt-3 mb-3 border border-secondary'
                            onChange={this.handleChange} 
                            value={this.state.selectedUser} 
                            aria-label="Default select example">
                                <option value="Select Your UserName" disabled >Select Your UserName</option>
                                    {usersNames.map((userName, index)=>(
                                      <option  
                                      className='bg-info'
                                      key={usersIDs[index]} 
                                      value={usersIDs[index]}>
                                        {userName}
                                      </option>
                                    ))}
                          </Form.Select>

                          {/* error message  */}
                          {alertLogin!==""&& (
                            <Alert className='p-2' variant='danger'>
                              {alertLogin}
                            </Alert>
                          )}

                          <Button 
                            style={{fontWeight:"bold"}}
                            className='border border-dark shadow rounded' 
                            variant="primary" 
                            type="submit">
                              Log in
                          </Button>  
                        </Form>
                    </Row>
                  </Col>

                  <Col style={{maxHeight:300, overflowY:"scroll"}} lg className='border border-1 my-3 mx-2 shadow rounded'>
                    <Row className='text-center justify-content-center'>
                      <h2 style={{fontWeight:"bold"}} className='bg-light bg-gradient py-2 mb-3 rounded'>  Sign up </h2> 
                      <p style={{fontWeight:"bold"}}>Create your own user, Try it Now for Free !</p>
                      <Form  style={{maxWidth:500}} className='mb-3' onSubmit={this.handleSubmitNew}>
                          <Form.Group className="mb-3">
                            <FloatingLabel label="User Name">
                              <Form.Control 
                                type="text" 
                                required
                                value={this.state.newUserName}
                                onChange={this.handleChangeNewName}
                                placeholder="Enter your User Name" />
                            </FloatingLabel>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <FloatingLabel label="User ID">
                            <Form.Control 
                              value={this.state.newUserId}
                              onChange={this.handleChangeNewId}
                              type="text" 
                              required
                              placeholder="Password" />
                            </FloatingLabel>
                          </Form.Group>
                       
                          <Form.Group as={Row} className='mb-3'>
                            <Form.Label className='mb-3' style={{fontWeight:"bold"}}>
                              Choose an Avatar
                            </Form.Label>
                            <div>
                              {Object.values(avatarURLs).map(icon=>(
                                    <Form.Check
                                      required
                                      key={icon}
                                      inline
                                      name="group1"
                                      value={icon}
                                      onChange={this.handleChangeAvatar}
                                      className='text-start'
                                      type="radio"
                                      label={<Image roundedCircle style={{maxWidth:45}} src={icon} alt="avatar" />}
                                    />
                              ))}
                            </div>
                         </Form.Group>
                         
                        {/* error message  */}
                            {alertSignUp!==""&& (
                            <Alert 
                            className='p-2 text-center' 
                            variant={alertSignUp.includes("account")?"success":"danger"}>
                              {alertSignUp}
                            </Alert>
                            )}  

                          <Button
                          style={{fontWeight:"bold"}} 
                          className='border border-dark shadow rounded'
                          variant="success" 
                          type="submit">
                            Sign up
                          </Button>
                      </Form>
                    </Row>    
                  </Col>
                </Row>
               </Container>
            </Container>
        )
    }
}

function mapStateToProps ({ users }) {
    
  let usersNames = []
  for(const user in users){
    const userName = users[user].name
    usersNames.push(userName)
  }
    return {
      usersIDs: Object.keys(users),
      usersNames,
    }
  }
  
export default connect(mapStateToProps)(SignIn)