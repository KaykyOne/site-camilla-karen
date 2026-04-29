// Aguardar que o DOM esteja carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página carregada com sucesso!');

    // Adicionar evento ao botão
    const myButton = document.getElementById('myButton');
    if (myButton) {
        myButton.addEventListener('click', handleButtonClick);
    }

    // Adicionar scroll suave ao clicar nos links da navegação
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
});

// Função para lidar com o clique no botão
function handleButtonClick() {
    alert('Você clicou no botão! 🎉');
    console.log('Botão foi clicado');
}

// Função para lidar com o clique nos links da navegação
function handleNavClick(event) {
    const href = event.currentTarget.getAttribute('href');
    
    if (href && href.startsWith('#')) {
        event.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Função útil: mudar tema (opcional)
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

// Função útil: contar cliques
let clickCount = 0;
window.addEventListener('click', function() {
    clickCount++;
    console.log('Total de cliques na página: ' + clickCount);
});
