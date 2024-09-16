import React, { useState } from 'react';
import { addEquipment } from '../services/api';

function EquipmentForm() {
  const [formData, setFormData] = useState({ name: '', quantity: '', description: '' });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    addEquipment(formData).then(response => console.log(response));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Equipment Name</label>
        <input type="text" className="form-control" name="name" onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Quantity</label>
        <input type="number" className="form-control" name="quantity" onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea className="form-control" name="description" onChange={handleChange}></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Add Equipment</button>
    </form>
  );
}

export default EquipmentForm;
