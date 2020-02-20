// axios handleerror

export default (error, displayError) => {
  let errorMessage;
  if (error.response) {
    // The request was made and the server responded with a server code above 2XX

    errorMessage = error.response.data;
    console.error('Error response', errorMessage);

    // Cloudinary image uploads fails
    if (error.response.data.error) {
      errorMessage = error.response.data.error.message;
    }
  } else if (error.request) {
    // The request was made, but no response was recieved
    errorMessage = error.request;
    console.error('Error request', errorMessage);
  } else {
    // Something else happened, God knows what
    errorMessage = error.message;
    console.error('Error message', errorMessage);
  }
  displayError(errorMessage);
};
