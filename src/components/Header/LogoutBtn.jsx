import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();  // initialize navigate

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate('/');  // Redirect to home page after logout
    });
  };

  return (
    <button
      className="inline-block px-5 py-2 rounded-full text-gray-900 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
