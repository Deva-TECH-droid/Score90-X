"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.footballClient = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.footballClient = axios_1.default.create({
    baseURL: process.env.FOOTBALL_BASE_URL,
    timeout: 15000,
    headers: {
        'X-Auth-Token': process.env.FOOTBALL_API_KEY,
    },
});
