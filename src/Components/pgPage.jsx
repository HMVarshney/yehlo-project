import React, { Component } from 'react';
import {getData} from './api/index';
import {storage} from './firestore'
import {Grid, Typography, Card, CardContent, CardHeader, Paper, 
    GridList, GridListTile, GridListTileBar, IconButton, Avatar} from '@material-ui/core'
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

        this.state.name.map((name)=>{this.getImage(name)})
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

    hanldeClick =()=>{
        console.log("Click");
        this.setState({liked:1})
        
    }

    render() {
        if(this.state.loaded){
            return(
            <div style={{marginTop:'100px'}}>
            <Grid container spacing={4} alignItems='center' justify='center'>
                <Paper>
                <Grid item>
                    <img style={{width:'800px'}} src={this.state.image[0]} />
                </Grid>
                <Grid item>
                    <Card style={{padding:'10px'}}>
                        <CardHeader title="Details of the PG" avatar={<Avatar aria-label='Name'>R</Avatar>}/>
                        <CardContent>
                            <Typography>Name: {this.props.pgName.name}</Typography>
                            <Typography>Address: {this.props.pgName.address}</Typography>
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
                    <GridList style={{width:'1500px'}} spacing={6}>
                        {this.state.image.map((image,i)=>(
                            <GridListTile>
                                <img src={image} alt='image' />
                                <GridListTileBar title={this.state.name[i]} 
                                    actionIcon={<IconButton 
                                    onClick={this.hanldeClick} 
                                    color='secondary'>
                                    <StarBorderIcon /></IconButton>} />
                            </GridListTile>
                        ))}
                    </GridList>
                </Grid>
            </Grid>

            </div>
         );}

         return(
             <div>Loading...</div>
         )
    }
}
 
export default pgInfo;

