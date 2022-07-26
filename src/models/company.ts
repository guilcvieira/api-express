import { DataTypes, Model } from "sequelize"
import { sequelize } from "../database"

interface CompanyInstance extends Model {
    id: number
    name: string
    email: string
    bio: string
    website: string
}

export const Company = sequelize.define<CompanyInstance>('companies', {
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
    website: DataTypes.STRING,
})
