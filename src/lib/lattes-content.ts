import type { Profile, Project, Publication } from './models';

// Curated from the user-provided Lattes PDF; repeated sections were deduplicated.
export const lattesSource = {
  "lattesId": "1145013876792671",
  "updatedAt": "2026-10-11",
  "exportedAt": "2026-10-21",
  "fileName": "Currículo do Sistema de Currículos Lattes (Erick Batista dos Santos).pdf",
  "url": "https://lattes.cnpq.br/1145013876792671"
};

export const lattesProfile: Profile = {
  "id": 1,
  "display_name": "Erick Batista dos Santos",
  "biography": "Sou acadêmico de Ciência da Computação na Universidade Federal de Rondônia (UNIR) e técnico em Informática pelo IFRO, Campus Porto Velho Calama. Atuo como estagiário na Auditoria Interna da UNIR e desenvolvo atividades de pesquisa e extensão em tecnologia.\n\nNo GP Mecatrônica, participei de projetos de robótica educacional e Internet das Coisas. Realizei intercâmbio STEAM na Argentina pela AFS e sou voluntário da AFS Intercultura Brasil. Tenho interesse em Inteligência Artificial, Internet das Coisas e desenvolvimento de sistemas computacionais.\n\nORCID: https://orcid.org/0009-0003-4908-1438",
  "photo_url": null,
  "lattes_url": "https://lattes.cnpq.br/1145013876792671",
  "github_url": "https://github.com/ErickSuirenAki",
  "formation": "FORMAÇÃO ACADÊMICA\n2025–atual — Bacharelado em Ciência da Computação, Universidade Federal de Rondônia (UNIR). Em andamento.\n2022–2025 — Técnico em Informática integrado ao Ensino Médio, IFRO — Campus Porto Velho Calama. Carga horária: 3.360 h.\n2024 — Curso de Competências Globais, AFS Programas Interculturales Argentina. Programa de Mobilidade STEAM Internacional, com bolsa do IFRO. Carga horária: 336 h. Orientação: Diana Ketlem Paula do Nascimento.\n\nFORMAÇÃO COMPLEMENTAR\n2025 — Fundamentos das Plataformas de Sensoriamento Inteligente para Indústria, VIRTUS CC (30 h).\n2025 — Fundamentos do Python 1, UNIR (30 h).\n2025 — Sistema Eletrônico de Informações — SEI! USAR, ENAP (20 h).\n2024 — Inglês Básico, módulo III, IFRO (60 h).\n2024 — Jornada Python da Hashtag, Hashtag Programação (8 h).\n2024 — Jornada Inteligência Artificial da Hashtag, Hashtag Programação (8 h).\n2024 — Alemão Básico, módulo I, IFRO (60 h).\n2023–2024 — Inglês II, IFRS (30 h).\n2023 — Aprendendo Python, ENAP (20 h).\n2023 — Inglês Básico, módulo I, IFRO (60 h).\n2022 — Planilha Eletrônica, IFRO (40 h).\n2022 — Informática Básica, IFRO (40 h).\n2022 — Demóstenes — A Arte da Oratória, IFRO (15 h).\n2020–2021 — Informática Básica, Digicursos (48 h).\n\nIDIOMAS\nPortuguês — compreende, fala, lê e escreve bem.\nInglês — compreende, lê e escreve bem; fala razoavelmente.\nEspanhol — compreende, fala, lê e escreve bem.\nAlemão — compreende, fala, lê e escreve pouco.",
  "experience": "2025–atual — Estagiário na Auditoria Interna da Universidade Federal de Rondônia (AUDIN/UNIR), 20 h semanais. Apoio às atividades administrativas e de auditoria, organização e análise de documentos, elaboração de relatórios e uso de ferramentas computacionais.\n\n2026–atual — Bolsista na Universidade Federal de Rondônia, 20 h semanais. O currículo registra o vínculo sem detalhar sua função específica.\n\n2022–2025 — Estudante e pesquisador bolsista no IFRO — Campus Porto Velho Calama, 20 h semanais, com atuação no GP Mecatrônica. Pesquisa em robótica (08/2022–08/2023), Internet das Coisas (09/2023–09/2024) e desenvolvimento web e temas correlatos (09/2024–03/2025).\n\n2026–atual — Voluntário da AFS Intercultura Brasil, 2 h semanais, em atividades de apoio a intercambistas, educação intercultural e cidadania global.\n\n2024 — Intercâmbio na Argentina pelo Programa de Mobilidade STEAM Internacional, realizado com a AFS e apoio do IFRO.",
  "awards": "2024 — Medalha de 3º lugar na etapa estadual da Olimpíada Brasileira de Robótica (OBR), IFRO.\n\n2024 — Menção Honrosa, Instituto Federal de Educação, Ciência e Tecnologia de Rondônia. O currículo não especifica a modalidade.\n\n2023 — Medalha de Melhor Programação na etapa estadual da Olimpíada Brasileira de Robótica (OBR), IFRO — Campus Porto Velho Calama.",
  "events": "APRESENTAÇÕES DE TRABALHO\n2026 — Arquitetura Java–JNI–OpenGL para Visualização Interativa: Um Estudo de Caso com Transformações Lineares. Autores: SANTOS, E. B.; SILVA, C. F. A.; SANTOS, H. U.; FERREIRA, L. P.; GOMES, M. P.; CUNHA, L. M. Apresentação no CONNECTech.\n2024 — Desenvolvimento de um Robô Feito com Impressão 3D para Competições. Autores: SANTOS, E. B.; PEREIRA, W. P. Congresso.\n2024 — Avaliação de desempenho de protocolos de comunicação para Internet das Coisas (IoT). Autores: NOBRE, E. L. E.; SANTOS, E. B.; PEREIRA, W. P. Congresso.\n2024 — Avaliação de desempenho de protocolos de comunicação para Internet das Coisas (IoT). Autores: SANTOS, E. B.; NOBRE, E. L. E.; PEREIRA, W. P. Outra apresentação.\n2023 — Desenvolvimento de Plataforma de Robô de Resgate para Olimpíada Brasileira de Robótica. Autores: SANTOS, E. B.; FERREIRA, V. M.; PEREIRA, W. P.\n2023 — Benefícios e Malefícios da Inteligência Artificial. Autores: SANTOS, E. B.; VALIM, R.\n2023 — Mostra de Robótica. Autores: SANTOS, E. B.; SALES, C. H. S.; SARAIVA, M. E. A. F.\n2023 — Desenvolvimento de uma Plataforma Robótica para Competições. Autores: SANTOS, E. B.; PEREIRA, W. P.\n\nPARTICIPAÇÃO EM EVENTOS\n2026 — CONNECTech, com apresentação do trabalho de visualização Java–JNI–OpenGL.\n2025 — UNIR de Portas Abertas, na recepção.\n2024 — XIV CONNEPI, com apresentação sobre protocolos de comunicação para IoT.\n2024 — XIV CONNEPI, com apresentação sobre robô feito com impressão 3D.\n2024 — Olimpíada Brasileira de Robótica, etapa estadual.\n2024 — Rondônia Rural Show Internacional, com trabalho sobre protocolos de comunicação para IoT.\n2023 — I Congresso Internacional de História da Amazônia: Cultura Popular na Amazônia.\n2023 — II Fórum Online de Educação, Meio Ambiente e Sustentabilidade.\n2023 — Olimpíada Brasileira de Informática (OBI).\n2023 — Olimpíada Brasileira de Robótica, etapa estadual.\n2022 — 19ª Semana Nacional de Ciência e Tecnologia do IFRO — campi Porto Velho Calama e Zona Norte.\n2022 — Feira de Estágio, Emprego e Oportunidades — Encontro de Egressos.\n2022 — Festival Hispânico de Dança, Músicas e Gastronomia.\n2022 — III SALIF — Seminário Anual de Libras do IFRO.\n2022 — Olimpíada Brasileira de Informática (OBI).\n2022 — Orgulho Nerd, oficina de K-Pop.\n2022 — V Congresso Amazônico EAD.\n2022 — XIII Congresso Norte Nordeste de Pesquisa e Inovação (CONNEPI).\n\nORGANIZAÇÃO DE EVENTOS\n2023 — Jogos da cultura nacional: integração e socialização no IFRO.\n2023 — Curso de Internet das Coisas.\n2023 — Orgulho Nerd.\n2022 — Olimpíada Brasileira de Robótica, etapa estadual.\n2022 — Orgulho Nerd."
};

