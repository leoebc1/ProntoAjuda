document.addEventListener('DOMContentLoaded', function() {
    const disguiseToggle = document.getElementById('disguise-toggle');
    const body = document.body;
    
    // Verificar se já existe um estado salvo
    const isDisguiseMode = localStorage.getItem('disguiseMode') === 'true';
    
    // Aplicar o estado inicial
    if (isDisguiseMode) {
        body.classList.add('disguise-mode');
        disguiseToggle.checked = true;
        document.title = 'Receitas DaHora';
    }
    
    // Adicionar evento ao toggle
    disguiseToggle.addEventListener('change', function() {
        if (this.checked) {
            body.classList.add('disguise-mode');
            document.title = 'Receitas DaHora';
            localStorage.setItem('disguiseMode', 'true');
        } else {
            body.classList.remove('disguise-mode');
            document.title = 'ProntoAjuda';
            localStorage.setItem('disguiseMode', 'false');
        }
    });
});