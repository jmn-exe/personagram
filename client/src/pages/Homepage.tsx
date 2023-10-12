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
  const [isEmpty,setIsEmpty] = useState(true);
  const [postData,setPostData] = useState([initPost]);
  useEffect(()=>{
    fetch('/postdata').then(
      res=> res.json()
      ).then(data=>{
        if(data.length === 0){
          setIsEmpty(false);
        }else{
          setPostData(data);
        }
      })
  },[]);
    return(
    <>
    <div className='sort-filter'>
      <button onClick={()=>sortLatest(postData,setPostData)}>Sort by Latest Added</button>
      <button onClick={()=>sortLatestModified(postData,setPostData)}>Sort by Latest Modified</button>
    </div>
    <div className="grid-center">
      {(postData[0].id === -1 && isEmpty) ? (<p>Loading...</p>) :
      ((!isEmpty)?(
        <div className="grid-container">
          <p>Your gallery is empty</p>
          <Link to='/upload'><button className='upload-btn'>Upload</button></Link>
        </div>
      ) : (
      <>
        <div className="grid-container">
        {postData.map((data)=> <Post postID={data.id} url={data.image.url}
        alt={data.image.alt}
        key={data.id}/>)}
        </div>
        <Link to='/upload'><button className='upload-btn'>Upload</button></Link>
        </>)
      )
      }
    </div>
    </>
    
    )
}