import React, { useState } from 'react';
import { Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Paper} from '@material-ui/core';
import firebase, {storage} from './firestore'

import img1 from './images/image1.jpg';

let styles = {
    margin: 'auto',
    width: '900px'
  };

class CarouselDisplay extends React.Component{

    state={
        name:[],
        imageURL:[],
        address:[],
        loaded:false,
    }

    componentDidMount() {
        this.getData();
    }

    getData = async ()=>{
        const db = await firebase.firestore().collection("users").get();
        const data = db.docs.map(doc=>doc.data());

        this.setState({
            name:data.map(({name})=>(name)),
            address:data.map(({address})=>(address)),
            loaded: true
        })
    };

    getImage = async (userName)=>{
        let images=[];
        images.push( await storage.ref("images").child('image_'+userName).getDownloadURL()
        .then((url)=>{
            return url
        }))

        console.log(images);
    }

    render(){
        if(this.state.loaded){
        return (
            <div style={{width:'800px', margin:'auto'}}>
                <Carousel autoPlay={true} interval={3000} infiniteLoop={true} dynamicHeight={true}>
                {this.state.name.map((name,i)=>(
                    <Page data={this.state} number={i} key={i}/>
                ))}
                </Carousel>
            </div>
        );}
     return(
         <div>
             Loading...
         </div>
     )   

}
}


const Page = (props)=>{

    let [imageURL, setURL] = useState([]);
    const userName = props.data.name[props.number];

    const getImage = async ()=>{
        let images='';
        images = await storage.ref("images").child('image_'+userName).getDownloadURL()
        .then((url)=>{
            return url
        })
        setURL(images);   
    }
    getImage();

    if(imageURL){
    return(
        <a href="/pgInfo"><div>
            <img src={imageURL} alt="alt"/>
            <h2 className='legend'>{props.data.name[props.number]}</h2>
            <p className='legend'>{props.data.address[props.number]}</p>
        </div></a>
    )
}
}

export default CarouselDisplay;