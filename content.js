/*
  Seotblock v1.2 - SponsorBlock
  Autor: ESPCDEV
  Misión: Interceptar y neutralizar las cargas de anuncios antes de que se procesen.
*/

// Almacenamos la función original para no romper la página.
const original_JSON_parse = JSON.parse;

// Creamos una función de intercepción. Esta es nuestra arma principal.
function jsonInterceptor(text) {
    const data = original_JSON_parse(text);

    // Buscamos la respuesta del reproductor que contiene los anuncios.
    // Si 'playerAds' o 'adPlacements' existen, ¡tenemos un objetivo!
    if (data?.playerAds || data?.adPlacements) {
        // Misión cumplida: Neutralizamos los campos de anuncios.
        // Al eliminarlos, el reproductor de YouTube creerá que no hay anuncios que mostrar.
        data.playerAds = null;
        data.adPlacements = null;
        console.log("SEOTBLOCK v1.2: ¡Carga de anuncio neutralizada a nivel de datos!");
    }
    
    return data;
}

// Sobreescribimos la función global JSON.parse con nuestra versión con trampa.
// Cada vez que YouTube intente leer los datos de un video, pasará por nuestro filtro.
JSON.parse = jsonInterceptor;

console.log("SEOTBLOCK v1.2: Motor de intercepción activado. Esperando objetivos...");
