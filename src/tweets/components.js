import React, {useEffect, useState} from "react";
import {load_tweets} from '../lookup';


  export function TweetsList() {
    const [tweets, setTweets] = useState([])

    useEffect(() => {
      // do my lookup
      const myCallback = (response, status) =>{
        // console.log(response, status)
        if(status === 200) {
          setTweets(response)
        }else {
          alert("There was an error")
        }
      }
      load_tweets(myCallback)

    }, [])
    return tweets.map((item,index)=>{
              return <Tweet tweet={item} className='my-5 py-5 border bg-white text-dark' key={`${index}-{item.id}`}/>
            })
  }

  export function ActionBtn(props) {
    const {tweet, action} = props
    const className = props.className ? props.className: 'btn btn-primary btn-sm'
    const actionDislplay = action.display ? action.display : 'Action'
    let likes = tweet.likes
    const handleClick = (event) => {
      event.preventDefault()
      if (action.type === 'like') {
        console.log(tweet.likes+1)
        likes = tweet.likes+1
      }
    }
    const display = action.type === 'like' ? `${likes} ${actionDislplay}` : actionDislplay
    return <button className={className} onClick={handleClick}>{display}</button>
  }

  export function Tweet(props) {
    const {tweet}= props
    const className = props.className ? props.className: 'col-10 mx-auto col-md-6'
    return <div className={className}>
      <p>{tweet.id} - {tweet.content}</p>
      <div className='btn btn-group'>
        <ActionBtn tweet={tweet} action={{type:"retweet", display:"Retweet"}}/>
        <ActionBtn tweet={tweet} action={{type:"like", display:"Likes"}}/>
        <ActionBtn tweet={tweet} action={{type:"unlike", display:"Unlike"}}/>
      </div>
    </div>
  }