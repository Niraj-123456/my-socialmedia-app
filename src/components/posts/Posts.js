import React, { useState, useEffect, useContext } from 'react'
import WritePost from './WritePost'
import ViewPost from './ViewPost'
import db from '../../firebase'
import { AuthContext } from '../../features/useAuth'

function Posts() {
    const [post, setPost] = useState([])
    const { user } = useContext(AuthContext);
    const dateAdded = new Date().toDateString();
    const [postBody, setPostBody] = useState('');

    useEffect(() => {
        db.collection('posts').orderBy("addedDate", "desc").onSnapshot((snapshot) => {
            setPost(
                snapshot.docs.map((doc) => {
                    return {id: doc.id, ...doc.data()}
                })
            )
        })  
    }, [])

    const handleChange = (e) => {
        setPostBody(e.target.value)
    }

    const handlePostSubmit = (e) => {
        e.preventDefault();
            db.collection('posts').add({
                addedDate: dateAdded,
                commentCounts: 2,
                likeCounts: 3,
                post: postBody,
                user_id: user.uid,
                user: user.displayName,
                photoURL: user.photoURL
            }).then(() => {
                setPostBody('')
            }).catch((error) => {
                console.log(error.message);
            })
    }

    return (
        <div>
            <WritePost body={postBody} handleChange={handleChange} onSubmit={handlePostSubmit}/>
            {
                post.map((postData) => {
                    return (
                    <ViewPost key={postData.id} post={postData} user={user}/>
                    )
                })
            }
        </div>
    )
}

export default Posts
