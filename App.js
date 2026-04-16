let user = null;

// ========================
// INICIALIZAÇÃO
// ========================
window.onload = function () {
    user = JSON.parse(localStorage.getItem("jornada_user"));

    if (user && user.email) {
        abrirDashboard();
    } else {
        mostrarLogin();
    }
};

// ========================
// LOGIN
// ========================
function login() {
    const email = document.getElementById("userEmail").value;

    if (!email || !email.includes("@")) {
        alert("Digite um email válido");
        return;
    }

    user = {
        email: email,
        diaAtual: 1
    };

    localStorage.setItem("jornada_user", JSON.stringify(user));

    abrirDashboard();
}

// ========================
// LOGOUT
// ========================
function logout() {
    localStorage.removeItem("jornada_user");
    location.href = "index.html";
}

// ========================
// AVANÇAR DIA
// ========================
function avancarDia() {
    if (!user) return;

    if (user.diaAtual < 365) {
        user.diaAtual++;
    }

    localStorage.setItem("jornada_user", JSON.stringify(user));

    render();
}

// ========================
// UI
// ========================
function abrirDashboard() {
    document.getElementById("loginModal").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");

    render();
}

function mostrarLogin() {
    document.getElementById("loginModal").classList.remove("hidden");
    document.getElementById("dashboard").classList.add("hidden");
}

function render() {
    const dia = user.diaAtual;
    const semana = Math.ceil(dia / 7);
    const progresso = Math.round((dia / 365) * 100);

    document.getElementById("userName").innerText = user.email.split("@")[0];
    document.getElementById("diaAtual").innerText = dia;
    document.getElementById("semanaAtual").innerText = semana;
    document.getElementById("progressoPorcentagem").innerText = progresso + "%";

    document.getElementById("progressBar").style.width = progresso + "%";

    document.getElementById("tituloDia").innerText =
        `Dia ${dia} - Jornada de Transformação`;
}
