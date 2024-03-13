import React, {Component} from 'react';
import {changeColor, changeEnd, changeStart} from "./selectorSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useState, useEffect} from 'react';


const Selection : React.FC  = () => {
    const dispatch = useAppDispatch();

    const [buildings , setBuildings] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const loadBuildings = async () => {
            //fetch building long names from spark server
            try {
                let buildingsPromise = fetch("http://localhost:4567/get-building-names");
                if (!buildingsPromise) {
                    alert("Server error!");
                    return;
                }
                let buildings = await buildingsPromise;
                let parsingPromise = buildings.json();
                let parsedBuildings = await parsingPromise;

                for (let i = 0; i < parsedBuildings.length; i++){
                    setBuildings((prevState) => [...prevState, <option value={parsedBuildings[i]}>{parsedBuildings[i]}</option>])
                }
                console.log("buildings loaded");
            } catch (e) {
                alert(`Error ${e}`);
            }
        };
        loadBuildings();
    }, []);

    return(
        <div id="selection-top">
            <div id ="selection">
                <div className="float-left">Start: </div>
                <select className="float-left" id="dropdown"
                        onChange={(event) => {
                            dispatch(changeStart(event.target.value));
                        }}>
                    <option defaultValue={"none"} selected disabled hidden>Select starting point</option>
                    {buildings}
                </select>
                <div className="float-left" >End: </div>
                <select className={"float-left"} id="dropdown"
                        onChange={(event) => {
                            dispatch(changeEnd(event.target.value))

                        }}>
                    <option defaultValue = {"none"} selected disabled hidden>Select end point</option>
                    {buildings}
                </select>
                <br/>

            </div>
            <div id = "color-picker">
                <p>Pick a color:</p>
                <button onClick = {() => {
                    dispatch(changeColor("red"));
                }}>Red</button>
                <button onClick = {() => {
                    dispatch(changeColor("green"));
                }}>Green</button>
                <button onClick = {() => {
                    dispatch(changeColor("blue"));
                }}>Blue</button>
            </div>

        </div>
    )
}

export default Selection;