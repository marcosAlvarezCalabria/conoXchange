require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/user.model");
const Skill = require("./models/skill.model");
const Message = require("./models/message.model");
const Rating = require("./models/rating.models");
const Petition = require("./models/petition.model");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/conoXchange";

// Datos de usuarios
const users = [
  {
    email: "ana.garcia@example.com",
    password: "password123",
    username: "anagrc",
    description: "Me encanta enseñar programación y aprender idiomas",
    interests: ["technology", "languages and culture"]
  },
  {
    email: "carlos.lopez@example.com",
    password: "password123",
    username: "carlosL",
    description: "Chef aficionado y guitarrista los fines de semana",
    interests: ["cooking", "music"]
  },
  {
    email: "maria.santos@example.com",
    password: "password123",
    username: "mariasant",
    description: "Jardinera urbana y amante del yoga",
    interests: ["gardening and horticulture", "sports"]
  },
  {
    email: "pedro.ruiz@example.com",
    password: "password123",
    username: "pedroR",
    description: "Carpintero y entusiasta del bricolaje",
    interests: ["crafts", "everyday life skills"]
  },
  {
    email: "lucia.martin@example.com",
    password: "password123",
    username: "luciaMar",
    description: "Profesora de inglés y cocinera experimental",
    interests: ["languages and culture", "cooking"]
  }
];

// Datos de skills
const skillsData = [
  {
    name: "Introducción a JavaScript",
    category: "technology",
    description: "Aprende los fundamentos de JavaScript desde cero. Cubrimos variables, funciones, arrays, objetos y más. Ideal para principiantes."
  },
  {
    name: "Cocina Italiana Casera",
    category: "cooking",
    description: "Aprende a preparar auténtica pasta italiana, salsas tradicionales y postres clásicos como el tiramisú."
  },
  {
    name: "Guitarra para Principiantes",
    category: "music",
    description: "Clases de guitarra acústica para principiantes. Aprende acordes básicos, ritmos y tus primeras canciones."
  },
  {
    name: "Huerto Urbano en Casa",
    category: "gardening and horticulture",
    description: "Crea tu propio huerto en balcones o terrazas pequeñas. Cultiva tomates, hierbas aromáticas y más."
  },
  {
    name: "Carpintería Básica",
    category: "crafts",
    description: "Aprende técnicas básicas de carpintería y crea tus propios muebles y objetos de madera."
  },
  {
    name: "Inglés Conversacional",
    category: "languages and culture",
    description: "Mejora tu inglés hablado con conversaciones prácticas sobre temas cotidianos y profesionales."
  },
  {
    name: "Yoga para Principiantes",
    category: "sports",
    description: "Iniciación al yoga con posturas básicas, técnicas de respiración y meditación guiada."
  },
  {
    name: "Reparaciones del Hogar",
    category: "everyday life skills",
    description: "Aprende a realizar reparaciones básicas: electricidad, fontanería, pintura y más."
  }
];

// Datos de peticiones
const petitionsData = [
  {
    name: "Clases de Python",
    category: "technology",
    description: "Busco alguien que pueda enseñarme Python desde cero. Estoy interesado en análisis de datos."
  },
  {
    name: "Repostería francesa",
    category: "cooking",
    description: "Me gustaría aprender a hacer croissants y pain au chocolat auténticos."
  },
  {
    name: "Fotografía Digital",
    category: "others",
    description: "Busco alguien que me enseñe los fundamentos de fotografía con cámara réflex."
  },
  {
    name: "Alemán Básico",
    category: "languages and culture",
    description: "Necesito aprender alemán básico para un viaje que tengo planeado el próximo año."
  }
];

