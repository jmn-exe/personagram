import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import '../App.css'
import postData from '../data/data.json'

const postTags = [
    {tag:'Diary',class:'t-diary'},
    {tag:'Journal',class:'t-journal'},
    {tag:'Fun',class:'t-fun'},
]

//console.log(JSON.stringify(postData));
//let {id} = useParams();
//console.log(id);
//console.log(typeof(id));
function ShowPost(props){
    let post = postData.find(p => p.id === props.id);
    if(post != null){
        return(
        <div className='post-view'>
            <div className='post-container'>
                <div className='post-box'>
                    <Link to={'/'}><div className="post-back-btn">← Back</div></Link>
                    <div className='img-view'>
                        <img src={post.image.url} alt={post.image.alt} />
                    </div>
                    <div className='desc-view pv'>
                        <div className='post-date'>Last edited - {getDate(post.datemodified)}</div>
                        <div className='post-tags'>
                            {post.tag.map(t => (
                                <Tag tag={t}/>
                            ))}
                        </div>
                        <div className='post-desc'>{post.note}</div>
                        <div className='post-edit-btn'>Edit</div>
                    </div>
                    <div className='desc-edit'>
                        <div className='tags-select'>
                            <TagSelector tags={post.tag}/>
                        </div>
                        <div className='post-desc'>{post.note}</div>
                        <div className='post-edit-btn'>Edit</div>
                    </div>
                </div>
            </div>
        </div>
        )
    } 
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
            <label className={t.class+" .tag-select"}>{t.tag}
            <input 
            type='checkbox' 
            id={t.tag} 
            name={t.tag} 
            value={t.tag}
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

export default function PostView(){
    let {id} = useParams();
    return(
        <ShowPost id={parseInt(id)}/>
    )
}