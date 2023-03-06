import Navbar from "./components/Navbar";

import About from "./routes/About";
import Booking from "./routes/Booking";
import Career from "./routes/Career";
import Contact from "./routes/Contact";
import Events from "./routes/Events";
import Gallery from "./routes/Gallery";
import Home from "./routes/Home";
// import Offers from "./routes/Offers";
import Payment from "./routes/Payment";
import Services from "./routes/Services";
import BookingAdmin from "./components/BookingAdmin";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import GalleryAdmin from "./routes/GalleryAdmin";
import EventAdmin from "./components/EventAdmin";
import CareerAdmin from "./components/CareerAdmin";
import Admin from "./routes/Admin";
import AdminNavbar from "./components/AdminNavbar";
import AdminLoginForm from "./components/AdminLoginForm";
import OfferAdmin from "./components/OfferAdmin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="booking" element={<Booking />} />
          <Route path="career" element={<Career />} />
          <Route path="contact" element={<Contact />} />
          <Route path="events" element={<Events />} />
          <Route path="gallery" element={<Gallery />} />

          {/* <Route path="offers" element={<Offers />} /> */}
          <Route path="payment" element={<Payment />} />
          <Route path="services" element={<Services />} />
        </Route>
        <Route path="adminlogin" element={<AdminLoginForm />} />
        <Route path="admin" element={<AdminNavbar />}>
          <Route index element={<Admin />} />
          <Route path="galleryadmin" element={<GalleryAdmin />} />
          <Route path="careeradmin" element={<CareerAdmin />} />
          <Route path="eventadmin" element={<EventAdmin />} />
          <Route path="offeradmin" element={<OfferAdmin />} />
          <Route path="bookingadmin" element={<BookingAdmin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
