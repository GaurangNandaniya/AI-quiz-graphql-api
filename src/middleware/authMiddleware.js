export const validateUser = (req, res, next) => {
  const { userDetails } = req.body;
  const { email, password } = userDetails;
  console.log({ apiRoute: req.originalUrl });

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  next();
};

export const validateUserEmail = (req, res, next) => {
  const { userDetails } = req.body;
  const { email } = userDetails;
  console.log({ apiRoute: req.originalUrl });

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  next();
};
