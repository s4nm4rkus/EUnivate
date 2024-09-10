import Product from "../models/addProducts.js";
import Event from "../models/addEvents.js";
import Project from "../models/addProjects.js";


export const getDashboardStats = async (req, res) => {
    try {
        const productCount = await Product.countDocuments();
        const projectCount = await Project.countDocuments();
        const webinarCount = await Event.countDocuments();
        res.json({ products: productCount, projects: projectCount, webinars: webinarCount });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
