export function formatCreditCardNumber(value) {
    if (!value) return value;
  
    // Remove any existing spaces from the input
    const formattedValue = value.replace(/ /g, "");
  
    // Add spaces after every 4 digits
    return formattedValue.replace(/(\d{4})/g, "$1 ").trim();
  }
  
  // Format CVC to only allow up to 3 digits
  export function formatCVC(value) {
    if (!value) return value;
  
    // Only allow up to 3 digits
    return value.slice(0, 3);
  }
  
  // Format expiration date to MM/YY format
  export function formatExpirationDate(value) {
    if (!value) return value;
  
    // Remove any non-numeric characters
    const formattedValue = value.replace(/\D/g, "");
  
    // Add '/' after the first two digits
    if (formattedValue.length > 2) {
      return formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
    }
  
    return formattedValue;
  }