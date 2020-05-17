import React, { Component } from 'react';
import {Grid, Card, AppBar, CardContent, CardHeader, Button, Popover, Typography, LinearProgress, TextField} from '@material-ui/core'

class InputForm extends Component {
    state = { 
        andchorEl:null
     }

    render() {   
        return (
            <div style={{marginTop:'60px'}}> 
            <Grid container alignItems="center" justify="center">
                <Grid item style={{marginTop:'20px'}} component={Card}>
                    <Card variant='outlined' 
                        style={{height: '400px', width:'600px', backgroundColor: 'rgba(119,136,153,0.1)', padding: '20px'}}>
                        <CardHeader style={{textAlign: 'center'}} title="Enter your details"/>
                        <CardContent>
                            <form style={{display: 'flex', flexDirection: 'column',}}>
                                <p><Typography>Name of the PG: </Typography>  
                                <TextField  
                                    id='name'
                                    value={this.props.data.name}
                                    onChange={this.props.handleDataChange}
                                    placeholder='Enter Name'
                                    /></p>         
                                <p><Typography>Picture: <input type="file" onChange={this.props.hanldeFileChange}/>
                                <Button variant='contained' color='secondary' onClick={this.props.handleUpload}>Upload</Button>
                                </Typography> </p> 
                                {this.props.data.uploading ? <LinearProgress /> : null}
                                <p><Typography>Address of the PG: </Typography>  
                                    <TextField  
                                    id='address'
                                    value={this.props.data.address}
                                    onChange={this.props.handleDataChange}
                                    placeholder='Enter Address'
                                    /></p>
                                    <br />
                                <Button variant='contained' color='primary' onClick={this.props.addData}> Submit </Button>
                            </form>
                            {this.props.data.dataSaved ? 
                            <Button color='primary' variant='contained' ><a style={{textDecoration:'none', color:'white'}} href='/displayInfo'>Next</a></Button>
                            : null}
                        </CardContent>
                    </Card>
                </Grid>
                <Popover 
                    open={this.props.data.isOpen}
                    anchorEl={this.props.data.andchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                        }}                                           
                    onClose={this.props.handleClosePopover}> <Typography style={{padding:10}}>{this.props.data.message}</Typography> 
                </Popover>
            </Grid>
            </div>
        );
    }
}
 
export default InputForm;