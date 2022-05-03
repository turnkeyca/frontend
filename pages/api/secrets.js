export default function handler(req, res) {
    // res.status(200).json({ secret: "hello world"})
    res.status(200).json({ secret: process.env.LOGIN_SECRET})
}