import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './Components/Navbar';
import Doctor from './Components/Doctor';
import Department from './Components/Department';
import Room from './Components/Room';
import Patient from './Components/Patient';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Appo from './Components/Appo.jsx';
import Addappo from './Components/Addappo.jsx';
import Billing from './Components/Billing.jsx';
import AddBilling from './Components/AddBilling.jsx';
import AddDoctor from './Components/AddDoctor.jsx';
import AddPatient from './Components/AddPatient.jsx';
import AddRoom from './Components/Addroom.jsx';
import Displayroom from './Components/Displayroom.jsx';
import DisplayAppointment from './Components/DisplayAppointment.jsx';
import DisplatPatient from './Components/DisplatPatient.jsx';


createRoot(document.getElementById('root')).render(
  <>
    {/* < Navbar title = "HMS"/> */}
    <Router>
      <Navbar title="Hospital Management" />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/department" element={<Department />} />
        <Route path="/room" element={<Room />} />
        <Route path="/patient" element={<Patient/>} />
        <Route path="/appo" element={<Appo/>} />
        <Route path="/addappo" element={<Addappo/>} />
        <Route path="/billing" element={<Billing/>} />
        <Route path="/AddBilling" element={<AddBilling/>} />
        <Route path="/adddoctor" element={<AddDoctor/>} />
        <Route path="/addpatient" element={<AddPatient/>} />
        <Route path="/addroom" element={<AddRoom/>} />
        <Route path="/roomview" element={<Displayroom/>} />
        <Route path="/displayappo" element={<DisplayAppointment/>} />
        <Route path="/displaypatient" element={<DisplatPatient/>} />
        

      </Routes>
    </Router>
    <br /><br /><br />
    </>
)
