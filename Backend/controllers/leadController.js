const Lead = require('../models/leadModel');

// Create a new lead
exports.createLead = async (req, res) => {
    try {
        const { name, email, phone, message, serviceType, programName } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({ message: 'Name, email, and phone are required' });
        }

        const lead = new Lead({
            name,
            email,
            phone,
            message,
            serviceType,
            programName,
        });

        await lead.save();

        res.status(201).json({
            message: 'Inquiry submitted successfully',
            lead,
        });
    } catch (error) {
        console.error('Create lead error:', error);
        res.status(500).json({ message: 'Server error while submitting inquiry', error: error.message });
    }
};

// Get all leads (Admin only)
exports.getAllLeads = async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.json({ leads });
    } catch (error) {
        console.error('Get all leads error:', error);
        res.status(500).json({ message: 'Server error while fetching inquiries', error: error.message });
    }
};

// Update lead status (Admin only)
exports.updateLeadStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['new', 'contacted', 'resolved', 'cancelled'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const lead = await Lead.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!lead) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }

        res.json({ message: 'Inquiry status updated', lead });
    } catch (error) {
        console.error('Update lead status error:', error);
        res.status(500).json({ message: 'Server error while updating inquiry', error: error.message });
    }
};

// Delete a lead (Admin only)
exports.deleteLead = async (req, res) => {
    try {
        const { id } = req.params;
        const lead = await Lead.findByIdAndDelete(id);

        if (!lead) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }

        res.json({ message: 'Inquiry deleted successfully' });
    } catch (error) {
        console.error('Delete lead error:', error);
        res.status(500).json({ message: 'Server error while deleting inquiry', error: error.message });
    }
};
