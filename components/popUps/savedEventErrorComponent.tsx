import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import ErrorPopup from './errorComponent';

interface Props {
  savedEventsError: string | null;
  savedEventActionTime: number | null;
}

const SavedErrorPopUp: React.FC<Props> = ({ savedEventsError, savedEventActionTime }) => {
    useEffect(() => {}, [savedEventsError, savedEventActionTime]);

  return <ErrorPopup message={savedEventsError} actionTime={savedEventActionTime} />;
};

const mapStateToProps = (state: any) => {
  return {
    savedEventsError: state.savedEvents.error,
    savedEventActionTime: state.savedEvents.actionTimestamp,
  };
};

export default connect(mapStateToProps)(SavedErrorPopUp);