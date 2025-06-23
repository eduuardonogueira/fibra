const baseUrl = "https://fibra.onrender.com";

async function seedDatabase() {
  try {
    const newUser = {
      fullName: "Raony Segtowich Vital",
      email: "raonyvital@yahoo.com.br",
      password: "fSWiS#m214/",
      role: "ADMIN",
    };

    const userResponse = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    if (!userResponse.ok) throw new Error("Erro ao criar usuário");

    const createdUser = await userResponse.json();
    const userId = createdUser.id;

    console.log("Usuário criado com ID:", userId);

    const services = [
      {
        name: "Profilaxia",
        duration: 30,
        description:
          "Procedimento de limpeza e prevenção de doenças bucais por meio da remoção de placa bacteriana e tártaro.",
        userIds: [userId],
      },
      {
        name: "Restauração",
        duration: 40,
        description:
          "Tratamento para reparar dentes danificados por cáries ou fraturas, devolvendo função e estética.",
        userIds: [userId],
      },
      {
        name: "Endodontia",
        duration: 60,
        description:
          "Tratamento de canal para remoção da polpa dental infeccionada e vedação do canal radicular.",
        userIds: [userId],
      },
      {
        name: "Exodontia",
        duration: 45,
        description:
          "Extração dentária em casos de dentes comprometidos, irrecuperáveis ou por indicação ortodôntica.",
        userIds: [userId],
      },
      {
        name: "Prótese Dentária",
        duration: 50,
        description:
          "Reabilitação oral por meio de próteses fixas ou removíveis para substituição de dentes perdidos.",
        userIds: [userId],
      },
    ];

    const serviceIds = [];

    for (const service of services) {
      const serviceResponse = await fetch(`${baseUrl}/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(service),
      });

      if (!serviceResponse.ok)
        throw new Error(`Erro ao criar serviço: ${service.name}`);

      const createdService = await serviceResponse.json();
      console.log(`Serviço "${createdService.name}" criado com sucesso!`);

      serviceIds.push(createdService.id);
    }

    const expedients = [
      {
        weekday: 1,
        startTime: "08:00",
        endTime: "12:00",
        userId,
      },
      {
        weekday: 2,
        startTime: "08:00",
        endTime: "12:00",
        userId,
      },
      {
        weekday: 3,
        startTime: "08:00",
        endTime: "12:00",
        userId,
      },
      {
        weekday: 4,
        startTime: "08:00",
        endTime: "12:00",
        userId,
      },
      {
        weekday: 5,
        startTime: "08:00",
        endTime: "12:00",
        userId,
      },
      {
        weekday: 1,
        startTime: "13:00",
        endTime: "18:00",
        userId,
      },
      {
        weekday: 2,
        startTime: "13:00",
        endTime: "18:00",
        userId,
      },
      {
        weekday: 3,
        startTime: "13:00",
        endTime: "18:00",
        userId,
      },
      {
        weekday: 4,
        startTime: "13:00",
        endTime: "18:00",
        userId,
      },
      {
        weekday: 5,
        startTime: "13:00",
        endTime: "18:00",
        userId,
      },
    ];

    for (const serviceId of serviceIds) {
      for (const expedient of expedients) {
        const expedientBody = {
          ...expedient,
          serviceId,
        };

        const expedientResponse = await fetch(`${baseUrl}/expedients`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(expedientBody),
        });

        if (!expedientResponse || expedientResponse.status !== 204)
          throw new Error(`Erro ao criar expedient: ${expedient.startTime}`);

        console.log(`Expediente "${expedient.startTime}" criado com sucesso!`);
      }
    }

    console.log("✅ Banco de dados populado com sucesso.");
  } catch (error) {
    console.error("❌ Erro durante o seeding:", error);
  }
}

seedDatabase();
