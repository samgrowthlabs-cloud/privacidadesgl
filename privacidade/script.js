// Script mínimo para o site de privacidade
document.addEventListener('DOMContentLoaded', function() {
    // Atualizar ano atual no copyright
    updateCopyrightYear();
    
    // Configurar navegação ativa
    setupActiveNavigation();
});

// Função para atualizar o ano do copyright
function updateCopyrightYear() {
    const yearElements = document.querySelectorAll('.copyright');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        // Substituir 2026 pelo ano atual
        element.innerHTML = element.innerHTML.replace('2026', currentYear);
    });
}

// Função para configurar navegação ativa baseada na URL
function setupActiveNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        // Remover classe active de todos
        link.classList.remove('active');
        
        // Verificar qual link corresponde à página atual
        const linkHref = link.getAttribute('href');
        
        if (currentPath.endsWith(linkHref)) {
            link.classList.add('active');
        }
        
        // Caso especial para index.html
        if (currentPath.endsWith('/privacidade/') && linkHref === 'index.html') {
            link.classList.add('active');
        }
    });
}

// Função auxiliar para detectar impressão
window.addEventListener('beforeprint', function() {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', function() {
    document.body.classList.remove('printing');
});