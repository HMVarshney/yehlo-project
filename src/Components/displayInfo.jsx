import React, { useState } from 'react';
import { Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Paper, Grid, Typography, IconButton} from '@material-ui/core';
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
            <div>            
                <img style={{position:'absolute', left:'0px', top:'0px', backgroundSize:'cover', zIndex:-1, opacity:'0.6'}} src='https://cdn.hipwallpaper.com/i/3/88/sXHZgG.jpg' />
                <div style={{marginTop:'100px'}}>
                <Typography variant='h4' style={{textAlign:'center', marginBottom:'40px', fontFamily:'Pangolin'}}>Do you see your favorite one?</Typography>
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
            <h2 style={{marginBottom:65, padding:'8px', fontSize:'20px'}} 
                className='legend'>{userName}</h2>
            <p className='legend' style={{padding:'6px', fontSize:'16px'}}>{address}</p>
        </div></Link>
    )
}
}

export default (CarouselDisplay);