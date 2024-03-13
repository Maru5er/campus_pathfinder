import {LatLngExpression, LatLng, map, LatLngBounds, latLng, latLngBounds} from "leaflet";
import React, {Component, useEffect, useRef, useState} from "react";
import { MapContainer, TileLayer, useMapEvent, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapLine from './MapLine';
import "./map.css"
import {
    UW_LATITUDE,
    UW_LATITUDE_CENTER, UW_LATITUDE_OFFSET, UW_LATITUDE_SCALE,
    UW_LONGITUDE,
    UW_LONGITUDE_CENTER,
    UW_LONGITUDE_OFFSET,
    UW_LONGITUDE_SCALE
} from "./Constants";
import {useAppSelector, useAppDispatch} from "../../app/hooks";
import {changeEnd, changeStart} from "../Selector/selectorSlice";

// This defines the location of the map. These are the coordinates of the UW Seattle campus
const position: LatLngExpression = [UW_LATITUDE_CENTER, UW_LONGITUDE_CENTER];

// this defines the offset for the two start and end coordinates for the zoom function as well as default bounds

function handlePath(pathRaw : any[], color : string) {
    let result : JSX.Element[] = [];
    if (pathRaw.length > 0) {
        for (let i = 0; i < pathRaw.length; i++) {
            result.push(<MapLine key={i}
                               x1={Number(pathRaw[i].start.x)}
                               y1={Number(pathRaw[i].start.y)}
                               x2={Number(pathRaw[i].end.x)}
                               y2={Number(pathRaw[i].end.y)}
                               color={color}/>);
        }
    }
    return result;

}
const Map : React.FC = () => {
    const [paths, setPaths] = useState<string[]>([]);
    const [pathJSX, setPathJSX] = useState<JSX.Element[]>([]);
    let start = useAppSelector(state => state.selector.start);
    let end = useAppSelector(state => state.selector.end);
    let color = useAppSelector(state => state.selector.color);
    const dispatch = useAppDispatch();
    const requestShortestPath = async () => {
        start.replaceAll("&", "%26");
        end.replaceAll("&", "%26");
        fetch(`http://localhost:4567/get-shortest-path?start=${start}&end=${end}`)
                .then((response) =>  response.json())
                .then((parsedPath) => {
                    const pathRaw = parsedPath.path;
                    let paths = handlePath(pathRaw, color);
                    for (let i = 0; i < paths.length; i++) {
                        setPathJSX(paths);
                    }
                })
                .catch(e => alert(e));
    };


    return (
        <div id="map">
            <button onClick={()=> requestShortestPath()}>draw</button>
            <div id="selection-button">
                <button onClick={(event) => {
                    setPathJSX([]);
                }}>Clear</button>

            </div>
            <div id="map">
            <MapContainer
                center={position}
                zoom={15}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {pathJSX}
            </MapContainer>
            </div>
        </div>
    )
}
export default Map;
