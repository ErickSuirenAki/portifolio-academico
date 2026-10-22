// Editorial narrative based on the user-provided Lattes, updated on 2026-10-11.
// Keep events and dates tied to that source; no automatic inference of later milestones.
export const trajectoryChapters = [
  {
    id: 'ifro', number: '01', period: '2022–2025', institution: 'IFRO · Campus Porto Velho Calama',
    title: 'Onde a curiosidade virou projeto.',
    introduction: 'Minha formação em tecnologia começou no curso Técnico em Informática integrado ao Ensino Médio do IFRO. Foi ali que a programação passou a dividir espaço com circuitos, sensores e robôs — e que comecei a participar de pesquisa e extensão.',
    paragraphs: [
      'No GP Mecatrônica, trabalhei com robótica educacional e Internet das Coisas. Entre 2022 e 2023, participei do desenvolvimento de uma plataforma de robô de resgate para a Olimpíada Brasileira de Robótica. Depois, a pesquisa seguiu para a avaliação de protocolos de comunicação em IoT e para a integração de sistemas web e mobile.',
      'Essa etapa também teve espaço para educação ambiental, materiais didáticos e atividades culturais. Participei de projetos sobre reciclagem, reaproveitamento de resíduos eletrônicos com Arduino e ensino de informática. A formação técnica se conectou, assim, a diferentes formas de compartilhar conhecimento.',
    ],
    milestones: [
      { year: '2022', text: 'Início do técnico em Informática e da participação em pesquisa em robótica.' },
      { year: '2023', text: 'Medalha de Melhor Programação na etapa estadual da OBR e pesquisa em protocolos para IoT.' },
      { year: '2024', text: 'Apresentações no XIV CONNEPI, em Belém, e na Rondônia Rural Show Internacional.' },
      { year: '2025', text: 'Conclusão do curso técnico integrado ao Ensino Médio.' },
    ],
    tags: ['Robótica educacional', 'Internet das Coisas', 'Pesquisa e extensão'],
  },
  {
    id: 'intercambio', number: '02', period: '2024', institution: 'Argentina · AFS + IFRO',
    title: 'Aprender também é atravessar fronteiras.',
    introduction: 'Durante a formação no IFRO, participei do Programa de Mobilidade STEAM Internacional na Argentina, realizado com a AFS e com bolsa do Instituto. O intercâmbio acrescentou uma dimensão intercultural à minha trajetória acadêmica.',
    paragraphs: [
      'O Curso de Competências Globais, com 336 horas, colocou a educação intercultural ao lado da formação em ciência e tecnologia. Essa experiência faz parte de um percurso que envolve não apenas desenvolver projetos, mas também conhecer outras perspectivas e formas de aprender.',
      'Mais tarde, registrei essa passagem no capítulo “Do sonho à realidade: a educação que transformou minha vida”, publicado em 2025 no livro Vozes da Internacionalização II. Em 2026, passei a atuar como voluntário da AFS Intercultura Brasil, apoiando intercambistas e atividades de educação intercultural e cidadania global.',
    ],
    milestones: [
      { year: '2024', text: 'Mobilidade STEAM na Argentina e Curso de Competências Globais pela AFS, com apoio do IFRO.' },
      { year: '2025', text: 'Publicação de um relato de experiência no livro Vozes da Internacionalização II.' },
      { year: '2026', text: 'Início do voluntariado na AFS Intercultura Brasil.' },
    ],
    tags: ['Mobilidade STEAM', 'Educação intercultural', 'Voluntariado'],
  },
  {
    id: 'unir', number: '03', period: 'Desde 2025', institution: 'UNIR · Ciência da Computação',
    title: 'Novas perguntas, outros caminhos para construir.',
    introduction: 'Em 2025, comecei o bacharelado em Ciência da Computação na Universidade Federal de Rondônia. A graduação deu continuidade à experiência do curso técnico, com novos projetos que aproximam pesquisa, desenvolvimento de software e comunidade.',
    paragraphs: [
      'Na pesquisa, participo de um sistema IoT de baixo custo para monitorar a qualidade do ar em salas de aula da UNIR. A proposta integra sensores, um ESP32 e envio de dados para acompanhamento das condições do ambiente. Na extensão, participo de um repositório de Projetos Político-Pedagógicos, com plataforma web e assistente virtual para facilitar o acesso às informações dos cursos.',
      'A computação gráfica também entrou nessa trajetória. Além do projeto de extensão que integra Programação Orientada a Objetos e Computação Gráfica, apresentei no CONNECTech, em 2026, um estudo de caso sobre visualização interativa com Java, JNI e OpenGL.',
      'Desde 2025, também atuo como estagiário na Auditoria Interna da UNIR, apoiando a organização e análise de documentos, a elaboração de relatórios e atividades administrativas e de auditoria com ferramentas computacionais.',
    ],
    milestones: [
      { year: '2025', text: 'Ingresso na Ciência da Computação, início do estágio na AUDIN/UNIR e pesquisa sobre qualidade do ar.' },
      { year: '2026', text: 'Extensão com o repositório de PPCs e o desenvolvimento de softwares educacionais.' },
      { year: '2026', text: 'Apresentação do estudo de caso Java–JNI–OpenGL no CONNECTech.' },
    ],
    tags: ['Ciência da Computação', 'Software e computação gráfica', 'Tecnologia aplicada'],
  },
];

