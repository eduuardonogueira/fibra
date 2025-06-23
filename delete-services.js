const baseUrl = "https://fibra.onrender.com";

async function deleteDb() {
  const servicesResponse = await fetch(`${baseUrl}/services?page=1&size=100`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const servicesJson = await servicesResponse.json();

  const services = servicesJson.data;

  try {
    for (const service of services) {
      const serviceResponse = await fetch(`${baseUrl}/services/${service.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!serviceResponse || serviceResponse.status !== 204)
        throw new Error(`Erro ao deletar serviço: ${service.name}`);

      console.log(`Serviço "${service.name}" deletado com sucesso!`);
    }
  } catch (error) {}
}

deleteDb();
