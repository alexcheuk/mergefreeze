import Controller from './controllers/slack.controller'

import { MERGE_FREEZE_MODAL_CALLBACK_ID } from './utils/slack-messages/constants'
import { Router } from 'express'
import { app, receiver } from './configs/slack-bolt.app'

const router = Router()

// Handle interactive slack commands
app.command('/mf', Controller.mergeFreeze)

// Handle interactive slack view events
app.view(
  { type: 'view_submission', callback_id: MERGE_FREEZE_MODAL_CALLBACK_ID },
  Controller.mergeFreezeModalSubmission
)

router.get('/slack/install', Controller.installSlack)

router.use('/', receiver.app)

export default router
