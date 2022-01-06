import HashLoader from 'react-spinners/HashLoader';

function LoadingComponent() {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        paddingTop: '15%',
        justifyContent: 'center'
      }}
    >
      <HashLoader color="#00AB55" />
    </div>
  );
}

export default LoadingComponent;
