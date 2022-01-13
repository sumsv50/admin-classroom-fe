import HashLoader from 'react-spinners/HashLoader';

function LoadingComponent() {
  return (
    <div
      style={{
        display: 'flex',
        position: 'absolute',
        width: '100%',
        height: '100vh',
        top: '0',
        left: '0',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <HashLoader color="#00AB55" />
    </div>
  );
}

export default LoadingComponent;
