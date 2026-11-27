# Caderneta Digital do Coordenador de Turno

Projecto integrador de **Engenharia de Software I — Lab #02 (Métodos ágeis com Scrum, Kanban, Git e GitHub)**, ISPTEC, 2026/2027.

- **Grupo:** `[número do grupo]` — Turma `[M1/M2/M3]`
- **Membros:** Pedro Bernardo (`Pedro-Bernardo15`) · `[Nome do membro 2]` · `[Nome do membro 3]` · `[Nome do membro 4]` · `[Nome do membro 5]`
- **Repositório:** https://github.com/Pedro-Bernardo15/Caderneta-Digital-ES1
- **Quadro Kanban (GitHub Projects):** https://github.com/users/Pedro-Bernardo15/projects/3
- **Aplicação publicada:** `[opcional — indicar URL se publicada]`

> Todos os dados de alunos, encarregados e funcionários usados na demonstração são **fictícios** (Lei n.º 22/11, de 17 de Junho).

---

## 1. Documentação técnica

### Pré-requisitos
- Node.js **18 ou superior** (testado com Node 24). Não é necessário `npm install`: a aplicação usa apenas módulos nativos do Node.

### Instalação e execução local

```powershell
git clone https://github.com/Pedro-Bernardo15/Caderneta-Digital-ES1.git
cd Caderneta-Digital-ES1
npm start
```

A aplicação fica disponível em **http://localhost:3000**. Para escolher outra porta: `PORT=4000 npm start` (em PowerShell: `$env:PORT=4000; npm start`).

Na primeira execução é criado automaticamente `data/database.json` com os dados fictícios iniciais e as contas de demonstração. Esse ficheiro está no `.gitignore`.

### Estrutura do repositório

| Caminho | Conteúdo |
|---|---|
| `src/server.js` | Servidor HTTP, rotas, controladores e renderização das páginas. |
| `src/db.js` | Leitura/escrita do ficheiro JSON e dados iniciais fictícios. |
| `src/auth.js` | Hash scrypt, verificação de palavra-passe e sessões. |
| `public/styles.css` | Estilos responsivos e acessíveis. |
| `tests/app.test.js` | Testes automatizados (`node:test`). |
| `docs/` | Requisitos, casos de uso, modelo de dados, protótipo e evidências. |
| `processo.md` | Acordo de trabalho do grupo (Parte I do laboratório). |
| `sprints/sprint-1.md` | Registo do Sprint 1. |

### Executar os testes

```powershell
npm test
```

### Módulos do produto mínimo implementados
1. Autenticação por palavra-passe, com acesso por perfil (`coordenador`, `direcao`, `funcionario`).
2. Gestão de turmas e alunos (com turnos, cursos e classes).
3. Registo de ocorrências, com associação de vários alunos, testemunhas e intervenientes.
4. Registo de medidas/decisões com prazo e acompanhamento do cumprimento.
5. Consulta do histórico individual do aluno.

### Limitações conhecidas
- Sessões em memória: ao reiniciar o servidor é necessário voltar a iniciar sessão.
- Sem protecção CSRF e sem limite de tentativas de login (a reforçar em sprints seguintes).
- Os dados são guardados num ficheiro JSON local; se a aplicação for publicada num serviço com sistema de ficheiros só de leitura, é necessário migrar para base de dados ou armazenamento externo.

---

## 2. Manual do utilizador

### Iniciar sessão
Abra `http://localhost:3000` e introduza utilizador e palavra-passe.

| Utilizador | Perfil | O que pode fazer |
|---|---|---|
| `coord` | Coordenador de Turno | Tudo: gerir utilizadores, turmas, alunos, ocorrências, medidas e relatórios. |
| `direcao` | Direção | Consultar turmas, alunos, históricos e relatórios. |
| `func` | Funcionário | Registar e consultar turmas, alunos, ocorrências e medidas. |

Palavra-passe de demonstração para os três: **`senha123`**.

### Percursos principais
1. **Criar turma:** `Turmas` → preencher nome, turno, curso e classe → `Criar turma`.
2. **Registar aluno:** `Alunos` → nome, número, turma e contacto → `Registar aluno`.
3. **Registar ocorrência:** `Ocorrências` → `Nova ocorrência` → preencher título, data, gravidade e descrição → seleccionar um ou vários alunos → indicar testemunhas/intervenientes → `Registar ocorrência`.
4. **Registar medida:** abrir a ocorrência → `Registar medida` → escolher aluno, descrever a medida e definir prazo.
5. **Acompanhar medida:** no detalhe da ocorrência, `Marcar como cumprida` quando a medida for concluída.
6. **Consultar histórico:** `Alunos` → clicar no aluno → ver ocorrências, medidas e encarregados.
7. **Relatórios:** `Relatórios` (perfil coordenador ou direção) → resumo por turma e medidas por cumprir.

### Acessibilidade
Todos os campos têm etiqueta visível, os erros explicam como corrigir, a navegação funciona por teclado com foco visível e o layout adapta-se a computador e telemóvel.

---

## 3. Relatório de testes

**Execução:** `npm test` — 7 testes automatizados com `node:test`, todos a passar (Sprint 1).

| ID | Teste | Resultado |
|---|---|---|
| T-01 | Endpoint de saúde `/healthz` e carregamento da página de login | Passou |
| T-02 | Palavra-passe errada é rejeitada com mensagem clara | Passou |
| T-03 | Sem sessão, páginas privadas redirecionam para o login | Passou |
| T-04 | Coordenador cria turma, aluno e ocorrência com dois alunos; medida aparece no histórico | Passou |
| T-05 | Medida pode ser marcada como cumprida | Passou |
| T-06 | Direção não escreve (403); funcionário não acede a utilizadores (403); relatórios visíveis à direção | Passou |
| T-07 | Formulários com etiquetas, legenda e mensagem de erro com `role="alert"` | Passou |

**Testes manuais realizados:** verificação no navegador em ecrã de computador e em modo de telemóvel (devtools), navegação só com teclado e contraste dos elementos principais. Evidências (capturas) em `docs/evidencias/`.

---

## 4. Documentação do processo

- [processo.md](processo.md) — decisões do Scrum e do Kanban do grupo.
- [Requisitos](docs/requisitos.md) · [Casos de uso](docs/casos-de-uso.md) · [Modelo de dados](docs/modelo-dados.md) · [Protótipo](docs/prototipo.md)
- [Sprint 1](sprints/sprint-1.md)

---

## 5. Antes de entregar

Os nomes dos colegas, o número/turma do grupo, o URL publicado e o retorno do coordenador
ficaram como marcadores `[…]` porque dependem de dados do grupo. O
**[guia de preenchimento](docs/preenchimento.md)** indica todos os ficheiros e linhas onde
substituí-los. O resto da entrega já está no GitHub: issues #1–#15, PRs #16–#20, quadro
público, convite do `judsonp` com permissão Write, revisões, etiqueta `sprint-1` e
evidências em `docs/evidencias/`.
