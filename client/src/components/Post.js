import React, { useEffect } from 'react'

import moment from 'moment'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'

import {
    Card,
    Chip,
    Button,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
} from '@material-ui/core'

import noImage from '../images/noimage.svg'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 374,
        position: "relative",
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundBlendMode: "darken",
    },

    overlay: {
        position: "absolute",
        top: "20px",
        left: "20px",
        color: "white",
    },
    chip: {
        marginTop: theme.spacing(1),
    },
}));

function Post({ _id, title, subTitle, content, tag, image, createdAt }) {
    const classes = useStyles();

    const convertRelativeTime = (date) => {
        return moment(date).fromNow();
    }

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={image || noImage}
                title="Resim"
            />
            <div className={classes.overlay}>
                <Typography variant="h6">Öztürk</Typography>
                <Typography variant="body2">
                    {
                        convertRelativeTime(createdAt)
                    }
                </Typography>
            </div>
            <CardContent>
                <Typography variant="h6" component="p" gutterBottom>{title?.substring(0, 40) + "..."}</Typography>

                <Typography variant="overline" component="p" gutterBottom>{subTitle}</Typography>
                <Typography variant="body2" component="p" gutterBottom>{content?.substring(0, 200) + "..."}</Typography>
                <Chip className={classes.chip} label={`# ${tag}`} variant='outlined' />
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" component={Link} to={`/posts/${_id}`}>Daha fazla..</Button>
            </CardActions>
        </Card>
    )
}

export default Post
