import {Link} from 'react-router-dom';
import React from 'react';
import '../css/header.css'
export default class Header extends React.Component {
    render(){
      return(
    <header class="site-header">
        <div class="site-identity">
          <h1><a href="#">Site Name</a></h1>
        </div>  
        <nav class="site-navigation">
          <ul class="nav">
            <li><Link to='/'>Home</Link></li> 
            <li><Link to='/admin'>Admin</Link></li> 
          </ul>
        </nav>
      </header>
      )
    }
  }
