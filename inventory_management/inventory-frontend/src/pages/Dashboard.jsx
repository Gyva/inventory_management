import React, { useEffect, useState } from 'react';
import { getEquipmentList, getRequestList } from '../services/api'; // Import API calls

function Dashboard() {
  const [equipmentCount, setEquipmentCount] = useState(0);
  const [requestCount, setRequestCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch equipment and requests data when the component loads
    const fetchData = async () => {
      try {
        const equipment = await getEquipmentList();
        const requests = await getRequestList();
        
        // Set the counts based on the response length
        setEquipmentCount(equipment.length); 
        setRequestCount(requests.length);    
      } catch (err) {
        setError('Failed to load data');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Equipment</h5>
              <p className="card-text">{equipmentCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Pending Requests</h5>
              <p className="card-text">{requestCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
