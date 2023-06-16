import React from 'react';
import ReactLoading from 'react-loading';

const Loading = ({ type, color }) => (
  <div className="flex justify-center items-center h-screen">
    <ReactLoading type={'spinningBubbles'} color={'red'} height={100} width={100} />
  </div>
);

export default Loading;
