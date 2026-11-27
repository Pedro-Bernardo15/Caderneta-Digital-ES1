# Processo de trabalho da equipa — Caderneta Digital do Coordenador de Turno

Este ficheiro é o **acordo de trabalho do grupo**. Regista as decisões da Parte I do laboratório (actividades 1 a 8) e é actualizado em cada retrospectiva. Referências: [Manifesto Ágil](https://agilemanifesto.org/), [The Scrum Guide 2020](https://scrumguides.org/scrum-guide.html), [The Kanban Guide](https://kanbanguides.org/english/), [Kanban Guide for Scrum Teams](https://www.scrum.org/resources/kanban-guide-scrum-teams), [GitHub Docs](https://docs.github.com/).

> **Nota de preenchimento:** os nomes marcados como `[Nome do membro]` devem ser substituídos pelos nomes reais do grupo antes da entrega. As contas de GitHub devem ser adicionadas como colaboradoras do repositório e do quadro.

---

## Objectivo do Produto

> Ser a ferramenta digital de referência do coordenador de turno para registar alunos, turmas, ocorrências e medidas, consultar o histórico de cada aluno e apoiar decisões da direcção, com dados fictícios e acesso seguro por perfil.

---

## Valores do grupo (Actividade 1)

| Valor do Manifesto | Decisão concreta da equipa para a Caderneta | O que continua a ter valor no lado direito |
|---|---|---|
| **Indivíduos e interacções** mais do que processos e ferramentas | Demonstrar a interface ao coordenador na revisão de cada sprint e ajustar o fluxo antes de escrever mais documentação; as reuniões diárias são conversas reais, não relatórios automáticos. | Processos e ferramentas (Git, quadro, Scrum) continuam necessários para coordenar 4 dias de trabalho e guardar evidências. |
| **Software a funcionar** mais do que documentação exaustiva | Priorizar os cinco módulos do produto mínimo com testes automatizados; a documentação é escrita em paralelo, mas curta e ligada ao código. | Requisitos, casos de uso e registos das sprints continuam exigidos e servem para defender o produto. |
| **Colaboração com o cliente** mais do que negociação de contrato | Enviar uma demonstração de 1–2 minutos ao coordenador de turno no fim da Sprint 1 e registar o retorno em `sprints/sprint-1.md`. | Compromisso com o prazo e com os cinco módulos obrigatórios continua a ser respeitado. |
| **Responder à mudança** mais do que seguir um plano rígido | Reordenar a lista do produto na revisão da sprint quando o coordenador pedir prioridade diferente; mudanças entram na sprint seguinte, não a meio do ciclo. | O planeamento da sprint e o objectivo da sprint dão estabilidade e permitem medir o progresso. |

**Porquê “mais do que” não significa “em vez de”:** privilegiar software a funcionar não significa abolir a documentação — significou escrever requisitos e critérios de aceitação suficientes para que cada issue possa ser testada, sem substituir a conversa com o coordenador por um contrato fechado. Os elementos do lado direito continuam presentes, apenas não dominam a decisão. Fonte: Beck et al., *Manifesto for Agile Software Development* e *Principles behind the Agile Manifesto* (2001), agilemanifesto.org.

---

## Equipa (Actividade 2)

| Membro | Responsabilidade (accountability) | Tarefas concretas no projecto |
|---|---|---|
| Pedro Bernardo (`Pedro-Bernardo15`) | Product Owner (e membro da equipa de desenvolvimento) | Representar o coordenador de turno, ordenar a lista do produto, escrever as histórias e critérios de aceitação, aceitar ou rejeitar incrementos na revisão. |
| `[Nome do membro]` | Scrum Master | Garantir que os eventos acontecem e são registados no próprio dia, ajudar a remover impedimentos, acompanhar as medidas de fluxo e o limite de WIP. |
| `[Nome do membro]` | Developer | Implementar autenticação e perfis, gestão de turmas e alunos, e respectivos testes. |
| `[Nome do membro]` | Developer | Implementar registo de ocorrências (vários alunos), medidas e acompanhamento, e respectivos testes. |
| `[Nome do membro]` | Developer | Implementar histórico do aluno, interface responsiva/acessível e relatório de testes. |

**Responsabilidades e papéis:** o Scrum Guide 2020 fala em *accountabilities* (responsabilidades) e não em *roles* (papéis) porque um membro pode assumir mais do que uma responsabilidade e o que importa é o resultado pelo qual responde, não o título. No nosso grupo, o Product Owner também programa e o Scrum Master também revê código; o que não pode acontecer é ninguém responder pelo valor do produto, pelo processo ou pelo incremento. Fonte: Schwaber & Sutherland, *The Scrum Guide*, secção “Scrum Team” (2020).

---

## Eventos adaptados à nossa sprint (Actividade 3)

| Evento | Propósito | Participantes | Duração máxima do Guia (sprint de 1 mês) | Duração escolhida (sprint de 4 dias) | Resultado |
|---|---|---|---|---|---|
| **Sprint** | Container dos outros eventos; entrega um incremento utilizável. | Toda a equipa | Até 1 mês | 4 dias (24–27 Nov na Sprint 1) | Incremento a funcionar + etiqueta `sprint-1`. |
| **Sprint Planning** | Definir objectivo da sprint e seleccionar issues. | Toda a equipa (PO e Developers obrigatoriamente) | Até 8 h | 45 min | `sprints/sprint-N.md` com objectivo e issues. |
| **Daily Scrum** | Inspeccionar progresso e ajustar plano diário. | Developers (PO e SM podem acompanhar) | Até 15 min | 10 min, **escrita** (3 linhas por membro) | Entrada diária no ficheiro da sprint + ajuste do quadro. |
| **Sprint Review** | Inspeccionar o incremento com o cliente e ajustar a lista do produto. | Equipa + coordenador de turno | Até 4 h | 30 min | Demonstração curta enviada no WhatsApp ou na aula; retorno registado. |
| **Sprint Retrospective** | Planear melhorias no processo. | Equipa | Até 3 h | 30 min | Acções de melhoria no ficheiro da sprint e actualização de “Desafio a vigiar”. |

**Justificação:** como cada sprint dura 4 dias reais (2 semanas simuladas), as durações foram reduzidas na mesma proporção, mantendo o propósito de cada evento. A reunião diária é escrita para compatibilizar horários e deixar evidência com data no GitHub: cada actualização do ficheiro da sprint entra por PR no próprio dia. Revisão e retrospectiva são feitas na mesma sessão, mas com secções separadas, para que uma não substitua a outra. Fonte: *The Scrum Guide 2020*, secção “Scrum Events”; enunciado do Lab #02, secção “Simulação pedagógica”.

---

## Objectivo do Produto e Definição de Pronto (Actividade 4)

**Objectivo do Produto:** ver secção no início deste ficheiro.

**Objectivo da Sprint 1:** *Disponibilizar uma primeira versão executável da Caderneta com autenticação por perfil, gestão de turmas e alunos e registo de ocorrências com vários alunos, acompanhada dos artefactos de processo e de evidências no GitHub.*

**Definição de Pronto (DoD) — uma issue só é considerada concluída quando:**
1. o código está num ramo próprio e foi integrado na `main` por PR com `Closes #n`;
2. outro membro reviu o PR (comentário, aprovação ou pedido de alterações);
3. existe pelo menos um teste automatizado relevante e `npm test` passa;
4. a interface foi verificada em ecrã de computador e de telemóvel, com etiquetas nos campos, contraste suficiente e navegação por teclado;
5. os dados usados são fictícios e o perfil de utilizador foi respeitado;
6. o item passou para a coluna “Concluído” do quadro e está atribuído à iteração da sprint correcta.

**Porquê compromissos:** no Scrum Guide, cada artefacto tem um compromisso que o protege e define o seu propósito — a Lista do Produto tem o Objectivo do Produto, a Lista da Sprint tem o Objectivo da Sprint e o Incremento tem a Definição de Pronto. Sem o compromisso, o artefacto torna-se apenas uma lista de coisas por fazer. Um item que não cumpre a DoD no fim da sprint **não é incremento**: volta para a Lista do Produto, é reestimado e reposicionado na priorização seguinte, podendo ser seleccionado noutra sprint. Fonte: *The Scrum Guide 2020*, secção “Scrum Artifacts”.

---

## Regras do quadro (Actividade 5)

**Práticas do Kanban e como aparecem no quadro do GitHub Projects:**

| Prática | Aplicação no nosso quadro |
|---|---|
| Visualizar o fluxo de trabalho | Colunas visíveis para todos; cada issue é um cartão com etiqueta `MVP`, `sprint-N`, responsável e campo de iteração. Evidência: captura do quadro em `docs/evidencias/`. |
| Limitar o trabalho em curso (WIP) | Limite de **2** cartões na coluna “Em curso”; quando há 2, o membro ajuda a concluir antes de puxar outro. |
| Gerir o fluxo | passagem de coluna só com PR de actualização; métricas (WIP, débito, idade, tempo de ciclo) calculadas no fim da sprint e discutidas na retrospectiva. |

**Fluxo (colunas):**

| Coluna | Significado |
|---|---|
| **Backlog** | História escrita, com critérios de aceitação, ainda não priorizada para a sprint. |
| **Pronto** | Priorizada, estimada e elegível para o planeamento; tem etiqueta `sprint-N`. |
| **Em curso** | Alguém está a trabalhar activamente; no máximo 2 cartões. |
| **Em revisão** | PR aberto à espera de revisão por outro membro. |
| **Concluído** | PR integrado, DoD satisfeita e teste a passar. |

**Justificação do limite (WIP = 2):** a equipa tem poucos membros e 4 dias por sprint; com mais de dois trabalhos simultâneos, as revisões ficam em espera e o tempo de ciclo aumenta. O limite obriga a terminar e rever antes de começar. Fonte: Vacanti & Coleman, *The Kanban Guide* (2020); GitHub Docs, “Customizing the board layout”; Scrum.org, *The Kanban Guide for Scrum Teams*.

---

## Desafio a vigiar (Actividade 6)

Ahmad, Markkula e Oivo (2013), numa revisão sistemática da literatura sobre Kanban, relatam como benefícios, entre outros, **(i)** maior visibilidade do fluxo e focalização no trabalho em curso e **(ii)** flexibilidade para priorizar e melhoria contínua; como desafios apontam, entre outros, **(i)** a necessidade de disciplina na aplicação consistente das práticas e **(ii)** a dificuldade de adaptar o método a contextos e equipas específicos, com evidência empírica ainda limitada.

**Desafio escolhido para o nosso projecto:** a disciplina na aplicação consistente das práticas — em especial respeitar o limite de WIP e mover o cartão no quadro no mesmo dia em que o trabalho muda.

**Como vamos reduzi-lo:** o Scrum Master verifica o quadro na daily escrita; qualquer cartão que entre em “Em curso” com 2 cartões já presentes é discutido na daily; na retrospectiva comparamos o WIP máximo com o limite. Se o limite for excedido, a acção correctiva fica registada no ficheiro da sprint e é verificada na sprint seguinte. Fonte: Ahmad, M. O.; Markkula, J.; Oivo, M. “Kanban in software development: A systematic literature review”, SEAA, IEEE, 2013.

*(Secção revista em todas as retrospectivas.)*

---

## Como combinamos o Scrum e o Kanban (Actividade 7)

| Aspecto | Scrum | Kanban | Combinação no projecto |
|---|---|---|---|
| Ritmo das entregas | Sprints fixas de 4 dias, com incremento no fim. | Fluxo contínuo, sem ciclos obrigatórios. | O ritmo é dado pelo Scrum; o Kanban decide a ordem de puxar trabalho dentro da sprint. |
| Responsabilidades | PO, SM e Developers com responsabilidades explícitas. | Não prescreve papéis; foca o fluxo. | Mantemos as responsabilidades do Scrum e usamos o quadro para tornar o trabalho visível a todos. |
| Mudanças a meio do ciclo | Objectivo da sprint protegido; mudanças entram na sprint seguinte. | Permite reordenar a lista a qualquer momento. | Reordenações vão para a Lista do Produto e só entram na próxima sprint; o PO pode ajustar a prioridade entre sprints. |
| Medidas | Progresso pelo decremento da Lista da Sprint e revisão do incremento. | WIP, débito, idade do item, tempo de ciclo e fluxo. | Usamos as quatro medidas do Kanban na daily e na retrospectiva para apoiar as decisões do Scrum. |

**Ferramentas adicionais decididas:** VS Code (editor comum, com extensão Mermaid para os diagramas), Node.js (`node:test` para testes, sem dependências externas), WhatsApp (demonstração ao coordenador e avisos), Mermaid no GitHub (diagramas de casos de uso versionados). Cada ferramenta está a funcionar, é usada por todos os membros e tem evidência no relatório; publicação na Vercel fica como opção valorizada, não obrigatória. Fonte: *Kanban Guide for Scrum Teams* (Scrum.org, 2021), *Scrum Guide 2020* e *The Kanban Guide* (2020).

---

## Regras de uso da IA (Actividade 8)

**Ferramenta:** OpenCode (modelo Big Pickle). **Data:** 27 de Novembro de 2026.

**Pergunta feita:** “Quais são os papéis do Scrum e os seus eventos?”

**Resposta obtida (resumo):** “O Scrum tem três papéis — Product Owner, Scrum Master e Development Team — e os eventos Sprint, Sprint Planning, Daily Scrum, Sprint Review e Sprint Retrospective. O Daily Scrum dura 15 minutos.”

**Análise com fonte oficial:** a resposta está globalmente correcta nos eventos, mas usa o termo desactualizado **“Development Team”**. O *Scrum Guide 2020*, secção “Scrum Team”, substituiu esse termo por **“Developers”** e deixa de falar em *roles* para falar em *accountabilities* (PO, SM e Developers). O Guia também indica que a duração do Daily Scrum é de 15 minutos **para uma sprint de um mês**, devendo ser ajustada à sprint da equipa. Corrigimos o texto deste ficheiro com base no Guia e não copiámos a resposta da IA sem verificação.

**Regras do grupo para uso da IA:**
1. toda a saída da IA é confrontada com as fontes oficiais indicadas no enunciado antes de entrar no repositório;
2. o relatório regista ferramenta, finalidade e parte do trabalho em que a IA foi usada;
3. qualquer membro deve conseguir explicar, sem ajuda, o código e o texto que entrega;
4. issues, ramos, revisões e registos das sprints são feitos pelos membros e ficam registados no GitHub.

---

## Evidências

As capturas do quadro, dos PRs, das revisões e do histórico do Git são guardadas em `docs/evidencias/` e referenciadas no relatório PDF. O quadro é público e a conta `judsonp` tem permissão de escrita.
