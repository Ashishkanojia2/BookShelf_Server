export const responseSender = (res, statuscode, success, message, data) => {
  return res.status(statuscode).json({ success, message, data });
};
export const responseErrorSender = (res, statuscode, success, error) => {
  return res.status(statuscode).json({ success, error });
};
