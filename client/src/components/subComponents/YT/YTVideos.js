import React, { Component } from 'react';

export default class TYVideos extends Component {

  state = {
    videoId:''
  }

  handleClick = (e) => {
    e.preventDefault();
    if(this.state.videoId !=='' && this.state.videoId === this.props.videoId) {
      this.setState({ videoId:  '' });
    }else{
      this.setState({ videoId: this.props.videoId });
    }
  }

  showVideo = () => {
    if(this.state.videoId !== '') {
      return <iframe width="560"
              height="315"
              className="youtubeVideo"
              title={this.state.videoId}
              src={`https://www.youtube.com/embed/${this.state.videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen> </iframe>
    }
  }

  render() {
    return(
      <div>
        <div className='YTVideo-container'>
          <div className='thumnail-container'>
            <img alt='video-thumnail' src={this.props.thumbnail} />
            <h4> Wath How To </h4>
            <h6> { this.props.videoTitle} </h6>
            <button onClick={this.handleClick} >
              { this.state.videoId === ''? 'Watch Now' : 'Hide' }
            </button>
          </div>
          { this.showVideo() }
        </div>
      </div>
    );
  }
}
