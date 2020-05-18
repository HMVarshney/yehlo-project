import React, { Component, useState } from 'react';
import {getData} from './api/index';
import {storage} from './api/firestore'
import {Grid, Typography, Card, CardContent, CardHeader, Paper, 
    GridList, GridListTile, GridListTileBar, IconButton, Avatar} from '@material-ui/core';
import {Link} from 'react-router-dom';
import StarBorderIcon from '@material-ui/icons/StarBorder'

class pgInfo extends Component {
    state = { 
        loaded:false,
        image:[],
        liked:[]
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

    hanldeClick =(event)=>{
        // this.props.nameClicked({name:this.state.name[event], address:this.state.address[event]});
        // this.props.history.push('/pgInfo');
        console.log(event.target.name);
        console.log("clicked");
    }

    render() {
        const {name, address, image} = this.props.location.state;
        
        if(this.state.loaded){
            return(
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
            <div><Typography style={{fontFamily:'Vegan'}} align='center' variant='h3' color='primary' gutterBottom>Check out our other locations</Typography></div>

            <Grid container justify='center' alignItems='center'>
                <Grid item>    
                <GridList style={{width:'1500px', justifyContent:'center'}}>
                    {this.state.name.map((name,i)=>(<LowerGridList data={this.state} num={i} key={i}/>))}    
                </GridList>
                </Grid>
            </Grid>
            </div>
         );}

         return(
             <div>hey</div>
         )
    }
}

const LowerGridList = (props)=>{
    let [imageURL, setURL] = useState([]);
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
                    color='secondary'>
                    <StarBorderIcon /></IconButton>} />
            </GridListTile>
        </Link>
    );
}
 
export default pgInfo;

