import { Router } from 'express';

import {
  getMatchesController,
  getStandingsController,
  getTeamsController,
  getMatchDetailsController,
  getSingleTeamController,
  getPersonController,
  getTopScorersController,
  getPlayerImageController,
} from './worldcup.controller';

const router = Router();

router.get('/matches', getMatchesController);

router.get('/standings', getStandingsController);

router.get('/teams', getTeamsController);
router.get('/teams/:id', getSingleTeamController);
router.get('/persons/:id', getPersonController);

router.get('/matchesDetails/:id', getMatchDetailsController);
router.get('/scorers', getTopScorersController);
router.get('/player-image', getPlayerImageController);

export default router;
