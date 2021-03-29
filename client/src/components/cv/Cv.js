import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import Personal from './Personal';
import Skills from './Skills';
import Education from './Education';
import Experience from './Experience';
import Reference from './Reference';
import Spinner from '../Spinner';

const Profile = ({ getProfileById, profile: { profile }, match }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id])
  return (
    <Fragment>
      {profile === null ? <Spinner /> : <div class="container mt-5 mb-5">
        <Personal profile={ profile } />
        <Skills skills={ profile.skill[0] } />
        <Education educations={ profile.education } />
        <Experience experiences={ profile.experience } />
        <Reference references={ profile.reference } />
      </div>}
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
