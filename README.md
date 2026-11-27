# Caderneta Digital do Coordenador de Turno

Projecto integrador de **Engenharia de Software I — Lab #02 (Métodos ágeis com Scrum, Kanban, Git e GitHub)**, ISPTEC, 2026/2027.

- **Grupo:** `[número do grupo]`
- **Turma:** `[M1/M2/M3]`
- **Membros:** `[nome completo e número de cada membro]`
- **Repositório:** `[link do repositório]`
- **Quadro Kanban (GitHub Projects):** `[link do quadro]`
- **Aplicação publicada:** `[URL, se publicada; caso contrário indicar “—”]`

> Todos os dados de alunos, encarregados de educação e funcionários usados nos testes, na demonstração e na versão publicada devem ser **fictícios**, em cumprimento da Lei n.º 22/11, de 17 de Junho (Lei da Protecção de Dados Pessoais).

---

## 1. Documentação técnica

### Pré-requisitos indicados no enunciado

- uma conta no GitHub para cada membro;
- Git instalado e configurado em cada computador, com `git config --global user.name` e `git config --global user.email`;
- uma forma de guardar os dados: base de dados relacional (recomendado) ou ficheiros;
- acesso às fontes oficiais indicadas no enunciado;
- opcionalmente, uma conta numa plataforma de publicação (por exemplo, Vercel).

### Instalação e execução local

A aplicação deve executar localmente a partir do código do repositório, seguindo as instruções abaixo.

```text
[linguagem e framework decididos pelo grupo]
[comando para instalar dependências, se existirem]
[comando para executar a aplicação]
```

Endereço local: `[endereço e porta da aplicação]`

### Decisões deixadas ao grupo no enunciado

O enunciado não fixa a linguagem, o framework, a forma de guardar os dados, a publicação nem os perfis de utilizador. Preencher com as decisões reais do grupo:

- linguagem e framework: `[preencher]`;
- forma de guardar os dados (base de dados relacional ou ficheiros): `[preencher]`;
- publicação da aplicação (sim/não; plataforma): `[preencher]`;
- perfis de utilizador, identificados a partir dos pedidos e dos cenários: `[preencher]`.

### Segurança mínima exigida

- autenticação por palavra-passe;
- acesso por perfil, de modo que cada perfil só veja e faça o que lhe é permitido.

### Interface exigida

- utilização no computador e no telemóvel (solução web responsiva);
- contraste suficiente entre texto e fundo;
- texto alternativo nas imagens que transmitem informação;
- utilização apenas com o teclado;
- etiquetas claras em todos os campos dos formulários;
- mensagens de erro que expliquem como corrigir o problema.

Referências: Nielsen (10 heurísticas de usabilidade) e W3C (WCAG 2.2).

---

## 2. Manual do utilizador

A aplicação deve permitir o que o coordenador de turno pediu na primeira conversa:

- gerir utilizadores e permissões;
- gerir turnos, cursos, classes e turmas;
- registar e consultar alunos;
- registar e associar encarregados de educação;
- registar ocorrências escolares;
- associar vários alunos a uma ocorrência;
- descrever detalhadamente os acontecimentos;
- registar testemunhas e intervenientes;
- registar medidas e decisões;
- acompanhar o cumprimento das medidas;
- registar contactos com encarregados;
- agendar reuniões;
- enviar notificações e lembretes;
- consultar o histórico individual dos alunos;
- gerar relatórios e indicadores.

**Produto mínimo obrigatório:** autenticação por palavra-passe com acesso por perfil; gestão de turmas e alunos; registo de ocorrências com possibilidade de associar vários alunos; registo das medidas aplicadas; consulta do histórico do aluno.

**Perfis de utilizador:** `[preencher com os perfis identificados pelo grupo]`.

**Percursos do utilizador:** `[preencher com os passos reais da aplicação do grupo: início de sessão e execução de cada acção da lista acima]`.

---

## 3. Relatório de testes

`[Preencher com os testes realizados pelo grupo: o que foi testado, como foi testado e o resultado.]`

Verificação exigida para a interface:

- experimentação no computador e no telemóvel;
- navegação apenas com o teclado;
- contraste e etiquetas dos campos;
- mensagens de erro claras.
