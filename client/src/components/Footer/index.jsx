import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <button
            className="btn btn-dark mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <p>
        <h4>
          Made with{' '}
          <span
            className="emoji"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            ❤️
          </span>{' '}
          by the Mighty Coding Program Rangers!
        </h4>
        <h1>
            <a href='https://github.com/erica-210'><strong>Erica San Miguel</strong></a>
            <a href="https://github.com/Lunafish01"><strong>Joshua Luna</strong></a> 
            <a href="https://github.com/DamascusKraken"><strong>Nicholas Canchola</strong></a> 
        </h1>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
