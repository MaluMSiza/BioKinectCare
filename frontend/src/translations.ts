export const translations: any = {
  en: {
    sidebar: {
      dashboard: "Dashboard",
      patients: "Patients",
      calibration: "Calibration",
      about: "About Project",
      themeDark: "Switch to Dark",
      themeLight: "Switch to Light",
      lang: "English / PT",
      logout: "Logout",
      brandSub: "Care System"
    },
    login: {
      title: "BioKinect Access",
      subtitle: "Professional EMG Clinical Portal",
      labelUser: "Username",
      labelPass: "Password",
      btn: "Authorize Session",
      footer: "Protected by BioKinect Security Protocol"
    },
    dashboard: {
      title: "Real-time Monitoring",
      activePatient: "Active Patient",
      noPatient: "No patient selected",
      status: "System Status",
      connected: "Sensor Online",
      disconnected: "Searching for Sensor...",
      emgChart: "Electromyography Live Stream",
      threshold: "Calibration Threshold",
      metrics: {
        intensity: "Muscle Intensity",
        peaks: "Activation Peaks",
        duration: "Session Duration"
      }
    },
    patients: {
      title: "Clinical Database",
      subtitle: "Patient management and history log",
      searchPlaceholder: "Search by name, ID or muscle group...",
      btnAdd: "Add New Patient",
      btnCancel: "Abort Registration",
      confirmDelete: "Confirm deletion of clinical record?",
      form: {
        title: "Registration Terminal",
        fullName: "Full Name",
        username: "ID / Username",
        muscle: "Target Muscle Group",
        dob: "Date of Birth",
        btnSubmit: "Encrypt & Register"
      },
      list: {
        empty: "No clinical records found.",
        loading: "Syncing with database..."
      }
    },
    calibration: {
      title: "Sensor Calibration",
      subtitle: "18-Second Precision Protocol (6 steps x 3s)",
      selectPatient: "Select Patient for Calibration",
      startBtn: "Initiate Calibration Cycle",
      steps: [
        "Phase 1: Maintain Total Rest (3s)",
        "Phase 2: Perform Maximum Flexion (3s)",
        "Phase 3: Maintain Total Rest (3s)",
        "Phase 4: Perform Maximum Flexion (3s)",
        "Phase 5: Maintain Total Rest (3s)",
        "Phase 6: Perform Maximum Flexion (3s)"
      ],
      success: "Calibration Synchronized Successfully",
      calculating: "Calculating activation threshold...",
      instruction: "Follow the visual cues and maintain constant tension during flexion phases."
    },
    about: {
      hero: {
        title: "BioKinect Systems",
        subtitle: "Advanced Musculoskeletal Interface | Academic Research Project in Computer Engineering"
      },
      tcc: {
        title: "Academic Background & Thesis",
        content: "This application was meticulously developed as a Bachelor's Thesis (TCC) for the Computer Engineering degree. The core objective of the research was to create a high-fidelity bridge between hardware sensing and clinical software, ensuring that high-frequency electromyographic data could be interpreted and stored with absolute precision and security. The project explores the intersection of real-time distributed systems and biomedical rehabilitation toolsets."
      },
      semg: {
        title: "Surface Electromyography (sEMG)",
        content: "Surface Electromyography is a non-invasive diagnostic technique that records the electrical activity produced by skeletal muscles. By capturing the sum of motor unit action potentials (MUAP) via skin sensors, this system provides therapists with an objective metric of muscle fatigue, activation timing, and strength. BioKinect utilizes advanced filtering to separate true biological signals from environmental interference, providing a professional-grade threshold for clinical biofeedback."
      },
      mqtt: {
        title: "The MQTT Real-Time Protocol",
        content: "To achieve low-latency biofeedback, we implemented MQTT (Message Queuing Telemetry Transport), a lightweight pub/sub protocol. Unlike traditional REST APIs, MQTT allows for 10Hz+ data streaming with minimal overhead, which is critical when patients need visual feedback in milliseconds during rehabilitation exercises. This architecture ensures that the data shown on the dashboard is synchronized with the physical movement of the muscle."
      },
      authors: {
        title: "Principal Research Team",
        m_name: "Maria Luiza Machado Silva",
        m_desc: "Bachelor of Computer Engineering. Lead researcher specializing in embedded hardware architecture, sensor calibration logic, and signal processing protocols (sEMG).",
        a_name: "Vinycius Ariyoshi Stevani",
        a_desc: "Bachelor of Computer Engineering. Senior developer specializing in scalable medical system architectures, real-time data streaming (MQTT), and modern clinical UX design."
      },
      contact: {
        title: "Inquiries & Academic Collaboration",
        content: "Are you interested in the technical methodologies or looking for a partnership in the field of biomedical engineering? Our team is available for deep technical discussions and project expansion."
      }
    }
  },
  pt: {
    sidebar: {
      dashboard: "Painel",
      patients: "Pacientes",
      calibration: "Calibração",
      about: "Sobre o Projeto",
      themeDark: "Mudar para Dark",
      themeLight: "Mudar para Light",
      lang: "Português / EN",
      logout: "Sair",
      brandSub: "Sistema de Cuidado"
    },
    login: {
      title: "Acesso BioKinect",
      subtitle: "Portal Clínico Profissional de EMG",
      labelUser: "Usuário",
      labelPass: "Senha",
      btn: "Autorizar Sessão",
      footer: "Protegido pelo Protocolo de Segurança BioKinect"
    },
    dashboard: {
      title: "Monitoramento em Tempo Real",
      activePatient: "Paciente Ativo",
      noPatient: "Nenhum paciente selecionado",
      status: "Status do Sistema",
      connected: "Sensor Online",
      disconnected: "Buscando Sensor...",
      emgChart: "Transmissão EMG ao Vivo",
      threshold: "Limiar de Calibração",
      metrics: {
        intensity: "Intensidade Muscular",
        peaks: "Picos de Ativação",
        duration: "Duração da Sessão"
      }
    },
    patients: {
      title: "Base de Dados Clínica",
      subtitle: "Gestão de pacientes e histórico",
      searchPlaceholder: "Buscar por nome, ID ou grupo muscular...",
      btnAdd: "Adicionar Novo Paciente",
      btnCancel: "Abortar Registro",
      confirmDelete: "Confirmar a exclusão deste registro clínico?",
      form: {
        title: "Terminal de Registro",
        fullName: "Nome Completo",
        username: "ID / Usuário",
        muscle: "Grupo Muscular Alvo",
        dob: "Data de Nascimento",
        btnSubmit: "Criptografar e Registrar"
      },
      list: {
        empty: "Nenhum registro clínico encontrado.",
        loading: "Sincronizando com banco de dados..."
      }
    },
    calibration: {
      title: "Calibração do Sensor",
      subtitle: "Protocolo de Precisão de 18 Segundos (6 passos x 3s)",
      selectPatient: "Selecione o Paciente para Calibração",
      startBtn: "Iniciar Ciclo de Calibração",
      steps: [
        "Fase 1: Mantenha Repouso Total (3s)",
        "Fase 2: Realize Flexão Máxima (3s)",
        "Fase 3: Mantenha Repouso Total (3s)",
        "Fase 4: Realize Flexão Máxima (3s)",
        "Fase 5: Mantenha Repouso Total (3s)",
        "Fase 6: Realize Flexão Máxima (3s)"
      ],
      success: "Calibração Sincronizada com Sucesso",
      calculating: "Calculando limiar de ativação...",
      instruction: "Siga as dicas visuais e mantenha a tensão constante durante as fases de flexão."
    },
    about: {
      hero: {
        title: "Sistemas BioKinect",
        subtitle: "Interface Musculoesquelética Avançada | Projeto de Pesquisa Acadêmica em Engenharia de Computação"
      },
      tcc: {
        title: "Contexto Acadêmico e TCC",
        content: "Este aplicativo foi meticulosamente desenvolvido como um Trabalho de Conclusão de Curso (TCC) para a graduação em Engenharia de Computação. O objetivo central da pesquisa foi criar uma ponte de alta fidelidade entre a detecção de hardware e o software clínico, garantindo que os dados eletromiográficos de alta frequência pudessem ser interpretados e armazenados com absoluta precisão e segurança. O projeto explora a interseção de sistemas distribuídos em tempo real e ferramentas de reabilitação biomédica."
      },
      semg: {
        title: "Eletromiografia de Superfície (sEMG)",
        content: "A Eletromiografia de Superfície é uma técnica diagnóstica não invasiva que registra a atividade elétrica produzida pelos músculos esqueléticos. Ao capturar a soma dos potenciais de ação da unidade motora (MUAP) via sensores de pele, este sistema fornece aos terapeutas uma métrica objetiva de fadiga muscular, tempo de ativação e força. O BioKinect utiliza filtragem avançada para separar sinais biológicos reais de interferências ambientais, fornecendo um limiar de nível profissional para biofeedback clínico."
      },
      mqtt: {
        title: "O Protocolo MQTT em Tempo Real",
        content: "Para alcançar o biofeedback de baixa latência, implementamos o MQTT (Message Queuing Telemetry Transport), um protocolo leve de publicação/assinatura. Ao contrário das APIs REST tradicionais, o MQTT permite a transmissão de dados de 10Hz+ com sobrecarga mínima, o que é fundamental quando os pacientes precisam de feedback visual em milissegundos durante os exercícios de reabilitação. Esta arquitetura garante que os dados mostrados no painel estejam sincronizados com o movimento físico do músculo."
      },
      authors: {
        title: "Equipe Principal de Pesquisa",
        m_name: "Maria Luiza Machado Silva",
        m_desc: "Bacharel em Engenharia de Computação. Pesquisadora líder especializada em arquitetura de hardware embarcado, lógica de calibração de sensores e protocolos de processamento de sinais (sEMG).",
        a_name: "Vinycius Ariyoshi Stevani",
        a_desc: "Bacharel em Engenharia de Computação. Desenvolvedor sênior especializado em arquiteturas de sistemas médicos escaláveis, streaming de dados em tempo real (MQTT) e design de UX clínico moderno."
      },
      contact: {
        title: "Dúvidas e Colaboração Acadêmica",
        content: "Você está interessado nas metodologias técnicas ou busca uma parceria no campo da engenharia biomédica? Nossa equipe está disponível para discussões técnicas profundas e expansão do projeto."
      }
    }
  }
};
