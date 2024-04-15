import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';


const Header = () => {

  const { isLoggedIn, setLogin } = useContext(AuthContext);

   const navigate = useNavigate();

  const logoutHandler = () => {
        localStorage.setItem('token', '');
        setLogin();
        navigate('/');
  }

  return (
  

      <header className='header'>
        <div className='logo'>
            <Link to='/'>Vtube</Link>
        </div>
        <ul>
          {isLoggedIn ? (
          <>
          
          <li><Link to='/profile'>profile name</Link></li>
          <li><Link to='/videos'>Videos</Link></li>
          <li><Link to='/addVideo'>Add Video</Link></li>
          <li><Link to='/deleteAccount'>DeleteAccount</Link></li>
          <li onClick={logoutHandler}><Link><FaSignOutAlt />Logout</Link></li>
          </>
          ) : (
            <>
              <li><Link to='/login'><FaSignInAlt />Login</Link></li>
              <li><Link to='/Register'><FaUser />Register</Link></li>
            </>
            )}

        </ul>
    </header>  

  
  )
}
export default Header