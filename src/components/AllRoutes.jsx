import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddNewDeliverAddress from './AddNewDeliverAddress';
import Table from './Table';

export default function AllRoutes() {
  return (
    <Routes>
      <Route
        path="/add-new-delivery-address/:_id"
        element={<AddNewDeliverAddress />}
      />
    </Routes>
  );
}
