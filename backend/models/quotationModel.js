import mongoose from 'mongoose';

const QuotationSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true
    },
    clientEmail: {
        type: String,
        required: true
    },
    projectDetails: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    timeline: {
        type: String,
        required: true
    },
    // Add other fields as necessary
});

const Quotation = mongoose.model('Quotation', QuotationSchema);

export default Quotation;
