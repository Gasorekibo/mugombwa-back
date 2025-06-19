import NGO from '../models/NGO.js';
import Service from '../models/Service.js';
const getAllNGOs = async (req, res) => {
  try {
    const ngos = await NGO.find({ isActive: true }).sort({ name: 1 });
    const ngosWithServices = await Promise.all(ngos.map(async (ngo) => {
      const services = await Service.find({ ngo_id: ngo._id });
      return {
        ...ngo.toObject(),
        services: services.map(service => ({
          _id: service._id,
          title: service.title,
          description: service.description,
          category: service.category,
          location: service.location,
          schedule: service.schedule,
          contact: service.contact,
          status: service.status,
          maxCapacity: service.maxCapacity,
          currentEnrollment: service.currentEnrollment
        }))
      };
      
    }));
    if (ngosWithServices.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No active NGOs found'
      });
    }
    res.status(200).json({
      success: true,
      count: ngosWithServices.length,
      data: ngosWithServices
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching NGOs',
      error: error.message
    });
  }
};

// Get single NGO by ID
const getNGOById = async (req, res) => {
  try {
    const ngo = await NGO.findById(req.params.id);
    
    if (!ngo) {
      return res.status(404).json({
        success: false,
        message: 'NGO not found'
      });
    }
    const services = await Service.find({ ngo_id: ngo._id });
    const ngoWithService =  {
      ...ngo.toObject(),
      services: services.map(service => ({
        _id: service._id,
        title: service.title,
        description: service.description,
        category: service.category,
        location: service.location,
        schedule: service.schedule,
        contact: service.contact,
          status: service.status,
          maxCapacity: service.maxCapacity,
          currentEnrollment: service.currentEnrollment
        }))
      };
   res.status(200).json({
      success: true,
      data: ngoWithService
   })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching NGO',
      error: error.message
    });
  }
};

// Create new NGO
const createNGO = async (req, res) => {
  try {
    const ngoData = {
      ...req.body,
      color: setOrganizationColor(req.body.name),
      icon: setOrganizationIcon(req.body.name)
    };

    const ngo = new NGO(ngoData);
    const savedNGO = await ngo.save();

    res.status(201).json({
      success: true,
      message: 'NGO created successfully',
      data: savedNGO
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'NGO with this name already exists'
      });
    }
    res.status(400).json({
      success: false,
      message: 'Error creating NGO',
      error: error.message
    });
  }
};


// Update NGO
const updateNGO = async (req, res) => {
  try {
    const ngo = await NGO.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true, 
        runValidators: true 
      }
    );

    if (!ngo) {
      return res.status(404).json({
        success: false,
        message: 'NGO not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'NGO updated successfully',
      data: ngo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating NGO',
      error: error.message
    });
  }
};

// Delete NGO (soft delete)
const deleteNGO = async (req, res) => {
  try {
    const ngo = await NGO.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!ngo) {
      return res.status(404).json({
        success: false,
        message: 'NGO not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'NGO deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting NGO',
      error: error.message
    });
  }
};

// Add service to NGO
const addServiceToNGO = async (req, res) => {
  
  try {
    const ngo = await NGO.findById(req.params.id);
    if (!ngo) {
      return res.status(404).json({
        success: false,
        message: 'NGO not found'
      });
    }
  const newService = new Service(req.body)
  await newService.save();
    ngo.services.push(newService);
    const updatedNGO = await ngo.save();
    res.status(201).json({
      success: true,
      message: 'Service added successfully',
      data: updatedNGO
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error adding service',
      error: error.message
    });
  }
};

// Update service in NGO
const updateNGOService = async (req, res) => {
  try {
    const ngo = await NGO.findById(req.params.ngoId);
    
    if (!ngo) {
      return res.status(404).json({
        success: false,
        message: 'NGO not found'
      });
    }

    const service = ngo.services.id(req.params.serviceId);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    Object.assign(service, req.body);
    const updatedNGO = await ngo.save();

    res.status(200).json({
      success: true,
      message: 'Service updated successfully',
      data: updatedNGO
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating service',
      error: error.message
    });
  }
};

// Delete service from NGO
const deleteNGOService = async (req, res) => {
  try {
    const ngo = await NGO.findById(req.params.ngoId);
    
    if (!ngo) {
      return res.status(404).json({
        success: false,
        message: 'NGO not found'
      });
    }

    ngo.services.id(req.params.serviceId).remove();
    const updatedNGO = await ngo.save();

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully',
      data: updatedNGO
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting service',
      error: error.message
    });
  }
};

// Get all services from all NGOs
const getAllServices = async (req, res) => {
  try {
    const ngos = await NGO.find({ isActive: true });
    const allServices = [];

    ngos.forEach(ngo => {
      ngo.services.forEach(service => {
        allServices.push({
          ...service.toObject(),
          ngo_name: ngo.name,
          ngo_color: ngo.color,
          ngo_id: ngo._id
        });
      });
    });

    res.status(200).json({
      success: true,
      count: allServices.length,
      data: allServices
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching services',
      error: error.message
    });
  }
};

// Get services by category
const getServicesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const ngos = await NGO.find({ isActive: true });
    const services = [];

    ngos.forEach(ngo => {
      const categoryServices = ngo.services.filter(service => 
        service.category === category && service.status === 'active'
      );
      
      categoryServices.forEach(service => {
        services.push({
          ...service.toObject(),
          ngo_name: ngo.name,
          ngo_color: ngo.color,
          ngo_id: ngo._id
        });
      });
    });

    res.status(200).json({
      success: true,
      category,
      count: services.length,
      data: services
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching services by category',
      error: error.message
    });
  }
};

export  {
  getAllNGOs,
  getNGOById,
  createNGO,
  updateNGO,
  deleteNGO,
  addServiceToNGO,
  updateNGOService,
  deleteNGOService,
  getAllServices,
  getServicesByCategory
};