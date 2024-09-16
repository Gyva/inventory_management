import React, { useState, useEffect } from 'react';
import EquipmentTable from '../components/EquipmentTable';
import EquipmentForm from '../components/EquipmentForm';
import { getEquipmentList } from '../services/api';

function EquipmentPage() {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    getEquipmentList().then(data => setEquipment(data));
  }, []);

  return (
    <div>
      <h2>Manage Equipment</h2>
      <EquipmentForm />
      <EquipmentTable equipment={equipment} />
    </div>
  );
}

export default EquipmentPage;
