import React, { useState } from 'react'

import FileBase64 from 'react-file-base64'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    Button, Input,
    MenuItem, Select, TextField
} from '@material-ui/core';

import { useDispatch } from 'react-redux'

import { updatePost } from '../action/post'

const tags = ["Fun", "Programming", "Health", "Science"];

const postSchema = yup.object().shape({
    title: yup.string().required(),
    subTitle: yup.string().required(),
    content: yup.string().min(20).required(),
    tag: yup.mixed().oneOf(tags),
});

const EditPostForm = ({ history, post, closeEditMode }) => {
    const dispatch = useDispatch();

    const [file, setFile] = useState(post?.image);

    const { register, handleSubmit, control, errors, reset } = useForm(
        {
            resolver: yupResolver(postSchema),
        }
    );

    const onSubmit = (data) => {
        const updatedPost = {
            _id: post._id,
            ...data,
            image: file,
        };
        dispatch(updatePost(post._id, updatedPost));

        reset();
        setFile(null);
        closeEditMode();
    };


    return (
        <div>
            <div>
                <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        id="title"
                        label="Başlık"
                        name="title"
                        variant="outlined"
                        size='small'
                        error={errors?.title ? true : false}
                        inputRef={register}
                        fullWidth
                        defaultValue={post?.title}
                    />
                    <TextField
                        className='mt-3'
                        id="subTitle"
                        label="Alt Başlık"
                        name="subTitle"
                        variant="outlined"
                        size='small'
                        inputRef={register}
                        error={errors?.subTitle ? true : false}
                        fullWidth
                        defaultValue={post?.subTitle}
                    />
                    <Controller
                        as={
                            <Select
                                input={<Input />}
                                fullWidth
                            >
                                {
                                    tags.map((tag, index) => (
                                        <MenuItem key={index} value={tag}>
                                            {tag}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        }
                        name="tag"
                        control={control}
                        error={errors?.tag ? true : false}
                        defaultValue={post?.tag}
                    />
                    <TextField
                        className='mt-3'
                        id="content"
                        label="içerik"
                        name="content"
                        multiline
                        minRows={4}
                        variant="outlined"
                        size='small'
                        error={errors?.content ? true : false}
                        inputRef={register}
                        fullWidth
                        defaultValue={post?.content}
                    />
                    <div className="mt-3">
                        <FileBase64 multiple={false} onDone={({ base64 }) => setFile(base64)} />
                    </div>
                    <div className='mt-3 d-flex justify-content-end'>
                        <Button variant='contained' color='primary' type='submit'>Kaydet</Button>
                        <Button style={{ marginLeft: "10px" }} variant='contained' color='inherit' onClick={closeEditMode}>Vazgeç</Button>
                    </div>
                </form>

            </div>
        </div>
    )
}
export default EditPostForm;

















//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// import React, { useState } from "react";
// import FileBase64 from "react-file-base64";
// import { useDispatch } from "react-redux";
// import { TextField, Select, Input, MenuItem, Button } from "@material-ui/core";
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { updatePost } from "../action/post";


// const tags = ["fun", "programming", "health", "science"];

// const postSchema = yup.object().shape({
//     title: yup.string().required(),
//     subtitle: yup.string().required(),
//     content: yup.string().min(20).required(),
//     tag: yup.mixed().oneOf(tags),
// });

// const EditPostForm = ({ history, post, closeEditMode }) => {
//     const dispatch = useDispatch();

//     const [file, setFile] = useState(post?.image);
//     const { register, handleSubmit, control, errors, reset } = useForm({
//         resolver: yupResolver(postSchema),
//     });

//     const onSubmit = (data) => {
//         const updatedPost = {
//             _id: post._id,
//             ...data,
//             image: file,
//         };
//         dispatch(updatePost(post._id, updatedPost));

//         reset();
//         setFile(null);
//         closeEditMode();
//     };

//     return (
//         <div>
//             <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
//                 <TextField
//                     id="title"
//                     label="Başlık"
//                     name="title"
//                     variant="outlined"
//                     size="small"
//                     inputRef={register}
//                     error={errors.title ? true : false}
//                     fullWidth
//                     defaultValue={post?.title}
//                 />
//                 <TextField
//                     id="subtitle"
//                     label="Alt Başlık"
//                     name="subtitle"
//                     variant="outlined"
//                     size="small"
//                     inputRef={register}
//                     error={errors.subtitle ? true : false}
//                     fullWidth
//                     defaultValue={post?.subtitle}
//                 />
//                 <Controller
//                     as={
//                         <Select input={<Input />} >
//                             {tags.map((tag, index) => (
//                                 <MenuItem key={index} value={tag}>
//                                     {tag}
//                                 </MenuItem>
//                             ))}
//                         </Select>
//                     }
//                     name="tag"
//                     control={control}
//                     error={errors.tag ? true : false}
//                     defaultValue={post?.tag}
//                 />
//                 <TextField
//                     id="content"
//                     label="İçerik"
//                     name="content"
//                     multiline
//                     size="small"
//                     inputRef={register}
//                     rows={4}
//                     variant="outlined"
//                     error={errors.content ? true : false}
//                     fullWidth
//                     defaultValue={post?.content}
//                 />
//                 <FileBase64 multiple={false} onDone={({ base64 }) => setFile(base64)} />
//                 <div >
//                     <Button color="primary" variant="outlined" onClick={closeEditMode}>
//                         Vazgeç
//                     </Button>{" "}
//                     <Button color="secondary" variant="outlined" type="submit">
//                         Kaydet
//                     </Button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default EditPostForm;