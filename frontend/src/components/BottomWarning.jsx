import { useNavigate } from "react-router-dom";

export const BottomWarming = ({ text, link }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${link}`);
  };

  return (
    <div>
      <span>{text}</span>
      <span className="hover:underline-offset-4 cursor-pointer font-semibold" onClick={handleClick}>
        {" "}
        {link}
      </span>
    </div>
  );
}; 
