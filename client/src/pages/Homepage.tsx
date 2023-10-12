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

function sortLatest(data,setData,mode){
  let tempData:any[];
  if(mode){
    tempData = [...data].sort((a, b) => b.id - a.id)
  }else{
    tempData = [...data].sort((a, b) => a.id - b.id)
  }
  setData(tempData);
}

function sortLatestModified(data,setData,mode){
  let tempData:any[];
  if(mode){
    tempData = [...data].sort((a, b) => parseInt(b.datemodified) - parseInt(a.datemodified));
  }else{
    tempData = [...data].sort((a, b) => parseInt(a.datemodified) - parseInt(b.datemodified));
  }
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
  const [isSL,setIsSL] = useState(0);
  const [isSLM,setIsSLM] = useState(0);

  useEffect(()=>{
    fetch('/postdata').then(
      res=> res.json()
      ).then(data=>{
        if(data.length === 0){
          setIsEmpty(false);
        }else{
          //setPostData(data);
          sortLatestModified(data,setPostData,true);
        }
      })
  },[]);
    return(
    <>
    <div className='sort-filter'>
      <button className={(isSL == 1 || isSL == 2) ? "sort-selected" : ""} 
      onClick={(e)=>{
        if(isSLM > 0) setIsSLM(0);
        switch(isSL){
          case 0:
            setIsSL(1);
            break;
          case 1:
            setIsSL(2);
            break;
          case 2:
            setIsSL(1);
            break;
        }
        let mode = (isSL == 1 ? true : false);
        sortLatest(postData,setPostData,mode);
        //console.log(isSL);
      }}>Sort by Latest Added {isSL == 1 ? '↑' : (isSL == 2 ? '↓' : '')}</button>
      <button className={(isSLM == 1 || isSLM == 2) ? "sort-selected" : ""}
      onClick={()=>{
        if(isSL > 0) setIsSL(0);
        switch(isSLM){
          case 0:
            setIsSLM(1);
            break;
          case 1:
            setIsSLM(2);
            break;
          case 2:
            setIsSLM(1);
            break;
        }
        let mode = (isSLM == 1 ? true : false);
        sortLatestModified(postData,setPostData,mode);
      }}>Sort by Latest Modified {isSLM == 1 ? '↑' : (isSLM == 2 ? '↓' : '')}</button>
      <button onClick={()=>{
        setIsSL(0);
        setIsSLM(0);
        sortLatestModified(postData,setPostData,true);
      }}>Reset Sort</button>
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