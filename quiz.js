document.addEventListener('DOMContentLoaded', function () {

    const questionContainer = document.getElementById('question');
    const optionsContainer = document.getElementById('options');
    const actionButton = document.getElementById('questionBtn');
    const progressEl = document.getElementById('progress');

    let currentStep = 0;

    let facts = {
        conhece_phishingOK: false,
        conhece_ransomwareOK: false,
        conhece_2faOK: false,
        usa_senha_forteOK: false,
        sabe_identificar_email_falsoOK: false,
        clica_links_desconhecidosOK: false,
        reutiliza_senhaOK: false,
        usa_wifi_publicoOK: false,
        atualiza_sistemaOK: false,
        usa_antivirusOK: false,
        verifica_urlsOK: false,
        compartilha_dadosOK: false,
        faz_backupOK: false,
        usa_2faOK: false,
        abre_anexos_desconhecidosOK: false,
        confia_em_promocoesOK: false,
        ignora_alertasOK: false,
        acessa_sites_insegurosOK: false,
        baixa_arquivos_desconhecidos: false,
        usa_biometriaOK: false,
        compartilha_localizacaoOK: false,
        conecta_dispositivos_iotOK: false,
        usa_gerenciador_senhasOK: false,
        faz_compras_sites_suspeitosOK: false,
        conhece_engenharia_socialOK: false
    };

    const questions = [
        { question: "Você sabe o que é phishing?", fact: "conhece_phishing" },
        { question: "Você usa a mesma senha em vários serviços?", fact: "reutiliza_senha" },
        { question: "Você utiliza autenticação em dois fatores (2FA)?", fact: "usa_2fa" },
        { question: "Você costuma clicar em links desconhecidos?", fact: "clica_links_desconhecidos" },
        { question: "Você usa Wi-Fi público com frequência?", fact: "usa_wifi_publico" },
        { question: "Você sabe identificar e-mails falsos ou fraudulentos?", fact: "sabe_identificar_email_falso" },
        { question: "Você mantém seu sistema atualizado?", fact: "atualiza_sistema" },
        { question: "Você usa antivírus no seu dispositivo?", fact: "usa_antivirus" },
        { question: "Você faz backup dos seus dados regularmente?", fact: "faz_backup" },
        { question: "Você usa senhas fortes diferentes para cada serviço?", fact: "usa_senha_forte" },
        { question: "Você sabe o que é ransomware?", fact: "conhece_ransomware" },
        { question: "Você sabe para que serve Autenticação em Dois Fatores?", fact: "conhece_2fa" },
        { question: "Você verifica o cadeado (HTTPS) antes de inserir dados em um site?", fact: "verifica_urls" },
        { question: "Você compartilha informações pessoais em redes sociais?", fact: "compartilha_dados" },
        { question: "Você abre anexos desconhecidos?", fact: "abre_anexos_desconhecidos" },
        { question: "Você confia em todo tipo de promoção?", fact: "confia_em_promocoes" },
        { question: "Você ignora alertas de segurança da sua conta?", fact: "ignora_alertas" },
        { question: "Você acessa sites inseguros?", fact: "acessa_sites_inseguros" },
        { question: "Você faz o download de arquivos desconhecidos?", fact: "baixa_arquivos_desconhecidos" },
        { question: "Você utiliza biometria (digital/rosto) para desbloquear seus dispositivos?", fact: "usa_biometria" },
        { question: "Você costuma compartilhar sua localização em tempo real em redes sociais?", fact: "compartilha_localizacao" },
        { question: "Você possui dispositivos inteligentes (Lâmpadas, Câmeras Wi-Fi) em casa?", fact: "conecta_dispositivos_iot" },
        { question: "Você utiliza um gerenciador de senhas para armazenar suas credenciais?", fact: "usa_gerenciador_senhas" },
        { question: "Você costuma realizar compras em sites que nunca ouviu falar antes?", fact: "faz_compras_sites_suspeitos" },
        { question: "Você sabe o que é Engenharia Social?", fact: "conhece_engenharia_social" },
    ];

    let riskScore = 0;
    let recommendations = [];
22
    function addRisk(value, rec) {
        riskScore += value;
        if (!recommendations.includes(rec)) {
            recommendations.push(rec);
        }
    }

    function runInference() {
        if (facts.clica_links_desconhecidos) addRisk(2, "⚠️ Evite clicar em links desconhecidos");
        if (facts.reutiliza_senha) addRisk(3, "🔑 Não reutilize senhas em serviços diferentes");
        if (!facts.conhece_phishing) addRisk(2, "📚 Aprenda sobre phishing e como se proteger");
        if (!facts.usa_2fa) addRisk(3, "🛡️ Ative autenticação em dois fatores (2FA)");
        if (facts.usa_wifi_publico) addRisk(2, "📶 Evite Wi-Fi público sem proteção ou use VPN");
        if (facts.reutiliza_senha && !facts.usa_2fa) addRisk(4, "🚨 Senha reutilizada + sem 2FA é alto risco!");
        if (facts.clica_links_desconhecidos && !facts.conhece_phishing) addRisk(4, "🚨 Alto risco de cair em golpes de phishing");
        if (!facts.usa_antivirus) addRisk(2, "🛡️ Instale e mantenha um antivírus ativo");
        if (!facts.atualiza_sistema) addRisk(2, "🔄 Atualize seu sistema operacional regularmente");
        if (!facts.faz_backup) addRisk(2, "💾 Faça backups regulares dos seus dados");
        if (!facts.sabe_identificar_email_falso) addRisk(2, "📧 Aprenda a identificar e-mails fraudulentos");
        if (!facts.usa_senha_forte) addRisk(2, "🔐 Use senhas fortes e únicas para cada serviço");
        if (!facts.conhece_ramsonware) addRisk(2, "⚠️ Você deveria conhecer o que é ransomware para evitar esse tipo de ataque");

        if (!facts.conhece_2fa) addRisk(3, "🔐 Ative a autenticação em dois fatores (2FA) para aumentar sua segurança");
        if (!facts.verifica_urls) addRisk(2, "🔍 Verifique as URLs antes de acessar sites para evitar golpes");
        if (facts.compartilha_dados) addRisk(2, "📱 Evite compartilhar dados pessoais desnecessariamente");
        if (facts.abre_anexos_desconhecidos) addRisk(3, "📎 Não abra anexos de remetentes desconhecidos");
        if (facts.confia_em_promocoes) addRisk(2, "💸 Desconfie de promoções muito boas para serem verdade");
        if (facts.ignora_alertas) addRisk(3, "🚨 Não ignore alertas de segurança do sistema ou navegador");
        if (facts.acessa_sites_inseguros) addRisk(2, "🌐 Evite acessar sites sem HTTPS ou suspeitos");
        if (facts.baixa_arquivos_desconhecidos) addRisk(3, "⬇️ Não baixe arquivos de fontes desconhecidas");
        if (!facts.usa_biometria) addRisk(2, "📱 Use biometria ou PIN forte para proteger o acesso físico aos seus aparelhos");
        if (facts.compartilha_localizacao) addRisk(2, "📍 Evite postar sua localização em tempo real para preservar sua segurança física e digital");
        if (facts.conecta_dispositivos_iot) addRisk(2, "🏠 Dispositivos IoT podem ser portas de entrada; certifique-se de trocar as senhas padrão deles");
        if (!facts.usa_gerenciador_senhas) addRisk(1, "🔑 Considere usar um gerenciador de senhas para evitar anotações inseguras");
        if (facts.faz_compras_sites_suspeitos) addRisk(3, "🛒 Pesquise a reputação de lojas online antes de inserir dados de cartão de crédito");
        if (!facts.conhece_engenharia_social) addRisk(2, "🧠 Estude sobre Engenharia Social: a maior parte dos ataques foca no erro humano, não no sistema");

    }

    function getRiskLevel() {
        if (riskScore <= 5)  return { label: "BAIXO", color: "#00e676", emoji: "✅", msg: "Parabéns! Você tem bons hábitos de segurança digital." };
        if (riskScore <= 12) return { label: "MÉDIO", color: "#ffea00", emoji: "⚠️", msg: "Atenção! Você tem algumas vulnerabilidades que podem ser corrigidas." };
        return                      { label: "ALTO",  color: "#ff1744", emoji: "🚨", msg: "Cuidado! Você está exposto a sérios riscos digitais. Aja agora!" };
    }

    function updateProgress() {
        const pct = Math.round((currentStep / questions.length) * 100);
        progressEl.innerHTML = `
            <span>Pergunta ${currentStep + 1} de ${questions.length}</span>
            <div class="progress-bar-wrap">
                <div class="progress-bar-fill" style="width: ${pct}%"></div>
            </div>
        `;
    }

    function loadQuestion() {
        const q = questions[currentStep];

        questionContainer.style.opacity = '0';
        questionContainer.style.transform = 'translateY(16px)';
        optionsContainer.style.opacity = '0';

        setTimeout(() => {
            questionContainer.innerHTML = `<h3>${q.question}</h3>`;
            optionsContainer.innerHTML = `
                <label class="option-label"><input type="radio" name="answer" value="sim"> Sim</label>
                <label class="option-label"><input type="radio" name="answer" value="nao"> Não</label>
            `;

            actionButton.textContent = (currentStep === questions.length - 1) ? "Finalizar" : "Próxima";
            actionButton.disabled = false;

            questionContainer.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            optionsContainer.style.transition = 'opacity 0.35s ease 0.1s';

            requestAnimationFrame(() => {
                questionContainer.style.opacity = '1';
                questionContainer.style.transform = 'translateY(0)';
                optionsContainer.style.opacity = '1';
            });
        }, 200);

        updateProgress();
    }

    actionButton.addEventListener('click', function () {
        const selected = document.querySelector('input[name="answer"]:checked');

        if (!selected) {
            const questionsBox = document.querySelector('.questions');
            questionsBox.classList.add('shake');
            setTimeout(() => questionsBox.classList.remove('shake'), 500);
            return;
        }

        const factName = questions[currentStep].fact;
        facts[factName] = selected.value === "sim";

        if (currentStep < questions.length - 1) {
            currentStep++;
            loadQuestion();
        } else {
            showResult();
        }
    });

    function showResult() {
        runInference();
        const risk = getRiskLevel();

        progressEl.innerHTML = `
            <span>Concluído!</span>
            <div class="progress-bar-wrap">
                <div class="progress-bar-fill" style="width: 100%; background: ${risk.color};"></div>
            </div>
        `;

        questionContainer.style.opacity = '0';
        optionsContainer.style.opacity = '0';
        actionButton.style.opacity = '0';

        setTimeout(() => {
            actionButton.style.display = 'none';

            questionContainer.innerHTML = `
                <div class="result-header" style="--score-color: ${risk.color}">
                    <div class="result-emoji">${risk.emoji}</div>
                    <h2 class="result-title">Nível de Risco: <span style="color:${risk.color}">${risk.label}</span></h2>
                    <p class="result-msg">${risk.msg}</p>
                    <div class="score-ring" style="--score-color: ${risk.color}">
                        <span class="score-number" data-target="${riskScore}">0</span>
                        <span class="score-label">pontos</span>
                    </div>
                </div>
            `;

            optionsContainer.innerHTML = recommendations.length > 0
                ? `<div class="rec-box">
                       <h3 class="rec-title">📋 Recomendações para você:</h3>
                       <ul class="rec-list">
                           ${recommendations.map((r, i) => `<li class="rec-item" style="animation-delay:${i * 0.08}s">${r}</li>`).join('')}
                       </ul>
                   </div>
                   <button class="restart-btn" id="restartBtn">🔁 Refazer o Quiz</button>`
                : `<p class="all-good">🎉 Nenhuma recomendação — continue assim!</p>
                   <button class="restart-btn" id="restartBtn">🔁 Refazer o Quiz</button>`;

            questionContainer.style.transition = 'opacity 0.5s ease';
            optionsContainer.style.transition = 'opacity 0.5s ease 0.2s';
            questionContainer.style.opacity = '1';
            optionsContainer.style.opacity = '1';

            animateCounter(document.querySelector('.score-number'), riskScore);

            document.getElementById('restartBtn').addEventListener('click', restartQuiz);

        }, 300);
    }

    function animateCounter(el, target) {
        if (!el) return;
        let current = 0;
        const step = Math.ceil(target / 30);
        const interval = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = current;
            if (current >= target) clearInterval(interval);
        }, 40);
    }

    function restartQuiz() {
        currentStep = 0;
        riskScore = 0;
        recommendations = [];
        Object.keys(facts).forEach(k => facts[k] = false);
        actionButton.style.display = '';
        actionButton.style.opacity = '1';
        loadQuestion();
    }

    loadQuestion();
});