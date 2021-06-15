import React from 'react'

function ViewPost(props) {
    return (
        <div className="container mt-5">
            <div className="card mb-3 offset-1" style={{maxWidth: '940px'}}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="https://phillipbrande.files.wordpress.com/2013/10/random-pic-14.jpg" alt="..." style={{width: '100%', height: '100%'}} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{props.post.user}</h5>
                            <p className="card-text">{props.post.post}</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                        <button className="btn btn-primary btn-sm mx-1">Like <span>{props.post.likeCounts}</span></button>
                        <button className="btn btn-primary btn-sm">Comment <span>{props.post.commentCounts}</span></button>
                        <button className="btn btn-primary btn-sm mx-1">Share</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewPost
