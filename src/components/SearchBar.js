import React from 'react';


class SearchBar extends React.Component {

    state = {term:'deepblue'};


    onInputChange = (event) => {
        this.setState({term:event.target.value})
    };

    onFromSubmit = (event) => {
        event.preventDefault();
        this.props.onTermSubmit(this.state.term);
    };


    render() {
        const searchBarStyle = {
            backgroundColor:"rgba(0,0,0,0",
            opacity: 0.7,
            top:"20px",
        }

        return (
            <div onSubmit={this.onFromSubmit} className="search-bar ui segment" style={searchBarStyle}>
                <form className="ui form">
                    <div className="field">
                        <label>Keywords Search</label>
                        <input
                            onChange={this.onInputChange}
                            type="text"
                            value={this.state.term}/>
                    </div>
                </form>
            </div>
        )
    }
}

export default SearchBar;