document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para links internos
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Impede o comportamento padrão do link

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight; // Obtém a altura do cabeçalho
                const targetPosition = targetElement.offsetTop - headerOffset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Seletor para o container do slider, imagens e botões
    const sliderContainer = document.querySelector('.image-slider-container');
    const imageSlider = document.querySelector('.image-slider');
    const slides = imageSlider.querySelectorAll('img');
    const prevButton = sliderContainer.querySelector('.prev-button');
    const nextButton = sliderContainer.querySelector('.next-button');
    const pauseButton = sliderContainer.querySelector('.pause-button');

    let currentIndex = 0;
    let intervalId;
    let isPlaying = true;
    const slideIntervalTime = 3000; // Tempo em milissegundos para a troca automática

    function goToSlide(index) {
        if (index < 0) {
            currentIndex = slides.length - 1;
        } else if (index >= slides.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        const translateX = -currentIndex * 100 + '%';
        imageSlider.style.transform = `translateX(${translateX})`;
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    function startAutoSlide() {
        intervalId = setInterval(nextSlide, slideIntervalTime);
        isPlaying = true;
        pauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        pauseButton.classList.remove('playing');
    }

    function pauseSlide() {
        clearInterval(intervalId);
        isPlaying = false;
        pauseButton.innerHTML = '<i class="fas fa-play"></i>';
        pauseButton.classList.add('playing');
    }

    // Event listeners para os botões do slider
    if (nextButton && prevButton && pauseButton) {
        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);
        pauseButton.addEventListener('click', function() {
            if (isPlaying) {
                pauseSlide();
            } else {
                startAutoSlide();
            }
        });

        // Inicializar o slider automático
        startAutoSlide();

        // Pausar o slider ao passar o mouse e retomar ao sair (opcional)
        sliderContainer.addEventListener('mouseenter', pauseSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const saibaMaisButtons = document.querySelectorAll('.plan-button');
    const contactModal = document.getElementById('contact-modal');
    const modalContent = contactModal.querySelector('.modal-content'); // Seleciona o conteúdo do modal
    const closeButton = contactModal.querySelector('.close-button');

    saibaMaisButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            contactModal.style.display = 'block';
            // Adiciona a classe para ativar a animação de cascata
            setTimeout(() => {
                modalContent.classList.add('show-cascade');
            }, 50); // Pequeno atraso para garantir que a transição funcione
        });
    });

    closeButton.addEventListener('click', function() {
        contactModal.style.display = 'none';
        // Remove a classe para resetar a animação na próxima vez
        modalContent.classList.remove('show-cascade');
        // Reseta os estilos inline que podem ter sido adicionados
        modalContent.querySelectorAll('h3, p, .modal-body > *').forEach(el => {
            el.style.transitionDelay = '';
        });
    });

    window.addEventListener('click', function(event) {
        if (event.target === contactModal) {
            contactModal.style.display = 'none';
            // Remove a classe para resetar a animação na próxima vez
            modalContent.classList.remove('show-cascade');
            // Reseta os estilos inline que podem ter sido adicionados
            modalContent.querySelectorAll('h3, p, .modal-body > *').forEach(el => {
                el.style.transitionDelay = '';
            });
        }
    });
});