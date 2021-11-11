import React from 'react'
import UserItem from './UserItem'
import Spinner from '../layouts/Spinner';
import PropTypes from 'prop-types';

const Users = ({ users, loading }) => {
    if (loading) {
        return <Spinner />
    }
    else {
        return (

            <div style={userStyle}>
                {/* {console.log(users)} */}
                {users.map(user => (

                    <UserItem key={user.id} user={user} />
                ))}

            </div>
        );
    }


}
const userStyle = {
    display: 'grid',
    gridTemplateColoumns: 'repeat(3,1fr)',
    gridGap: '1rem'
}
Users.propTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}
export default Users;
