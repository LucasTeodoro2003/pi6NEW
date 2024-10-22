function showMessage() {
    const mensagem = document.body.classList.contains('dark')
        ? 'Modo Dark!'
        : 'Modo White!';

    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.bottom = '3%';
    popup.style.left = '92%';
    popup.style.transform = 'translateX(-50%)';
    popup.style.padding = '8px';
    popup.style.backgroundColor = document.body.classList.contains('dark') ? '#1f2937' : 'white';
    popup.style.border = '1px solid ' + (document.body.classList.contains('dark') ? '#111827' : 'black');
    popup.style.borderRadius = '25px';
    popup.style.zIndex = '1000';
    popup.style.color = document.body.classList.contains('dark') ? 'white' : '#1f2937';
    popup.style.fontWeight = 'bold';
    popup.textContent = mensagem;

    document.body.appendChild(popup);

    setTimeout(() => {
        document.body.removeChild(popup);
    }, 100);
}

export { showMessage };
