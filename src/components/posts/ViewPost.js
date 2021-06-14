import React from 'react'

function ViewPost() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 my-5 offset-2 shadow rounded">  
                    <div className="row">
                        <div className="col d-flex">
                            <i className="fas fa-user-circle mx-2 p-3"></i>
                            <p className="lead p-2">John Doe <small className="text-muted fs-6">- posted 1 min ago</small></p>
                        </div>
                        <div className="row">
                            <div className="col-md-11 ms-5 px-2">
                                <p className="fs-6">Adipisicing sunt irure Lorem proident labore sint. Labore nisi reprehenderit voluptate sunt mollit incididunt id sit dolore consectetur excepteur et culpa dolore. Sunt aliqua culpa minim eu non.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row gx-5">
                        <div className="col-md-4 offset-8">
                            <button className="btn btn-primary btn-sm me-1">Like <span>0</span></button>
                            <button className="btn btn-primary btn-sm me-1">Comment <span>0</span></button>
                            <button className="btn btn-primary btn-sm">Share</button>
                        </div>
                    </div>
                    <hr className="w-2"/>
                    <div className="row">
                        <div className="col d-flex px-5">
                            <i className="fas fa-user-circle me-3 p-1"></i>
                            <p className="fs-6">This is comment section</p>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    )
}

export default ViewPost
