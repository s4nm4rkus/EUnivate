import Quotation from '../models/quotationModel';

export const createQuotation = async(req, res) => {
    try {
        const quotation = new Quotation(req.body);
        await quotation.save();
        res
            .status(201)
            .json({message: 'Quotation saved successfully', quotation});
    } catch (error) {
        res
            .status(400)
            .json({message: 'Error saving quotation', error});
    }
};

export default { createQuotation };