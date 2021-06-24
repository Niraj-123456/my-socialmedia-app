import React, { useState, useEffect, useContext } from 'react'
import WritePost from './WritePost'
import ViewPost from './ViewPost'
import db from '../../firebase'
import { AuthContext } from '../../features/useAuth'
import { useHistory } from 'react-router-dom'

function Posts() {
    const [post, setPost] = useState([])
    const { user } = useContext(AuthContext);
    const dateAdded = new Date().toDateString();
    const [postBody, setPostBody] = useState('');
    const [id, setId] = useState('');
    const history = useHistory();

    useEffect(() => {
        db.collection('posts').orderBy("addedDate", "desc").onSnapshot((snapshot) => {
            setPost(
                snapshot.docs.map((doc) => {
                    return {id: doc.id, ...doc.data()}
                })
            )
        })  
    }, [])
    console.log(post);

    const handleChange = (e) => {
        setPostBody(e.target.value)
    }

    const handlePostSubmit = (e) => {
        e.preventDefault();
        try {
            if (id === '') {
                db.collection('posts').add({
                    addedDate: dateAdded,
                    commentCounts: 0,
                    likeCounts: 0,
                    post: postBody,
                    user_id: user.uid,
                    user: user.displayName,
                    photoURL: user.photoURL
                }).then(() => {
                    setPostBody('')
                }).catch((error) => {
                    console.log(error.message);
                })
            } else {
                db.collection('posts').doc(id).update(
                    {post: postBody}
                ).then(() => {
                    setPostBody('')
                    setId('')
                }).catch((error) => {
                    console.log(error.message);
                })
            }
        } catch(error) {
            console.log('Something when wrong');
            setPostBody('')
        }      
    }

    const updatePost = (id) => {
            db.collection('posts').doc(id).get()
            .then((snapshot) => {
                setPostBody(snapshot.data().post)       
                setId(snapshot.id)
            })
    }

    const deletePost = (id) => {
        db.collection('posts').doc(id).delete()
        .then(() => {
            console.log(`Post with id ${id} deleted successfully`)
            history.push('/dashboard')
        }).catch((error) => {
            console.log(error.message)
        })
    }

    const viewPost = !post ? '' : post.map((postData) => {
        return (
            <ViewPost key={postData.id} post={postData} user={user} onDeletePost={deletePost} onUpdatePost={updatePost} />
        )
    })

    return (
        <div>
            <WritePost body={postBody} handleChange={handleChange} onSubmit={handlePostSubmit} id={id}/>
            {
                viewPost
            }
        </div>
    )
}

export default Posts
