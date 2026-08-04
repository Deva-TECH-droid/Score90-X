"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMatchesController = getMatchesController;
exports.getTopScorersController = getTopScorersController;
exports.getPlayerImageController = getPlayerImageController;
exports.getStandingsController = getStandingsController;
exports.getTeamsController = getTeamsController;
exports.getSingleTeamController = getSingleTeamController;
exports.getPersonController = getPersonController;
exports.getMatchDetailsController = getMatchDetailsController;
const worldcup_service_1 = require("./worldcup.service");
function getErrorMessage(error, defaultMessage) {
    const message = error instanceof Error ? error.message : defaultMessage;
    console.error(defaultMessage, error);
    return message;
}
async function getMatchesController(req, res) {
    try {
        const data = await (0, worldcup_service_1.getWorldCupMatchesService)();
        res.status(200).json({
            success: true,
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: getErrorMessage(error, 'Failed to fetch matches'),
        });
    }
}
async function getTopScorersController(req, res) {
    try {
        const data = await (0, worldcup_service_1.getTopScorersService)();
        res.status(200).json({
            success: true,
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: getErrorMessage(error, 'Failed to fetch matches'),
        });
    }
}
async function getPlayerImageController(req, res) {
    try {
        const playerName = typeof req.query.name === 'string' ? req.query.name : '';
        if (!playerName.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Player name is required',
            });
        }
        const data = await (0, worldcup_service_1.getPlayerImageService)(playerName);
        return res.status(200).json({
            success: true,
            data,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: getErrorMessage(error, 'Failed to fetch player image'),
        });
    }
}
async function getStandingsController(req, res) {
    try {
        const data = await (0, worldcup_service_1.getWorldCupStandingsService)();
        res.status(200).json({
            success: true,
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: getErrorMessage(error, 'Failed to fetch standings'),
        });
    }
}
async function getTeamsController(req, res) {
    try {
        const data = await (0, worldcup_service_1.getWorldCupTeamsService)();
        res.status(200).json({
            success: true,
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: getErrorMessage(error, 'Failed to fetch teams'),
        });
    }
}
async function getSingleTeamController(req, res) {
    try {
        const { id } = req.params;
        const SingleTeamId = Array.isArray(id) ? id[0] : id;
        const data = await (0, worldcup_service_1.getWorldCupSingleTeamsService)(SingleTeamId);
        res.status(200).json({
            success: true,
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: getErrorMessage(error, 'Failed to fetch Single team'),
        });
    }
}
async function getPersonController(req, res) {
    try {
        const { id } = req.params;
        const PersonId = Array.isArray(id) ? id[0] : id;
        const data = await (0, worldcup_service_1.getPersonService)(PersonId);
        res.status(200).json({
            success: true,
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: getErrorMessage(error, 'Failed to fetch Single team'),
        });
    }
}
async function getMatchDetailsController(req, res) {
    try {
        const { id } = req.params;
        const matchId = Array.isArray(id) ? id[0] : id;
        const match = await (0, worldcup_service_1.getMatchDetailsService)(matchId);
        res.status(200).json({
            success: true,
            data: match,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: getErrorMessage(error, 'Failed to fetch match details'),
        });
    }
}
