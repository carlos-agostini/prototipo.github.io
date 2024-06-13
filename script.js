document.addEventListener('DOMContentLoaded', function() {
    const typeInput = document.getElementById('type');
    const membershipInput = document.getElementById('membership');
    const durationInput = document.getElementById('duration');
    const totalInput = document.getElementById('total');

    const prices = {
        viaje: 20,  // Precio por viaje único (30 minutos)
        pase: 149,  // Precio por pase diario (12 horas)
        mensual: 0,  // Membresía mensual (viajes ilimitados de 30 minutos al día)
        anual: 0   // Membresía anual (viajes ilimitados de 60 minutos al día)
    };

    typeInput.addEventListener('change', handleTypeChange);
    membershipInput.addEventListener('change', handleMembershipChange);
    durationInput.addEventListener('input', handleDurationChange);

    function handleTypeChange() {
        const type = typeInput.value;
        if (type === 'pase') {
            durationInput.value = 720;
            durationInput.disabled = true;
        } else {
            durationInput.disabled = false;
        }
        updateTotal();
    }

    function handleMembershipChange() {
        const membership = membershipInput.value;
        if (membership === 'mensual') {
            durationInput.value = 30;
            durationInput.disabled = true;
        } else if (membership === 'anual') {
            durationInput.value = 60;
            durationInput.disabled = true;
        } else {
            durationInput.disabled = false;
        }
        updateTotal();
    }

    function handleDurationChange() {
        let duration = parseInt(durationInput.value);
        if (duration % 30 !== 0) {
            duration = Math.ceil(duration / 30) * 30;
            durationInput.value = duration;
        }
        updateTotal();
    }

    function updateTotal() {
        const type = typeInput.value;
        const membership = membershipInput.value;
        let duration = parseFloat(durationInput.value);

        // Asegurarse de que la duración mínima sea de 30 minutos
        if (duration < 30) {
            duration = 30;
            durationInput.value = 30;
        }

        let total = 0;

        if (membership === 'none') {
            if (type === 'viaje') {
                total = (duration / 30) * prices.viaje;
            } else if (type === 'pase') {
                total = prices.pase;
            }
        } else if (membership === 'mensual') {
            total = 289;  // Precio de la membresía mensual
        } else if (membership === 'anual') {
            total = 1999;  // Precio de la membresía anual
        }

        totalInput.value = isNaN(total) ? '' : total.toFixed(2) + ' MXN';
    }

    // JavaScript para la validación del formulario de reserva
    const form = document.getElementById('bookingForm');
    form.addEventListener('submit', function(event) {
        const duration = document.getElementById('duration').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        if (duration < 30 || date === '' || time === '') {
            event.preventDefault();
            alert('Por favor complete todos los campos del formulario y asegúrese de que la duración sea de al menos 30 minutos.');
        }
    });

    // JavaScript para la navbar
    let lastScrollTop = 0;
    const navbar = document.querySelector('header');

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scroll hacia abajo - ocultar navbar
            navbar.classList.remove('navbar-visible');
            navbar.classList.add('navbar-hidden');
        } else {
            // Scroll hacia arriba - mostrar navbar
            navbar.classList.remove('navbar-hidden');
            navbar.classList.add('navbar-visible');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Para móviles o scroll negativo

        // Mostrar navbar si hay movimiento del mouse o teclado
        clearTimeout(window.navbarTimeout);
        navbar.classList.add('navbar-visible');

        window.navbarTimeout = setTimeout(() => {
            navbar.classList.remove('navbar-visible');
        }, 3000);
    });

    document.addEventListener('mousemove', function () {
        clearTimeout(window.navbarTimeout);
        navbar.classList.add('navbar-visible');

        window.navbarTimeout = setTimeout(() => {
            navbar.classList.remove('navbar-visible');
        }, 3000);
    });

    document.addEventListener('keydown', function () {
        clearTimeout(window.navbarTimeout);
        navbar.classList.add('navbar-visible');

        window.navbarTimeout = setTimeout(() => {
            navbar.classList.remove('navbar-visible');
        }, 3000);
    });
});