async function seed() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Conectado a MongoDB");

    // Limpiar base de datos
    await User.deleteMany({});
    await Skill.deleteMany({});
    await Message.deleteMany({});
    await Rating.deleteMany({});
    await Petition.deleteMany({});
    console.log("🗑️  Base de datos limpiada");

    // Crear usuarios
    const createdUsers = await User.create(users);
    console.log(`👥 ${createdUsers.length} usuarios creados`);

    // Crear skills asignando owners
    const skillsWithOwners = skillsData.map((skill, index) => ({
      ...skill,
      owner: createdUsers[index % createdUsers.length]._id
    }));
    const createdSkills = await Skill.create(skillsWithOwners);
    console.log(`🎯 ${createdSkills.length} skills creadas`);

    // Crear peticiones
    const petitionsWithRequesters = petitionsData.map((petition, index) => ({
      ...petition,
      requester: createdUsers[(index + 2) % createdUsers.length]._id
    }));
    const createdPetitions = await Petition.create(petitionsWithRequesters);
    console.log(`📝 ${createdPetitions.length} peticiones creadas`);

    // Crear ratings
    const ratingsData = [
      {
        sender: createdUsers[1]._id,
        skill: createdSkills[0]._id,
        rate: 5,
        comment: "Excelente curso! Muy claro y fácil de seguir. Ahora entiendo JavaScript mucho mejor."
      },
      {
        sender: createdUsers[2]._id,
        skill: createdSkills[0]._id,
        rate: 4,
        comment: "Muy bueno, aunque me hubiera gustado más ejemplos prácticos."
      },
      {
        sender: createdUsers[0]._id,
        skill: createdSkills[1]._id,
        rate: 5,
        comment: "¡Increíble! Ahora puedo hacer pasta fresca como en Italia. Gracias!"
      },
      {
        sender: createdUsers[3]._id,
        skill: createdSkills[2]._id,
        rate: 5,
        comment: "Carlos es un gran profesor. Ya puedo tocar varias canciones."
      },
      {
        sender: createdUsers[4]._id,
        skill: createdSkills[3]._id,
        rate: 4,
        comment: "Muy útil para empezar con mi huerto. Mis tomates están creciendo!"
      },
      {
        sender: createdUsers[0]._id,
        skill: createdSkills[4]._id,
        rate: 5,
        comment: "Construí mi primera estantería gracias a estas clases. Muy recomendable."
      },
      {
        sender: createdUsers[1]._id,
        skill: createdSkills[5]._id,
        rate: 5,
        comment: "Mi inglés ha mejorado muchísimo. Conversaciones muy prácticas."
      },
      {
        sender: createdUsers[3]._id,
        skill: createdSkills[6]._id,
        rate: 4,
        comment: "Perfecto para comenzar con yoga. Me siento más relajado."
      }
    ];
    const createdRatings = await Rating.create(ratingsData);
    console.log(`⭐ ${createdRatings.length} ratings creados`);

    // Actualizar averageRate de las skills
    for (const skill of createdSkills) {
      const ratings = createdRatings.filter(r => r.skill.toString() === skill._id.toString());
      if (ratings.length > 0) {
        const average = ratings.reduce((sum, r) => sum + r.rate, 0) / ratings.length;
        skill.averageRate = average;
        await skill.save();
      }
    }
    console.log("📊 Average rates actualizados");

    // Crear mensajes
    const messagesData = [
      {
        sender: createdUsers[1]._id,
        receiver: createdUsers[0]._id,
        content: "Hola Ana! Me interesa mucho tu curso de JavaScript. ¿Cuándo podemos empezar?"
      },
      {
        sender: createdUsers[0]._id,
        receiver: createdUsers[1]._id,
        content: "¡Hola Carlos! Podemos empezar esta semana. ¿Te viene bien el miércoles por la tarde?"
      },
      {
        sender: createdUsers[2]._id,
        receiver: createdUsers[0]._id,
        content: "Ana, vi que sabes programación. ¿Podrías ayudarme con un proyecto de Python?"
      },
      {
        sender: createdUsers[3]._id,
        receiver: createdUsers[1]._id,
        content: "Carlos, tus clases de guitarra fueron geniales! Quiero seguir aprendiendo más canciones."
      },
      {
        sender: createdUsers[4]._id,
        receiver: createdUsers[2]._id,
        content: "María, estoy interesada en empezar con el yoga. ¿Das clases online?"
      },
      {
        sender: createdUsers[0]._id,
        receiver: createdUsers[4]._id,
        content: "Lucía, ¿podrías darme algunas clases de inglés avanzado? Necesito mejorar para el trabajo."
      }
    ];
    const createdMessages = await Message.create(messagesData);
    console.log(`💬 ${createdMessages.length} mensajes creados`);

    console.log("\n✨ ¡Seed completado exitosamente!");
    console.log("\n📊 Resumen:");
    console.log(`   - Usuarios: ${createdUsers.length}`);
    console.log(`   - Skills: ${createdSkills.length}`);
    console.log(`   - Ratings: ${createdRatings.length}`);
    console.log(`   - Mensajes: ${createdMessages.length}`);
    console.log(`   - Peticiones: ${createdPetitions.length}`);
    console.log("\n🔐 Todos los usuarios tienen la contraseña: password123");
    console.log("\n👤 Usuarios creados:");
    createdUsers.forEach(user => {
      console.log(`   - ${user.username} (${user.email})`);
    });

  } catch (error) {
    console.error("❌ Error en el seed:", error);
  } finally {
    await mongoose.connection.close();
    console.log("\n🔌 Conexión a MongoDB cerrada");
  }
}

// Ejecutar seed
seed();
