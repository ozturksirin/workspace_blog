import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Container, Nav, Row, Col } from 'react-bootstrap'
import {
    BrowserRouter,
    Routes, // instead of "Switch"
    Route,
    Navigate,
} from "react-router-dom";

import { Edit } from '@material-ui/icons';

import PostsList from './components/PostsLists'
import AddPostForm from './components/AddPostForm'

import { Button } from '@material-ui/core';

import { fetchPosts } from './action/post.js'
import PostDetails from './components/PostDetails';
const App = () => {
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch])

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    return (
        <>
            <Container>
                <Nav variant='light' className='mb-5 mt-4' style={{ background: "#ffff" }}>
                    <Nav.Item className='d-flex'>
                        <Nav.Link href="http://localhost:3000/posts">Blogify</Nav.Link>
                        <Button variant="outlined" startIcon={<Edit />} onClick={handleOpen} >YENİ YAZI</Button>

                    </Nav.Item>
                </Nav>

                <Row>
                    <Col xs={12}>
                        <BrowserRouter>
                            <Routes>
                                <Route exact path="/posts" element={<PostsList />} />
                                <Route exact path="/posts/:id" element={<PostDetails />} />
                                <Route path="/" element={<Navigate replace to="/posts" />} />
                            </Routes>
                        </BrowserRouter>
                    </Col>
                </Row>
            </Container>
            <AddPostForm open={open} handleClose={handleClose} />
        </>
    )
}

export default App;
