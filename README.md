# Portfólio acadêmico — Next.js + Supabase

Portfólio em português com Next.js 15 App Router, React 19, TypeScript e Tailwind CSS 4.

## Funcionalidades

- Início, projetos, publicações, notícias e perfil acadêmico.
- Páginas individuais de projetos e notícias, com metadados Open Graph.
- Painel `/admin`: cadastro, edição, exclusão, rascunhos e publicação de projetos, publicações e notícias.
- Edição de biografia, foto, formação, experiências, eventos, premiações e links pessoais.
- Login por e-mail/senha, logout, renovação de sessão e recuperação de senha.
- Upload administrativo de JPEG, PNG, WebP e PDF de até 5 MB.
- Leituras públicas anônimas: rascunhos não aparecem no site, nem para administradores.
- Sitemap, robots, estados de carregamento, erros e página 404.

Os campos longos usam texto simples com quebras de linha; não interpretam HTML.
Sem Supabase configurado, as páginas públicas usam os projetos, publicações e perfil organizados a partir do Lattes em `src/lib/lattes-content.ts`. Com Supabase configurado, o banco passa a ser a fonte dos dados; um banco vazio não recupera automaticamente os projetos iniciais. Falhas de consulta exibem uma tela de erro, sem substituir dados reais por exemplos.

## Desenvolvimento

Requer Node.js 20 ou superior.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Acesse `http://localhost:3000`.

## Ativar o Supabase

1. Crie um projeto no Supabase.
2. Execute `supabase/schema.sql` no SQL Editor. O script pode ser reaplicado a um banco criado pela primeira versão deste projeto: adiciona os novos campos, atualiza as políticas conhecidas e configura Storage sem excluir registros. Faça backup antes de atualizar um banco de produção.
3. Preencha `.env.local` com `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (chave anon ou publishable) e `NEXT_PUBLIC_SITE_URL` (origem pública do site, sem caminho).
4. Desative cadastros públicos em Authentication e crie manualmente sua conta em Users.
5. Autorize seu UUID no SQL Editor:

   ```sql
   insert into public.admin_users(user_id) values ('SEU-UUID') on conflict do nothing;
   ```

6. Em Authentication > URL Configuration, configure Site URL e adicione a URL exata de callback à lista de Redirect URLs:
   - Local: `http://localhost:3000/auth/callback`
   - Produção: `https://seu-dominio/auth/callback`
7. Reinicie o servidor após alterar variáveis e acesse `/admin/login`.
8. Opcional: execute `supabase/seed.sql` para importar o conteúdo do Lattes como publicado (15 projetos e trabalhos, 4 publicações e perfil). O script preserva registros existentes e campos personalizados do perfil. A alternativa pelo painel está descrita abaixo.

A recuperação de senha requer envio de e-mails configurado no Supabase. Abra o link no mesmo navegador em que solicitou a recuperação, pois o fluxo PKCE usa um cookie de verificação.

## Segurança e arquivos

Toda leitura administrativa e toda ação de gravação verificam a conta no servidor. As tabelas têm RLS; somente usuários em `admin_users` podem modificar conteúdo. A associação administrativa deve ser feita por um operador confiável, nunca pelo navegador. Não use uma chave `service_role` neste aplicativo.

O bucket `portfolio` é **público**: qualquer pessoa que tenha a URL pode abrir o arquivo, inclusive se ele estiver associado a um rascunho. Somente administradores podem enviar/listar/gerenciar objetos pelas políticas criadas. A interface informa essa condição antes do envio. Não envie documentos confidenciais. O servidor valida tipo, assinatura inicial e tamanho; isso não substitui análise antimalware de documentos.

Substituir uma URL ou excluir conteúdo não apaga o arquivo do Storage: isso evita remover arquivos referenciados em outros registros. Arquivos não utilizados devem ser removidos manualmente pelo painel do Supabase. Uploads concluídos em formulários abandonados também permanecem lá.

## Verificações

```bash
npx tsc --noEmit
npm run build
```

Os testes em `tests/validation.test.ts` e `tests/admin.test.cjs` cobrem URLs perigosas, validação de conteúdo, rascunhos, DOI, anos, módulos permitidos e assinatura dos arquivos, além do bloqueio de usuários sem sessão ou sem permissão antes de gravações. Os testes de autorização simulam o cliente Supabase e não substituem a validação real das políticas RLS. Usam o executor nativo do Node e o TypeScript já instalado, sem framework adicional:

```bash
npm test
```

