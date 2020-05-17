import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import InputForm from './inputForm';
import PGInfo from './pgPage'
import App from '../App'
import Carousel from '../Components/displayInfo'

class NavHandler extends React.Component {
    render(){
        return ( 
            <div>
                <BrowserRouter>
                    <Route exact path="/" render={()=><InputForm /> }/>
                    <Route exact path="/displayInfo" render={()=><Carousel />} />
                    <Route exact path="/pgInfo" render={()=><PGInfo />} />
                </BrowserRouter>
            </div>
        );
    }
}
 
export default NavHandler;