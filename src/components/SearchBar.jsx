import React from 'react'
import Autosuggest from 'react-autosuggest';
import PropTypes from 'prop-types';
import Cable from 'actioncable';
import Link from 'react-router-dom'

export default class SearchBar extends React.Component {
  static propTypes = {
    message: PropTypes.string
  };

  constructor(props) {
    super(props);

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: [],
      cabledSuggestions: []
    };

    this.onChange = (event, { newValue }) => {
      this.setState({
        value: newValue
      });
    };
  
    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    this.onSuggestionsFetchRequested = ({ value }) => {
      console.log(value, this.state.cabledSuggestions)
      this.setState({
        suggestions: this.getSuggestions(value, this.state.cabledSuggestions)
      });
    };
  
    // Autosuggest will call this function every time you need to clear suggestions.
    this.onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: []
      });
    };

    this.createSocket = () => {
      let cable = Cable.createConsumer(process.env.REACT_APP_API_WS_ROOT);
      this.searches = cable.subscriptions.create({
        channel: 'SearchChannel'
      }, {
        connected: () => {},
        received: (data) => {
          let parsedData = data["suggestions"].map(obj => obj = JSON.parse(obj)).sort((a,b)=>{return b.Popularity - a.Popularity})
          console.log(parsedData)
          this.setState({ cabledSuggestions: parsedData });
        },
        search: function(searchValue) {
          this.perform('search', {
            "search_value": searchValue
          });
        }
      });
    }
    this.onChange = (event, { newValue, method }) => {
      console.log(newValue)
      this.setState({
        value: newValue
      });
      this.searches.search(newValue);
    };

    // Teach Autosuggest how to calculate suggestions for any given input value.
    this.getSuggestions = (value, cabledSuggestions) => {
      const inputValue = value.trim().toLowerCase();
      const inputLength = inputValue.length;
      console.log(cabledSuggestions)
      cabledSuggestions.sort(function(a,b){
        return b.Popularity - a.Popularity
      })
      return inputLength === 0 ? [] : cabledSuggestions.filter(suggestion => {
        return suggestion.Title.toLowerCase().slice(0, inputLength) === inputValue
      });
    };

    // When suggestion is clicked, Autosuggest needs to populate the input
    // based on the clicked suggestion. Teach Autosuggest how to calculate the
    // input value for every given suggestion.
    this.getSuggestionValue = suggestion => {
      console.log("getSuggestion: ", suggestion)
      return suggestion.Title
    };

    // Use your imagination to render suggestions.
    this.renderSuggestion = suggestion => {
      console.log("renderSuggestion: ", suggestion)
      return (
        <a href={`/${suggestion.Title.split(" ").join("-")}`}>
          {suggestion.Title}
        </a>
      )
    };
  }

  componentWillMount() {
    this.createSocket();
  }
  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Find a TV Show...',
      value,
      onChange: this.onChange
    };
    return (
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
    );
  }
}

