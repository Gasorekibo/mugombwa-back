import mongoose from 'mongoose';
import NGO from '../models/NGO.js';
import Service from '../models/Service.js';
import Announcement from '../models/Announcement.js';
import EmergencyContact from '../models/EmergencyContact.js';
import dotenv from 'dotenv';
dotenv.config();

const seedData = {
  ngos: [
    {
      name: 'World Vision',
      description: 'Education & Sanitation Services',
      color: '#1E40AF',
      icon: 'GraduationCap',
      contact_info: 'Phone: +250 788 123 456<br>Email: worldvision@mugombwa.rw',
      services: [
        {
          title: 'Primary Education Program',
          description: 'Daily classes for children aged 6-12 with qualified teachers and learning materials',
          category: 'education',
          location: 'Community Center Block A',
          schedule: 'Monday-Friday: 8:00 AM - 12:00 PM',
          contact: '+250 788 123 456',
          status: 'active'
        },
        {
          title: 'Adult Literacy Classes',
          description: 'Reading and writing classes for adults in Kinyarwanda, French, and English',
          category: 'education',
          location: 'Community Center Block B',
          schedule: 'Tuesday/Thursday: 6:00 PM - 8:00 PM',
          contact: '+250 788 123 456',
          status: 'active'
        },
        {
          title: 'Water Distribution',
          description: 'Clean water access points with quality testing and distribution schedules',
          category: 'sanitation',
          location: 'Water Point 1 & 2',
          schedule: 'Daily: 6:00 AM - 6:00 PM',
          contact: '+250 788 123 456',
          status: 'active'
        },
        {
          title: 'Sanitation Facilities',
          description: 'Public toilet and hygiene facilities with maintenance and cleaning services',
          category: 'sanitation',
          location: 'Multiple locations',
          schedule: '24/7 Access',
          contact: '+250 788 123 456',
          status: 'active'
        }
      ]
    },
    {
      name: 'Plan International',
      description: 'Children\'s Rights & Protection',
      color: '#059669',
      icon: 'Heart',
      contact_info: 'Phone: +250 788 234 567<br>Email: plan@mugombwa.rw',
      services: [
        {
          title: 'Child Protection Services',
          description: 'Safe spaces and protection for children with trained social workers',
          category: 'protection',
          location: 'Child-Friendly Space 1',
          schedule: 'Monday-Saturday: 9:00 AM - 5:00 PM',
          contact: '+250 788 234 567',
          status: 'active'
        },
        {
          title: 'Youth Programs',
          description: 'Skills training and activities for youth aged 15-24',
          category: 'youth',
          location: 'Youth Center',
          schedule: 'Daily: 2:00 PM - 6:00 PM',
          contact: '+250 788 234 567',
          status: 'active'
        },
        {
          title: 'Recreational Activities',
          description: 'Sports and games for children to promote physical and mental wellbeing',
          category: 'recreation',
          location: 'Sports Ground',
          schedule: 'Daily: 4:00 PM - 6:00 PM',
          contact: '+250 788 234 567',
          status: 'active'
        }
      ]
    },
    {
      name: 'MINEMA',
      description: 'Emergency Response & Safety',
      color: '#DC2626',
      icon: 'Shield',
      contact_info: 'Phone: +250 788 345 678<br>Email: minema@mugombwa.rw',
      services: [
        {
          title: 'Emergency Response',
          description: '24/7 emergency assistance for medical, fire, and security incidents',
          category: 'emergency',
          location: 'Emergency Center',
          schedule: '24/7 Available',
          contact: '+250 788 345 678',
          status: 'active'
        },
        {
          title: 'Safety Training',
          description: 'Fire safety and emergency preparedness training for all residents',
          category: 'safety',
          location: 'Training Hall',
          schedule: 'Weekly: Saturday 10:00 AM',
          contact: '+250 788 345 678',
          status: 'active'
        },
        {
          title: 'Emergency Shelter',
          description: 'Temporary shelter for emergencies and displaced families',
          category: 'emergency',
          location: 'Shelter Area C',
          schedule: '24/7 Available',
          contact: '+250 788 345 678',
          status: 'active'
        }
      ]
    },
    {
      name: 'Prison Fellowship',
      description: 'Legal Aid & Rights',
      color: '#7C3AED',
      icon: 'Scale',
      contact_info: 'Phone: +250 788 456 789<br>Email: legal@mugombwa.rw',
      services: [
        {
          title: 'Legal Aid Consultation',
          description: 'Free legal advice and assistance from qualified lawyers',
          category: 'legal',
          location: 'Legal Aid Office',
          schedule: 'Monday-Friday: 9:00 AM - 4:00 PM',
          contact: '+250 788 456 789',
          status: 'active'
        },
        {
          title: 'Document Assistance',
          description: 'Help with legal documents, applications, and official paperwork',
          category: 'legal',
          location: 'Document Center',
          schedule: 'Monday-Friday: 8:00 AM - 5:00 PM',
          contact: '+250 788 456 789',
          status: 'active'
        },
        {
          title: 'Rights Awareness',
          description: 'Legal rights education sessions for refugees and asylum seekers',
          category: 'education',
          location: 'Community Hall',
          schedule: 'Wednesday: 3:00 PM - 5:00 PM',
          contact: '+250 788 456 789',
          status: 'active'
        }
      ]
    },
    {
      name: 'Save the Children',
      description: 'Health & Nutrition',
      color: '#EA580C',
      icon: 'Stethoscope',
      contact_info: 'Phone: +250 788 567 890<br>Email: health@mugombwa.rw',
      services: [
        {
          title: 'Health Clinic',
          description: 'Primary healthcare services with qualified medical staff',
          category: 'health',
          location: 'Health Center',
          schedule: 'Monday-Friday: 8:00 AM - 5:00 PM',
          contact: '+250 788 567 890',
          status: 'active'
        },
        {
          title: 'Vaccination Program',
          description: 'Child vaccination services following WHO guidelines',
          category: 'health',
          location: 'Health Center',
          schedule: 'Monday/Wednesday: 9:00 AM - 12:00 PM',
          contact: '+250 788 567 890',
          status: 'active'
        },
        {
          title: 'Nutrition Program',
          description: 'Nutrition support and monitoring for children under 5',
          category: 'health',
          location: 'Nutrition Center',
          schedule: 'Daily: 10:00 AM - 2:00 PM',
          contact: '+250 788 567 890',
          status: 'active'
        },
        {
          title: 'Maternal Health',
          description: 'Healthcare for mothers and babies including prenatal care',
          category: 'health',
          location: 'Maternal Ward',
          schedule: 'Monday-Friday: 8:00 AM - 5:00 PM',
          contact: '+250 788 567 890',
          status: 'active'
        }
      ]
    }
  ],

  emergencyContacts: [
    {
      name: 'MINEMA Emergency Hotline',
      phone: '+250 788 345 678',
      type: 'emergency',
      available_24_7: true
    },
    {
      name: 'Health Emergency',
      phone: '+250 788 567 890',
      type: 'health',
      available_24_7: true
    },
    {
      name: 'Security Office',
      phone: '+250 788 111 222',
      type: 'security',
      available_24_7: true
    },
    {
      name: 'Fire Department',
      phone: '+250 788 333 444',
      type: 'fire',
      available_24_7: true
    },
    {
      name: 'Camp Manager',
      phone: '+250 788 555 666',
      type: 'administration',
      available_24_7: false
    }
  ]
};

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await NGO.deleteMany({});
    await Service.deleteMany({});
    await Announcement.deleteMany({});
    await EmergencyContact.deleteMany({});
    console.log('✅ Cleared existing data');

    const createdNGOs = [];
    const allServices = [];

    // Create NGOs and their services
    for (const ngoData of seedData.ngos) {
      // Extract services from NGO data
      const { services, ...ngoWithoutServices } = ngoData;
      
      // Create NGO first
      const ngo = new NGO(ngoWithoutServices);
      const savedNGO = await ngo.save();
      createdNGOs.push(savedNGO);

      // Create services for this NGO
      const serviceIds = [];
      for (const serviceData of services) {
        const service = new Service({
          ...serviceData,
          ngo_id: savedNGO._id
        });
        const savedService = await service.save();
        serviceIds.push(savedService._id);
        allServices.push(savedService);
      }

      // Update NGO with service references
      savedNGO.services = serviceIds;
      await savedNGO.save();
    }

    console.log(`✅ Created ${createdNGOs.length} NGOs`);
    console.log(`✅ Created ${allServices.length} Services`);

    // Seed Emergency Contacts
    const createdContacts = await EmergencyContact.insertMany(seedData.emergencyContacts);
    console.log(`✅ Created ${createdContacts.length} emergency contacts`);

    // Create sample announcements (same as before)
    const sampleAnnouncements = [
      {
        ngo_id: createdNGOs[0]._id,
        ngo_name: createdNGOs[0].name,
        ngo_color: createdNGOs[0].color,
        title: 'New Education Enrollment Open',
        content: 'Registration for new education programs is now open. Visit Community Center Block A to register your children. Bring identification documents and proof of residence in the camp.',
        priority: 'high',
        category: 'education'
      },
      {
        ngo_id: createdNGOs[1]._id,
        ngo_name: createdNGOs[1].name,
        ngo_color: createdNGOs[1].color,
        title: 'Youth Skills Training Program',
        content: 'New vocational training program starting next month. Limited spots available for youth aged 15-24. Training includes computer skills, tailoring, and carpentry.',
        priority: 'normal',
        category: 'youth'
      },
      {
        ngo_id: createdNGOs[2]._id,
        ngo_name: createdNGOs[2].name,
        ngo_color: createdNGOs[2].color,
        title: 'Emergency Drill This Friday',
        content: 'Mandatory emergency preparedness drill scheduled for Friday at 2:00 PM. All residents must participate. Assembly points will be clearly marked.',
        priority: 'urgent',
        category: 'emergency'
      },
      {
        ngo_id: createdNGOs[3]._id,
        ngo_name: createdNGOs[3].name,
        ngo_color: createdNGOs[3].color,
        title: 'Legal Aid Clinic Hours Extended',
        content: 'Legal aid consultation hours extended to better serve the community. Now available Monday through Friday, 9:00 AM to 4:00 PM.',
        priority: 'normal',
        category: 'legal'
      },
      {
        ngo_id: createdNGOs[4]._id,
        ngo_name: createdNGOs[4].name,
        ngo_color: createdNGOs[4].color,
        title: 'Vaccination Campaign Next Week',
        content: 'Special vaccination campaign for children under 5 years old starting Monday. Please bring your child\'s health card and arrive early to avoid long queues.',
        priority: 'high',
        category: 'health'
      }
    ];

    const createdAnnouncements = await Announcement.insertMany(sampleAnnouncements);
    console.log(`✅ Created ${createdAnnouncements.length} announcements`);

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`- NGOs: ${createdNGOs.length}`);
    console.log(`- Total Services: ${allServices.length}`);
    console.log(`- Emergency Contacts: ${createdContacts.length}`);
    console.log(`- Announcements: ${createdAnnouncements.length}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/refugee_services');
    console.log('📦 Connected to MongoDB');
    
    await seedDatabase();
    
    await mongoose.connection.close();
    console.log('📦 Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection error:', error);
    process.exit(1);
  }
};

connectDB();

export default seedDatabase;