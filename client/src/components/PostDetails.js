import React, { useEffect, useState } from 'react'

import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import {
    Typography,
    Paper,
    Divider,
    Button, Chip
} from '@material-ui/core';

import { Edit, Delete } from '@material-ui/icons';
import noImage from '../images/noimage.svg';
import { fetchSinglePost, deletePost } from "../action/post"
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';

import EditPostForm from './EditPostForm';



const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
        marginBottom: theme.spacing(8),
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
    },
    content: {
        marginTop: theme.spacing(3),
    },
    image: {
        display: "block",
        width: "50%",
        height: "auto",
        marginLeft: "auto",
        marginRight: "auto",
        boxShadow: theme.shadows[10],
        borderRadius: 5,
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(4),
    },
    chip: {
        marginTop: theme.spacing(1),
    },
}));

function PostDetails() {
    //{ match, history, location }
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { id } = useParams();
    const currentPost = useSelector((state) => state.posts.currentPost);

    const [editMode, setEditMode] = useState(false);

    const openEditMode = () => {
        setEditMode(true);
    }

    const closeEditMode = () => {
        setEditMode(false);
    }

    useEffect(() => {
        dispatch(fetchSinglePost(id));
    }, [dispatch, id]);

    const classes = useStyles();


    const convertRelativeTime = (date) => {
        return moment(date).fromNow();
    }

    const removePost = () => {
        dispatch(deletePost(currentPost._id));
        navigate("/posts");
    }

    return (
        <>
            {!currentPost ?
                <div className='d-flex justify-content-center'>
                    <RotatingLines
                        strokeColor='#000'
                        visible={true}
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="100px"
                    />
                </div>
                : null
            }


            <Paper className={classes.paper} elevation={0}>
                {
                    editMode ?
                        <EditPostForm post={currentPost} closeEditMode={closeEditMode} />
                        : <div>
                            <div>
                                <div className={classes.header}>
                                    <Typography variant="h5" gutterBottom>
                                        {
                                            currentPost?.title
                                        }
                                    </Typography>
                                    <div>
                                        <Button color='primary' variant='outlined' startIcon={<Edit />} onClick={openEditMode}>Düzenle</Button>
                                        <Button style={{ marginLeft: "10px" }} color='secondary' variant='outlined' startIcon={<Delete />} onClick={removePost}>Sil</Button>
                                    </div>
                                </div>
                            </div>

                            <Divider />
                            <Typography variant="overline" color="textSecondary">
                                {
                                    currentPost?.subTitle
                                }
                            </Typography>

                            <Typography variant="caption" color="textSecondary" gutterBottom>
                                {convertRelativeTime(currentPost?.createdAt)} by Öztürk
                            </Typography>

                            <Chip className={classes.chip} label={`# ${currentPost?.tag}`} variant='outlined' />

                            <div className={classes.content}>
                                <img className={classes.image} src={currentPost?.image || noImage} alt="img" />
                                <Typography variant="body1" gutterBottom>
                                    {currentPost?.content}
                                </Typography>
                            </div>
                        </div>
                }
            </Paper>
        </>
    )
}

export default PostDetails;
