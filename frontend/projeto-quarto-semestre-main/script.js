// Inicializar ícones Lucide
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    
    // Menu mobile
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('show');
        
        if (mobileMenu.classList.contains('show')) {
            menuIcon.style.display = 'none';
            closeIcon.style.display = 'block';
        } else {
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        }
    });
    
    // Fechar menu ao clicar
    const mobileLinks = document.querySelectorAll('.nav-mobile a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('show');
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        });
    });
    
    // Scroll suave
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                window.scrollTo({
                    top: targetSection.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Formulário de agendamento
    const bookingForm = document.getElementById('booking-form');
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);

        // 🔥 AQUI ESTÁ O "data" CORRETO PARA O BACKEND
        const data = {
            cliente: formData.get('name'),  
            barbeiro_id: "1",               // fixo por enquanto
            data: formData.get('date'),     
            horario: formData.get('time'),
            duracao: 30                     // padrão
        };
        
        if (!data.cliente || !data.data || !data.horario) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        sendBookingToBackend(data);
    });
    
    // Data mínima = hoje
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    
    // Animação nos cards
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideIn 0.6s ease-out forwards';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        observer.observe(card);
    });

    // Parallax
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.hero');
            if (parallax) {
                parallax.style.backgroundPositionY = (scrolled * 0.5) + 'px';
            }
        });
    }
});

// 🚀 Enviar para o backend REAL
function sendBookingToBackend(data) {
    const submitButton = document.querySelector('.booking-form button[type="submit"]');
    const originalText = submitButton.innerHTML;

    submitButton.innerHTML = '<i data-lucide="loader-2"></i> Enviando...';
    submitButton.disabled = true;

    fetch("http://localhost:3000/api/agenda", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(async response => {
        const res = await response.json();

        if (response.ok) {
            alert("Agendamento criado com sucesso!");
            document.getElementById("booking-form").reset();
        } else {
            alert("Erro ao criar agendamento: " + res.mensagem);
        }
    })
    .catch(error => {
        console.error("Erro:", error);
        alert("Erro ao conectar com o servidor.");
    })
    .finally(() => {
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        lucide.createIcons();
    });
}

// Máscara telefone
document.getElementById('phone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length >= 10) value = value.replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3');
    else if (value.length >= 6) value = value.replace(/^(\d{2})(\d{4})/, '($1) $2-');
    else if (value.length >= 2) value = value.replace(/^(\d{2})/, '($1) ');

    e.target.value = value;
});

// Validação da data
document.getElementById('date').addEventListener('change', function(e) {
    const [y, m, d] = e.target.value.split('-');
    const chosen = new Date(y, m - 1, d);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (chosen.getDay() === 0) {
        alert("Não atendemos aos domingos.");
        e.target.value = "";
        return;
    }

    if (chosen < today) {
        alert("Selecione uma data futura.");
        e.target.value = "";
        return;
    }
});

// Smooth iOS
if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
    document.documentElement.style.webkitScrollBehavior = 'smooth';
}
