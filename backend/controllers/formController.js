import FormData from '../models/FormData.js';

export const submitFormData = async (req, res) => {
    const { name, email, phone, company, service, budget } = req.body;

    const formData = new FormData({
        name,
        email,
        phone,
        company,
        service,
        budget,
        user: req.user._id
    });

    try {
        const savedData = await formData.save();
        res.status(201).json(savedData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
