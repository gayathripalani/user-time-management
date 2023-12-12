import { FC, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../utils/firebase';
import { addUser, removeUser } from '../../utils/userSlice';
import { User } from '../../utils/type';

const Header: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: { user: User }) => state.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate('/error');
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        const { uid, email, displayName } = authUser;
        dispatch(addUser({ uid, email, displayName }));
        if (location.pathname === '/') {
          navigate('/home');
        }
        navigate(location.pathname);
      } else {
        dispatch(removeUser());
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);

  return (
    <div className="fixed w-screen p-3 bg-black z-10 flex md:flex-row justify-between">
      <p className='text-white font-bold text-2xl'>Timeføring AS</p>
      {user && (
        <div className="flex p-2">
          <button className="text-white font-bold" onClick={handleSignOut}>
            (Sign out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;