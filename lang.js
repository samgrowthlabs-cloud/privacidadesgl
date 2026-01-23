/**
 * Sistema de Gerenciamento de Idiomas para Site de Privacidade
 */
class LanguageManager {
    constructor() {
        this.currentLang = 'pt-BR';
        this.translations = {};
        this.init();
    }
    
    async init() {
        // 1. Verificar localStorage primeiro
        const savedLang = localStorage.getItem('privacy-site-lang');
        if (savedLang && (savedLang === 'pt-BR' || savedLang === 'fr-FR')) {
            this.currentLang = savedLang;
        }
        // 2. Se não, detectar do navegador
        else {
            const browserLang = navigator.language || navigator.userLanguage;
            if (browserLang.startsWith('fr')) {
                this.currentLang = 'fr-FR';
            } else {
                this.currentLang = 'pt-BR';
            }
        }
        
        // 3. Carregar traduções
        await this.loadTranslations(this.currentLang);
        
        // 4. Aplicar traduções
        this.applyTranslations();
        
        // 5. Configurar botão de troca
        this.setupLanguageSwitcher();
        
        // 6. Atualizar HTML lang
        document.documentElement.lang = this.currentLang;
    }
    
    async loadTranslations(lang) {
        try {
            const path = 'lang/';
            const response = await fetch(`${path}${lang}.json`);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            this.translations = await response.json();
        } catch (error) {
            console.error(`Erro ao carregar traduções (${lang}):`, error);
            // Fallback para pt-BR
            if (lang !== 'pt-BR') {
                await this.loadTranslations('pt-BR');
                this.currentLang = 'pt-BR';
            }
        }
    }
    
    applyTranslations() {
        // Atualizar todos os elementos com data-i18n
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (this.translations[key]) {
                element.textContent = this.translations[key];
                
                // Placeholders (inputs, textareas)
                if (element.placeholder !== undefined) {
                    element.placeholder = this.translations[key];
                }
                
                // Alt text para imagens
                if (element.alt !== undefined) {
                    element.alt = this.translations[key];
                }
                
                // Title attributes
                if (element.hasAttribute('title')) {
                    element.setAttribute('title', this.translations[key]);
                }
            }
        });
        
        // Atualizar botão de idioma
        const switchBtn = document.getElementById('language-switch');
        if (switchBtn) {
            switchBtn.textContent = this.currentLang === 'pt-BR' ? 'FR' : 'PT';
        }
    }
    
    setupLanguageSwitcher() {
        const switchBtn = document.getElementById('language-switch');
        if (switchBtn) {
            // Configurar texto inicial
            switchBtn.textContent = this.currentLang === 'pt-BR' ? 'FR' : 'PT';
            
            // Adicionar evento de clique
            switchBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchLanguage();
            });
        }
    }
    
    async switchLanguage() {
        const newLang = this.currentLang === 'pt-BR' ? 'fr-FR' : 'pt-BR';
        
        // Salvar preferência
        localStorage.setItem('privacy-site-lang', newLang);
        
        // Atualizar e recarregar traduções
        this.currentLang = newLang;
        await this.loadTranslations(newLang);
        this.applyTranslations();
        
        // Atualizar botão
        const switchBtn = document.getElementById('language-switch');
        if (switchBtn) {
            switchBtn.textContent = newLang === 'pt-BR' ? 'FR' : 'PT';
        }
        
        // Atualizar HTML lang
        document.documentElement.lang = newLang;
    }
    
    getTranslation(key) {
        return this.translations[key] || key;
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.langManager = new LanguageManager();
});