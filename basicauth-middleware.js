export const basicAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).json({
      status: "Fail",
      message: "Authorization header missing",
    });
  }

  // Decode Base64 credentials
  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString("utf8");

  const [username, password] = credentials.split(":");

  // Hardcoded credentials (replace with DB or ENV vars)
  const VALID_USERNAME = "admin";
  const VALID_PASSWORD = "secret123";

  if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
    return res.status(401).json({
      status: "Fail",
      message: "Invalid credentials",
    });
  }

  next(); // Auth success
};