export const lattesProjects: Omit<Project, 'id' | 'published' | 'created_at'>[] = [
  {
    "slug": "airqualicheck",
    "title": "Sistema IoT de baixo custo para Monitoramento da Qualidade do Ar em Salas de Aulas da UNIR",
    "category": "Internet das Coisas",
    "summary": "Sistema de baixo custo para monitoramento em tempo real da qualidade do ar em salas de aula da UNIR.",
    "body": "O projeto propõe integrar um ESP32 a sensores de temperatura e umidade (DHT22), dióxido de carbono (MH-Z19B) e partículas PM2.5 (SDS011). Os dados são enviados à plataforma ThingSpeak, com previsão de alertas para condições críticas. O trabalho contempla o desenvolvimento e a integração do hardware e do software, considerando o contexto amazônico e os efeitos das queimadas sazonais.\n\nPeríodo: 2025–atual.\nNatureza: Pesquisa.\nSituação no Lattes: Em andamento.\nParticipação: integrante.\nCoordenação: Marcello Batista Ribeiro.",
    "tags": [
      "ESP32",
      "DHT22",
      "MH-Z19B",
      "SDS011",
      "ThingSpeak"
    ],
    "cover_url": null,
    "project_url": null
  },
  {
    "slug": "assistente-ppc",
    "title": "Repositório de Projetos Políticos Pedagógicos da UNIR",
    "category": "Extensão · Sistemas web",
    "summary": "Plataforma pública e assistente virtual para facilitar o acesso às informações dos cursos da UNIR.",
    "body": "O projeto propõe centralizar e padronizar o acesso aos Projetos Político-Pedagógicos (PPCs) dos cursos da UNIR. Uma plataforma web e um assistente virtual devem apoiar estudantes na consulta de informações sobre as graduações e na escolha consciente de um curso. Equipe registrada: Erick Batista dos Santos, Thiago Amaral Guarnieri e Rafaela Marie Melo da Cunha.\n\nPeríodo: 2026–atual.\nNatureza: Extensão.\nSituação no Lattes: Em andamento.\nParticipação: integrante.\nCoordenação: Thiago Amaral Guarnieri.",
    "tags": [
      "PPC",
      "Web",
      "Assistente virtual"
    ],
    "cover_url": null,
    "project_url": null
  },
  {
    "slug": "java-jni-opengl",
    "title": "Arquitetura Java–JNI–OpenGL para Visualização Interativa: Um Estudo de Caso com Transformações Lineares",
    "category": "Computação Gráfica",
    "summary": "Trabalho sobre visualização interativa com Java, JNI e OpenGL, apresentado no CONNECTech em 2026.",
    "body": "O currículo registra este estudo de caso como apresentação de trabalho, e não como publicação em anais.\n\nAutores: SANTOS, E. B.; SILVA, C. F. A.; SANTOS, H. U.; FERREIRA, L. P.; GOMES, M. P.; CUNHA, L. M.\n\nAno: 2026.\nNatureza: Trabalho apresentado.\nEvento: CONNECTech.",
    "tags": [
      "Java",
      "JNI",
      "OpenGL",
      "Transformações lineares"
    ],
    "cover_url": null,
    "project_url": null
  },
  {
    "slug": "software-educacional-poo-computacao-grafica",
    "title": "Desenvolvimento de softwares educacionais por meio da integração entre Programação Orientada a Objetos e Computação Gráfica",
    "category": "Extensão · Software educacional",
    "summary": "Integração de disciplinas da UNIR para desenvolver softwares educacionais em equipes interdisciplinares.",
    "body": "A ação propõe equipes com estudantes de Programação Orientada a Objetos e Computação Gráfica, atuando do levantamento de requisitos à implementação, documentação, testes e apresentação. São previstos recursos de visualização, interfaces interativas e disponibilização dos produtos como software de código aberto. O currículo registra Erick como integrante.\n\nPeríodo: 2026–atual.\nNatureza: Extensão.\nSituação no Lattes: Em andamento.\nParticipação: integrante.\nCoordenação: Lucas Marques da Cunha.",
    "tags": [
      "POO",
      "Computação Gráfica",
      "Software educacional"
    ],
    "cover_url": null,
    "project_url": null
  },
  {
    "slug": "editoracao-material-didatico-informatica",
    "title": "Editoração de material didático para Informática",
    "category": "Tecnologia educacional",
    "summary": "Criação e editoração de materiais didáticos para estudantes do curso técnico em Informática do IFRO.",
    "body": "O projeto buscou reunir resultados de pesquisas realizadas em Práticas Integradoras em uma coletânea e desenvolver material complementar para o ensino de Arduino. A proposta articula ensino, pesquisa e extensão e prevê a disponibilização das obras à comunidade acadêmica interna e externa.\n\nPeríodo: 2024–2025.\nNatureza: Pesquisa.\nSituação no Lattes: Concluído.\nParticipação: integrante.\nCoordenação: Camila Carolina Salgueiro Serrão.",
    "tags": [
      "Arduino",
      "Material didático",
      "Informática"
    ],
    "cover_url": null,
    "project_url": null
  },
  {
    "slug": "api-integracao-web-mobile",
    "title": "Desenvolvimento de API para integração entre sistema web e mobile",
    "category": "Desenvolvimento de sistemas",
    "summary": "Integração de sistemas web e mobile voltados à aprendizagem e à prática da compostagem doméstica.",
    "body": "Desenvolvimento de uma API para integrar e unificar dois sistemas sobre compostagem doméstica, permitindo acesso por diferentes dispositivos. O projeto também aborda a segurança dos dados e a atualização dos sistemas.\n\nPeríodo: 2024–2025.\nNatureza: Pesquisa.\nSituação no Lattes: Concluído.\nParticipação: integrante.\nCoordenação: Willians de Paula Pereira.",
    "tags": [
      "API",
      "Web",
      "Mobile",
      "Compostagem"
    ],
    "cover_url": null,
    "project_url": null
  },
  {
    "slug": "residuos-em-reuso-arduino",
    "title": "Resíduos em Reuso: Desenvolvimento de Protótipo com Resíduos Eletrônicos Automatizado por Arduino",
    "category": "Sustentabilidade · Robótica",
    "summary": "Prototipagem com resíduos eletrônicos e automação por Arduino em uma proposta interdisciplinar.",
    "body": "A proposta integra Língua Portuguesa, Artes e Programação Orientada a Objetos na criação de protótipos sustentáveis. O projeto prevê a análise dos desafios do gerenciamento de resíduos eletrônicos e a apresentação dos protótipos na Semana Nacional de Ciência e Tecnologia do IFRO — Campus Porto Velho Calama.\n\nPeríodo: 2024–2025.\nNatureza: Pesquisa.\nSituação no Lattes: Concluído.\nParticipação: integrante.\nCoordenação: Virginia da Silva Santos Amaral.",
    "tags": [
      "Arduino",
      "Resíduos eletrônicos",
      "Sustentabilidade"
    ],
    "cover_url": null,
    "project_url": null
  },
  {
    "slug": "protocolos-comunicacao-iot",
    "title": "Avaliação de desempenho de protocolos de comunicação para Internet das Coisas (IoT)",
    "category": "Internet das Coisas",
    "summary": "Avaliação de protocolos de comunicação com foco no funcionamento eficiente e confiável de sistemas IoT.",
    "body": "O projeto aborda eficiência no uso de energia e largura de banda, confiabilidade, segurança, escalabilidade e interoperabilidade. A avaliação busca apoiar a seleção de protocolos adequados a aplicações de Internet das Coisas. Erick integrou a equipe com Emily de Lima Ereira Nobre e Willians de Paula Pereira.\n\nPeríodo: 2023–2024.\nNatureza: Pesquisa.\nSituação no Lattes: Concluído.\nParticipação: integrante.\nCoordenação: Willians de Paula Pereira.",
    "tags": [
      "IoT",
      "Protocolos",
      "Redes"
    ],
    "cover_url": null,
    "project_url": null
  },
  {
    "slug": "plataforma-robo-resgate-obr",
    "title": "Desenvolvimento de Plataforma de Robô de Resgate para Olimpíada Brasileira de Robótica",
    "category": "Robótica educacional",
    "summary": "Desenvolvimento de uma plataforma de referência para robôs de resgate destinados à OBR.",
    "body": "A proposta articula computação, elétrica, eletrônica e mecânica para desenvolver uma plataforma que sirva de base a equipes de robótica. O trabalho prevê testes e análise de dados, contribuindo para o desenvolvimento técnico e científico de estudantes do ensino médio. Equipe registrada: Erick Batista dos Santos, Vinicius Moraes Ferreira e Willians de Paula Pereira.\n\nPeríodo: 2022–2023.\nNatureza: Pesquisa.\nSituação no Lattes: Concluído.\nParticipação: integrante.\nCoordenação: Willians de Paula Pereira.",
    "tags": [
      "Robótica",
      "OBR",
      "Eletrônica"
    ],
    "cover_url": null,
    "project_url": null
  },
  {
    "slug": "google-product-experts",
    "title": "De Usuário a Expert: Como Fazer Parte do Programa Google Product Experts",
    "category": "Extensão · Comunidades tecnológicas",
    "summary": "Projeto de palestra sobre voluntariado digital e participação em comunidades tecnológicas.",
    "body": "A proposta conta com a participação de Aline Campos, do programa Google Product Experts, para apresentar o funcionamento do programa e o papel dos voluntários no suporte e no compartilhamento de conhecimento. O currículo registra Erick como integrante da equipe do projeto, sem atribuí-lo ao programa Google Product Experts.\n\nPeríodo: 2025.\nNatureza: Extensão.\nSituação no Lattes: Concluído.\nParticipação: integrante.\nCoordenação: Lucas Marques da Cunha.",
    "tags": [
      "Voluntariado digital",
      "Comunidades",
      "Google Product Experts"
    ],
    "cover_url": null,
    "project_url": null
  },
  {
    "slug": "cultura-identidade-educacao-ambiental",
    "title": "Cultura, identidade e educação ambiental na escola",
    "category": "Extensão · Cultura e sustentabilidade",
    "summary": "Exposições e manifestações artísticas para integrar artistas locais e a comunidade acadêmica do IFRO.",
    "body": "Projeto voltado à integração entre artistas locais, estudantes e servidores do IFRO durante 2024, por meio de exposições e outras manifestações artísticas. O currículo registra o período de 2024 a 2025 e a participação de Erick como integrante.\n\nPeríodo: 2024–2025.\nNatureza: Extensão.\nSituação no Lattes: Concluído.\nParticipação: integrante.\nCoordenação: Tiago Lins de Lima.",
    "tags": [
      "Cultura",
      "Educação ambiental",
      "Extensão"
    ],
    "cover_url": null,
    "project_url": null
  },
  {
    "slug": "curso-internet-das-coisas",
    "title": "Curso de Internet das Coisas",
    "category": "Extensão · Internet das Coisas",
    "summary": "Projeto de curso para desenvolver competências de programação, prototipação de hardware e comunicação em redes.",
    "body": "A ação de extensão propõe experiências práticas de Internet das Coisas, articulando computação e eletrônica. Seu objetivo é desenvolver competências para novos produtos e propostas de inovação relacionadas à indústria 4.0. Erick aparece como integrante do projeto e como coorganizador do curso em 2023.\n\nPeríodo: 2023–2025.\nNatureza: Extensão.\nSituação no Lattes: Concluído.\nParticipação: integrante.\nCoordenação: Willians de Paula Pereira.",
    "tags": [
      "IoT",
      "Hardware",
      "Programação",
      "Redes"
    ],
    "cover_url": null,
    "project_url": null
  },
  {
    "slug": "jogos-cultura-nacional",
    "title": "Jogos da cultura nacional: integração e socialização no IFRO",
    "category": "Extensão · Cultura",
    "summary": "Promoção da cultura popular brasileira por meio de jogos, brincadeiras e atividades de integração.",
    "body": "O projeto prevê uma gincana com práticas da cultura corporal de movimento para estudantes do curso técnico em Informática e egressos. Erick está registrado como integrante do projeto e na organização do evento.\n\nPeríodo: 2023.\nNatureza: Extensão.\nSituação no Lattes: Concluído.\nParticipação: integrante.\nCoordenação: Sabrina Maria Rodrigues Feliciano da Silva.",
    "tags": [
      "Cultura",
      "Integração",
      "Extensão"
    ],
    "cover_url": null,
    "project_url": null
  },
  {
    "slug": "orgulho-nerd-2023",
    "title": "Orgulho Nerd 2023",
    "category": "Extensão · Divulgação e integração",
    "summary": "Atividades acadêmicas e recreativas para integrar cursos, níveis de ensino e comunidade externa.",
    "body": "Continuidade de uma iniciativa iniciada em 2012, o evento reúne atividades acadêmicas e recreativas. O currículo registra Erick como integrante do projeto e na organização da edição de 2023.\n\nPeríodo: 2023.\nNatureza: Extensão.\nSituação no Lattes: Concluído.\nParticipação: integrante.\nCoordenação: Augustin de Cantaí Montenegro Junior.",
    "tags": [
      "Cultura nerd",
      "Comunidade",
      "Extensão"
    ],
    "cover_url": null,
    "project_url": null
  },
  {
    "slug": "gincana-reciclaveis",
    "title": "II Gincana de entrega voluntária de recicláveis",
    "category": "Extensão · Educação ambiental",
    "summary": "Educação ambiental e coleta de recicláveis para apoiar cooperativas e a conscientização da comunidade escolar.",
    "body": "O projeto aborda a gestão de resíduos recicláveis, incluindo plásticos, metais, papel e papelão, com destinação a cooperativa coletora. A proposta promove a conscientização ambiental e o desenvolvimento sustentável, em alinhamento com a Agenda 2030. Erick participa como integrante.\n\nPeríodo: 2023.\nNatureza: Extensão.\nSituação no Lattes: Concluído.\nParticipação: integrante.\nCoordenação: Daniela Tissuya Silva Toda.",
    "tags": [
      "Reciclagem",
      "Educação ambiental",
      "Sustentabilidade"
    ],
    "cover_url": null,
    "project_url": null
  }
];

