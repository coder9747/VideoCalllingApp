const app = require("./server").app;
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

app.get("/generate-link", (req, res) => {
    try {
        const roomId = crypto.randomBytes(4).toString("hex");
        const token = jwt.sign({ roomId }, process.env.PRIVATE_KEY, { expiresIn: "3d" });
        res.json({ remoteLink: `https://localhost:3000/dashboard?token=${token}`, roomId });

    } catch (error) {
        res.status(500).json("error");
    }

})

app.get("/get-link-data/:token", (req, res) => {
    try {
        const { token } = req.params;
        const payload = jwt.verify(token, process.env.PRIVATE_KEY);
        res.json(payload);
    } catch (error) {
        res.status(500).json("error");
    }

})