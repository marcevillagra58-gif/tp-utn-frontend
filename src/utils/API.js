/**
 * ============================================================================
 * MÓDULO DE UTILIDADES: API.js
 * ============================================================================
 *
 * DESCRIPCIÓN:
 * Cliente de API centralizado para el nuevo Backend propio.
 * Maneja tokens JWT, refresco automático y endpoints unificados.
 * ============================================================================
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

/**
 * Intenta renovar el accessToken usando el refreshToken guardado.
 * @returns {string|null} Nuevo accessToken, o null si falló.
 */
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken);
    return data.accessToken;
  } catch {
    return null;
  }
};

/**
 * Wrapper de fetch para incluir headers de seguridad y manejar errores globales.
 * Implementa refresco automático de token cuando el accessToken vence (401).
 */
export const apiFetch = async (endpoint, options = {}, _isRetry = false) => {
  const token = localStorage.getItem("accessToken");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  // Si el token venció y aún no reintentamos → refrescamos y volvemos a intentar
  if (response.status === 401 && !_isRetry) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      // Reintento único con el nuevo token
      return apiFetch(endpoint, options, true);
    }
    // Si no se pudo renovar, limpiamos la sesión
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    // Recargamos para que el AuthContext detecte la sesión vacía
    window.location.reload();
  }

  return response;
};


/**
 * Función para subir imágenes al Backend propio (que luego sube a Cloudinary)
 * @param {File} file - Archivo de imagen
 * @param {string} folder - Carpeta destino (opcional)
 * @returns {Promise<string>} URL de la imagen subida
 */
export const uploadImageToBackend = async (file, folder = "general") => {
  const token = localStorage.getItem("accessToken");
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(
      `${API_BASE_URL}/upload/image?folder=${folder}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Falla al subir imagen");
    }

    const data = await response.json();
    return data.url; // Retorna la URL de Cloudinary
  } catch (error) {
    console.error("Error uploading image to backend:", error);
    throw error;
  }
};

// Aliases para mantener compatibilidad parcial durante la migración (se eliminarán después)
export const API_ML = `${API_BASE_URL}/producers`;
export const API_USERS = `${API_BASE_URL}/users`;
