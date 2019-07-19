import React from "react";
import { history } from "router";
import { Empty, Button } from "antd";

const NotFound: React.FC = () => {
  const description = "Page Not found";
  return (
    <Empty description={description}>
      <Button
        onClick={() => history.replace({ pathname: "/user" })}
        type="primary"
      >
        Back to Home Page
      </Button>
      <br />
      <Button
        onClick={() => history.replace({ pathname: "/other/hiphop" })}
        type="danger"
      >
        Back to Hip Hop
      </Button>
    </Empty>
  );
};

export default NotFound;
