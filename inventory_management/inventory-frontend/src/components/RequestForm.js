import React, { useState } from 'react';
import { addRequest } from '../services/api';

function RequestForm() {
  const [formData, setFormData] = useState({ equipment_id: '', quantity: '' });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    addRequest(formData).then(response => console.log(response));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Equipment ID</label>
        <input type="text" className="form-control" name="equipment_id" onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Quantity</label>
        <input type="number" className="form-control" name="quantity" onChange={handleChange} />
      </div>
      <button type="submit" className="btn btn-primary">Request Equipment</button>
    </form>
  );
}

export default RequestForm;
