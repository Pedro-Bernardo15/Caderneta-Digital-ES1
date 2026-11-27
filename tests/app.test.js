'use strict';

const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { criarServidor } = require('../src/server');

const diretorio = fs.mkdtempSync(path.join(os.tmpdir(), 'caderneta-test-'));
const servidor = criarServidor({ dataFile: path.join(diretorio, 'database.json') });

before(async () => {
  await new Promise((resolve) => servidor.listen(0, resolve));
});

after(async () => {
  await new Promise((resolve) => servidor.close(resolve));
  fs.rmSync(diretorio, { recursive: true, force: true });
});

const base = () => `http://127.0.0.1:${servidor.address().port}`;

async function pedido(caminho, opcoes = {}) {
  const resposta = await fetch(base() + caminho, {
    method: opcoes.metodo || 'GET',
    redirect: 'manual',
    headers: {
      ...(opcoes.cookie ? { Cookie: opcoes.cookie } : {}),
      ...(opcoes.formulario ? { 'Content-Type': 'application/x-www-form-urlencoded' } : {}),
    },
    body: opcoes.formulario ? new URLSearchParams(opcoes.formulario).toString() : undefined,
  });
  return {
    estado: resposta.status,
    localizacao: resposta.headers.get('location'),
    cookie: (resposta.headers.get('set-cookie') || '').split(';')[0],
    texto: await resposta.text(),
  };
}

async function entrar(username) {
  const resposta = await pedido('/login', {
    metodo: 'POST',
    formulario: { username, password: 'senha123' },
  });
  assert.equal(resposta.estado, 303);
  return resposta.cookie;
}

test('saúde da aplicação e página de login', async () => {
  const saude = await pedido('/healthz');
  assert.equal(saude.estado, 200);
  assert.deepEqual(JSON.parse(saude.texto), { ok: true });

  const login = await pedido('/login');
  assert.equal(login.estado, 200);
  assert.match(login.texto, /Iniciar sessão/);
  assert.match(login.texto, /<label for="username">Utilizador<\/label>/);
});

test('palavra-passe incorreta é rejeitada com mensagem clara', async () => {
  const resposta = await pedido('/login', {
    metodo: 'POST',
    formulario: { username: 'coord', password: 'errada' },
  });
  assert.equal(resposta.estado, 303);
  assert.match(resposta.localizacao, /erro=/);
});

test('sem sessão, as páginas privadas redirecionam para login', async () => {
  const resposta = await pedido('/turmas');
  assert.equal(resposta.estado, 303);
  assert.equal(resposta.localizacao, '/login');
});

test('coordenador cria turma, aluno e ocorrência com vários alunos', async () => {
  const cookie = await entrar('coord');

  const painel = await pedido('/', { cookie });
  assert.match(painel.texto, /Painel do turno/);

  let resposta = await pedido('/turmas', {
    metodo: 'POST', cookie,
    formulario: { nome: '12.º C', turnoId: 't1', cursoId: 'c1', classeId: 'cl1' },
  });
  assert.equal(resposta.estado, 303);
  const turmas = await pedido('/turmas', { cookie });
  assert.match(turmas.texto, /12\.º C/);

  resposta = await pedido('/alunos', {
    metodo: 'POST', cookie,
    formulario: { nome: 'Daniel Fictício', numero: '2026010', turmaId: 'tur1', contacto: '900000010' },
  });
  assert.equal(resposta.estado, 303);

  resposta = await pedido('/ocorrencias', {
    metodo: 'POST', cookie,
    formulario: {
      titulo: 'Incidente no refeitório',
      data: '2026-11-27',
      gravidade: 'Alta',
      descricao: 'Alunos discutiram durante o almoço.',
      alunoIds: 'a1',
      testemunhas: 'Prof. Fictício',
    },
  });
  assert.equal(resposta.estado, 303);
  const localizacao = resposta.localizacao;

  const detalhe = await pedido(localizacao, { cookie });
  assert.equal(detalhe.estado, 200);
  assert.match(detalhe.texto, /Ana Silva/);
  assert.match(detalhe.texto, /Prof\. Fictício/);

  resposta = await pedido(`${localizacao}/medidas`, {
    metodo: 'POST', cookie,
    formulario: { alunoId: 'a1', descricao: 'Conversa de acompanhamento', prazo: '2026-12-05' },
  });
  assert.equal(resposta.estado, 303);

  const historico = await pedido('/alunos/a1', { cookie });
  assert.match(historico.texto, /Incidente no refeitório/);
  assert.match(historico.texto, /Conversa de acompanhamento/);
});

test('medida aplicada pode ser marcada como cumprida', async () => {
  const cookie = await entrar('func');
  const antes = await pedido('/ocorrencias/o1', { cookie });
  assert.match(antes.texto, /Marcar como cumprida/);

  const resposta = await pedido('/medidas/m1/cumprir', { metodo: 'POST', cookie });
  assert.equal(resposta.estado, 303);
  const depois = await pedido('/ocorrencias/o1', { cookie });
  assert.match(depois.texto, /Cumprida/);
});

test('acesso por perfil: direção não escreve e funcionário não gere utilizadores', async () => {
  const direcao = await entrar('direcao');
  let resposta = await pedido('/alunos', {
    metodo: 'POST', cookie: direcao,
    formulario: { nome: 'Não permitido', numero: '999', turmaId: 'tur1' },
  });
  assert.equal(resposta.estado, 403);
  resposta = await pedido('/relatorios', { cookie: direcao });
  assert.equal(resposta.estado, 200);
  assert.match(resposta.texto, /Resumo por turma/);

  const funcionario = await entrar('func');
  resposta = await pedido('/utilizadores', { cookie: funcionario });
  assert.equal(resposta.estado, 403);
});

test('formulários com etiquetas e mensagens de erro', async () => {
  const cookie = await entrar('coord');
  const resposta = await pedido('/ocorrencias/nova?erro=' + encodeURIComponent('Selecione um aluno.'), { cookie });
  assert.equal(resposta.estado, 200);
  assert.match(resposta.texto, /role="alert"/);
  assert.match(resposta.texto, /<label for="descricao">Descrição detalhada<\/label>/);
  assert.match(resposta.texto, /<legend>Alunos envolvidos/);
});
