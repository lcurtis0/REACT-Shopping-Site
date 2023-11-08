import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Error</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <h3>Here might be the issue :</h3>
      {/* This will have a special message on the error or status */}
      <p>
        <i>{error.statusText || error.message}</i>
      </p>

      <img
            alt="Coral"
            className="image"
            src="assets/images/Coral.png"
          />
    </div>
  );
}
