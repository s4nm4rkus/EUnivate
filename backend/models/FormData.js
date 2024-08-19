import mongoose from 'mongoose';

const formDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String, required: true },
    service: { type: String, required: true },
    budget: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const FormData = mongoose.model('FormData', formDataSchema);

export default FormData;
