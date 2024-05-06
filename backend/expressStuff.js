const app = require("./server").app;
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

app.get("/generate-link", (req, res) => {
    const roomId = crypto.randomBytes(4).toString("hex");
    const token = jwt.sign({ roomId }, process.env.PRIVATE_KEY, { expiresIn: "3d" });
    res.json({ remoteLink: `https://localhost:3000/dashboard?token=${token}`, roomId });
})

app.get("/get-link-data/:token", (req, res) => {
    const { token } = req.params;
    console.log(token);
    const payload = jwt.verify(token, process.env.PRIVATE_KEY);
    res.json(payload);
})