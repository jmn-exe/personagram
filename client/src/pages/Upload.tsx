import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import postData from '../data/data.json'
import postTags from '../data/tags.json'

export default function Upload(){
    const [imgPreview,setImgPreview]:any = useState('');
    const reader = new FileReader();
    reader.onload = () => {      
        setImgPreview(reader.result);
    }
    return(
        <div className='post-container'>
            <form method="post" className='post-upload'>
            <Link to={'/'}><div className="post-back-btn">← Back</div></Link>
                <div className='img-upload'>
                    <img src={imgPreview} className={imgPreview===''? "img-view-hide":""}></img>
                    <input type="file" name="img" id="img" accept="image/png, image/jpeg"
                    onChange={(e)=>{
                        setImgPreview(reader.readAsDataURL(e.target.files[0]));
                    }}/>
                </div>
                <div className='upload-form'>
                    <div className='upload-tags'><InputTag/></div>
                    <textarea className='post-desc'></textarea>
                    <button type='submit'>Upload</button>
                </div>
            </form>
        </div>
    )
}

function InputTag(){
    let listTag = postTags.map((t)=>{
        let tag = t.tag;
        return(
        <label key={tag} className={t.class+" tag-select"}>{tag}
        <input key={tag} type="checkbox" name={tag} value={tag}/>
        </label>
        );
    });
    return(
        <>{listTag}</>
    )
}
