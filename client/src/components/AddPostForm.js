import React, { useState } from 'react'

import FileBase64 from 'react-file-base64'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    Button, Dialog,
    DialogActions, DialogContent,
    DialogContentText,
    DialogTitle, Input,
    MenuItem, Select, TextField
} from '@material-ui/core';

import { useDispatch } from 'react-redux'

import { createPost } from '../action/post'

const tags = ["Fun", "Programming", "Health", "Science"];

const postSchema = yup.object().shape({
    title: yup.string().required(),
    subTitle: yup.string().required(),
    content: yup.string().min(20).required(),
    tag: yup.mixed().oneOf(tags),
});

const AddPostForm = ({ open, handleClose }) => {
    const dispatch = useDispatch();

    const [file, setFile] = useState(null);

    const { register, handleSubmit, control, errors, reset } = useForm(
        {
            resolver: yupResolver(postSchema),
        }
    );
    const onSubmit = (data) => {
        //dispatch create post action
        dispatch(createPost({ ...data, image: file }));
        clearForm();
    }


    const clearForm = () => {
        reset();
        setFile(null);
        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle> Yeni yazı oluştur</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Yeni bir yazı eklemek için aşağıdaki formu doldurunuz.
                </DialogContentText>
                <div>
                    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            id="title"
                            label="Başlık"
                            name="title"
                            variant="outlined"
                            size='small'
                            error={errors?.title ? true : false}
                            inputRef={register}
                            fullWidth
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
                            defaultValue={tags[0]}
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
                        />
                        <div className="mt-3">
                            <FileBase64 multiple={false} onDone={({ base64 }) => setFile(base64)} />
                        </div>
                    </form>
                </div>
            </DialogContent>
            <DialogActions>
                <Button color='inherit' onClick={clearForm}>Vazgeç</Button>
                <Button type='submit' variant='outlined' color='primary' onClick={() => handleSubmit(onSubmit)()}>Yayınla</Button>
            </DialogActions>
        </Dialog>


    )
}

export default AddPostForm
