import { Request, Response } from "express"
import { Candidate } from "../models"

export const CandidatesController = {

    index: async (req: Request, res: Response) => {
        try {
            const candidates = await Candidate.findAll()
            return res.json(candidates)
        } catch (err) {
            if (err instanceof Error)
                return res.status(400).json({ message: err.message })
        }
    },

    save: async (req: Request, res: Response) => {
        const { name, bio, email, phone, openToWork } = req.body
        try {
            const candidate = await Candidate.create({
                name,
                bio,
                email,
                phone,
                openToWork
            })
            return res.status(201).json(candidate)
        } catch (err) {
            if (err instanceof Error)
                return res.status(400).json({ message: err.message })
        }
    },

    show: async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const candidate = await Candidate.findByPk(id)
            return res.status(201).json(candidate)
        } catch (err) {
            if (err instanceof Error)
                return res.status(400).json({ message: err.message })
        }
    },

    update: async (req: Request, res: Response) => {
        const { id } = req.params
        const { name, bio, email, phone, openToWork } = req.body


        try {
            const candidate = await Candidate.findByPk(id)

            if (!candidate) return res.status(404).json({ message: 'Candidate not found' })

            await candidate.update({
                name,
                bio,
                email,
                phone,
                openToWork
            })

            return res.status(201).json(candidate)
        } catch (err) {
            if (err instanceof Error)
                return res.status(400).json({ message: err.message })
        }
    },

    delete: async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const candidate = await Candidate.findByPk(id)

            if (!candidate) return res.status(404).json({ message: 'Candidate not found' })

            await candidate.destroy()

            return res.status(204).json()
        } catch (err) {
            if (err instanceof Error)
                return res.status(400).json({ message: err.message })
        }
    }

}