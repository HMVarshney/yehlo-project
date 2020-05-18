import React, { Component, useState } from 'react';
import {getData} from './api/index';
import {storage} from './api/firestore'
import {Grid, Typography, Card, CardContent, CardHeader, Paper, 
    GridList, GridListTile, GridListTileBar, IconButton, Avatar} from '@material-ui/core';
import {Link} from 'react-router-dom';
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarSharp from '@material-ui/icons/StarSharp'

class pgInfo extends Component {
    state = { 
        loaded:false,
        image:[],
     }

    async componentDidMount() {
        this.setState({
            name:(await getData()).map(({name})=>name),
            address: (await getData()).map(({address})=>address),
        });
        this.setState({loaded:true})
    }

    getImage = async (userName)=>{
        let images='';
        images = await storage.ref("images").child('image_'+userName).getDownloadURL()
        .then((url)=>{
            return url
        })
        this.setState({image:[...this.state.image,images]})
    }

    render() {
        const {name, address, image} = this.props.location.state;
        
        if(this.state.loaded){
            return(
                <div>
            <img style={{position:'absolute', left:'0px', top:'0px', zIndex:-1, height:'200%', width:'100%', opacity:'0.6'}} src='https://cdn.hipwallpaper.com/i/3/88/sXHZgG.jpg' />
            <div style={{marginTop:'100px'}}>
            <Grid container spacing={4} alignItems='center' justify='center'>
                <Paper>
                <Grid item>
                    <img style={{width:'800px'}} src={image} />
                </Grid>
                <Grid item>
                    <Card style={{padding:'10px'}}>
                        <CardHeader title="Details of the PG" avatar={<Avatar aria-label='Name'>R</Avatar>}/>
                        <CardContent>
                            <Typography>Name: {name}</Typography>
                            <Typography>Address: {address}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                </Paper>
            </Grid> 

            <br />
            <br />
            <br />
            <br />
            <div><Typography style={{fontFamily:'Pangolin'}} align='center' variant='h3' color='primary' gutterBottom>Check out our other locations</Typography></div>

            <Grid container justify='center' alignItems='center'>
                <Grid item>    
                <GridList style={{width:'1500px', justifyContent:'center'}}>
                    {this.state.name.map((name,i)=>(<LowerGridList data={this.state} num={i} key={i}/>))}    
                </GridList>
                </Grid>
            </Grid>
            </div>
            </div>
         );}

         return(
             <div>Loading...</div>
         )
    }
}

const LowerGridList = (props)=>{
    let [imageURL, setURL] = useState([]);
    let [liked, setLiked] = useState(false);
    const userName = props.data.name[props.num];
    const address = props.data.address[props.num];

    const getImage = async ()=>{
        let images='';
        images = await storage.ref("images").child('image_'+userName).getDownloadURL()
        .then((url)=>{
            return url
        })
        
        setURL(images)
    }
    
    getImage();

    return(
        <Link to={{
                pathname:'/pgInfo',
                state:{name:userName, address:address, image:imageURL}
            }}><GridListTile 
                style={{margin:'6px'}}
                cols={2}
                key={props.name}>
                <img style={{width:'700px', height:'220px'}} src={imageURL} alt='image' />
                <GridListTileBar title={userName} 
                    actionIcon={<IconButton 
                    color='secondary'
                    onClick={()=>{setLiked(!liked)}}>
                        {liked ? <StarSharp /> : <StarBorderIcon />}
                    </IconButton>} />
            </GridListTile>
        </Link>
    );
}
 
export default pgInfo;

