export const badRequestHandler = (err, req, res, next) => {
    if (err.status === 400) {
      res.status(400).send(err);
    } else {
      next(err);
    }
  };
  
  export const notFoundHandler = (err, req, res, next) => {
    if (err.status === 404) {
      res.status(404).send("Page NOT found!");
    } else {
      next(err);
    }
  };
  export const forbiddenErrorHandler = (err, req, res, next) => {
    if (err.status === 403) {
      res.status(403).send("Request Forbidden!");
    } else {
      next(err);
    }
  };
  export const internalServerErrorHandler = (err, req, res, next) => {
    console.log(err);
    res.status(500).send(" OOPS...Internal Server Error!");
  };
  