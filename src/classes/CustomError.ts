class CustomError extends Error {
  public code: number;

  constructor(message?: string, code: number = 500) { 
    super(message || 'Something went wrong'); 
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
