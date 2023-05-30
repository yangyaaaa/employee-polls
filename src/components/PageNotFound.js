import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <h1>404 Not Available</h1>
      <p>There is not such Poll, please try again for a valid one</p>
      <br />
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default ErrorPage;