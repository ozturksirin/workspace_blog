import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core'

import { useSelector } from 'react-redux'
import { Grid, Button } from '@material-ui/core'
import Post from './Post'
import gridFour from '../images/grid_four.svg'
import gridThree from '../images/grid_three.svg'


import { RotatingLines } from 'react-loader-spinner'

const useStyles = makeStyles((theme) => ({
    layoutsShifter: {
        float: 'right',
        marginTop: theme.spacing(2),
    }

}));


function PostsLists() {
    const posts = useSelector((state) => state.posts.posts);
    const [layout, setLayout] = useState(gridThree);

    const calculetMd = () => {
        if (layout === gridThree) {
            return 4;
        } else {
            return 3;
        }
    }


    const classes = useStyles();
    return (
        <>
            {
                posts.length <= 0 ?
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

            {/* layouts shifter */}
            < div className={classes.layoutsShifter} >
                <Button variant='text' size='small' onClick={() => setLayout(gridThree)}>
                    <img src={gridThree} alt="gridThree" style={{ background: layout === "gridThree" ? "#ccc" : "" }} />
                </Button>

                <Button variant='text' size='small' onClick={() => setLayout(gridFour)}>
                    <img src={gridFour} alt="gridFour" style={{ background: layout === "gridThree" ? "#ccc" : "" }} />
                </Button>
            </div >
            <Grid container spacing={2} alignContent='stretch'>
                {
                    posts.length > 0 &&
                    posts.map((post) => (
                        <Grid item key={post?.id} xs={12} md={calculetMd()}>
                            <Post {...post} />
                        </Grid>
                    ))
                }
            </Grid>
        </>
    )
}

export default PostsLists
