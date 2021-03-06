import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../actions/profile';

const Profile = ({ getProfileById, profile: { profile }, match }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id])
  return (
    <Fragment>
      {profile === null ? <p>{match.params.id}</p> : <Fragment>
        <h1>{profile.name}</h1>
        <h2>{profile.email}</h2>
      </Fragment>}
    </Fragment>
  )
}

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getProfileById })(Profile);
