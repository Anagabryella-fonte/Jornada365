let user = null;

// =====================
// BLOQUEIO DE ACESSO (Kiwify token)
// =====================
function verificarAcesso() {
    const token = localStorage.getItem("jornada_token");

    if (!token) {
        window.location.href = "index.html";
    }
}

// =====================
// GERADOR DOS 365 DIAS
// =====================
function gerarDias() {
    const dias = [];

    for (let i = 1; i <= 365; i++) {
        dias.push({
            dia: i,
            versiculo: "Confie no Senhor de todo o coração e não se apoie no seu próprio entendimento.",
            
            reflexao:
                i <= 30
                ? "Você está no início da sua transformação. Ainda há resistência, mas algo já começou a mudar dentro de você."
                : i <= 90
                ? "Você já não é mais a mesma pessoa do começo. Seus pensamentos começam a mudar."
                : i <= 180
                ? "Agora o desafio é constância. Você já sabe o caminho, só precisa permanecer."
                : i <= 300
                ? "Sua mente está sendo reconstruída. Você começa a agir diferente sem perceber."
                : "Você se tornou uma nova versão de si mesma. Agora é sobre manter isso.",

            aplicacao: "Hoje, escolha agir diferente do seu padrão antigo.",
            
            habito: "Observe seus pensamentos antes de reagir."
        });
    }

    return dias;
}

const jornada = gerarDias();

// =====================
// INICIALIZAÇÃO
// =====================
window.onload = function () {
    verificarAcesso();

    user = JSON.parse(localStorage.getItem("jornada_user"));

    if (user && user.email) {
        abrirDashboard();
    } else {
        mostrarLogin();
    }
};

// =====================
// LOGIN SIMPLES
// =====================
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

// =====================
// LOGOUT
// =====================
function logout() {
    localStorage.removeItem("jornada_user");
    location.href = "index.html";
}

// =====================
// AVANÇAR DIA
// =====================
function avancarDia() {
    if (!user) return;

    if (user.diaAtual < 365) {
        user.diaAtual++;
    }

    localStorage.setItem("jornada_user", JSON.stringify(user));
    render();
}

// =====================
// ABRIR DASHBOARD
// =====================
function abrirDashboard() {
    document.getElementById("loginModal").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");

    render();
}

// =====================
// MOSTRAR LOGIN
// =====================
function mostrarLogin() {
    document.getElementById("loginModal").classList.remove("hidden");
    document.getElementById("dashboard").classList.add("hidden");
}

// =====================
// RENDER PRINCIPAL
// =====================
function render() {
    const dia = user.diaAtual;
    const progresso = Math.round((dia / 365) * 100);

    document.getElementById("userName").innerText = user.email.split("@")[0];
    document.getElementById("progressoPorcentagem").innerText = progresso + "%";
    document.getElementById("progressBar").style.width = progresso + "%";

    renderListaDias();
    renderConteudo(dia);
}

// =====================
// LISTA DE DIAS
// =====================
function renderListaDias() {
    const lista = document.getElementById("listaDias");
    lista.innerHTML = "";

    jornada.forEach(d => {
        const btn = document.createElement("button");
        btn.innerText = "Dia " + d.dia;

        if (d.dia > user.diaAtual) {
            btn.disabled = true;
            btn.style.opacity = 0.4;
        }

        btn.onclick = () => renderConteudo(d.dia);

        lista.appendChild(btn);
    });
}

// =====================
// CONTEÚDO DO DIA
// =====================
function renderConteudo(dia) {
    const d = jornada[dia - 1];

    document.getElementById("tituloDia").innerText =
        `Dia ${d.dia} - Jornada`;

    document.getElementById("conteudoDia").innerHTML = `
        <div class="devocional">

            <div class="versiculo">
                📖 ${d.versiculo}
            </div>

            <div class="reflexao">
                <h3>Reflexão</h3>
                <p>${d.reflexao}</p>
            </div>

            <div class="aplicacao">
                <h3>Aplicação</h3>
                <p>${d.aplicacao}</p>
            </div>

            <div class="habito">
                <h3>Hábito do dia</h3>
                <p>${d.habito}</p>
            </div>

            <button class="btn-proximo" onclick="avancarDia()">
                Concluir dia
            </button>

        </div>
    `;
}
