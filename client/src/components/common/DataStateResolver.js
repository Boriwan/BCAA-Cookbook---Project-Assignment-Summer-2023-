import LoadingPage from "../../pages/StatePages/LoadingPage";
import { Link } from "react-router-dom";


function DataStateResolver(props) {
  switch (props.data.state) {
    case "ready":
      return props.children;
    case "error":
      return (
        <div>
          Error - {JSON.stringify(props.data.error, null, 2)}{" "}
          <Link className="btn btn-secondary text-white" to="/">
            Domů
          </Link>
        </div>
      );
    default:
      return <LoadingPage />;
  }
}

export default DataStateResolver;
