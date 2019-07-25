import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel'

import Header from '../subComponents/nav/Header';
import Footer from '../subComponents/nav/Footer';
import YTVideos from '../subComponents/YT/YTVideos';

import { getSingleRecipe, getYoutubeVideos } from '../../request';

class Recipe extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recipeImg: '',
      title:'',
      ingredients: [],
      instructions: [],
      source: '',
      index: 0,
      direction: null,
      TYVideos:[]
    }
  }

  componentDidMount () {
    this.getRecipe();
  }

  getRecipe () {
    const _id = this.props.match.params.id
    getSingleRecipe(_id)
    .then( response => {
      this.setState({
        title: response.data.label,
        recipeImg: response.data.image,
        ingredients: response.data.ingredients,
        instructions: response.data.directions,
        source: response.data.source
      });
    })
    .then( () => {
      getYoutubeVideos(this.state.title)
      .then( response => {
         this.setState({  TYVideos: response.data.items })
      })
    })
  }

  handleSelect = (selectedIndex, e) => {
    this.setState({
       index: selectedIndex,
       direction: e.direction,
     });
  }

  render() {
    return(
      <div className='recipe-info-main-container'>
        <Header authenticated= { this.props.authenticated }
              userAvatar={ this.props.userAvatar }
              handleAuthentication= { this.props.handleAuthentication }/>

        {/* This is the body of the recipe page */ }
        <div className='recipe-info-container'>
          {/* Title */}
          <h2 className="title recipe-title">
            { this.state.title }
          </h2>

          {/* this is img Slider*/}
          <div className="recipe-img-wrapper">
              <img className='top-img' src={this.state.recipeImg} alt="First slide"
              />
          </div>
          {/*Ingredients Container*/}
          <div className='ingredients-container section-container'>
            <h2 className='description-title'> Ingredients </h2>
            <div className='ingredient-list-container inner-container'>
              <ul>
                {
                  this.state.ingredients.map( (value, key) => {
                    return(  <li key={key} className='steps '>
                                <span key={`0-${key}1`} className='recipe-list-item'> {value} </span>
                             </li> )
                  })
                }
              </ul>
            </div>
          </div>

          {/*Direction container*/}
          <div className='direction-container section-container'>
            <h2 className='description-title'> Directions </h2>
            <div className='directions-list-container clearfix directions-list-wrapper inner-container'>
                <ol className='list-numbers directions-list clearfix'>
                  {
                    this.state.instructions.map( (value, key) => {
                      return(  <li key={key} className='steps '>
                                  <span key={`0-${key}1`} className='recipe-list-item'> {value} </span>
                               </li> )
                    })
                  }
                </ol>
            </div>
          </div>

          {/*How TO Youtube videos */}
            <div className='section-container'>
              <h2 className='description-title'> Videos That Might Help </h2>

              <Carousel interval={null} id='carousel'>
                {

                  this.state.TYVideos.map( (value, key) => {
                    return ( <Carousel.Item key={`${key}-1`} > <YTVideos
                              key={key}
                              thumbnail={value.snippet.thumbnails.default.url }
                              videoId={ value.id.videoId }
                              videoTitle={value.snippet.title}/> </Carousel.Item>)

                  })
                }
              </Carousel>

            <div>
              <h2 className='description-title'> Source </h2>
              <div>
                <a className="SourceLink" target='_blank' href={this.state.source}> Find More Information HERE </a>
              </div>
            </div>

            </div>
              <div className='section-container'>
            </div>
        </div>
        <Footer />
      </div>
    );
  }

}

export default withRouter(Recipe);
