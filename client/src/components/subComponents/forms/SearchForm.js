import React, { Component } from 'react';

class SearchForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      query: 'beef',
      value: '',
      reDirect: false
    }

  }

  //event handler
  //this pushes the query to the history and then call the search function from the seach component
  submit = (e) => {
    e.preventDefault();
    new Promise( async(resolve, reject) => {
      let path = `?tags=${this.query.value}`;

      this.props.history.push({
        pathname:'/search/',
        search:path
      });
      return resolve();
    }).then( resolve => { this.props.search() })

  }
  //this sets the 'value' to the the input field value
  handleChange = (e) => {    this.setState({ value: e.target.value  }); }

  render(){
    return(
      <div className="search-container">
        <form  onSubmit={ this.submit } className='search-form'>
          <input className='search-bar' type='text'
                value={ this.state.value } onChange={ this.handleChange }
                 placeholder={'Search...'} required ref={ (input) => this.query = input }/>
          <button className='submit-btn' type='submit'> Search </button>
        </form>
      </div>
    );
  }
}

export default SearchForm;
