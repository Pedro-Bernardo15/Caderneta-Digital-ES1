# Protótipo da interface

O protótipo da Sprint 1 é a própria aplicação server-rendered (`src/server.js` + `public/styles.css`), acessível em `http://localhost:3000`. As figuras abaixo descrevem os ecrãs principais em formato textual (wireframes), suficiente para discussão com o coordenador antes da implementação completa. Referências: Nielsen, *10 Usability Heuristics* (1994) e W3C, *WCAG 2.2* (2023).

## 1. Ecrã de login

```text
+------------------------------------------------+
| Caderneta Digital do Coordenador de Turno      |
+------------------------------------------------+
| Iniciar sessão                                 |
| Utilizador  [________________]                  |
| Palavra-passe [_______________]                 |
| [ Entrar ]                                     |
| Contas de demonstração: coord / direcao / func |
+------------------------------------------------+
```

## 2. Painel e navegação

```text
+------------------------------------------------------------+
| Cabeçalho + nav: Painel | Turmas | Alunos | Ocorrências     |
|                         | Relatórios | Utilizadores        |
+------------------------------------------------------------+
| Painel do turno                                            |
| [ 2 turmas ][ 3 alunos ][ 1 ocorrência ][ 1 por cumprir ]   |
| [ Registar ocorrência ]                                    |
+------------------------------------------------------------+
```

## 3. Registo de ocorrência (múltiplos alunos)

```text
+------------------------------------------------------------+
| Nova ocorrência                                            |
| Título        [__________________________]                 |
| Data          [2026-11-27]  Gravidade [Média v]            |
| Descrição     [                          ]                 |
|               [                          ]                 |
| Alunos envolvidos (selecionar um ou vários)                |
|  [x] Ana Silva (10.º A)   [ ] Bruno Costa (11.º B)         |
|  [ ] Carla Nunes (10.º A)                                  |
| Testemunhas   [__________________________]                 |
| Intervenientes [_________________________]                 |
| [ Registar ocorrência ]                                    |
+------------------------------------------------------------+
```

## 4. Histórico do aluno

```text
+------------------------------------------------------------+
| Histórico de Ana Silva                                     |
| Tabela: Ocorrências (data, título, descrição)              |
| Tabela: Medidas aplicadas (prazo, medida, estado)          |
| Tabela: Encarregados de educação (nome, parentesco, contacto)|
+------------------------------------------------------------+
```

## 5. Decisões de usabilidade e acessibilidade

| Decisão | Heurística / WCAG |
|---|---|
| Ligação “Saltar para o conteúdo” no topo | WCAG 2.4.1 (skip link); controlo do utilizador. |
| Etiqueta visível e `for` associado em todos os campos; `fieldset`/`legend` na selecção múltipla | WCAG 1.3.1, 3.3.2; consistência (Nielsen 4). |
| Mensagens de erro com texto que explica como corrigir (`role="alert"`) | WCAG 3.3.1; ajuda ao utilizador (Nielsen 9). |
| Foco visível com contorno de 3 px | WCAG 2.4.7. |
| Contraste texto/fundo ≥ 4,5:1; botões com texto escuro sobre fundo azul escuro | WCAG 1.4.3; estética minimalista (Nielsen 8). |
| Tabelas com `caption` e `th scope="col"` | WCAG 1.3.1. |
| Layout fluido com breakpoint a 600 px e tabelas com scroll horizontal | WCAG 1.4.10; flexibilidade e eficiência (Nielsen 7). |
| Nomes fictícios em todos os ecrãs | Lei n.º 22/11 (protecção de dados pessoais). |
