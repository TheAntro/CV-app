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
      {profile === null ? <Spinner /> : <Fragment>
        <Personal profile={ profile } />
        <Skills skills={ profile.skill[0] } />
        {profile.education.map(education => (
          <Education key={education._id} education={education} />
        ))}
        {profile.experience.map(experience => (
          <Experience key={experience._id} experience={experience} />
        ))}
        {profile.reference.map(reference => (
          <Reference key={reference._id} reference={reference} />
        ))}
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
