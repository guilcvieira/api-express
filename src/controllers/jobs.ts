import { Request, Response } from "express"
import { Candidate, Job } from "../models"

export const JobsController = {
    index: async (req: Request, res: Response) => {
        try {
            const jobs = await Job.findAll({ include: 'company' })
            return res.json(jobs)
        } catch (err) {
            if (err instanceof Error)
                return res.status(400).json({ message: err.message })
        }
    },

    save: async (req: Request, res: Response) => {
        const { title, description, limitDate, companyId } = req.body
        try {
            const job = await Job.create({
                title,
                description,
                limitDate,
                companyId,
            })
            return res.status(201).json(job)
        } catch (err) {
            if (err instanceof Error)
                return res.status(400).json({ message: err.message })
        }
    },

    show: async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const job = await Job.findByPk(id, { include: ['company', 'candidates'] })

            if (!job) return res.status(404).json({ message: 'Job not found' })

            const candidateCount = await job.countCandidates()

            return res.status(201).json({ ...job.get(), candidateCount })
        } catch (err) {
            if (err instanceof Error)
                return res.status(400).json({ message: err.message })
        }
    },

    update: async (req: Request, res: Response) => {
        const { id } = req.params
        const { title, description, limitDate, companyId } = req.body

        try {
            const job = await Job.findByPk(id, { include: 'company' })

            if (!job) return res.status(404).json({ message: 'Job not found' })

            await job.update({
                title,
                description,
                limitDate,
                companyId,
            })
            return res.status(201).json(job)
        } catch (err) {
            if (err instanceof Error)
                return res.status(400).json({ message: err.message })
        }
    },

    delete: async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const job = await Job.findByPk(id)

            if (!job) return res.status(404).json({ message: 'Job not found' })

            await job.destroy()
            return res.status(204).json()
        } catch (err) {
            if (err instanceof Error)
                return res.status(400).json({ message: err.message })
        }
    },

    addCandidate: async (req: Request, res: Response) => {
        const { id } = req.params
        const { candidateId } = req.body

        try {
            const job = await Job.findByPk(id)
            const candidate = await Candidate.findByPk(candidateId)

            if (!job) return res.status(404).json({ message: 'Job not found' })
            if (!candidate) return res.status(404).json({ message: 'Candidate not found' })

            if (await job.hasCandidate(candidateId)) return res.status(404).json({ message: 'Candidade already in Job' })

            await job.addCandidate(candidateId)
            return res.status(201).json({ message: `Added candidate ${candidate.name} to Job ${job.title}` })
        } catch (err) {
            if (err instanceof Error)
                return res.status(400).json({ message: err.message })
        }
    },

    removeCandidate: async (req: Request, res: Response) => {
        const { id } = req.params
        const { candidateId } = req.body

        try {
            const job = await Job.findByPk(id)
            const candidate = await Candidate.findByPk(candidateId)

            if (!job) return res.status(404).json({ message: 'Job not found' })
            if (!candidate) return res.status(404).json({ message: 'Candidate not found' })

            await job.removeCandidate(candidateId)
            return res.status(204).json({ message: `Removed Candidate ${candidate.name} from Job ${job.title}` })
        } catch (err) {
            if (err instanceof Error)
                return res.status(400).json({ message: err.message })
        }
    }

}
