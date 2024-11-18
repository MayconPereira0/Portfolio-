document.addEventListener("DOMContentLoaded", function () {
    const page = document.getElementById("Page");
    const animatedText = document.querySelector(".topo-site h2");

    // Define a opacidade inicial da página diretamente como 1
    if (page) page.style.opacity = "1";

    // Inicia a animação do texto, se existir
    if (animatedText) animatedText.classList.add("typing-active");

    // Efeito de seleção de seção (Intersection Observer)
    const navbarLinks = document.querySelectorAll('header nav a');
    const sections = document.querySelectorAll('section');

    // Cria o observer para detectar a visibilidade das seções
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const sectionId = entry.target.id;
            const link = document.querySelector(`header nav a[href="#${sectionId}"]`);

            if (entry.isIntersecting) {
                // Marca o link como ativo
                navbarLinks.forEach(link => link.classList.remove('active'));
                link.classList.add('active');
                
                // Adiciona animação à seção que está visível
                entry.target.classList.add('show-animate');
            } else {
                // Remove animação da seção
                entry.target.classList.remove('show-animate');
            }
        });
    }, {
        threshold: 0.5 // Define que 50% da seção precisa estar visível
    });

    // Observa todas as seções
    sections.forEach(section => {
        observer.observe(section);
    });

    // Menu toggle para mobile
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');

    if (menuIcon && navbar) {
        menuIcon.onclick = () => {
            menuIcon.classList.toggle('bx-x');
            navbar.classList.toggle('active');
        };
    }

    // Função para exibir animações do footer
    const footer = document.querySelector('footer');
    window.addEventListener('scroll', () => {
        let isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
        if (footer) {
            footer.classList.toggle('show-animate', isAtBottom);
        }
    });

    // Carrossel de portfolio
    const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
    const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');
    let index = 0; // Inicializando o índice

    const portfolioDetalhes = document.querySelectorAll('.portfolio-detalhe');
    const totalImages = portfolioDetalhes.length;

    // Função para atualizar o carrossel
    const activePortfolio = () => {
        const imgSlide = document.querySelector('.carrossel .img-slide');
        imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;

        portfolioDetalhes.forEach(detail => {
            detail.classList.remove('active');
        });

        portfolioDetalhes[index].classList.add('active');
    }

    // Navegação do carrossel
    if (arrowRight) {
        arrowRight.addEventListener('click', () => {
            index = (index < totalImages - 1) ? index + 1 : 0;
            activePortfolio();
        });
    }

    if (arrowLeft) {
        arrowLeft.addEventListener('click', () => {
            index = (index > 0) ? index - 1 : totalImages - 1;
            activePortfolio();
        });
    }
});
