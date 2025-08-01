import React from 'react';

const Loader = () => {
  return (
    <div style={styles.loaderContainer}>
      <div style={styles.spinner}></div>
      <p>Loading books...</p>
    </div>
  );
};

const styles = {
  loaderContainer: {
    textAlign: 'center',
    marginTop: '50px'
  },
  spinner: {
    margin: 'auto',
    width: '50px',
    height: '50px',
    border: '5px solid #ccc',
    borderTop: '5px solid #333',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  }
};

export default Loader;
