import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate('/add-timesheet');
  };

  return (
    <nav className="mt-20">
    </nav>
  );
};

export default Navbar;
