document.addEventListener('DOMContentLoaded', function() {
    // Configuración
    const STEP = 1;
    const MIN_SIZE = 12;
    const MAX_SIZE = 40;
    const DEFAULT_SIZE = 16;
    const STORAGE_KEY = 'fontSizePreference';

    // Elementos
    const htmlElement = document.documentElement;
    const increaseBtns = document.querySelectorAll('.font-btn.increase');
    const decreaseBtns = document.querySelectorAll('.font-btn.decrease');

    // Tamaño actual (carga desde localStorage o usa el predeterminado)
    let currentSize = parseInt(localStorage.getItem(STORAGE_KEY)) || DEFAULT_SIZE;

    // Función para actualizar el tamaño
    function updateFontSize(newSize) {
        currentSize = Math.max(MIN_SIZE, Math.min(MAX_SIZE, newSize));
        htmlElement.style.fontSize = `${currentSize}px`;
        localStorage.setItem(STORAGE_KEY, currentSize);

        // Actualiza estado de los botones
        decreaseBtns.forEach(btn => btn.disabled = currentSize <= MIN_SIZE);
        increaseBtns.forEach(btn => btn.disabled = currentSize >= MAX_SIZE);
    }

    // Event listeners para todos los botones
    increaseBtns.forEach(btn => {
        btn.addEventListener('click', () => updateFontSize(currentSize + STEP));
    });

    decreaseBtns.forEach(btn => {
        btn.addEventListener('click', () => updateFontSize(currentSize - STEP));
    });

    // Inicialización
    updateFontSize(currentSize);
});