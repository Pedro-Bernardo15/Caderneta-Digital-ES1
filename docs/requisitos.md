# Documento de requisitos — Caderneta Digital do Coordenador de Turno

Versão: Sprint 1 (27 de Novembro de 2026). Base: pedidos do coordenador de turno e cenários do enunciado do Lab #02. Referência metodológica: Sommerville, *Software Engineering*, 10.ª ed., capítulos 3–5 (elicitação, requisitos funcionais e não funcionais, modelação).

## 1. Actores e perfis de utilizador

| Actor | Descrição | Perfil no sistema | Permissões |
|---|---|---|---|
| Coordenador de Turno | Utilizador principal; regista ocorrências e acompanha medidas. | `coordenador` | Tudo: gerir utilizadores, turmas, alunos, ocorrências, medidas, relatórios. |
| Direcção | Consulta indicadores e históricos para decisões. | `direcao` | Só leitura: turmas, alunos, histórico, ocorrências e relatórios. |
| Funcionário | Testemunha e apoio no registo diário. | `funcionario` | Regista/consulta turmas, alunos, ocorrências e medidas; não gere utilizadores nem vê relatórios. |
| Encarregado de Educação | Não usa a aplicação directamente; é contactado pelo coordenador. | — (entidade de dados) | Sem acesso ao sistema nesta versão. |
| Professor | Pode ser testemunha/interveniente; sem acesso directo. | — (entidade de dados) | Sem acesso ao sistema nesta versão. |

## 2. Requisitos funcionais (RF)

| ID | Requisito | Prioridade | Módulo |
|---|---|---|---|
| RF-01 | Autenticar com utilizador e palavra-passe; palavras-passe guardadas com hash e salt. | MVP | Autenticação |
| RF-02 | Restringir funções e páginas ao perfil do utilizador. | MVP | Autenticação |
| RF-03 | Criar, listar e consultar turnos, cursos, classes e turmas. | MVP | Turmas |
| RF-04 | Registar, listar, editar e consultar alunos associados a uma turma. | MVP | Alunos |
| RF-05 | Registar ocorrência com descrição, data, gravidade, testemunhas e intervenientes. | MVP | Ocorrências |
| RF-06 | Associar vários alunos a uma mesma ocorrência. | MVP | Ocorrências |
| RF-07 | Registar medidas/decisões por ocorrência e por aluno, com prazo. | MVP | Medidas |
| RF-08 | Marcar medida como cumprida e acompanhar o seu estado. | MVP | Medidas |
| RF-09 | Consultar o histórico individual do aluno (ocorrências, medidas, encarregados). | MVP | Histórico |
| RF-10 | Registar encarregados de educação e associá-los a alunos. | Alta (Sprint 2) | Encarregados |
| RF-11 | Registar contactos com encarregados. | Alta (Sprint 2) | Comunicações |
| RF-12 | Agendar reuniões de acompanhamento. | Média (Sprint 3) | Reuniões |
| RF-13 | Enviar notificações e lembretes de prazos. | Média (Sprint 4) | Notificações |
| RF-14 | Gerar relatório de ocorrências por turma e indicadores de medidas por cumprir. | Média (Sprint 4) | Relatórios |
| RF-15 | Gerir utilizadores e perfis pela direcção/coordenador. | Baixa (Sprint 5) | Administração |

## 3. Requisitos não funcionais (RNF)

| ID | Categoria | Requisito |
|---|---|---|
| RNF-01 | Usabilidade | Interfaces com etiquetas visíveis em todos os campos, mensagens de erro que indiquem como corrigir, e navegação por teclado com indication de foco. Referência: 10 heurísticas de Nielsen. |
| RNF-02 | Acessibilidade | Contraste mínimo 4,5:1 para texto normal; texto alternativo em imagens informativas; estrutura semântica (`label`, `fieldset`, `legend`, `caption`); compatibilidade com WCAG 2.2 AA. |
| RNF-03 | Responsividade | Funcional em computador e telemóvel (layout fluido, breakpoints a 600 px). |
| RNF-04 | Segurança | Palavra-passe nunca guardada em texto simples (scrypt + salt); sessão via cookie `HttpOnly` e `SameSite=Lax`; autorização por perfil em cada rota. |
| RNF-05 | Privacidade | Todos os dados de demonstração são fictícios, em cumprimento da Lei n.º 22/11, de 17 de Junho. |
| RNF-06 | Testabilidade | Testes automatizados executáveis com `npm test`, sem dependências externas. |
| RNF-07 | Portabilidade | Execução local com Node.js ≥ 18, sem `npm install`. |
| RNF-08 | Persistência | Dados guardados em `data/database.json`, criado automaticamente na primeira execução. |

