import { sequelize } from '../database'
import { DataTypes, Model } from 'sequelize'

export interface CandidateInstance extends Model {
    id: number
    name: string
    email: string
    bio: string
    phone: string
    openToWork: boolean
}

export const Candidate = sequelize.define<CandidateInstance>(
    'candidates', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bio: DataTypes.TEXT,
    phone: DataTypes.STRING,
    openToWork: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
},
)


