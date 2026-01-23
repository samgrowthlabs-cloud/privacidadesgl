// Script para o site de privacidade - Estilo SamGrowthLabs
(function() {
    'use strict';
    
    document.addEventListener('DOMContentLoaded', function() {
        // Atualizar ano atual no copyright
        updateCopyrightYear();
        
        // Configurar navegação ativa
        setupActiveNavigation();
        
        // Adicionar animação suave para scroll
        setupSmoothScroll();
        
        // Adicionar efeito de hover nos links
        setupLinkHoverEffects();
    });
    
    function updateCopyrightYear() {
        const yearElements = document.querySelectorAll('.copyright');
        const currentYear = new Date().getFullYear();
        
        yearElements.forEach(element => {
            // Substituir qualquer ano entre 2020-2030 pelo ano atual
            element.innerHTML = element.innerHTML.replace(/\b20(2[0-9]|3[0-9])\b/g, currentYear);
        });
    }
    
    function setupActiveNavigation() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            // Remover classe active de todos
            link.classList.remove('active');
            
            // Verificar qual link corresponde à página atual
            const linkHref = link.getAttribute('href');
            const linkPath = linkHref.split('/').pop(); // Pegar apenas o nome do arquivo
            
            // Pegar o nome da página atual
            const currentPage = currentPath.split('/').pop() || 'index.html';
            
            if (linkPath === currentPage) {
                link.classList.add('active');
            }
            
            // Caso especial para raiz
            if ((currentPath.endsWith('/') || currentPath === '' || currentPath.endsWith('/privacidade/')) && linkHref === 'index.html') {
                link.classList.add('active');
            }
        });
    }
    
    function setupSmoothScroll() {
        // Adicionar scroll suave para links internos (âncoras)
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        internalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                    
                    // Atualizar URL sem recarregar a página (opcional)
                    history.pushState(null, null, href);
                }
            });
        });
    }
    
    function setupLinkHoverEffects() {
        // Adicionar efeito visual aos links internos
        const links = document.querySelectorAll('a:not(.logo)');
        links.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transition = 'color 0.2s ease';
            });
        });
    }
    
    // Função auxiliar para detectar impressão
    window.addEventListener('beforeprint', function() {
        document.body.classList.add('printing');
        console.log('Preparando para impressão...');
    });
    
    window.addEventListener('afterprint', function() {
        document.body.classList.remove('printing');
        console.log('Impressão concluída.');
    });
    
    // Adicionar classe ao body para estilização específica
    document.body.classList.add('samgrowthlabs-style');
})();