## 4. Histórias de utilizador e critérios de aceitação

**HU-01 — Autenticação (issue #1, MVP)**
Como utilizador do sistema (Coordenador de Turno, Direcção ou Funcionário), quero autenticar-me com utilizador e palavra-passe, para aceder apenas às funcionalidades permitidas ao meu perfil.
- Critérios: (a) login válido redireciona para o painel; (b) credenciais erradas mostram mensagem que explica o erro; (c) sessão sem perfil não acede a páginas protegidas; (d) palavra-passe armazenada com hash; (e) layout responsivo.

**HU-02 — Turmas e alunos (issue #2, MVP)**
Como Coordenador de Turno, quero registar, editar e consultar turnos, cursos, classes, turmas e alunos, para manter a estrutura académica organizada e acessível.
- Critérios: (a) criar/listar turmas com turno, curso e classe; (b) registar aluno associado à turma; (c) ver alunos por turma; (d) campos com etiquetas e erros explicativos; (e) dados fictícios; (f) responsivo.

**HU-03 — Ocorrências com vários alunos (MVP, issue a criar)**
Como Coordenador de Turno, quero registar uma ocorrência e associar vários alunos, descrever o sucedido e indicar testemunhas e intervenientes, para documentar completamente cada incidente.
- Critérios: (a) formulário com título, data, gravidade e descrição obrigatórios; (b) selecção múltipla de alunos; (c) pelo menos um aluno obrigatório; (d) testemunhas e intervenientes opcionais; (e) detalhe da ocorrência mostra todos os alunos.

**HU-04 — Medidas e acompanhamento (MVP, issue a criar)**
Como Coordenador de Turno, quero registar medidas aplicadas a cada aluno com prazo e estado, para acompanhar o seu cumprimento.
- Critérios: (a) medida ligada a ocorrência e aluno envolvido; (b) prazo obrigatório; (c) estado inicial “Por cumprir”; (d) possibilidade de marcar como cumprida; (e) estado visível no detalhe da ocorrência e no histórico do aluno.

**HU-05 — Histórico do aluno (MVP, issue a criar)**
Como Coordenador de Turno, quero consultar o histórico individual do aluno, para ver ocorrências e medidas num único local.
- Critérios: (a) página do aluno mostra dados, turma, ocorrências e medidas; (b) apenas perfis autorizados; (c) links para o detalhe da ocorrência.

**HU-06 — Encarregados e contactos (Sprint 2)**
Como Coordenador de Turno, quero registar encarregados e os contactos efectuados, para justificar o acompanhamento da situação do aluno.

**HU-07 — Reuniões e lembretes (Sprints 3–4)**
Como Coordenador de Turno, quero agendar reuniões e receber lembretes dos prazos das medidas, para não perder acompanhamentos.

**HU-08 — Relatórios (Sprint 4)**
Como membro da Direcção, quero ver o resumo de ocorrências por turma, para apoiar decisões no fim do trimestre.

## 5. Ordenação da lista do produto e justificação

1. **Autenticação/perfis, turmas/alunos, ocorrências, medidas, histórico** — são o produto mínimo obrigatório e são pré-requisito para todos os cenários do enunciado.
2. **Encarregados e contactos** — o segundo cenário (“o encarregado já foi contactado?”) depende destes dados, mas o produto mínimo pode demonstrar o acompanhamento só com medidas.
3. **Relatórios por turma** — necessário no terceiro cenário (fim de trimestre), mas útil apenas depois de existirem ocorrências registadas.
4. **Reuniões e notificações** — melhoram o acompanhamento, porém exigem integração de envio e não são pedidos no produto mínimo.
5. **Gestão avançada de utilizadores** — mantemos as contas de demonstração na Sprint 1; a criação de contas pela interface fica para a Sprint 5.

**Propostas e rejeições justificadas:**
- **Acrescentar:** campo “gravidade” na ocorrência, para ordenar o trabalho do coordenador; e Indicador “medidas por cumprir” no painel.
- **Rejeitar nesta versão:** notificações por correio/SMS e publicação online, por falta de tempo e de credenciais de envio; ficam como opção valorizada para sprints seguintes.
- **Rejeitar:** acesso directo dos encarregados ao sistema, porque a Lei n.º 22/11 exige cuidado com dados pessoais e o pedido original só prevê contacto pelo coordenador.

O diagrama de casos de uso está em `docs/casos-de-uso.md`.
