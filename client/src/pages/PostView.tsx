import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import '../App.css'
//import postData from '../data/data.json'
//import postTags from '../data/tags.json'
import fs from 'fs';

const postTags = [
    {tag:'Diary',class:'t-diary'},
    {tag:'Journal',class:'t-journal'},
    {tag:'Fun',class:'t-fun'},
];

function ShowPost({id,img,note,datemodified,taglist}){
    const initNote = note;
    const initTag = taglist;
    const [sPostNote,setPostNote] = useState(initNote);
    const [sPostTag,setPostTag] = useState(initTag);
    const [isEdit,setIsEdit] = useState(0);
    console.log("tag:");
    console.log(sPostTag);
    return(
    <div className='post-view'>
        <div className='post-container'>
            <div className='post-box'>
                <Link to={'/'}><div className="post-back-btn">← Back</div></Link>
                <div className='img-view'>
                    <img src={img.url} alt={img.alt} />
                </div>
                <div className={'desc-view '+ (isEdit ? 'pv':'')}>
                    <div className='post-date'>Last edited - {getDate(datemodified)}</div>
                    <div className='post-tags'>
                        {sPostTag.map(t => (
                            <Tag tag={t}/>
                        ))}
                    </div>
                    <div className='post-desc'>{sPostNote}</div>
                    <button
                    className='post-edit-btn'
                    onClick={()=>setIsEdit(1)}
                    >Edit</button>
                </div>
                <div className={'desc-edit ' + (isEdit ? '':'pv')}>
                    <div className='tags-select'>
                        <TagSelector tags={sPostTag} func={setPostTag}/>
                    </div>
                    <textarea className='post-desc' 
                    value={sPostNote}
                    onChange={(t)=> setPostNote(t.target.value)}
                    ></textarea>
                    <div className='edit-confirm'>
                        <button 
                        className='save-edit' 
                        onClick={()=> {
                            savePost(id,sPostNote,sPostTag);
                            setIsEdit(0);
                        }}>
                        Save
                        </button>
                        <button className='cancel-edit' onClick={()=>{
                            const confirmation = window.confirm("Discard changes?");
                            if(confirmation){
                                setPostNote(initNote);
                                setPostTag(initTag);
                                setIsEdit(0);
                            }
                        }}>Cancel</button>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    )
}

function savePost(id,note,tags){
    /*
    let postIndex = postData.findIndex(p => p.id === id)
    postData[postIndex].note = note;
    postData[postIndex].tag = tags;
    postData[postIndex].datemodified = JSON.stringify(Date.now());*/
}

function getDate(date){
    if(typeof(date) == "string"){
        date = parseInt(date);
    }
    let d = new Date(date);
    let locale = d.toLocaleString();
    let splitDate = locale.split(", ");
    return(splitDate[1]+" "+splitDate[0]);
}

function Tag(props){
    let postTag = postTags.find(pt => pt.tag === props.tag);
    let tagName = postTag.tag;
    let tagClass = postTag.class;

    return(
        <div key={tagName}className={tagClass}>{tagName}</div>
    )
}

function TagSelector(props){
    console.log(props.tags);
    console.log(props.tags.includes('Diary'));
    let tagList = postTags.map(t => {
        return(
            <label key={t.tag} className={t.class+" .tag-select"}>{t.tag}
            <input 
            key={t.tag}
            type='checkbox' 
            id={t.tag} 
            name={t.tag} 
            value={t.tag}
            onChange={(e)=>handleCheckbox(e,props.tags,props.func)}
            checked={props.tags.includes(t.tag)? true: false}/>
            </label>
        );
    });
    return(
        <>
        {tagList}
        </>
    );
}
function handleCheckbox(e,tags,setTags) {
    if (e.target.checked) {
        setTags([...tags, e.target.value]);
    } else {
        setTags(tags.filter((item) => item !== e.target.value));
    }
}

type Post = {
    id: any;
    image: {
        alt:any;
        url:any;
    };
    note:any;
    tag:any[];
    datemodified:any;
}

export default function PostView(){
    let initPost={
        id:-1,
        image:{
            alt:'',
            url:''
        },
        note:'',
        tag:[],
        datemodified:''
    }
    const [sp,setSelectedPost] = useState(initPost);
    const {id} = useParams();
    useEffect(()=>{
        fetch('/post/'+id).then(
            res => res.json()
        ).then(data=>{
            setSelectedPost(data);
        })
    },[]);
    console.log(sp);
    return(
        <>
        {(sp.id === -1) ? 
            (<p>Loading...</p>)
            :
            (<ShowPost 
        id={sp.id}
        img={sp.image}
        datemodified={sp.datemodified}
        note={sp.note}
        taglist={sp.tag}
        />)}
        </>
    )
}