export const otpGenerator = () => {
  return Math.floor(100000 + Math.random() * 900000); // Ensures a 6-digit number
};

