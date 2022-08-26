import React from 'react'

const NewsItem = (props) => {

        return (
            <div>
                <div className="card my-4">
                    <img src={props.imageUrl === null ? "https://bitsofco.de/content/images/2018/12/broken-1.png" : props.imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{props.title}</h5>
                        <p className="card-text">{props.description}.</p>
                        <hr />
                        <small className='text-muted'><em>By: {!props.author ? "Unknown Author" : props.author}<br />Published On: {new Date(props.publishedAt).toGMTString()}</em></small>
                        <br />
                        <br />
                        <a href={props.url} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read more</a>
                    </div>
                </div>
            </div>
        )
    
}

export default NewsItem