const Button = ({ children, onClick, className }) => {
    return (
      <button
        onClick={onClick}
        className={`mt-2 text-purple-700 font-semibold hover:underline ${className}`}
      >
        {children}
      </button>
    );
  };
  
  export { Button };