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
    const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0)
    const [userLike, setUserLike] = useState(tweet.userLike === true ? true : false)
    const className = props.className ? props.className: 'btn btn-primary btn-sm'
    const actionDislplay = action.display ? action.display : 'Action'
    const handleClick = (event) => {
      event.preventDefault()
      if (action.type === 'like') {
        if(userLike === true){
          // perhaps i unliked it?
          setLikes(likes - 1)
          setUserLike(false)
        }else {
          setLikes( likes + 1)
          setUserLike(true)
        }
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