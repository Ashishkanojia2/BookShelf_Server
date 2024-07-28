export const responseSender = (res, statuscode, success, message) => {
  return res.status(statuscode).json({ success, message });
};
export const responseErrorSender = (res, statuscode, success, error) => {
  return res.status(statuscode).json({ success, error });
};
