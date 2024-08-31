import mongoose from 'mongoose';

const QuotationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    additionalInfo: {
        type: String,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});


const Quotation = mongoose.model('Quotation', QuotationSchema);

export default Quotation;
