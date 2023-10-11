import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import postData from '../data/data.json'

function Post(props){
    return(
      <div className='img-instance' key={props.postID}>
        <Link to={'/post/'+props.postID}>
            <img src={props.url} alt={props.alt}></img>
        </Link>
      </div>
    )
}

function ShowMain(){
    return(
      <div className="grid-center"> 
        <div className="grid-container">
          {postData.map((data)=> <Post postID={data.id} url={data.image.url}
          alt={data.image.alt}/>)}
        </div>
      </div>
    );
}

export default function Homepage(){
    return(
    <div className="grid-center">
        <div className="grid-container">
        {postData.map((data)=> <Post postID={data.id} url={data.image.url}
        alt={data.image.alt}/>)}
        </div>
        <Link to='/upload'><button className='upload-btn'>Upload</button></Link>
    </div>
    )
}