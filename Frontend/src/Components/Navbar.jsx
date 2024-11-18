import React from 'react'
import { Link } from 'react-router-dom';


function Navbar(props) {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container-fluid">
    <Link class="navbar-brand" to="/">{props.title}</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/doctor">Doctors</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/department">Departments</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/patient">Patients</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/room">Rooms</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/appo">Appointment</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/billing">Bills</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
