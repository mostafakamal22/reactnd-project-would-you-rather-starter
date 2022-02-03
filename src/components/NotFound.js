import React from 'react'
import { Alert, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export default function NotFound() {
    return (
        <Container className='border border-1 border-dark shadow rounded mt-5 p-3'>
            <Row style={{maxWidth:700}} className='text-center mx-auto'>
                <Alert style={{fontWeight:"bold"}} variant='danger'>
                    <h1>404 - Not Found!</h1>
                    <Link to="/would-you-rather-starter/">Go Home</Link>
                </Alert>
            </Row>
        </Container>
    )
}
