import { FC, useRef, useState } from 'react';
import { checkValidData } from '../utils/validation';
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';

interface AuthError {
  code: string;
  message: string;
}

const Login: FC = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    const message = checkValidData(email.current?.value ?? '', password.current?.value ?? '', name.current?.value ?? '');
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      // Sign up Logic
      createUserWithEmailAndPassword(auth, email.current?.value ?? '', password.current?.value ?? '')
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current?.value ?? '', // Handle null or undefined case
          }).then(() => {
            const { uid, email, displayName } = auth.currentUser!;
            dispatch(addUser({ uid, email, displayName }));
          });
        })
        .catch((error: AuthError) => {
          setErrorMessage(`${error.code} ${error.message}`);
        });
    } else {
      // Sign in Logic
      signInWithEmailAndPassword(auth, email.current?.value ?? '', password.current?.value ?? '')
        .then((userCredential) => {
          const user = userCredential.user;
          // Handle sign-in logic if needed
        })
        .catch((error: AuthError) => {
          setErrorMessage(`${error.code} ${error.message}`);
        });
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-8 md:p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">{isSignInForm ? 'Sign In' : 'Sign Up'}</h1>
        {!isSignInForm && <input ref={name} type="text" placeholder="Full Name" className="p-4 my-2 w-full bg-gray-500" />}
        <input ref={email} type="text" placeholder="Email Id" className="p-4 my-2 w-full bg-gray-500" />
        <input ref={password} type="password" placeholder="Password" className="p-4 my-2 w-full bg-gray-500" />
        <p className="text-red-500 font-bold text-lg p-2">{errorMessage}</p>
        <button onClick={handleButtonClick} className="p-2 my-6 bg-red-700 w-full rounded-lg">
        {isSignInForm ? 'Sign In' : 'Sign Up'}
        </button>
        <p onClick={toggleSignInForm} className="py-4 cursor-pointer">
        {isSignInForm ? 'Are you new? Sign Up Now' : 'Already registered? Sign in now'}
        </p>
    </form>
  );
};

export default Login;