# Guia de preenchimento — dados que faltam

Este documento indica **exactamente onde** substituir os marcadores antes de entregar o laboratório.
O `README.md` foi limitado ao que o enunciado pede; as escolhas de stack, contas, comandos,
testes e processo que não foram pedidas passaram a marcadores.

> Convenção: qualquer texto entre `[` e `]` é um marcador a substituir.
> Excepção: os `[________]` em `docs/prototipo.md` e os `{ id, nome, ... }` em
> `docs/modelo-dados.md` são intencionais — representam, respectivamente, caixas de
> formulário do wireframe e a notação do esquema de dados.

## 1. `README.md` — identificação e decisões do grupo

O README foi reescrito para conter **apenas o que o enunciado pede**. Todas as escolhas que o Laboratório deixa ao grupo aparecem como marcadores.

| Secção | Marcador | O que escrever |
|---|---|---|
| Cabeçalho | `[número do grupo]` | Número do grupo (ex.: `Grupo 7`) |
| Cabeçalho | `[M1/M2/M3]` | Turma (ex.: `M2`) |
| Cabeçalho | `[nome completo e número de cada membro]` | Nomes e números dos membros |
| Cabeçalho | `[link do repositório]` · `[link do quadro]` | URLs reais do repo e do quadro |
| Cabeçalho | `[URL, se publicada; caso contrário indicar “—”]` | URL publicada ou `—` |
| 1. Documentação técnica | `[linguagem e framework decididos pelo grupo]` e os 2 comandos seguintes | Stack e comandos reais de instalação/execução |
| 1. Documentação técnica | `[endereço e porta da aplicação]` | Ex.: `http://localhost:3000` |
| 1. “Decisões deixadas ao grupo” | 4 marcações `[preencher]` | Linguagem/framework, guardação de dados, publicação e perfis |
| 2. Manual do utilizador | `[preencher com os perfis identificados pelo grupo]` | Perfis reais (PO, SM, Developers não são perfis da aplicação) |
| 2. Manual do utilizador | `[preencher com os passos reais da aplicação do grupo…]` | Percursos reais de cada funcionalidade |
| 3. Relatório de testes | `[Preencher com os testes realizados pelo grupo…]` | Testes, método e resultados reais |

## 2. Equipa e responsabilidades — `processo.md`

| Local | Marcador | O que escrever |
|---|---|---|
| Nota no topo | `[Nome do membro]` | Pode apagar a nota depois de preencher |
| Tabela "Equipa" (4 linhas) | `[Nome do membro]` | Substituir pelo nome de cada membro, mantendo o papel (Scrum Master / Developer) |

## 3. Registo da sprint — `sprints/sprint-1.md`

| Secção | Ocorrências | O que escrever |
|---|---|---|
| Planeamento — coluna "Responsável" | 8 linhas com `[Nome do membro]` | Nome do responsável por cada issue |
| Daily 24/11 | 2 marcações | Nome de quem leu os guias e de quem analisou os cenários |
| Daily 25/11 | 2 marcações | Nome de quem entregou os requisitos e de quem reviu o PR |
| Daily 26/11 | 2 marcações | Nome de quem escreveu `processo.md` e de quem reviu o PR |
| Daily 27/11 | 2 marcações | Nome de quem fez o modelo/protótipo e as métricas |
| Revisão da Sprint | 1 marcação longa | **Retorno real do coordenador**; se não houver, escrever: "Sem retorno formal; o Product Owner validou a demonstração em nome do coordenador." |
| Contribuições e revisões | 6 marcações | Nomes nas colunas "Membro" e "PR de …" |
| Evidências | 1 marcação | URL da versão publicada, ou `—` |

## 4. O que NÃO precisa de preenchimento

- `docs/prototipo.md` — os sublinhados são o desenho do ecrã.
- `docs/modelo-dados.md` — a lista de campos entre chaves é a especificação do esquema.
- `docs/evidencias/` — capturas já anexadas (quadro, iteração `Sprint 1`, PRs, revisão,
  acesso ao projecto e `git log`).

## 5. Passos finais depois de preencher

1. Criar branch: `git checkout -b docs/preenchimento-grupo`
2. Commitar: `git add . && git commit -m "Preenche dados do grupo e retorno da revisao"`
3. Publicar e abrir PR: `git push -u origin docs/preenchimento-grupo`
4. Fazer merge do PR e actualizar a etiqueta:
   `git tag -f -a sprint-1 -m "Sprint 1 concluida (24-27 Novembro 2026)" && git push --force --tags`
