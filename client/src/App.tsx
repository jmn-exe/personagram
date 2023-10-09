import * as React from 'react'
import {useEffect, useState} from 'react'
import './App.css'
import postData from './data/data.json'

function Post(props){
  return(
    <div className='img-instance' key={props.postID} onClick={()=>OpenPost(props.postID)}>
      <img src={props.url} alt={props.alt}></img>
    </div>
  )
}

function OpenPost(id){
  postData.map((data)=>{
    if(data.id == id){

    }
  })
}

function App() {
  console.log(typeof(postData));
  const [backendData, setBackendData] : any[] = useState([{}]);
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


function fetchData(){

}

export default App;
