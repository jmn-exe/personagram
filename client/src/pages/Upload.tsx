import React from 'react'
import { useState } from 'react'
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom'
import '../App.css'
import postTags from '../data/tags.json'

export default function Upload(){
    const [imgSrc,setImgSrc]:any = useState('');
    const [imgFile,setImgFile]:any = useState('')
    const [tagList,setTagList] = useState([]);
    const [note,setNote] = useState('');
    const reader = new FileReader();
    reader.onload = () => {      
        setImgSrc(reader.result);
    }
    return(
        <div className='post-container'>
            <form className='post-upload' onSubmit={e=>validateForm(e,imgFile,tagList,note)}>
            <Link to={'/'}><div className="post-back-btn">← Back</div></Link>
                <div className='img-upload'>
                    <img src={imgSrc} className={imgSrc===''? "img-view-hide":""}></img>
                    <input type="file" name="img" id="img" accept="image/png, image/jpeg" formEncType="multipart/form-data"
                    onChange={(e)=>{
                        setImgFile(e.target.files[0]);
                        setImgSrc(reader.readAsDataURL(e.target.files[0]));
                    }}/>
                </div>
                <div className='upload-form'>
                    <div className='upload-tags'><InputTag tags={tagList} func={setTagList}/></div>
                    <textarea className='post-desc'
                    onChange={e=>setNote(e.target.value)}></textarea>
                    <button type='submit'>Upload</button>
                </div>
            </form>
        </div>
    )
}

function validateForm(e,imgFile,tagList,pNote){

    e.preventDefault();
    if(imgFile === ''){
        window.alert('Please upload an image!');
    }
    else if(tagList.length <= 0){
        window.alert('Please select atleast one tag!')
    }else{
        let formData = new FormData();
        formData.append('image',imgFile);
        formData.append('tag',tagList);
        formData.append('notes',pNote);
       /*let formData = {
        img:imgFile,
        tag:tagList,
        notes:pNote
       }*/
        fetch('/uploadpost',{
            method:'POST',
            body: formData
        }).then(res => res.json()
        ).then(
            data => {
                if(data){
                    window.alert("Uploaded!");
                    window.location.href = "/";
                }

            }
        )
    }
}

function InputTag({tags,func}){
    let listTag = postTags.map((t)=>{
        let tag = t.tag;
        return(
        <label key={tag} className={t.class+" tag-select"}>{tag}
        <input key={tag} type="checkbox" name={tag} value={tag}
        onChange={(e)=>{
            if(e.target.checked) func([...tags,e.target.value])
            else func(tags.filter(t => t !== e.target.value))
        }}/>
        </label>
        );
    });
    return(
        <>{listTag}</>
    )
}

