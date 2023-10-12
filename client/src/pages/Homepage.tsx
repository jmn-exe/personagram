import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
//import postData from '../data/data.json'

function Post(props){
    return(
      <div className='img-instance'>
        <Link to={'/post/'+props.postID}>
            <img src={props.url} alt={props.alt}></img>
        </Link>
      </div>
    )
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

function sortLatest(data,setData){
  const tempData = [...data].sort((a, b) => b.id - a.id);
  setData(tempData);
}

function sortLatestModified(data,setData){
  const tempData = [...data].sort((a, b) => parseInt(b.datemodified) - parseInt(a.datemodified));
  setData(tempData);
}

export default function Homepage(){
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
  let [postData,setPostData] = useState([initPost]);
  useEffect(()=>{
    fetch('/postdata').then(
      res=> res.json()
      ).then(data=>{
        setPostData(data);
      })
  },[]);
    return(
    <>
    <div className='sort-filter'>
      <button onClick={()=>sortLatest(postData,setPostData)}>Sort by Latest Added</button>
      <button onClick={()=>sortLatestModified(postData,setPostData)}>Sort by Latest Modified</button>
    </div>
    <div className="grid-center">
      {(postData[0].id === -1)? (<p>Loading...</p>) :
      (
        <>
        <div className="grid-container">
        {postData.map((data)=> <Post postID={data.id} url={data.image.url}
        alt={data.image.alt}
        key={data.id}/>)}
        </div>
        <Link to='/upload'><button className='upload-btn'>Upload</button></Link>
        </>
      )
      }
    </div>
    </>
    
    )
}