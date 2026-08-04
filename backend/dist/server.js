"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const worldcup_routes_1 = __importDefault(require("./modules/worldcup.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
/* -------------------- Security -------------------- */
// Secure HTTP headers
app.use((0, helmet_1.default)());
// Compress all JSON responses
app.use((0, compression_1.default)());
// Allow frontend requests
app.use((0, cors_1.default)());
// Parse JSON
app.use(express_1.default.json());
/* -------------------- Rate Limiter -------------------- */
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // 200 requests per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many requests. Please try again later.',
    },
});
app.use(limiter);
/* -------------------- Routes -------------------- */
app.use('/api/worldcup', worldcup_routes_1.default);
app.get('/', (_, res) => {
    res.send('Score90X Backend Running 🚀');
});
/* -------------------- Start Server -------------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on ${PORT}`);
});
