class ErrorHandler extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export const errorMiddleWare = (err, req, res, next) => {
  err.message = err.message || "internal server error";
  err.status = err.status || 500;

  return res.status(err.status).json({
    success: false,
    message: err.message,
  });
};

export default ErrorHandler;
