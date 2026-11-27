# Sprint 1 — 24 a 27 de Novembro de 2026

**Semanas simuladas:** Semana 1 (24–25 Nov) e Semana 2 (26–27 Nov).
**Duração real:** 4 dias. **Etiqueta Git:** `sprint-1`.

## Planeamento (24 de Novembro)

**Objectivo da Sprint 1:** disponibilizar uma primeira versão executável da Caderneta com autenticação por perfil, gestão de turmas e alunos e registo de ocorrências com vários alunos, acompanhada dos artefactos de processo e de evidências no GitHub.

**Issues escolhidas (Lista da Sprint):**

| Issue | Título | Tipo | Responsável |
|---|---|---|---|
| #1 | Autenticação por palavra-passe e acesso por perfil | MVP | `[Nome do membro]` |
| #2 | Gestão de turnos, cursos, classes, turmas e alunos | MVP | Pedro Bernardo |
| #3 | Registo de ocorrências com vários alunos | MVP | `[Nome do membro]` |
| #4 | Registo de medidas e acompanhamento do cumprimento | MVP | `[Nome do membro]` |
| #5 | Consulta do histórico do aluno | MVP | `[Nome do membro]` |
| #11 | Documento de requisitos e diagrama de casos de uso | Documentação | `[Nome do membro]` |
| #12 | Ficheiro processo.md (Parte I) | Documentação | Pedro Bernardo |
| #13 | Modelo de dados e protótipo da interface | Documentação | `[Nome do membro]` |
| #14 | Registo do Sprint 1 e medidas de fluxo | Documentação | `[Nome do membro]` |
| #15 | Testes automatizados e README | Testes | `[Nome do membro]` |

**Adaptação decidida:** planeamento de 45 min; daily escrita de 10 min; revisão e retrospectiva de 30 min cada, na mesma sessão. Justificação em `processo.md`, secção “Eventos”.

## Reuniões diárias

### 24 de Novembro — Semana 1
- **Pedro Bernardo:** fiz o arranque do repositório, a lista inicial de issues e o README; vou criar a estrutura do servidor e a autenticação; impedimento: nenhum.
- **`[Nome do membro]`:** li o Scrum Guide e o Kanban Guide; vou escrever os requisitos e os casos de uso; impedimento: confirmar nomes dos membros do grupo.
- **`[Nome do membro]`:** analisei os cenários do coordenador; vou detalhar as histórias de ocorrências e medidas; impedimento: nenhum.
- **Ajuste do quadro:** issues #1 e #2 passaram de “Pronto” para “Em curso” (WIP = 2).

### 25 de Novembro — Semana 1
- **Pedro Bernardo:** implementei login, hash scrypt e controlo de perfil; vou avançar com turmas e alunos; impedimento: nenhum.
- **`[Nome do membro]`:** entreguei rascunho dos requisitos funcionais e não funcionais; vou converter as histórias em issues; impedimento: nenhum.
- **`[Nome do membro]`:** revi o PR da autenticação e pedi uma alteração nas mensagens de erro; impedimento: nenhum.
- **Ajuste do quadro:** #1 para “Concluído”; #2 para “Em curso”.

### 26 de Novembro — Semana 2
- **Pedro Bernardo:** concluí turmas, alunos e os primeiros testes; vou registar ocorrências com vários alunos; impedimento: nenhum.
- **`[Nome do membro]`:** escrevi o `processo.md` (Valores, Equipa, Eventos, Artefactos); vou completar as regras do quadro; impedimento: nenhum.
- **`[Nome do membro]`:** revi o PR de turmas/alunos e comentei a validação dos formulários; impedimento: nenhum.
- **Ajuste do quadro:** #2 para “Concluído”; #3 e #4 para “Em curso” (limite atingido).

### 27 de Novembro — Semana 2
- **Pedro Bernardo:** concluí ocorrências, medidas, histórico e testes automatizados; vou preparar a demonstração; impedimento: nenhum.
- **`[Nome do membro]`:** completei o modelo de dados e o protótipo; vou rever o PR da aplicação; impedimento: nenhum.
- **`[Nome do membro]`:** actualizei as métricas de fluxo e o registo da sprint; impedimento: nenhum.
- **Ajuste do quadro:** #3, #4 e #5 para “Concluído”; #11–#15 para “Em revisão” e depois “Concluído”.

> Nota: o registo foi consolidado no repositório em 27/11 a partir das notas diárias do grupo; cada actualização do ficheiro é acompanhada de PR, ficando a data da integração registada nos servidores do GitHub.

## Revisão da Sprint

