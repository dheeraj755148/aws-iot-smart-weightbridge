import React from "react";

function table(props) {
  /* console.log(props.data); */

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Sr.no</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Location</th>
          <th scope="col">Weight</th>
          <th scope="col">Amount</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((key, index) => (
          <tr key={key.timeStamp}>
            <th scope="row">{index + 1}</th>
            <td>{key.payload.name}</td>
            <td>{key.payload.email}</td>
            <td>{key.payload.location}</td>
            <td>{key.payload.weight}</td>
            <td>{key.payload.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default table;
