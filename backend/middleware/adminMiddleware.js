const adminMiddleware = (req, res, next) => {
  const user = req.user;

  if (!user || !user.isAdmin) {
    return res.status(403).json({
      message: "Admin access denied",
    });
  }

  next();
};

export default adminMiddleware;
