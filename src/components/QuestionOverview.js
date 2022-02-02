import React, { Component } from 'react'
import { Button, Col, Image, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class QuestionOverview extends Component {
    render() {
        const {name , selectedOption , avatarURL, Answered, qID } = this.props
        
        return (
            <Row style={{maxWidth:700}} className='border border-dark rounded bg-light pb-3 my-3 mx-auto'>
                <h4 className='bg-dark py-2 px-5 text-light'>{name} {Answered?<span>asked:-</span>:<span>asks:-</span>}</h4>
                <Col className='text-center' md={4}>
                    <Image style={{maxWidth:100}} src={avatarURL} roundedCircle alt="avatar"/>
                </Col>
                
                <Col className='text-center border-start' md={8}>
                    <h5 className='text-capitalize'> would you rather </h5>
                    <p className='text-muted'>{selectedOption}, OR .....</p>
                    <Button variant='outline-dark'>
                        <Link
                            className='text-decoration-none poll'  
                            to={{pathname:`/would-you-rather-starter/questions/${qID}`}}>
                            View Poll 
                        </Link>
                    </Button>
                </Col>
                
            </Row>
        )
    }
}

export default connect()(QuestionOverview)
