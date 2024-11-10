import React from 'react';
import '../Styles/Navbar.css'
import image from '../Asserts/image.png'
import { useLocation, useNavigate } from 'react-router-dom';

const NavBar = ({isLoggedIn, userdat}) => {
  const  navigate = useNavigate();
  const location = useLocation();

  const today_Schedules = () =>{
    navigate('/org'
        , { state:
        (userdat)
        }
        );
  }

  const History = () =>{
    
    navigate('/org/History'
        , { state:
        (userdat)
        }
        );
  }

  const upcoming = () =>{
    navigate('/org/upcoming'
        , { state:
        (userdat)
        }
        );
  }

  const leaves = () =>{
    navigate('/org/Leave'
        , { state:
        (userdat)
        }
        );
  }

  const About = () =>{
    navigate('/about'
        , { state:
        (userdat)
        }
        );
  }

  const logout = () =>{
    navigate('/');
  }

  const Home  = () =>{
    navigate('/user/'
        , { state:
        (userdat)
        }
        );
  }

  const schedules = () =>{
    navigate('/user/new'
        , { state:
        (userdat)
        }
        );
  }

  const my_schedules = () =>{
    navigate('/user/History'
        , { state:
        (userdat)
        }
        );
  }

  const today = () =>{
    navigate('/user/today'
        , { state:
        (userdat)
        }
        );
  }

  const Logout = () =>{
    navigate('/');
  }

  return (
    <nav>
      <div className="logo"><img src={image}/></div>
      {(isLoggedIn == 1)?(
      <ul>
        <li><a>Login/Signup</a></li>
        <li><a onClick={About}>About Us</a></li>
      </ul>
      ):
        isLoggedIn == 2?(
          <ul>
        <li><a onClick={today_Schedules}>today Schedules</a></li>
        <li><a onClick={History}>History</a></li>
        <li><a onClick={upcoming}>upcoming..</a></li>
        <li><a onClick={leaves}>leaves</a></li>
        <li><a onClick={About}>About Us</a></li>
        <li><a onClick={logout}>logout</a></li>
      </ul>
        ):
        (     
        <ul>
        <li><a onClick={Home}>Home</a></li>
        <li><a onClick={schedules}>schedules now</a></li>
        <li><a onClick={my_schedules}>my schedules</a></li>
        <li><a onClick={today}>today schedules</a></li>
        <li><a onClick={About}>About Us</a></li>
        <li><a onClick={logout}>logout</a></li>
      </ul>
      )
    }
    </nav>
  );
}

export default NavBar;
