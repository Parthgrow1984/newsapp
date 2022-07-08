import React, { Component } from 'react'

export class NewsItem extends Component {




    render() {
        let { title, description, imageUrl, newsUrl, author, date,source } = this.props;
        return (
            <>

                <div className="card my-3" style={{ width: "18rem" }}>
                    <img src={!imageUrl ? "https://img.etimg.com/thumb/msid-92405443,width-1070,height-580,imgsize-905570,overlay-economictimes/photo.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}
                        
                            <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"85%"}}>
                                {source}
                            
                            </span>
                        </h5>
                        <p className="card-text">{description}</p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More </a>
                        <p class="card-text"><small class="text-muted"> By {!author ? "Unknown" : author} on  {new Date(date).toGMTString()} </small></p>
                    </div>
                    
                </div>


            </>
        )
    }
}

export default NewsItem; 
