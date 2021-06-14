import React from 'react'

function WritePost() {
    return (
        <div className="post-wrapper">
            <div className="post-body">
                <div className="post-header">
                    Write Your Status
                </div>
                <div className="post-text">
                    <textarea className="form-control" placeholder="Write your post here..." rows="3"></textarea>
                </div>
                <button className="btn btn-primary my-2 float-end">Post</button>
            </div>
        </div>
    )
}

export default WritePost
