import React, { useState, useEffect } from 'react'
import WritePost from './WritePost'
import ViewPost from './ViewPost'
import db from '../../firebase'

function Posts() {
    const [post, setPost] = useState([])

    useEffect(() => {
        db.collection('posts').orderBy("addedDate", "desc").onSnapshot((snapshot) => {
            setPost(
                snapshot.docs.map((doc) => {
                    return {id: doc.id, ...doc.data()}
                })
            )
        })  
    }, [])

    return (
        <div>
            <WritePost />
            {
                !post ? ' ' : post.map((postData) => {
                    return (
                    <ViewPost key={postData.id} post={postData}/>
                    )
                })   
            }
            
        </div>
    )
}

export default Posts
