import { isHttpError } from "http-errors";
export const errorHandler = (err, req, res, _next) => {
    if (isHttpError(err)) {
        return res.status(err.status).json({ message: err.message || err.name });
    }
    res.status(500).json({ message: "Something went wrong" });
};
