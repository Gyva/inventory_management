import React from 'react';

function RequestTable({ requests }) {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Equipment</th>
          <th>Requested Quantity</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {requests.map(request => (
          <tr key={request.id}>
            <td>{request.id}</td>
            <td>{request.equipment.name}</td>
            <td>{request.requested_quantity}</td>
            <td>{request.status}</td>
            <td>
              {/* Actions for HoD */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RequestTable;
