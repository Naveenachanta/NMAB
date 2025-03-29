import React from 'react';

const TeslaLoader = () => {
  const styles = {
    container: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff',
      fontFamily: '"Helvetica Neue", sans-serif',
      fontSize: '1.2rem',
      color: '#aaa',
    },
    spinner: {
      width: '40px',
      height: '40px',
      border: '3px solid #ccc',
      borderTop: '3px solid #aaa',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '10px',
    },
    keyframes: `
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  };

  return (
    <div style={styles.container}>
      <style>{styles.keyframes}</style>
      <div style={styles.spinner} />
      <p>Logging you in...</p>
    </div>
  );
};

export default TeslaLoader;
