import { Request, Response } from 'express';

import {
  getWorldCupMatchesService,
  getWorldCupStandingsService,
  getWorldCupTeamsService,
  getMatchDetailsService,
  getWorldCupSingleTeamsService,
  getPersonService,
  getTopScorersService,
  getPlayerImageService,
} from './worldcup.service';

function getErrorMessage(error: unknown, defaultMessage: string) {
  const message = error instanceof Error ? error.message : defaultMessage;
  console.error(defaultMessage, error);
  return message;
}

export async function getMatchesController(req: Request, res: Response) {
  try {
    const data = await getWorldCupMatchesService();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: getErrorMessage(error, 'Failed to fetch matches'),
    });
  }
}
export async function getTopScorersController(req: Request, res: Response) {
  try {
    const data = await getTopScorersService();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: getErrorMessage(error, 'Failed to fetch matches'),
    });
  }
}

export async function getPlayerImageController(req: Request, res: Response) {
  try {
    const playerName = typeof req.query.name === 'string' ? req.query.name : '';

    if (!playerName.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Player name is required',
      });
    }

    const data = await getPlayerImageService(playerName);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: getErrorMessage(error, 'Failed to fetch player image'),
    });
  }
}

export async function getStandingsController(req: Request, res: Response) {
  try {
    const data = await getWorldCupStandingsService();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: getErrorMessage(error, 'Failed to fetch standings'),
    });
  }
}

export async function getTeamsController(req: Request, res: Response) {
  try {
    const data = await getWorldCupTeamsService();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: getErrorMessage(error, 'Failed to fetch teams'),
    });
  }
}
export async function getSingleTeamController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const SingleTeamId = Array.isArray(id) ? id[0] : id;

    const data = await getWorldCupSingleTeamsService(SingleTeamId);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: getErrorMessage(error, 'Failed to fetch Single team'),
    });
  }
}
export async function getPersonController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const PersonId = Array.isArray(id) ? id[0] : id;

    const data = await getPersonService(PersonId);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: getErrorMessage(error, 'Failed to fetch Single team'),
    });
  }
}

export async function getMatchDetailsController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const matchId = Array.isArray(id) ? id[0] : id;

    const match = await getMatchDetailsService(matchId);

    res.status(200).json({
      success: true,
      data: match,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: getErrorMessage(error, 'Failed to fetch match details'),
    });
  }
}
