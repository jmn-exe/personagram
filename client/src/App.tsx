import React from 'react'
import {Component} from 'react'
import {useEffect, useState} from 'react'
import './App.css'
import postData from './data/data.json'

function Post(props){
  return(
    <div className='img-instance' key={props.postID} onClick={()=>OpenPost(props)}>
      <img src={props.url} alt={props.alt}></img>
    </div>
  )
}

function OpenPost(props){
  return(
    <div className='post-view'>
      <div className='dim-back'>
        <div className='post-box'>
          <div className="post-back-btn">← Back</div>
          <div className='img-view'>
            <img src="https://i.ytimg.com/vi/tzzgVtEAoqw/maxresdefault.jpg" alt="" />
          </div>
          <div className='desc-view'>
            <div className='post-date'>Last edited - 6:11PM 9/10/2023</div>
            <div className='post-tags'>
              <div>Diary</div>
              <div>Journal</div>
              <div>Fun</div>
            </div>
            <div className='post-desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut hendrerit felis. Cras eleifend consequat nunc nec placerat. Maecenas lobortis mauris sit amet est aliquet porta. Nulla eros risus, dictum sed nibh in, viverra vehicula nisl. Proin finibus metus sit amet nisl dapibus malesuada. Nulla facilisi. Suspendisse sed nisl et leo molestie posuere eu sit amet erat.</div>
            <div className='post-edit-btn'>Edit</div>
          </div>
        </div>
      </div>
    </div>
  );
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

export default class App extends Component{


  //const [backendData, setBackendData] : any[] = useState([{}]);
  render(){
    return(
      <div className='main-container'>
      <h1>PersonaGram</h1>
      <div className="grid-center">
        {/* 
        <div className="grid-container">
          {postData.map((data)=> <Post postID={data.id} url={data.image.url}
          alt={data.image.alt}/>)}
        </div>
        */}
      </div>
      <div className='post-view'>
        <div className='dim-back'>
          <div className='post-box'>
            <div className="post-back-btn" onClick={()=>ShowMain()}>← Back</div>
            <div className='img-view'>
              <img src="https://i.ytimg.com/vi/tzzgVtEAoqw/maxresdefault.jpg" alt="" />
            </div>
            <div className='desc-view'>
              <div className='post-date'>Last edited - 6:11PM 9/10/2023</div>
              <div className='post-tags'>
                <div>Diary</div>
                <div>Journal</div>
                <div>Fun</div>
              </div>
              <div className='post-desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut hendrerit felis. Cras eleifend consequat nunc nec placerat. Maecenas lobortis mauris sit amet est aliquet porta. Nulla eros risus, dictum sed nibh in, viverra vehicula nisl. Proin finibus metus sit amet nisl dapibus malesuada. Nulla facilisi. Suspendisse sed nisl et leo molestie posuere eu sit amet erat.</div>
              <div className='post-edit-btn'>Edit</div>
            </div>
          </div>
        </div>
      </div>
      
      </div>
    );
  }
}

