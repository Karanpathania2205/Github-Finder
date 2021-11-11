import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


const Navigation = ({ title }) => {
    /*static defaultProps={
        title:'github finder',
    }
    static propTypes={
        title:PropTypes.string.isRequired,
    }*/

    return (
        <nav className="navbar bg-primary ">
            <h1>
                <i className="fab fa-github"></i> {title}
            </h1>
            <ul>
                <li>
                    <Link to='/'>HOME</Link>
                </li>
                <li>
                    <Link to='/about'>ABOUT US</Link>
                </li>
            </ul>

        </nav>
    );
}
Navigation.defaultProps = {
    title: 'github finder',
}
Navigation.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Navigation
