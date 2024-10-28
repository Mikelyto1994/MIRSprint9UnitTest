const assets = [
  {
    id: "1",
    name: "Asset 1",
    price: 100,
    slug: "asset-1",
    image: "https://via.placeholder.com/150",
    tokenAssetAddress: "BQhCiUcQfDgoLLx6XUf6ne7kYe5YE8ZKMHpJ9j2yaW5N",
    createdAt: "2021-01-01T00:00:00.000Z",
    updatedAt: "2021-01-01T00:00:00.000Z",
  },
  {
    id: "2",
    name: "Asset 2",
    price: 200,
    slug: "asset-2",
    image: "https://via.placeholder.com/150",
    tokenAssetAddress: "BW7AjDhWJmdH7fsf8s7UkSaYm5CtvmUDjm5V7xy4jakh",
    createdAt: "2021-01-01T00:00:00.000Z",
    updatedAt: "2021-01-01T00:00:00.000Z",
  },
];

// Estado inicial para reiniciar activos
const initialAssets = JSON.parse(JSON.stringify(assets)); // Hacemos una copia profunda

function getAllAssets() {
  return assets;
}

function getAssetBySlug(slug) {
  return assets.find((asset) => asset.slug === slug) || null;
}

function getAssetById(id) {
  return assets.find((asset) => asset.id === id) || null;
}

function createAsset(asset) {
  if (!asset.name || typeof asset.price !== "number") {
    throw new Error("Name is required and price must be a number");
  }

  asset.id = (assets.length + 1).toString(); // Asignar un ID como string
  asset.createdAt = new Date().toISOString();
  asset.updatedAt = new Date().toISOString();

  assets.push(asset);
  return asset;
}

function updateAsset(id, asset) {
  const index = assets.findIndex((a) => a.id === id); // Compara IDs como cadenas

  if (index === -1) {
    return null; // Devuelve null si no se encuentra el activo
  }

  asset.updatedAt = new Date().toISOString(); // Actualizar la fecha de modificación
  assets[index] = { ...assets[index], ...asset }; // Combinar los datos existentes con los nuevos

  return assets[index]; // Devuelve el activo actualizado
}

function deleteAsset(id) {
  const index = assets.findIndex((asset) => asset.id === id);

  if (index === -1) {
    return null;
  }

  const deletedAsset = assets.splice(index, 1)[0]; // Obtener el activo eliminado
  return deletedAsset;
}

// Función para reiniciar activos
const resetAssets = () => {
  assets.length = 0; // Limpiar el arreglo de activos
  assets.push(...initialAssets); // Rellenar con activos iniciales
};

// Exporta las funciones
module.exports = {
  createAsset,
  deleteAsset,
  getAllAssets,
  getAssetById,
  getAssetBySlug,
  updateAsset,
  resetAssets, // Exporta la función de reinicio
};
