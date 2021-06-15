import React, { useState } from 'react'

function WritePost() {

    const [postBody, setPostBody] = useState('');

    const handleChange = (e) => {
        setPostBody(e.target.value)
    }

    const handleClick = () => {
        console.log(postBody)
    }

    return (
        <div className="container mt-5">
            <div className="card text-white mb-3 col-md-8 offset-2">
                <div className="card-header bg-primary">Write Your Post</div>
                <textarea value={postBody} className="form-control" placeholder="Enter your post here..." rows="3"
                onChange={handleChange}></textarea>
            </div>
            <button className="btn btn-primary my-2" onClick={handleClick}>Post</button>
        </div>
    )
}

export default WritePost
