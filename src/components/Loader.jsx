import Spinner from 'react-bootstrap/Spinner';

const Loader = () => {
  return (
    <div className="w-100 h-100 d-flex gap-3 justify-content-center align-items-center">
      <Spinner animation="grow" variant="primary" size="md" />
      <Spinner animation="grow" variant="primary" size="md" />
      <Spinner animation="grow" variant="primary" size="md" />
      <Spinner animation="grow" variant="primary" size="md" />
    </div>
  );
};

export default Loader;
