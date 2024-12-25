export const authMiddleware = (req, res, next) => {
    const password = req.header("Authorization");
    if (password === process.env.ADMIN_PASSWORD) {
    next();
    } else {
    res.status(403).json({ error: "Unauthorized access" });
    }
    };
    