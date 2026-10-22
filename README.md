# Erick | Portfólio acadêmico

Meu espaço para compartilhar projetos, pesquisas e experiências em Ciência da Computação — da formação técnica no IFRO ao intercâmbio na Argentina e à graduação na Universidade Federal de Rondônia.

O site reúne minha trajetória, publicações e registros de eventos, com um painel administrativo para atualizar conteúdo, selecionar projetos em destaque e organizar fotos.

[Currículo Lattes](https://lattes.cnpq.br/1145013876792671) · [ORCID](https://orcid.org/0009-0003-4908-1438) · [LinkedIn](https://www.linkedin.com/in/erick-batista-dos-santos-7aa1b7348/)

## O que o projeto oferece

- **Página inicial:** apresentação, redes sociais, projetos em destaque, prévia da trajetória e álbuns de congressos e intercâmbio.
- **Projetos:** listagem, páginas individuais, capa, tecnologias, link externo e galeria de fotos com legendas e ampliação.
- **Trajetória acadêmica:** narrativa sobre IFRO, mobilidade STEAM na Argentina, UNIR, eventos, voluntariado e premiações.
- **Publicações e notícias:** referências acadêmicas, links para DOI/PDF e páginas individuais de notícias.
- **Painel administrativo:** criação, edição, exclusão, rascunhos, publicação, edição do perfil e envio de arquivos.
- **Autenticação:** acesso por e-mail e senha, autorização de administrador, logout e recuperação de senha.
- **Descoberta e acessibilidade:** metadados, Open Graph, sitemap, navegação por teclado, descrições de imagens e layout responsivo.

## Tecnologias

| Camada | Tecnologias |
| --- | --- |
| Aplicação | Next.js 15, App Router e React 19 |
| Linguagem | TypeScript com verificação estrita |
| Estilos e ícones | Tailwind CSS 4 e Lucide |
| Banco e autenticação | Supabase PostgreSQL, Auth e Row Level Security (RLS) |
| Arquivos | Supabase Storage |
| Testes | Executor nativo do Node.js |

## Rodar localmente

Requer **Node.js 20 ou superior** e npm.

```bash
git clone https://github.com/ErickSuirenAki/portifolio-academico.git
cd portifolio-academico
npm install
cp .env.example .env.local
npm run dev
```

Abra [localhost:3000](http://localhost:3000).

Sem as credenciais do Supabase, o site exibe o conteúdo acadêmico incluído no código. Para usar o painel e salvar alterações, configure a integração abaixo.

### Variáveis de ambiente

Preencha o arquivo `.env.local` com os dados do seu projeto:

| Variável | Valor esperado |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave pública `anon` ou `publishable` |
| `NEXT_PUBLIC_SITE_URL` | Origem do site, como `http://localhost:3000` ou `https://seu-dominio.com` |

O arquivo [.env.example](.env.example) contém o modelo. `.env.local` é ignorado pelo Git; use somente a chave pública nessa configuração, nunca uma chave `service_role`.

## Configurar o Supabase

1. Crie um projeto no Supabase.
2. Abra [supabase/schema.sql](supabase/schema.sql), copie o conteúdo e execute no **SQL Editor** do mesmo projeto. Ele cria as tabelas, as políticas de acesso e o bucket de arquivos.
3. Preencha as variáveis de ambiente e reinicie o servidor de desenvolvimento.
4. Em **Authentication**, desative cadastros públicos e crie sua conta de administrador em **Users**.
5. Copie o UUID da conta e execute no SQL Editor:

   ```sql
   insert into public.admin_users (user_id)
   values ('SEU-UUID')
   on conflict do nothing;
   ```

6. Em **Authentication → URL Configuration**, configure a **Site URL** e inclua o callback em **Redirect URLs**:
   - Local: `http://localhost:3000/auth/callback`
   - Produção: `https://seu-dominio.com/auth/callback`
7. Acesse `/admin/login` e entre com sua conta.

A recuperação de senha depende do envio de e-mails configurado no Supabase. Abra o link recebido no mesmo navegador em que fez a solicitação, pois o fluxo PKCE utiliza um cookie de verificação.

### Atualizar um banco existente

O schema completo inclui os recursos atuais e pode ser reaplicado a um banco criado por este projeto. Ele adiciona os campos previstos e recria as políticas conhecidas, preservando os registros.

Se o banco já estiver configurado e faltar apenas um dos recursos abaixo, execute a migração correspondente no SQL Editor:

| Recurso | Arquivo |
| --- | --- |
| Galeria de fotos dos projetos | [20261021_project_gallery.sql](supabase/migrations/20261021_project_gallery.sql) |
| Seleção de destaques e álbuns da página inicial | [20261021_homepage.sql](supabase/migrations/20261021_homepage.sql) |

Em uma instalação nova, basta executar o schema completo.

## Usar o painel

| Endereço | O que permite editar |
| --- | --- |
| `/admin` | Visão geral e acesso aos módulos |
| `/admin/inicio` | Até três projetos em destaque, sua ordem e os álbuns do início |
| `/admin/foto` | Foto da apresentação, com prévia circular |
| `/admin/projects` | Projetos, capas e galerias |
| `/admin/publications` | Publicações, autores, ano, DOI e PDF |
| `/admin/news` | Notícias, capas e textos |
| `/admin/profile` | Biografia, formação, experiências, eventos, premiações e links do perfil |
| `/admin/importar-lattes` | Prévia e importação do conteúdo acadêmico incluído no projeto |

Projetos, publicações e notícias podem ser salvos como **rascunho**. Somente registros publicados aparecem nas páginas públicas, inclusive quando o visitante está autenticado como administrador. O perfil e as configurações salvas da página inicial são públicos.

Os campos de conteúdo usam texto simples e preservam quebras de linha.

### Destaques e fotos

Na tela **Página inicial**, selecione até três projetos publicados e organize a ordem. Sem seleção, aparecem os três publicados mais recentes. Se um projeto escolhido for removido ou despublicado, ele deixa de aparecer nos destaques.

| Uso | Limite |
| --- | --- |
| Capa e foto da apresentação | JPEG, PNG ou WebP de até 5 MB |
| Galeria de um projeto | Até 20 fotos, de até 5 MB cada |
| Álbum de congressos/apresentações no início | Até 6 fotos, de até 5 MB cada |
| Álbum do intercâmbio no início | Até 6 fotos, de até 5 MB cada |
| PDF de uma publicação | Até 5 MB |

As galerias permitem adicionar descrições, legendas, reorganizar fotos e ampliar as imagens. Depois do envio, **salve o formulário** para associar os arquivos ao conteúdo. Os álbuns do início aparecem quando possuem fotos cadastradas.

### Importar os dados do Lattes

O conteúdo em [lattes-content.ts](src/lib/lattes-content.ts) foi organizado a partir do currículo atualizado em **11/10/2026**, exportado em **21/10/2026**. Inclui **15 projetos e trabalhos**, **4 publicações** e informações de formação, experiências, eventos e premiações. As seções repetidas do currículo foram unificadas; apresentações são identificadas separadamente das publicações.

Para importar, abra **Importar Lattes**, revise a prévia e clique em **Importar dados do meu Lattes**. É possível adicionar os novos projetos e publicações como rascunhos ou publicados. Registros existentes e campos personalizados do perfil são preservados; campos vazios e textos originais de exemplo podem ser preenchidos.

Se uma etapa falhar, o painel informa o progresso. A importação pode ser repetida sem duplicar os itens já importados por ela. Não há sincronização automática com a Plataforma Lattes.

Como alternativa, execute [supabase/seed.sql](supabase/seed.sql) no SQL Editor após configurar o schema. Essa opção importa os novos registros como publicados, em uma transação. O SQL compara títulos sem diferenciar maiúsculas de minúsculas; a importação pelo painel também normaliza acentos e pontuação.

### Onde editar cada conteúdo

| Conteúdo | Local |
| --- | --- |
| Projetos, publicações, notícias, perfil e fotos | Painel administrativo |
| Nome curto e resumo da apresentação inicial | [src/app/page.tsx](src/app/page.tsx) |
| Redes sociais e e-mail de contato | [src/lib/contact.ts](src/lib/contact.ts) |
| Texto da trajetória e eventos organizados por ano | [src/lib/trajectory-content.ts](src/lib/trajectory-content.ts) |
| Nome do site, rodapé e metadados globais | [src/app/layout.tsx](src/app/layout.tsx) |
| Conteúdo preparado para importação do Lattes | [src/lib/lattes-content.ts](src/lib/lattes-content.ts) |

Com Supabase configurado, as listagens públicas leem o banco. Alterar os dados de importação no código não atualiza automaticamente os registros já cadastrados. Um banco vazio mantém as listagens vazias; um perfil ainda não cadastrado usa a apresentação acadêmica padrão.

## Estrutura do projeto

```text
src/
  app/          Páginas públicas, painel e ações no servidor
  components/   Formulários, cartões, galerias e navegação
  lib/          Dados, validações, conteúdo e integração Supabase
  middleware.ts Renovação da sessão administrativa
supabase/
  schema.sql    Estrutura completa, políticas RLS e Storage
  migrations/   Atualizações para bancos existentes
  seed.sql      Importação opcional do conteúdo acadêmico
scripts/        Geração do SQL de importação
tests/          Validação de conteúdo, autorização e importação
public/         Arquivos estáticos
```

## Comandos e validação

| Comando | Função |
| --- | --- |
| `npm run dev` | Inicia o desenvolvimento local |
| `npm test` | Executa os testes automatizados |
| `npm run typecheck` | Verifica os tipos TypeScript |
| `npm run build` | Gera o build de produção |
| `npm start` | Serve o build de produção |
| `node scripts/generate-lattes-seed.cjs` | Atualiza o SQL a partir do conteúdo Lattes |
| `node scripts/generate-lattes-seed.cjs --check` | Confere se o SQL de importação está sincronizado |

`npm run lint` está declarado, mas ESLint ainda não está instalado nem configurado.

Os testes cobrem validação de URLs, arquivos e galerias, seleção de destaques, preservação de edições, importação repetida e bloqueio de ações sem autorização. Os testes de acesso usam um cliente Supabase simulado; a autenticação real, as políticas RLS e o Storage devem ser verificados em um projeto Supabase configurado. Confira também a navegação, as fotos e os formulários no celular e no computador.

## Acesso e armazenamento

As ações administrativas verificam a identidade e a autorização no servidor. As tabelas usam RLS, com gravações restritas às contas cadastradas em `admin_users`.

O bucket `portfolio` é **público**: arquivos enviados podem ser abertos por quem tem a URL, mesmo quando associados a rascunhos ou antes de salvar um formulário. A remoção de uma imagem do site não exclui o arquivo do Storage, pois ele pode ser usado em outro registro. Arquivos não utilizados podem ser removidos pelo painel do Supabase.

As credenciais locais, dependências, builds e o PDF original do currículo ficam fora do Git. O conteúdo acadêmico organizado para o site faz parte do repositório.

## Publicar na Vercel

1. Importe este repositório como um projeto na Vercel.
2. Configure as três variáveis de ambiente de `.env.example`, usando o domínio de produção em `NEXT_PUBLIC_SITE_URL`.
3. Faça o deploy e atualize a Site URL e o callback no Supabase para o domínio publicado.

Alterações nas variáveis `NEXT_PUBLIC_*` exigem um novo build/deploy. Fotos e conteúdo cadastrados no Supabase permanecem no banco e no Storage; o envio do código ao GitHub não os copia.

## Problemas frequentes

| Situação | O que verificar |
| --- | --- |
| `PGRST204` ou mensagem de campo ausente | Execute o schema atualizado ou a migração do recurso no Supabase usado pelo site. Depois recarregue o formulário. |
| Erro `42501` ou conta sem acesso | Confira o UUID em `admin_users` e as políticas RLS do schema. |
| Fotos não são enviadas | Verifique o limite de 5 MB, o formato e a configuração do bucket `portfolio`. |
| Conteúdo salvo não aparece no site | Confira se está publicado; para os destaques, confira também a seleção na edição do início. |
| Link de recuperação não funciona | Confira Site URL, Redirect URLs, envio de e-mail e o navegador em que a recuperação foi solicitada. |