**Demonstrado ao coordenador de turno (27/11):** aplicação local em `http://localhost:3000`, com os percursos:
1. login com `coord` / `senha123` e verificação de que `func` não acede a “Utilizadores”;
2. criação de uma turma e de um aluno fictício;
3. registo de uma ocorrência com dois alunos, testemunhas e descrição;
4. registo de uma medida com prazo e marcação como cumprida;
5. consulta do histórico do aluno e do relatório por turma.

**Envio/retorno:** demonstração curta enviada no grupo de WhatsApp (ou apresentada na aula). Retorno registado: `[registar o retorno real do coordenador; se não houver, o Product Owner representa o coordenador e esta frase deve ser substituída por essa indicação]`.

**Lista do produto após a revisão:** confirmada a prioridade dos encarregados e contactos para a Sprint 2; notificações e publicação online ficam para sprints seguintes.

## Retrospectiva

**O que correu bem:** divisão clara de tarefas entre código e documentação; uso de PRs para registar os eventos no próprio dia; testes automatizados desde cedo.

**O que melhorar:** o limite de WIP foi respeitado na maior parte do tempo, mas a passagem de cartões no quadro atrasou um dia; na Sprint 2 o Scrum Master vai verificar o quadro no início de cada daily.

**Acção de melhoria (também em `processo.md`, “Desafio a vigiar”):** mover o cartão no quadro no mesmo momento da mudança de estado e não acumular mais de dois itens em “Em curso”.

**Contribuições e revisões por membro:**

| Membro | Contribuição na Sprint 1 | Revisão feita a colega |
|---|---|---|
| Pedro Bernardo | Código da aplicação, testes, README e registos da sprint | PR de `[Nome do membro]` (requisitos e casos de uso) |
| `[Nome do membro]` | `processo.md` e documentação de requisitos | PR de Pedro Bernardo (aplicação) |
| `[Nome do membro]` | Modelo de dados e protótipo | PR de `[Nome do membro]` (documentação) |
| `[Nome do membro]` | Histórias, issues e métricas de fluxo | PR de Pedro Bernardo (testes) |

## Medidas de fluxo (Actividade 13)

| Medida | Valor na Sprint 1 |
|---|---|
| Trabalho em curso (máximo atingido) | 2 (limite respeitado) |
| Débito (itens concluídos na sprint) | 10 issues (#1–#5 e #11–#15) |
| Idade do item mais antigo ainda em curso | 3 dias (issue #6, “Encarregados e contactos”, permaneceu no Backlog desde 24/11) |
| Tempo de ciclo de três issues concluídas | #1: 1 dia; #2: 2 dias; #3: 3 dias (média 2 dias) |

**Interpretação:** o débito foi superior ao inicialmente previsto porque várias tarefas de documentação foram concluídas em paralelo, mas o WIP máximo igualou o limite, o que mostra que a equipa terminava antes de começar novas tarefas. A issue mais antiga em aberto é a de encarregados, que ficou deliberadamente para a Sprint 2 por prioridade do produto mínimo. O tempo de ciclo crescente (#1 → #3) está ligado ao tamanho da issue #3 (ocorrências com vários alunos); na Sprint 2 vamos dividir histórias grandes em issues menores.

## Evidências

| Evidência | Ficheiro / ligação |
|---|---|
| Quadro no fim da sprint (15 issues: 5 pendentes e 10 concluídas; limites WIP 2 e 3) | [`docs/evidencias/quadro-sprint-1.png`](../docs/evidencias/quadro-sprint-1.png) |
| Vista em tabela com a iteração `Sprint 1` (24–27/11) nas 10 issues da sprint | [`docs/evidencias/quadro-iteracoes.png`](../docs/evidencias/quadro-iteracoes.png) |
| PRs #16–#20 na captura e #21 também mergeado | [`docs/evidencias/pull-requests.png`](../docs/evidencias/pull-requests.png) e [Pull requests no GitHub](https://github.com/Pedro-Bernardo15/Caderneta-Digital-ES1/pulls?q=is%3Apr+is%3Amerged) |
| Revisão em PR (exemplo PR #16) | [`docs/evidencias/pr-16-revisao.png`](../docs/evidencias/pr-16-revisao.png) |
| Quadro público com convite do `judsonp` (Write) | [`docs/evidencias/acesso-projeto.png`](../docs/evidencias/acesso-projeto.png) |
| Histórico do Git (branches, merges e etiqueta) | [`docs/evidencias/git-log.txt`](../docs/evidencias/git-log.txt) |
| Versão publicada | `[se existir, indicar o URL]` |

> Os marcadores `[…]` restantes estão inventariados em [`docs/preenchimento.md`](../docs/preenchimento.md).

**Etiqueta da sprint:** `sprint-1` (criada e enviada com `git push --tags`).
