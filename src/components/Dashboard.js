import React, { useEffect,useState } from 'react';
import '../App.css'
import {GoogleMap,useLoadScript,Marker,InfoWindow} from "@react-google-maps/api";
import dummydata from './dummydata';
import ResultTable from './ResultTable';
import sortByBayesAvg from '../utils/bayesAvg';
import RatingSummary from './RatingSummary';
import PictureSummary from './PictureSummary';
const libraries = ["places"];


export default function Dashboard() {
    const [data,setData] = useState({});
    const [value,setValue] = useState('');
    const [lat,setLat] = useState('');
    const [long,setLong] = useState('');
    // const [data,setData] = useState({});
    const {isLoaded,loadError} = useLoadScript({
        googleMapsApiKey: 'AIzaSyBcifVjH0g_joBhOZsdjhkzAXTjuzqJ56s',
        libraries,
    });
    useEffect(()=> {
        const getGeoLocation = () => {
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position)=> {
                    setLat(position.coords.latitude);
                    setLong(position.coords.longitude);
                })
            }
        }
        getGeoLocation();
    },[]);
    if(loadError) return "Error Loading Maps";
    if(!isLoaded) return "Loading Maps";
    const getResults = (query,lat,lng) => {
    
        var loc = new window.google.maps.LatLng(lat,lng);
        var request = {
            location: loc,
            radius: '500',
            query: query,
        };    
        var service = new window.google.maps.places.PlacesService(document.createElement('div'));
        service.textSearch(request,(results,status)=> {
            if (status == window.google.maps.places.PlacesServiceStatus.OK) {
                console.log(results);
                
                results.map((obj,idx) => {
                    let request = {
                        placeId: obj.place_id,
                        fields: ['review']
                    }
                    if(obj.photos) obj['photoUrl'] = obj.photos[0].getUrl();
                    service.getDetails(request,(reviewResults,status) => {
                        if(status == window.google.maps.places.PlacesServiceStatus.OK){
                            obj['review'] = reviewResults;
                            setData(results);
                            console.log(results);
                        }
                    });
                });
                // console.log(results);
                // setData(sortByBayesAvg(results));
            }        
        });
    }
    
    const handleSubmit = (event) => {
        getResults(value,lat,long);

        // console.log(data);
        event.preventDefault();
    }
    const handleChange = (event) => {
        setValue(event.currentTarget.value);
    }
    const handleLatChange = (event) => {
        setLat(event.currentTarget.value);
    }
    const handleLongChange = (event) => {
        setLong(event.currentTarget.value);
    }
    
    return (
        <div className="Dashboard">
            <form  onSubmit={handleSubmit}>
                <div className="locationForm">
                    <input className="FormInput" type="text" value={value} onChange={handleChange} placeholder="search for your competition ex. 'bakery'" required/>
                    <input className="SubmitButton" type="submit" value="Submit" />
                </div>
                <div className="geoLocForm">
                    <input className="geoLocInput" type="text" value={lat} onChange={handleLatChange} placeholder='Latitude' required/>
                    <input className="geoLocInput" type="text" value={long} onChange={handleLongChange} placeholder='Longitude' required/>
                </div>
            </form>
            {
                (Object.keys(data).length!=0)?<>
                    <div className="SectionTitle">
                            Found results for:
                        </div>
                        {/* {console.log(data)} */}
                        <ResultTable data={sortByBayesAvg(data)}/>
                        <div className="SectionTitle">
                            Here's what you can learn from your competitor's customers
                        </div>
                        <RatingSummary data={sortByBayesAvg(data)} />
                        <div className="SectionTitle">
                            Here's what you're best competition looks like
                        </div>
                        <PictureSummary data={sortByBayesAvg(data)}/>
                </>:<div className="SectionTitle" style={{lineHeight: '2'}}>
                    Make a search that describes your business.
                    For example, if you own a bakery search "bakery".
                    <br></br>
                    The webapp will find results near the location you entered.
                    <br></br>
                    It will also attempt to get your location automatically if you allow it.
                </div>
                    
              
            }
            
        </div>

    );
}