export const lattesPublications: Omit<Publication, 'published' | 'created_at'>[] = [
  {
    "title": "Do sonho à realidade: a educação que transformou minha vida",
    "authors": "SANTOS, E. B.",
    "venue": "Capítulo de livro — Vozes da Internacionalização II: narrativas de estudantes e servidores(as) da educação profissional, científica e tecnológica. 1. ed. Brasília: Editora IFB, v. 1, p. 386–388.",
    "published_year": 2025,
    "id": "11450138-7679-4671-8a00-000000000001",
    "doi": null,
    "pdf_url": null
  },
  {
    "title": "A educação ambiental por meio da gincana de entrega voluntária de recicláveis: um relato de experiência",
    "authors": "SANTOS, E. B.; TODA, D. T. S.; LUS, C. A.",
    "venue": "Capítulo de livro — Ciências básicas: caminhos para o desenvolvimento sustentável no IFRO. 1. ed. Porto Velho: Temática Editora & Cursos, v. 1, p. 163–165.",
    "published_year": 2024,
    "id": "11450138-7679-4671-8a00-000000000002",
    "doi": null,
    "pdf_url": null
  },
  {
    "title": "Desenvolvimento de um robô para competições utilizando impressão 3D",
    "authors": "SANTOS, E. B.; PEREIRA, W. P.",
    "venue": "Resumo expandido — Anais do XIV Congresso Norte Nordeste de Pesquisa e Inovação (CONNEPI), Belém/PA.",
    "published_year": 2024,
    "id": "11450138-7679-4671-8a00-000000000003",
    "doi": null,
    "pdf_url": null
  },
  {
    "title": "Avaliação de desempenho de protocolos de comunicação para Internet das Coisas (IoT)",
    "authors": "NOBRE, E. L. E.; SANTOS, E. B.; PEREIRA, W. P.",
    "venue": "Resumo expandido — Anais do XIV Congresso Norte Nordeste de Pesquisa e Inovação (CONNEPI), Belém/PA.",
    "published_year": 2024,
    "id": "11450138-7679-4671-8a00-000000000004",
    "doi": null,
    "pdf_url": null
  }
];
