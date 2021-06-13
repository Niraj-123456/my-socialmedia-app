import React from 'react'

function ViewPost() {
    return (
        <div className="viewpost-wrapper">
            <div className="main-viewpost d-flex align-items-center">
                <i className="fas fa-user-circle mx-2"></i>
                <p>This is a users post...</p>
            </div>
            <div className="user-comments">
                This is comment section
            </div>
        </div>
    )
}

export default ViewPost
