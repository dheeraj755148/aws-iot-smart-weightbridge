import React, { useEffect, useState } from "react";
//import { fetchData } from "./AWSfunction";
import * as AWS from "aws-sdk";
import Table from "./table";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const docClient = new AWS.DynamoDB.DocumentClient();

  const fetchData = (tableName) => {
    var params = {
      TableName: tableName,
    };

    docClient.scan(params, function (err, data) {
      if (!err) {
        setData(data.Items);
        setLoading(true);
      } else {
        console.log(err);
      }
    });
  };

  const fetchDataFormDynamoDb = () => {
    fetchData("weighbridgeTable");
  };

  useEffect(() => {
    fetchDataFormDynamoDb();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 text-center m-4">
            <h2>Weight bridge data</h2>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12">
            <Table data={data} />
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Fetching Data....</h1>;
  }
}

export default App;
