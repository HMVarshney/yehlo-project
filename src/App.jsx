import React, { Component } from 'react';
import {Router, Route, Switch, Link} from 'react-router-dom';
import {AppBar, InputBase, Toolbar, Button, Menu, MenuItem, Typography, Box, Grid} from '@material-ui/core'
import InputForm from './Components/inputForm';
import PGInfo from './Components/pgPage'
import Carousel from './Components/displayInfo';
import {createBrowserHistory} from 'history';
import firebase, {storage} from './Components/api/firestore';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import logo from './assets/images/yehloLogo1.jpg';

const history = createBrowserHistory();

var index=-1;

class App extends Component {
    state = { 
        name:'',
        address: '',
        imageURL:'',
        message: '',
        anchorEl:null,
        achorMenu:null,
        isOpen:false,
        dataSaved:false,
        uploading:false,
        searchValue:'',
    }

    pgDisplay=(toDisplay)=>{
        this.setState({
            pgToDisplay:{
                name:toDisplay.name,
                address:toDisplay.address,
                index:toDisplay.index
            }
        })
    }

    handleChange = (event)=>{
        console.log(event);
        
        this.setState(
            { [event.target.id]:event.target.value }
        )
    };

    addData = (event)=>{

        if(this.state.name === '' || this.state.address === '' || this.state.imageURL===''){
            this.setState({isOpen: true, message: 'Please enter all required details'});

            return;
        }

        event.preventDefault();
        this.setState({anchorEl:event.currentTarget})

        const db = firebase.firestore();
        db.collection('users').doc(this.state.name).set({
            name:this.state.name, address: this.state.address})
        .then(this.setState({isOpen:true, message:'Data saved successfully!', dataSaved:true}))
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
        if(!this.state.image){
            this.setState({isOpen: true, message: 'Please Upload an Image'});
            return;
        }
        this.setState({uploading:true});

        const uploadTask = storage.ref('images/image_'+this.state.name).put(this.state.image);
        uploadTask.on("state_changed", 
        snapshot => {}, 
        error => {console.log(error)},
        ()=>{
            storage.ref("images").child("image_"+this.state.name).getDownloadURL()
            .then(url =>{this.setState({imageURL:url, isOpen: true, message:"File Uploaded",uploading:false})})
        })
    }

    handleMenuClick=(event)=>{
        this.setState({anchorMenu:event.currentTarget})
    }

    handleMenuClose=()=>{
        this.setState({anchorMenu:null})
    }

    handleSearch = ()=>{
        
    }

    render() { 
        return ( 
            <React.Fragment>
                <AppBar color='transparent'>
                    <Toolbar>
                    <a href='/'><img src={logo} style={{width:'120px', position:'relative', left:'-25px', top:'2px', tranform:'rotate(20)'}} /></a>
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleMenuClick}>
                            <Typography variant='h6' style={{color:'black', marginLeft:'50px'}}>Menu</Typography>
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorMenu}
                            keepMounted
                            open={Boolean(this.state.anchorMenu)}
                            onClose={this.handleMenuClose}>
                            <MenuItem onClick={this.handleMenuClose}>
                                <a style={{textDecoration:'none',}} href='/'>Form</a>                       
                            </MenuItem>
                            <MenuItem onClick={this.handleMenuClose}>
                                <a style={{textDecoration:'none',}} href='/displayInfo'>PGList</a>
                            </MenuItem>
                        </Menu>
                        
                        <div style={{marginLeft: '82%'}}>
                            <InputBase placeholder='Search..'
                                value={this.state.searchValue}
                                onChange={(event)=>{this.setState({searchValue:event.target.value})}} 
                                style={{color:'black', fontWeight:'bold'}}/>
                        </div> <SearchTwoToneIcon />
                    </Toolbar>
                </AppBar>

                <Router history={history}>
                    <Switch>
                    <Route exact path="/" render={()=><InputForm 
                        data={this.state}
                        handleDataChange={this.handleChange}
                        hanldeFileChange={this.hanldeFileChange}
                        handleUpload={this.handleUpload}
                        handleClosePopover={this.handleClosePopover}
                        addData={this.addData}
                    /> }/>
                    <Route exact path="/displayInfo" render={()=><Carousel nameClicked={(name)=>this.pgDisplay(name)} />} />
                    <Route exact path="/pgInfo/" render={(props)=>(<PGInfo {...props}/>)}  />} />
                    </Switch>
                </Router> 
            </React.Fragment>
        );
    }
}
 

export default (App);

