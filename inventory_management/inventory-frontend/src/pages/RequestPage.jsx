import React, { useState, useEffect } from 'react';
import RequestTable from '../components/RequestTable';
import { getRequestList } from '../services/api';

function RequestPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getRequestList().then(data => setRequests(data));
  }, []);

  return (
    <div>
      <h2>Manage Requests</h2>
      <RequestTable requests={requests} />
    </div>
  );
}

export default RequestPage;
