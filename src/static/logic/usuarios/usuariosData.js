export async function usuariosData() {
  try {
    const response = await fetch("./../static/data/cliente.json");
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    const data = await response.json();
    return data.usuarios; // Devolvemos los datos
  } catch (error) {
    console.error("Error al obtener el JSON:", error);
    return null; // Devolvemos null en caso de error
  }
}
