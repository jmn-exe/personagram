import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import '../App.css'
import postData from '../data/data.json'

const postTags = [
    {tag:'Diary',class:'t-diary'},
    {tag:'Journal',class:'t-journal'},
    {tag:'Fun',class:'t-fun'},
];

console.log(JSON.stringify(postData));
//let {id} = useParams();
//console.log(id);
//console.log(typeof(id));
function ShowPost(props){
    let post = postData.find(p => p.id === props.id);
    let initNote = post.note;
    let initTag = post.tag;
    const [sPostNote,setPostNote] = useState(initNote);
    const [sPostTag,setPostTag] = useState(initTag);
    const [isEdit,setIsEdit] = useState(0);
    if(post != null){
        return(
        <div className='post-view'>
            <div className='post-container'>
                <div className='post-box'>
                    <Link to={'/'}><div className="post-back-btn">← Back</div></Link>
                    <div className='img-view'>
                        <img src={post.image.url} alt={post.image.alt} />
                    </div>
                    <div className={'desc-view '+ (isEdit ? 'pv':'')}>
                        <div className='post-date'>Last edited - {getDate(post.datemodified)}</div>
                        <div className='post-tags'>
                            {post.tag.map(t => (
                                <Tag tag={t}/>
                            ))}
                        </div>
                        <div className='post-desc'>{post.note}</div>
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
                                savePost(post.id,sPostNote,sPostTag);
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
}

function savePost(id,note,tags){
    let postIndex = postData.findIndex(p => p.id === id)
    postData[postIndex].note = note;
    postData[postIndex].tag = tags;
    postData[postIndex].datemodified = JSON.stringify(Date.now());
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
            defaultChecked={props.tags.includes(t.tag)? true: false}/>
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

export default function PostView(){
    let {id} = useParams();
    return(
        <ShowPost id={parseInt(id)}/>
    )
}