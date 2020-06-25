import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const NavLink = ({to,classes,activeIcon,inactiveIcon,title,onClick}) =>{
  return(
    <li className={classes}>
        <Link to={to}
          onClick={(e) => onClick(to)}
          >
            <div className="sidbar-icon">
                <img src={classes ? activeIcon : inactiveIcon} alt=""/>
            </div>
            <span className="nav-label">{title}</span>
        </Link>
    </li>
  )
}
