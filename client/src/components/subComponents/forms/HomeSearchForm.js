import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class HomeSearchForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      query:'',
      reDirect: false
    }

    this.submit = this.submit.bind(this);
    this.inputQuery = this.inputQuery.bind(this);
  }

  //whe submit button is pressed is sets the "reDirect" state to true and that triggres a redirect to the search component
  submit = (event) => {
    event.preventDefault();
    this.setState({ reDirect: true, title: this.state.query });
  }

  //sets the query to the input value
  inputQuery(event) {
    this.setState({ query: event.target.value });
  }

  render(){
    return(
      <div className="search-container">
        <form  onSubmit={ this.submit } className='search-form'>
          <input className='search-bar' type='text' onChange={ this.inputQuery }
                 placeholder={'Search...'} required/>
          <button className='submit-btn' type='submit'> Search </button>
        </form>
        {
          this.state.reDirect === true &&
           <Redirect to={ {
             pathname:`/search/`,
             search: `?tags=${this.state.query}`,
             state: { title: this.state.query}
          } } />
        }

      </div>
    );
  }
}

export default HomeSearchForm;
