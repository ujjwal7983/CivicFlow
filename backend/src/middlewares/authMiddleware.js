import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
    let token;

    if (req.cookies && req.cookies.token) {
        try {
            token = req.cookies.token;

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = {
                id: decoded.id,
                role: decoded.role,
            };

            next();
        } catch (error) {
            return res.status(401).json({ message: "Invalid token" });
        }
    } else {
        return res.status(401).json({ message: "No token, authorization denied" });
    }
};

export default protect;
