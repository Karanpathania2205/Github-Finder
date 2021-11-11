import React, { Fragment, useEffect } from 'react'
import Spinner from '../layouts/Spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Repos from '../repos/Repos';
const User = ({ user, getUser, getUserRepos, loading, match, repos }) => {
    useEffect(() => {
        //console.log(match.params.login)
        getUser(match.params.login);
        // console.log(user)
        getUserRepos(match.params.login);
        //eslint-disable-next-line 
    }, []);
    // componentDidMount() {
    //     this.props.getUser(this.props.match.params.login);
    //     this.props.getUserRepos(this.props.match.params.login);
    // }


    const {
        name,
        avatar_url,
        location,
        bio, blog,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable,
        company
    } = user;


    if (loading) {
        return <Spinner />
    }
    else {
        return (
            <Fragment>
                <Link to='/' className='btn btn-light'>
                    Back To Search
                    </Link>
                    Hireable :
                {hireable ? <i className="fas fa-check text-success" /> : < i className="fas fa-times-circle text-danger" />}
                <div className="card grid-2">
                    <div className='all-center'>
                        <img src={avatar_url}
                            className='round-img'
                            alt=''
                            style={{ width: '150px' }}
                        />
                        <h1>{name}</h1>
                        <p>{location}</p>
                    </div>
                    {bio && (<Fragment>
                        <p>{bio}</p>
                    </Fragment>)}
                    <a href={html_url} className='btn btn-dark my-1'>
                        Visit Github Profile
                        </a>

                    <ul>
                        <li>
                            {login && <Fragment>
                                <strong> Username:</strong>{login}
                            </Fragment>}
                        </li>
                        <li>
                            {company && <Fragment>
                                <strong> Company:</strong>{company}
                            </Fragment>}
                        </li>
                        <li>
                            {blog && <Fragment>
                                <strong> Website :</strong>{blog}
                            </Fragment>}
                        </li>
                    </ul>


                </div>
                <div className="card text-center">
                    <div className='badge badge-primary'>Followers:{followers}</div>
                    <div className='badge badge-success'>Following:{following}</div>
                    <div className='badge badge-light'>Public Repos:{public_repos}</div>
                    <div className='badge badge-primary'>Public Gists:{public_gists}</div>
                </div>
                <Repos repos={repos} />
            </Fragment>
        )
    }

}
User.propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
}

export default User
