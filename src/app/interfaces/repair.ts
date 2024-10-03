export interface Repair{
    id: number,
    vat: string,
    e9: string,
    repairType: string,
    shortDescription: string
    submissionDate: Date,
    description: string,
    scheduledStartDate: Date,
    scheduledEndDate: Date,
    proposedCost: number,
    acceptanceStatus: boolean,
    repairStatus: string,
    repairAddress: string,
    actualStartDate: Date,
    actualEndDate: Date,
    isDeleted: boolean
}