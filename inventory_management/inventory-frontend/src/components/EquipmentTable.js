import React from 'react';

function EquipmentTable({ equipment }) {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Description</th>
          <th>Date Added</th>
        </tr>
      </thead>
      <tbody>
        {equipment.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>{item.description}</td>
            <td>{item.date_added}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EquipmentTable;
