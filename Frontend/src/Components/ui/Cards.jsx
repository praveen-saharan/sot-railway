const Card = ({ children, className }) => {
    return (
      <div className={`bg-white shadow-md rounded-2xl p-6 ${className}`}>
        {children}
      </div>
    );
  };
  
  const CardContent = ({ children }) => {
    return <div className="flex flex-col items-center">{children}</div>;
  };
  
  export { Card, CardContent };