import React from 'react'

function Posts() {
    return (
        <div class="post-wrapper">
            <div className="post-body">
                <div className="post-header">
                    Write Your Status
                </div>
                <div className="post-text">
                    <textarea class="form-control" placeholder="Write your post here..." rows="3"></textarea>
                </div>
                <button className="btn btn-primary my-1 float-end">Post</button>
            </div>
        </div>
    )
}

export default Posts
