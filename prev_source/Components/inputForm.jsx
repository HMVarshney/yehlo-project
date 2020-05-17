import React, { Component } from 'react';
import firebase, {storage} from './firestore'
import {Grid, Card, AppBar, CardContent, Toolbar, CardHeader, InputBase, Button, Popover, Typography} from '@material-ui/core'
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';

class InputForm extends Component {
    state = { 
        name:'',
        address: '',
        imageURL:'',
        message: '',
        isOpen:false,
        anchorEl: null,
        dataSaved:false
     }

    handleChange = (event)=>{
        this.setState(
            { [event.target.name]:event.target.value }
        )
    };

    addData = (event)=>{

        if(this.state.name === '' || this.state.address === '' || this.state.imageURL===''){
            this.setState({isOpen: true, message: 'Please enter all required details'});

            return;
        }

        event.preventDefault();

        const db = firebase.firestore();
        db.collection('users').doc(this.state.name).set({
            name:this.state.name, address: this.state.address})
        .then(this.setState({isOpen:true, anchorEl:event.currentTarget, message:'Data saved successfully!', dataSaved:true}))
        .catch((error)=>{
            console.error("Error in adding data", error);
        });

        this.setState(
            { name:'', address: ''}
        )
    };

    handleClosePopover = ()=>{
        this.setState(
            { isOpen:false }
        )
    };

    hanldeFileChange = (event)=>{
        if(event.target.files[0]){
            this.setState(
                { image: event.target.files[0] }
            )
        }
    };

    handleUpload = ()=>{
        const uploadTask = storage.ref('images/image_'+this.state.name).put(this.state.image);
        uploadTask.on("state_changed", 
        snapshot => {}, 
        error => {console.log(error)},
        ()=>{
            storage.ref("images").child("image_"+this.state.name).getDownloadURL()
            .then(url =>{this.setState({imageURL:url, isOpen: true, message:"File Uploaded"})})
        })
    }

    render() {   
        return ( 
            <Grid container alignItems="center" justify="center">
                <AppBar position="static">
                    <Toolbar>
                        YEHLO
                        <div style={{marginLeft: '91%'}}>
                            <InputBase placeholder='Search..' 
                                style={{color:'white', fontWeight:'bold'}}/>
                        </div> <SearchTwoToneIcon />
                    </Toolbar>
                </AppBar>
                <Grid item style={{marginTop:'20px'}} component={Card}>
                    <Card variant='outlined' 
                        style={{height: '330px', backgroundColor: 'rgba(119,136,153,0.1)', padding: '20px'}}>
                        <CardHeader style={{textAlign: 'center'}} title="Enter your details"/>
                        <CardContent>
                            <form style={{display: 'flex', flexDirection: 'column',}}>
                                <p><span>Name of the PG: </span>  
                                <input type="text" 
                                    name='name'
                                    onChange={this.handleChange} 
                                    value={this.state.name} /></p>         
                                <p><span>Picture: </span>  
                                <input type="file" onChange={this.hanldeFileChange}/>
                                <Button variant='contained' color='secondary' onClick={this.handleUpload}>Upload</Button>
                                </p> 
                                <p><span>Address of the PG: </span>  
                                <input type="text" 
                                    name='address'
                                    onChange={this.handleChange} 
                                    value={this.state.address} /></p>
                                <Button variant='contained' color='primary' onClick={this.addData}> Submit </Button>
                            </form>
                            {this.state.dataSaved ? 
                            <Button color='primary' variant='contained' onClick={this.handleNext}><a href='/displayInfo'>Next</a></Button>
                            : null}
                        </CardContent>
                    </Card>
                </Grid>
                <Popover 
                    open={this.state.isOpen}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                        }}                                           
                    onClose={this.handleClosePopover}> <Typography style={{padding:10}}>{this.state.message}</Typography> 
                </Popover>
            </Grid>
         );
    }
}
 
export default InputForm;