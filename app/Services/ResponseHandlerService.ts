export const successResponseHandler = async (message: any, data?: any) => {
  return {
    status: true,
    message,
    ...(data && { data }),
  };
};

export const failResponseHandler = async (
  message: any,
  logLabel?: string,
  e?: any
) => {
  if (e && logLabel) {
    console.log(logLabel);
    console.error("failResponseHandler Exception: ", e);
  }

  return {
    status: false,
    message: message,
    errors: e?.messages?.errors,
  };
};
