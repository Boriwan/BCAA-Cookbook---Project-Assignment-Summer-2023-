import LoadingPage from "../../pages/StatePages/LoadingPage";

function DataStateResolver(props) {
  switch (props.data.state) {
    case "ready":
      return props.children;
    case "error":
      return <div>Error - {JSON.stringify(props.data.error, null, 2)}</div>;
    default:
      return <LoadingPage />;
  }
}

export default DataStateResolver;
