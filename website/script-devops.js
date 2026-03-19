// Filtragem de Projetos
document.addEventListener('DOMContentLoaded', function() {
    const filtroButtons = document.querySelectorAll('.filtro-btn');
    const fotoItems = document.querySelectorAll('.foto-item');

    // Mostrar todos os itens ao carregar
    mostrarTodos();

    // Adicionar eventos aos botões de filtro
    filtroButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe ativo de todos os botões
            filtroButtons.forEach(btn => btn.classList.remove('ativo'));
            // Adicionar classe ativo ao botão clicado
            this.classList.add('ativo');

            // Pegar o filtro selecionado
            const filtroSelecionado = this.getAttribute('data-filtro');

            // Filtrar os itens
            filtrarProjetos(filtroSelecionado);
        });
    });

    function mostrarTodos() {
        fotoItems.forEach(item => {
            item.classList.add('ativo');
        });
    }

    function filtrarProjetos(filtro) {
        fotoItems.forEach(item => {
            const categoria = item.getAttribute('data-categoria');
            
            if (filtro === 'todos' || categoria === filtro) {
                item.classList.add('ativo');
            } else {
                item.classList.remove('ativo');
            }
        });
    }
});

// Smooth scroll para navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Animação de scroll para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar observador aos cards
document.querySelectorAll('.topico-card, .sobre-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});
