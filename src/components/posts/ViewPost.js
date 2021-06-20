import React from 'react'

function ViewPost(props) {

    return (
        <div className="container mt-5">
            { props.post.post === 'null' ? 
            <ul className="list-group">
                <li className="list-group-item list-group-item-success">There is no post to show!!!</li>
            </ul>        
            :
            <div className="card mb-3 offset-1" style={{maxWidth: '940px'}}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={props.post.photoURL ? props.post.photoURL : 'https://media.istockphoto.com/photos/cat-with-blue-eyes-looks-at-camera-picture-id1067347086?k=6&m=1067347086&s=612x612&w=0&h=aHrE1UPUHnRFESfIXNCT5uZg14Yus0LaYkK6YkLANOU='} alt="..." style={{width: '100%', height: '100%'}} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title text-uppercase">{props.post.user ? props.post.user : 'Anonymous'}</h5>
                            <p className="card-text">{props.post.post}</p>
                            <p className="card-text"><small className="text-muted">{props.post.addedDate}</small></p>
                        </div>
                        <div className="fs-4">
                            <a href="#" className="btn btn-light"><i className="far fa-thumbs-up fs-3"></i></a><span>{props.post.likeCounts}</span>
                            <a href="#" className="btn btn-light"><i className="far fa-comments fs-3"></i></a><span>{props.post.commentCounts}</span>
                            <a href="#" className="btn btn-light"><i className="fas fa-share fs-3"></i></a>
                        </div>
                        {
                            props.user.uid && props.post.user_id === props.user.uid ? 
                            <div>
                                <button className="btn btn-sm btn-secondary m-2">Edit</button>
                                <button className="btn btn-sm btn-danger m-2" onClick={() => props.onDeletePost(props.post.id)}>Delete</button>
                            </div>
                            :
                            ' '
                        }
                    </div>
                </div>
            </div>    
        }
        </div>
    )
}

export default ViewPost
