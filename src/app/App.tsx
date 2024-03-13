import React, {Component} from 'react';
import Selection from '../components/Selector/Selection';
import Map from '../components/Map/Map';
import {useAppSelector} from "./hooks";
import "./app.css";

function App() {
    return (
        <div className="app">
            <Selection/>
            <div>
                color : {useAppSelector(state => state.selector.color)}
            </div>
            <div>
                <Map/>
            </div>

        </div>

    )
}

export default App;