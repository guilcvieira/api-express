
import express from 'express'
import { CandidatesController } from './controllers/candidates'
import { CompaniesController } from './controllers/companies'
import { JobsController } from './controllers/jobs'

const router = express.Router()

router.get('/', (req, res) => {
    res.json({ hello: 'Hello World!' })
})

router.get('/candidates', CandidatesController.index)
router.post('/candidates', CandidatesController.save)
router.get('/candidates/:id', CandidatesController.show)
router.put('/candidates/:id', CandidatesController.update)
router.delete('/candidates/:id', CandidatesController.delete)

router.get('/companies', CompaniesController.index)
router.post('/companies', CompaniesController.save)
router.get('/companies/:id', CompaniesController.show)
router.put('/companies/:id', CompaniesController.update)
router.delete('/companies/:id', CompaniesController.delete)

router.get('/jobs', JobsController.index)
router.post('/jobs', JobsController.save)
router.get('/jobs/:id', JobsController.show)
router.put('/jobs/:id', JobsController.update)
router.delete('/jobs/:id', JobsController.delete)

router.post('/jobs/:id/addCandidate', JobsController.addCandidate)
router.delete('/jobs/:id/removeCandidate', JobsController.removeCandidate)

export { router }