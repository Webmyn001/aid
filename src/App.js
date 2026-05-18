import Footer from './AID/Footer';
import Navbar from './AID/Header/Navbar';

import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Contact from './AID/Contact';
import Works from './AID/Works';
import Service from './AID/Service';
import Home from './AID/Home';
import Certifications from './AID/Certifications';
import FullHome from './AID/Information/FullHome';
import Furnitures from './AID/Information/Furnitures';
import HomeDecor from './AID/Information/HomeDecor';
import HomeLight from './AID/Information/HomeLight';
import Stucco from './AID/Information/Stucco';
import POP from './AID/Information/POP';
import WallDesign from './AID/Information/WallDesign';
import Floor from './AID/Information/Floor';
import Window from './AID/Information/Window';
import AC from './AID/Information/AC';
import Cctv from './AID/Information/cctv';
import Garden from './AID/Information/Garden';
import Clean from './AID/Information/Clean';
import Wall from './AID/Information/Wall';

import AdminSecure from './AID/AdminSecure';
import BlogList from './AID/BlogList';
import BlogDetail from './AID/BlogDetail';
import WhatsAppButton from './AID/WhatsAppButton';
import Unauthorized404 from './AID/Unauthorized404';


function App() {
  
  
  return (
   <div className=" bg-repeat object-cover bg-[url('./AID/Image/background-design.jpg')]" >
    <Router>
       <Navbar/>
       <WhatsAppButton />
    <Routes>
    <Route path = "/" exact element= {<Home/>}></Route>
       <Route path = "/contact" exact element= {<Contact/>}></Route>
       <Route path = "/works" exact element= {<Works/>}></Route>
       <Route path = "/service" exact element= {<Service/>}></Route>


                         {/* Service details */}
      <Route path = "/home-interior" exact element= {<FullHome/>}></Route>
      <Route path = "/furnitures" exact element= {<Furnitures/>}></Route>
      <Route path = "/decor" exact element= {<HomeDecor/>}></Route>
      <Route path = "/lightning" exact element= {<HomeLight/>}></Route>
      <Route path = "/pop" exact element= {<POP/>}></Route>
      <Route path = "/stucco" exact element= {<Stucco/>}></Route>
      <Route path = "/wall-pannel" exact element= {<WallDesign/>}></Route>
      <Route path = "/floor" exact element= {<Floor/>}></Route>
      <Route path = "/Window" exact element= {<Window/>}></Route>
      <Route path = "/ac" exact element= {<AC/>}></Route>
      <Route path = "/cctv" exact element= {<Cctv/>}></Route>
      <Route path = "/garden" exact element= {<Garden/>}></Route>
      <Route path = "/cleaning" exact element= {<Clean/>}></Route>
      <Route path = "/console" exact element= {<Wall/>}></Route>
      
      

      {/* Admin Portal & Blog */}
      <Route path = "/aid-admin-secure" exact element= {<AdminSecure/>}></Route>
      <Route path = "/blog" exact element= {<BlogList/>}></Route>
      <Route path = "/blog/:id" exact element= {<BlogDetail/>}></Route>

       <Route path = "/cert" exact element= {<Certifications/>}></Route>


        {/* Error */}
 <Route path = "/error" exact element= {<Unauthorized404/>}></Route>


      
    </Routes>
      {/* Footer */}
      <Footer/>

    </Router>
    
     
   </div>
  );
}

export default App;