O comando `npm run lint` original depende de ESLint, ausente na instalação inicial. Não o considere uma validação disponível sem instalar e configurar ESLint.

Antes de publicar, valide em um projeto Supabase de teste:

1. Usuário deslogado: `/admin` redireciona ao login; não consegue gravar dados nem enviar arquivos.
2. Usuário autenticado sem permissão: recebe acesso negado; RLS recusa gravações e upload.
3. Administrador: cria, edita e exclui os três tipos de conteúdo e atualiza o perfil.
4. Rascunho: não aparece nas listagens públicas, páginas individuais nem sitemap, inclusive em navegador com sessão administrativa.
5. Publicação: conteúdo aparece no site após salvar; despublicar remove o acesso público.
6. Slug duplicado, URL inválida e arquivo maior que 5 MB: operações recusadas com mensagem.
7. Logout e recuperação de senha; cookies renovados após expiração do token.
8. Celular e desktop: menu, formulários, mensagens, foco por teclado e links externos.

## Publicação na Vercel

Importe o repositório na Vercel, configure as três variáveis de `.env.example` e publique. Ajuste a origem de produção em `NEXT_PUBLIC_SITE_URL` e as URLs de autenticação no Supabase. A variável de origem é usada para sitemap, metadados e recuperação de senha; não deixe `localhost` em produção. Alterações em variáveis `NEXT_PUBLIC_*` requerem novo build/deploy.

A identidade visual e o nome no cabeçalho, rodapé e template de metadados permanecem definidos no layout. Os dados pessoais exibidos no início e na página Sobre são editáveis pelo painel.

## Importar o currículo Lattes fornecido

O PDF exportado em 21/10/2026, com última atualização em 11/10/2026, foi organizado em `src/lib/lattes-content.ts`. O conteúdo inclui 15 projetos e trabalhos (6 projetos de pesquisa, 8 de extensão e 1 trabalho apresentado), 4 publicações (2 capítulos de livros e 2 resumos expandidos), formação e cursos, idiomas, experiências, 8 apresentações, 18 participações em eventos, 5 organizações de eventos e 3 premiações. As repetições das seções “Inovação” e “Educação e Popularização de C & T” foram removidas. Datas e situações de andamento refletem esse currículo, sem atualização automática.

Entre como administrador e abra `/admin/importar-lattes` (também acessível pelo menu do painel). Revise a prévia e clique em **Importar dados do meu Lattes**. Por padrão, novos projetos e publicações são publicados; é possível importar como rascunhos. O perfil é sempre público após salvar.

A importação usa sua sessão administrativa e as políticas RLS existentes; nenhuma chave privilegiada é necessária. Ela verifica os campos esperados antes de começar. Não requer novas tabelas nem funções SQL além do `supabase/schema.sql` atual.

Registros com slug ou título de projeto já existente são preservados; publicações são comparadas por título normalizado e ano, além de terem identificadores estáveis para novas inserções. Campos de perfil personalizados são preservados; apenas campos vazios ou os valores originais de exemplo são substituídos. Isso significa que um projeto já cadastrado pode continuar com o texto anterior e deverá ser editado pelo painel se você quiser atualizá-lo.

As gravações em tabelas diferentes não são uma transação única. Se uma etapa falhar, a mensagem informa os registros já importados, e a operação pode ser repetida sem duplicar os itens importados por ela. Não exclua registros para repetir a importação; corrija o erro e tente novamente.

O PDF original, telefone e endereço profissional não são publicados. Nenhuma foto, DOI ou link de PDF foi inventado. O GitHub foi mantido da configuração anterior do projeto. Apresentações foram registradas no perfil, separadas das publicações; o trabalho Java–JNI–OpenGL também aparece como trabalho no portfólio, explicitamente identificado como apresentação.

Com o Supabase configurado, as páginas continuam lendo exclusivamente do banco: adicionar conteúdo ao código não escreve automaticamente no seu projeto Supabase. A importação deve ser executada pelo botão do painel usando sua conta autenticada.

Como alternativa ao botão, execute `supabase/seed.sql` no SQL Editor do Supabase após aplicar o schema. Essa alternativa importa todos os itens novos como publicados, em uma transação. A comparação de títulos no SQL ignora maiúsculas/minúsculas e espaços nas pontas; o botão do painel também normaliza acentos e pontuação. Os dados do SQL são gerados da mesma fonte com `node scripts/generate-lattes-seed.cjs`; para verificar a sincronização, use `node scripts/generate-lattes-seed.cjs --check`.

## Capa e galeria de fotos dos projetos

