import React, { useState } from 'react';
import { Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Paper, Grid} from '@material-ui/core';
import {withRouter} from 'react-router-dom'
import {getData} from './api/index';
import  {storage} from './api/firestore';
import {Link} from 'react-router-dom';


let styles = {
    margin: 'auto',
    width: '900px'
  };

class CarouselDisplay extends React.Component{

    state={
        name:[],
        imageURL:[],
        address:[], 
        loaded:true,
        nameClicked:''
    }

    async componentDidMount() {
        this.setState({
            name:(await getData()).map(({name})=>name),
            address: (await getData()).map(({address})=>address)
        });
    }

    render(){
        if(this.state.loaded){
        return (
            <div style={{marginTop:'100px'}}>
            <Grid container>
                <Paper elevation={5} style={{width:'800px', margin:'auto'}}>
                    <Carousel autoPlay={true} 
                        interval={4000} 
                        infiniteLoop={true} 
                        dynamicHeight={true}>
                    {this.state.name.map((name,i)=>(
                        <Page data={this.state} number={i} key={i} />
                    ))}
                    </Carousel>
                </Paper>
            </Grid>
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
    const address = props.data.address[props.number]

    const getImage = async ()=>{
        let images='';
        images = await storage.ref("images").child('image_'+userName).getDownloadURL()
        .then((url)=>{
            return url
        })
        
        setURL(images)
    }
    
    getImage();

    if(imageURL){
    return(
        <Link to={{
            pathname:'/pgInfo',
            state:{name:userName, address:address, image:imageURL}
        }}><div>
            <img src={imageURL} alt="alt"/>
            <h2 style={{marginBottom:70, padding:'8px', fontSize:'20px'}} 
                className='legend'>{userName}</h2>
            <p className='legend' style={{padding:'6px', fontSize:'16px'}}>Address: {address}</p>
        </div></Link>
    )
}
}

export default (CarouselDisplay);