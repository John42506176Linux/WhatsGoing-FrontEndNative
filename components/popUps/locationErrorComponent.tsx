import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ErrorPopup from './errorComponent';

interface Props {
  locationError: string | null;
  locationActionTime: number | null;
}

const LocationErrorPopup: React.FC<Props> = ({ locationError, locationActionTime }) => {
    useEffect(() => {}, [locationError, locationActionTime]); // I'll add some error handling here later

    return <ErrorPopup message={locationError} actionTime={locationActionTime} />;
};

const mapStateToProps = (state: any) => {
  return {
    locationError: state.location.error,
    locationActionTime: state.location.actionTimestamp,
  };
};

export default connect(mapStateToProps)(LocationErrorPopup);
