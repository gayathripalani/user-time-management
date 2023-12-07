import { FC } from "react";

interface AlertProps {
  message: string;

}
const Alert: FC<AlertProps> = ({ message }) => {

  return (
    <div className={`relative py-3 pl-4 pr-10 leading-normal text-red-700 bg-red-100 rounded-lg`} role="alert">
      <p>{message}</p>
    </div>
  );
};

export default Alert;