export type TrajectoryEvent = { year: number; title: string; role: string; description: string };
export const trajectoryEvents: TrajectoryEvent[] = [
  { year: 2026, title: 'CONNECTech', role: 'Apresentação', description: 'Arquitetura Java–JNI–OpenGL para Visualização Interativa: Um Estudo de Caso com Transformações Lineares.' },
  { year: 2025, title: 'UNIR de Portas Abertas', role: 'Participação', description: 'Atuação na recepção do evento.' },
  { year: 2024, title: 'XIV CONNEPI · Belém/PA', role: 'Apresentações', description: 'Trabalhos sobre robô para competições com impressão 3D e avaliação de protocolos de comunicação para IoT.' },
  { year: 2024, title: 'Rondônia Rural Show Internacional', role: 'Apresentação', description: 'Avaliação de desempenho de protocolos de comunicação para Internet das Coisas.' },
  { year: 2024, title: 'Olimpíada Brasileira de Robótica', role: 'Competição', description: 'Participação na etapa estadual de 2024.' },
  { year: 2023, title: 'I Congresso Internacional de História da Amazônia', role: 'Participação', description: 'Cultura Popular na Amazônia.' },
  { year: 2023, title: 'II Fórum Online de Educação, Meio Ambiente e Sustentabilidade', role: 'Participação', description: 'Encontro dedicado à educação e às questões ambientais.' },
  { year: 2023, title: 'Olimpíada Brasileira de Informática', role: 'Competição', description: 'Participação na edição de 2023 da OBI.' },
  { year: 2023, title: 'Olimpíada Brasileira de Robótica', role: 'Competição', description: 'Robótica educacional na etapa estadual.' },
  { year: 2023, title: 'Curso de Internet das Coisas', role: 'Organização', description: 'Coorganização do curso com Willians de Paula Pereira.' },
  { year: 2023, title: 'Jogos da cultura nacional', role: 'Organização', description: 'Integração e socialização no IFRO por meio de jogos e brincadeiras.' },
  { year: 2023, title: 'Orgulho Nerd', role: 'Organização', description: 'Participação na organização da edição de 2023.' },
  { year: 2022, title: '19ª Semana Nacional de Ciência e Tecnologia', role: 'Participação', description: 'IFRO — campi Porto Velho Calama e Zona Norte.' },
  { year: 2022, title: 'XIII CONNEPI', role: 'Participação', description: 'Congresso Norte Nordeste de Pesquisa e Inovação.' },
  { year: 2022, title: 'V Congresso Amazônico EAD', role: 'Participação', description: 'Participação no congresso.' },
  { year: 2022, title: 'Olimpíada Brasileira de Informática', role: 'Competição', description: 'Participação na edição de 2022 da OBI.' },
  { year: 2022, title: 'Olimpíada Brasileira de Robótica', role: 'Organização', description: 'Participação na organização da etapa estadual.' },
  { year: 2022, title: 'Orgulho Nerd', role: 'Participação e organização', description: 'Oficina de K-Pop e participação na organização do evento.' },
  { year: 2022, title: 'III SALIF', role: 'Participação', description: 'Seminário Anual de Libras do IFRO.' },
  { year: 2022, title: 'Festival Hispânico de Dança, Músicas e Gastronomia', role: 'Participação', description: 'Participação na exposição.' },
  { year: 2022, title: 'Feira de Estágio, Emprego e Oportunidades', role: 'Participação', description: 'Encontro de Egressos.' },
];

export const trajectoryAwards = [
  { year: '2024', title: '3º lugar na OBR', description: 'Medalha na etapa estadual da Olimpíada Brasileira de Robótica.', institution: 'IFRO' },
  { year: '2024', title: 'Menção Honrosa', description: 'Reconhecimento registrado no currículo, sem modalidade especificada.', institution: 'Instituto Federal de Rondônia' },
  { year: '2023', title: 'Melhor Programação', description: 'Medalha na etapa estadual da Olimpíada Brasileira de Robótica.', institution: 'IFRO · Campus Porto Velho Calama' },
];
