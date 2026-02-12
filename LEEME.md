# Página Web de San Valentín ❤️

¡Hola! He creado esta página web especial para que sorprendas a tu pareja en vuestro segundo aniversario.

## 🚀 Cómo usarla

1. **Abrir la página**: Simplemente haz doble clic en el archivo `index.html` para verla en tu navegador.
2. **Personalizar la fecha**:
   - Abre el archivo `script.js` con cualquier editor de texto (como el Bloc de Notas).
   - Busca la línea 5 donde dice `const startDate = new Date(2024, 1, 14);`.
   - Cambia los números por la fecha de vuestro inicio (Año, Mes-1, Día).
     - *Nota: Los meses van del 0 (Enero) al 11 (Diciembre). Por ejemplo, Febrero es 1.*

3. **Cambiar los textos**:
   - Abre `index.html` y busca los textos como "Mi amor", "Tu Nombre", etc., y cámbialos por los vuestros.
   - En la sección de la carta (`id="letter"`), escribe lo que sientas.

4. **Añadir Fotos**:
   - En la sección de "Recuerdos" (`#gallery`), verás recuadros que dicen "Foto 1", etc.
   - Puedes reemplazar el `<div class="photo-placeholder">Foto 1</div>` por una imagen real:
     `<img src="tufoto.jpg" alt="Foto nuestra" style="width:100%; height:100%; object-fit:cover; border-radius:10px;">`
   - Asegúrate de poner las fotos en la misma carpeta.

## ✨ Características incluidlas
- **Contador de tiempo**: Muestra días, horas, minutos y segundos juntos.
- **Lluvia de corazones**: Animación de fondo suave.
- **Historia (Timeline)**: Para recordar vuestros momentos clave.
- **Carta animada**: Un sobre que se abre al pulsar un botón.
- **Diseño Responsive**: Se ve genial en móviles y ordenadores.

¡Espero que le encante! 💕