Em **Administração → Projetos → Editar**, o campo **Imagem de capa** aceita upload ou URL, mostra uma prévia e permite remover a capa. A capa aparece nos cartões e no início da página individual.

A seção **Fotos do projeto** permite enviar vários arquivos, adicionar URLs, descrever as imagens para acessibilidade, escrever legendas, reorganizar e remover fotos. Clique em **Salvar alterações** ao concluir. Cada projeto aceita até 20 fotos adicionais, em JPEG, PNG ou WebP, com até 5 MB por arquivo. O envio acontece arquivo por arquivo. A página individual exibe a galeria e permite ampliar fotos, navegar por botões ou setas do teclado e fechar com Escape.

Para um banco já configurado, execute `supabase/migrations/20261021_project_gallery.sql` no SQL Editor do Supabase. Essa migração adiciona apenas a coluna `gallery` e uma restrição de formato/tamanho, sem modificar projetos existentes ou políticas RLS. Instalações novas podem executar diretamente o `supabase/schema.sql` atualizado. Sem a nova coluna, salvar o campo de galeria exibirá a orientação para atualizar o schema.

As URLs, descrições, legendas e o limite de fotos são validados no servidor. Uploads continuam restritos a administradores. Fotos enviadas são públicas por URL, inclusive se associadas a um rascunho. Remover a foto de um projeto não remove o arquivo do Storage, pois ele pode ser utilizado em outro conteúdo.

## Página de trajetória acadêmica

A rota `/trajetoria` apresenta uma narrativa sobre o IFRO (2022–2025), a mobilidade STEAM na Argentina (2024), a Ciência da Computação e o estágio na UNIR (desde 2025). Também reúne o voluntariado na AFS, eventos por ano e premiações, usando o currículo fornecido como referência. Participações no mesmo evento/ano foram reunidas quando se referem a trabalhos diferentes.

O conteúdo editorial está em `src/lib/trajectory-content.ts` e a composição em `src/app/trajetoria/page.tsx`. A página é acessível pelo menu, pela página inicial e por Sobre, e está incluída no sitemap. Não depende de migração nem de importação no Supabase. A narrativa e os eventos desta página são mantidos no código; a edição do perfil no painel continua atualizando a página Sobre.

## Foto da página inicial

No painel, abra **Foto do início** (`/admin/foto`). Envie uma imagem JPEG, PNG ou WebP de até 5 MB, ou informe uma URL, confira a prévia circular e clique em **Salvar foto do início**. Use a opção de remover e salve novamente para retirar a foto. A imagem aparece na apresentação inicial, inclusive no celular, e na página Sobre.

Essa tela altera somente `profile.photo_url` quando o perfil já existe. O mesmo campo continua disponível em Perfil acadêmico, com identificação explícita. Não é necessária nova migração SQL; o campo e o Storage já fazem parte do schema. O arquivo enviado só é associado ao perfil depois de salvar o formulário.

## Destaques e fotos da página inicial

Abra **Painel → Página inicial** (`/admin/inicio`). Escolha até três projetos publicados e organize sua ordem. Sem seleção, são mostrados os três publicados mais recentes; projetos escolhidos que forem despublicados ou removidos deixam de aparecer.

Na mesma tela, envie até seis fotos de congressos/apresentações e até seis do intercâmbio, com descrição para acessibilidade, legenda e ordem. JPEG, PNG ou WebP de até 5 MB cada. Clique em **Salvar página inicial** para publicar a configuração. A página inicial mostra as seções de fotos apenas quando possuem imagens cadastradas, com ampliação por clique e navegação por teclado. A prévia da trajetória conecta o IFRO, a Argentina e a UNIR à página `/trajetoria`.

Em um banco existente, execute **somente** `supabase/migrations/20261021_homepage.sql` para ativar a nova configuração. A tabela singleton `public.homepage` armazena os IDs dos projetos e os dois álbuns, com leitura pública e gravação restrita a administradores por RLS. O SQL está também no schema completo. Os projetos e o perfil existentes são preservados. Enquanto essa migração não for aplicada, o início continua mostrando os projetos recentes e a prévia da trajetória, e o administrador recebe uma orientação específica ao abrir a edição.

As fotos ainda precisam ser enviadas pelo usuário; não foram criadas imagens ilustrativas para representar eventos reais. O envio usa o bucket `portfolio` já configurado. As fotos salvas no início ficam públicas; arquivos enviados também são acessíveis por URL antes de salvar o formulário. A edição desta seção não altera a foto de perfil nem as galerias dos projetos.
