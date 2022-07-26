import { Request, Response } from "express"
import { Company } from "../models"

export const CompaniesController = {
    index: async (req: Request, res: Response) => {
        try {
            const companies = await Company.findAll()
            return res.json(companies)
        } catch (err) {
            if (err instanceof Error)
                return res.status(400).json({ message: err.message })
        }
    },

    save: async (req: Request, res: Response) => {
        const { name, bio, email, website } = req.body
        try {
            const company = await Company.create({
                name,
                bio,
                email,
                website,
            })
            return res.status(201).json(company)
        } catch (err) {
            if (err instanceof Error)
                return res.status(400).json({ message: err.message })
        }
    },

    show: async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const company = await Company.findByPk(id, { include: 'jobs' })
            return res.status(201).json(company)
        } catch (err) {
            if (err instanceof Error)
                return res.status(400).json({ message: err.message })
        }
    },

    update: async (req: Request, res: Response) => {
        const { id } = req.params
        const { name, bio, email, website } = req.body

        try {
            const company = await Company.findByPk(id)

            if (!company) return res.status(404).json({ message: 'Company not found' })

            await company.update({
                name,
                bio,
                email,
                website,
            })
            return res.status(201).json(company)
        } catch (err) {
            if (err instanceof Error)
                return res.status(400).json({ message: err.message })
        }
    },

    delete: async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const company = await Company.findByPk(id)

            if (!company) return res.status(404).json({ message: 'Company not found' })

            await company.destroy()
            return res.status(204).json()
        } catch (err) {
            if (err instanceof Error)
                return res.status(400).json({ message: err.message })
        }
    }

}