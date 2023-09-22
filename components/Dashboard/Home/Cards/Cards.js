import React from 'react';
import PatentHistory from './PatientHistory';
import PatentHistoryChart from './PatientHistoryChart';
import TreatmentAndReviews from './TreatmentAndReviews';
import Payments from './Payment';
import AppointmentAllStaff from './AppointmentAllStaff';
import ShopInventory from './ShopInventory';

const Cards = () => {
  return <React.Fragment>
    <PatentHistory />
    <PatentHistoryChart />
    <TreatmentAndReviews />
    <AppointmentAllStaff />
    <ShopInventory />
    <Payments />
  </React.Fragment>
}

export default Cards;
