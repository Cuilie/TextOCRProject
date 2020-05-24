import React from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import BoundingBox from "./BoundingBox";
import 'whatwg-fetch'
import 'es6-promise'
import './App.css'




class App extends React.Component {

    state = {
        DB_DOMAIN:"https://e8xmodukxg.execute-api.us-east-1.amazonaws.com/dev",
        IMAGE_DOMAIN:"https://heali-interview-screening.s3.amazonaws.com/",
        ImageSrc:null,
        menuBbox:[]
    };


    onTermSubmit = async (menuId) => {
        let urlToPath = this.state.DB_DOMAIN+"/users/" + menuId;
        const menuPath = await fetch(
            urlToPath, {method:"GET"}
            )
            .then(res => res.json())
            .then(data => {
                return data
                // this.setState({selectedMenu: data})
            }).catch(e => console.log('error:', e));
        console.log(menuPath);
        this.setState({ImageSrc: this.state.IMAGE_DOMAIN + menuPath.menuPath })

        let urlToBbox = this.state.DB_DOMAIN+"/table/" + menuId;
        const menuBbox = await fetch(
            urlToBbox, {method:"GET"}
        )
            .then(res => res.json())
            .then(data => {
                console.log(data);
                return data
            })
            .catch(e => console.log('error:', e));
        console.log(menuBbox);
        this.setState({menuBbox: menuBbox.jsonStr});
    };



    render() {
        return (
            <div>
                <div className="ui container">
                    <SearchBar onTermSubmit = {this.onTermSubmit} />

                    <div className="MenuImage">
                        <img src={this.state.ImageSrc} alt="menu" />
                    </div>
                    <div className="Bbox">
                            <BoundingBox bboxList ={this.state.menuBbox}/>
                    </div>
                </div>
            </div>
        )
    }
}
export default App;
