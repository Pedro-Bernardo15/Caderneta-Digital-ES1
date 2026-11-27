'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { URL } = require('node:url');
const dados = require('./db');
const seg = require('./auth');

const PERFIS = {
  coordenador: { rotulos: ['coordenador', 'direcao', 'funcionario'], escrever: true, gerir: true },
  direcao: { rotulos: ['coordenador', 'direcao'], escrever: false, gerir: false },
  funcionario: { rotulos: ['coordenador', 'funcionario'], escrever: true, gerir: false },
};

function escapar(valor) {
  return String(valor ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function opcoesSelect(lista, selecionado) {
  return lista
    .map((item) => `<option value="${escapar(item.id)}"${item.id === selecionado ? ' selected' : ''}>${escapar(item.nome)}</option>`)
    .join('');
}

function criarServidor(opcoes = {}) {
  const ficheiroDados = opcoes.dataFile || path.join(__dirname, '..', 'data', 'database.json');
  const publicDir = path.join(__dirname, '..', 'public');
  let db = dados.carregar(ficheiroDados);
  const sessoes = seg.criarSessoes();

  function persistir() {
    dados.guardar(ficheiroDados, db);
  }

  function enviar(res, estado, corpo, tipo = 'text/html; charset=utf-8') {
    res.writeHead(estado, { 'Content-Type': tipo, 'Cache-Control': 'no-store' });
    res.end(corpo);
  }

  function redirecionar(res, destino, estado = 303) {
    res.writeHead(estado, { Location: destino, 'Cache-Control': 'no-store' });
    res.end();
  }

  function utilizador(req) {
    const token = seg.cookieSession(req);
    const sessao = sessoes.obter(token);
    return sessao ? dados.encontrar(db.utilizadores, sessao.userId) : null;
  }

  function autorizado(req, res, permissao = 'ler') {
    const user = utilizador(req);
    if (!user) {
      redirecionar(res, '/login');
      return null;
    }
    const regras = PERFIS[user.perfil] || PERFIS.funcionario;
    const ok = permissao === 'gerir' ? regras.gerir : permissao === 'escrever' ? regras.escrever : true;
    if (!ok) {
      enviar(res, 403, pagina('<h1>Acesso negado</h1><p>O seu perfil não permite esta operação.</p>', { titulo: 'Acesso negado', user }));
      return null;
    }
    return user;
  }

  function pagina(conteudo, { titulo = 'Caderneta Digital', user = null, erro = '' } = {}) {
    const aviso = erro ? `<div class="erro" role="alert">${escapar(erro)}</div>` : '';
    const navegacao = user
      ? `<nav aria-label="Navegação principal"><ul>
          <li><a href="/">Painel</a></li>
          <li><a href="/turmas">Turmas</a></li>
          <li><a href="/alunos">Alunos</a></li>
          <li><a href="/ocorrencias">Ocorrências</a></li>
          ${PERFIS[user.perfil].rotulos.includes('direcao') ? '<li><a href="/relatorios">Relatórios</a></li>' : ''}
          ${PERFIS[user.perfil].gerir ? '<li><a href="/utilizadores">Utilizadores</a></li>' : ''}
        </ul></nav>
        <p class="perfil">Sessão: ${escapar(user.nome)} — ${escapar(user.perfil)}
          <form method="post" action="/logout" class="inline"><button type="submit">Terminar sessão</button></form>
        </p>`
      : '';
    return `<!doctype html>
<html lang="pt">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapar(titulo)} — Caderneta Digital</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <a class="salto" href="#conteudo">Saltar para o conteúdo</a>
  <header><h1>Caderneta Digital do Coordenador de Turno</h1>${navegacao}</header>
  <main id="conteudo">${aviso}${conteudo}</main>
  <footer><p>Projeto integrador de Engenharia de Software I · Dados fictícios</p></footer>
</body>
</html>`;
  }

  function paginaLogin(erro = '') {
    return pagina(`
      <h2>Iniciar sessão</h2>
      <form method="post" action="/login" class="cartao">
        <div><label for="username">Utilizador</label><input id="username" name="username" autocomplete="username" required></div>
        <div><label for="password">Palavra-passe</label><input id="password" name="password" type="password" autocomplete="current-password" required></div>
        <button type="submit">Entrar</button>
      </form>
      <p class="ajuda">Contas de demonstração (fictícias): <code>coord</code>, <code>direcao</code>, <code>func</code> — palavra-passe <code>senha123</code>.</p>
    `, { titulo: 'Iniciar sessão', erro });
  }

  async function lerCorpo(req) {
    let bruto = '';
    for await (const pedaco of req) bruto += pedaco;
    return new URLSearchParams(bruto);
  }

  function tabela(cabecalhos, linhas, legenda) {
    if (!linhas.length) return `<p class="vazio">${escapar(legenda)} — sem registos.</p>`;
    return `<div class="tabelar"><table>
      <caption>${escapar(legenda)}</caption>
      <thead><tr>${cabecalhos.map((c) => `<th scope="col">${escapar(c)}</th>`).join('')}</tr></thead>
      <tbody>${linhas.map((linha) => `<tr>${linha.map((celula) => `<td>${celula}</td>`).join('')}</tr>`).join('')}</tbody>
    </table></div>`;
  }

  function nomeTurma(id) {
    return dados.encontrar(db.turmas, id)?.nome || '—';
  }

  function nomeAluno(id) {
    return dados.encontrar(db.alunos, id)?.nome || '—';
  }

  async function rotear(req, res) {
    const url = new URL(req.url, 'http://localhost');
    const rota = url.pathname;
    const metodo = req.method;
    const erro = url.searchParams.get('erro') || '';

    if (rota === '/styles.css') {
      const css = fs.readFileSync(path.join(publicDir, 'styles.css'), 'utf8');
      return enviar(res, 200, css, 'text/css; charset=utf-8');
    }
    if (rota === '/healthz') return enviar(res, 200, JSON.stringify({ ok: true }), 'application/json');

    if (rota === '/login' && metodo === 'GET') return enviar(res, 200, paginaLogin(erro));
    if (rota === '/login' && metodo === 'POST') {
      const corpo = await lerCorpo(req);
      const user = db.utilizadores.find((u) => u.username === corpo.get('username'));
      if (!user || !seg.verificarPassword(corpo.get('password') || '', user.salt, user.hash)) {
        return redirecionar(res, '/login?erro=' + encodeURIComponent('Utilizador ou palavra-passe incorretos. Tente novamente.'));
      }
      const token = sessoes.criar(user.id);
      res.setHeader('Set-Cookie', `caderneta_session=${token}; HttpOnly; SameSite=Lax; Path=/`);
      return redirecionar(res, '/');
    }
    if (rota === '/logout' && metodo === 'POST') {
      sessoes.remover(seg.cookieSession(req));
      res.setHeader('Set-Cookie', 'caderneta_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0');
      return redirecionar(res, '/login');
    }

    if (rota === '/' && metodo === 'GET') {
      const user = autorizado(req, res);
      if (!user) return;
      const conteudo = `
        <h2>Painel do turno</h2>
        <p>Bem-vindo, ${escapar(user.nome)}.</p>
        <ul class="cartoes">
          <li><strong>${db.turmas.length}</strong> turmas</li>
          <li><strong>${db.alunos.length}</strong> alunos</li>
          <li><strong>${db.ocorrencias.length}</strong> ocorrências</li>
          <li><strong>${db.medidas.filter((m) => !m.cumprida).length}</strong> medidas por cumprir</li>
        </ul>
        <p><a class="botao" href="/ocorrencias/nova">Registar ocorrência</a></p>`;
      return enviar(res, 200, pagina(conteudo, { titulo: 'Painel', user, erro }));
    }

    if (rota === '/turmas' && metodo === 'GET') {
      const user = autorizado(req, res);
      if (!user) return;
      const linhas = db.turmas.map((t) => [
        `<a href="/turmas/${escapar(t.id)}">${escapar(t.nome)}</a>`,
        escapar(dados.encontrar(db.turnos, t.turnoId)?.nome || '—'),
        escapar(dados.encontrar(db.cursos, t.cursoId)?.nome || '—'),
        String(db.alunos.filter((a) => a.turmaId === t.id).length),
      ]);
      const formulario = PERFIS[user.perfil].escrever
        ? `<h3>Nova turma</h3><form method="post" action="/turmas" class="cartao">
            <div><label for="nome">Nome da turma</label><input id="nome" name="nome" required></div>
            <div><label for="turnoId">Turno</label><select id="turnoId" name="turnoId">${opcoesSelect(db.turnos)}</select></div>
            <div><label for="cursoId">Curso</label><select id="cursoId" name="cursoId">${opcoesSelect(db.cursos)}</select></div>
            <div><label for="classeId">Classe</label><select id="classeId" name="classeId">${opcoesSelect(db.classes)}</select></div>
            <button type="submit">Criar turma</button>
          </form>`
        : '';
      return enviar(res, 200, pagina(`<h2>Turmas</h2>${formulario}${tabela(['Turma', 'Turno', 'Curso', 'Alunos'], linhas, 'Turmas registadas')}`, { titulo: 'Turmas', user, erro }));
    }

    if (rota === '/turmas' && metodo === 'POST') {
      const user = autorizado(req, res, 'escrever');
      if (!user) return;
      const corpo = await lerCorpo(req);
      const nome = (corpo.get('nome') || '').trim();
      if (!nome) return redirecionar(res, '/turmas?erro=' + encodeURIComponent('O nome da turma é obrigatório.'));
      db.turmas.push({
        id: dados.novoId(db.turmas, 'tur'),
        nome,
        turnoId: corpo.get('turnoId'),
        cursoId: corpo.get('cursoId'),
        classeId: corpo.get('classeId'),
      });
      persistir();
      return redirecionar(res, '/turmas');
    }

    const detalheTurma = rota.match(/^\/turmas\/(tur\d+)$/);
    if (detalheTurma && metodo === 'GET') {
      const user = autorizado(req, res);
      if (!user) return;
      const turma = dados.encontrar(db.turmas, detalheTurma[1]);
      if (!turma) return enviar(res, 404, pagina('<h1>Turma não encontrada</h1>', { user }));
      const alunos = db.alunos.filter((a) => a.turmaId === turma.id).map((a) => [
        `<a href="/alunos/${escapar(a.id)}">${escapar(a.nome)}</a>`,
        escapar(a.numero),
        escapar(a.contacto),
      ]);
      return enviar(res, 200, pagina(`<h2>Turma ${escapar(turma.nome)}</h2>
        <p>Turno: ${escapar(dados.encontrar(db.turnos, turma.turnoId)?.nome || '—')} · Curso: ${escapar(dados.encontrar(db.cursos, turma.cursoId)?.nome || '—')}</p>
        ${tabela(['Aluno', 'N.º', 'Contacto'], alunos, `Alunos de ${turma.nome}`)}
        <p><a href="/alunos">Ver todos os alunos</a></p>`, { titulo: turma.nome, user, erro }));
    }

    if (rota === '/alunos' && metodo === 'GET') {
      const user = autorizado(req, res);
      if (!user) return;
      const linhas = db.alunos.map((a) => [
        `<a href="/alunos/${escapar(a.id)}">${escapar(a.nome)}</a>`,
        escapar(a.numero),
        escapar(nomeTurma(a.turmaId)),
        escapar(a.contacto),
      ]);
      const formulario = PERFIS[user.perfil].escrever
        ? `<h3>Novo aluno</h3><form method="post" action="/alunos" class="cartao">
            <div><label for="nome">Nome (fictício)</label><input id="nome" name="nome" required></div>
            <div><label for="numero">Número</label><input id="numero" name="numero" required></div>
            <div><label for="turmaId">Turma</label><select id="turmaId" name="turmaId">${opcoesSelect(db.turmas)}</select></div>
            <div><label for="contacto">Contacto</label><input id="contacto" name="contacto" type="tel"></div>
            <button type="submit">Registar aluno</button>
          </form>`
        : '';
      return enviar(res, 200, pagina(`<h2>Alunos</h2>${formulario}${tabela(['Aluno', 'Número', 'Turma', 'Contacto'], linhas, 'Alunos registados')}`, { titulo: 'Alunos', user, erro }));
    }

    if (rota === '/alunos' && metodo === 'POST') {
      const user = autorizado(req, res, 'escrever');
      if (!user) return;
      const corpo = await lerCorpo(req);
      const nome = (corpo.get('nome') || '').trim();
      const numero = (corpo.get('numero') || '').trim();
      if (!nome || !numero) return redirecionar(res, '/alunos?erro=' + encodeURIComponent('Nome e número são obrigatórios.'));
      db.alunos.push({
        id: dados.novoId(db.alunos, 'a'),
        nome, numero,
        turmaId: corpo.get('turmaId'),
        contacto: corpo.get('contacto') || '',
      });
      persistir();
      return redirecionar(res, '/alunos');
    }

    const detalheAluno = rota.match(/^\/alunos\/(a\d+)$/);
    if (detalheAluno && metodo === 'GET') {
      const user = autorizado(req, res);
      if (!user) return;
      const aluno = dados.encontrar(db.alunos, detalheAluno[1]);
      if (!aluno) return enviar(res, 404, pagina('<h1>Aluno não encontrado</h1>', { user }));
      const ocorrencias = db.ocorrencias.filter((o) => o.alunoIds.includes(aluno.id)).map((o) => [
        escapar(o.data),
        `<a href="/ocorrencias/${escapar(o.id)}">${escapar(o.titulo)}</a>`,
        escapar(o.descricao),
      ]);
      const medidas = db.medidas.filter((m) => m.alunoId === aluno.id).map((m) => [
        escapar(m.prazo),
        escapar(m.descricao),
        m.cumprida ? 'Cumprida' : 'Por cumprir',
      ]);
      const encarregados = db.encarregados.filter((e) => e.alunoId === aluno.id).map((e) => [
        escapar(e.nome), escapar(e.parentesco), escapar(e.contacto),
      ]);
      return enviar(res, 200, pagina(`<h2>Histórico de ${escapar(aluno.nome)}</h2>
        <p>Número: ${escapar(aluno.numero)} · Turma: ${escapar(nomeTurma(aluno.turmaId))}</p>
        <h3>Ocorrências</h3>${tabela(['Data', 'Título', 'Descrição'], ocorrencias, 'Ocorrências do aluno')}
        <h3>Medidas aplicadas</h3>${tabela(['Prazo', 'Medida', 'Estado'], medidas, 'Medidas do aluno')}
        <h3>Encarregados de educação</h3>${tabela(['Nome', 'Parentesco', 'Contacto'], encarregados, 'Encarregados registados')}`, { titulo: `Histórico de ${aluno.nome}`, user, erro }));
    }

    if (rota === '/ocorrencias' && metodo === 'GET') {
      const user = autorizado(req, res);
      if (!user) return;
      const linhas = db.ocorrencias.map((o) => [
        `<a href="/ocorrencias/${escapar(o.id)}">${escapar(o.titulo)}</a>`,
        escapar(o.data),
        escapar(o.gravidade),
        String(o.alunoIds.length),
        escapar(o.descricao),
      ]);
      return enviar(res, 200, pagina(`<h2>Ocorrências</h2>
        <p><a class="botao" href="/ocorrencias/nova">Nova ocorrência</a></p>
        ${tabela(['Título', 'Data', 'Gravidade', 'Alunos', 'Descrição'], linhas, 'Ocorrências registadas')}`, { titulo: 'Ocorrências', user, erro }));
    }

    if (rota === '/ocorrencias/nova' && metodo === 'GET') {
      const user = autorizado(req, res, 'escrever');
      if (!user) return;
      const checkboxes = db.alunos.map((a) => `<li><label><input type="checkbox" name="alunoIds" value="${escapar(a.id)}"> ${escapar(a.nome)} (${escapar(nomeTurma(a.turmaId))})</label></li>`).join('');
      return enviar(res, 200, pagina(`<h2>Nova ocorrência</h2>
        <form method="post" action="/ocorrencias" class="cartao">
          <div><label for="titulo">Título</label><input id="titulo" name="titulo" required></div>
          <div><label for="data">Data</label><input id="data" name="data" type="date" value="2026-11-27" required></div>
          <div><label for="gravidade">Gravidade</label><select id="gravidade" name="gravidade"><option>Baixa</option><option selected>Média</option><option>Alta</option></select></div>
          <div><label for="descricao">Descrição detalhada</label><textarea id="descricao" name="descricao" rows="4" required></textarea></div>
          <fieldset><legend>Alunos envolvidos (selecionar um ou vários)</legend><ul class="lista-alunos">${checkboxes}</ul></fieldset>
          <div><label for="testemunhas">Testemunhas</label><input id="testemunhas" name="testemunhas"></div>
          <div><label for="intervenientes">Intervenientes</label><input id="intervenientes" name="intervenientes"></div>
          <button type="submit">Registar ocorrência</button>
        </form>`, { titulo: 'Nova ocorrência', user, erro }));
    }

    if (rota === '/ocorrencias' && metodo === 'POST') {
      const user = autorizado(req, res, 'escrever');
      if (!user) return;
      const corpo = await lerCorpo(req);
      const titulo = (corpo.get('titulo') || '').trim();
      const descricao = (corpo.get('descricao') || '').trim();
      const alunoIds = corpo.getAll('alunoIds');
      if (!titulo || !descricao || alunoIds.length === 0) {
        return redirecionar(res, '/ocorrencias/nova?erro=' + encodeURIComponent('Preencha o título, a descrição e selecione pelo menos um aluno.'));
      }
      const ocorrencia = {
        id: dados.novoId(db.ocorrencias, 'o'),
        titulo, descricao,
        data: corpo.get('data') || '2026-11-27',
        gravidade: corpo.get('gravidade') || 'Média',
        alunoIds,
        testemunhas: corpo.get('testemunhas') || '',
        intervenientes: corpo.get('intervenientes') || '',
        registadoPor: user.username,
      };
      db.ocorrencias.push(ocorrencia);
      persistir();
      return redirecionar(res, `/ocorrencias/${ocorrencia.id}`);
    }

    const detalheOcorrencia = rota.match(/^\/ocorrencias\/(o\d+)$/);
    if (detalheOcorrencia && metodo === 'GET') {
      const user = autorizado(req, res);
      if (!user) return;
      const o = dados.encontrar(db.ocorrencias, detalheOcorrencia[1]);
      if (!o) return enviar(res, 404, pagina('<h1>Ocorrência não encontrada</h1>', { user }));
      const medidas = db.medidas.filter((m) => m.ocorrenciaId === o.id).map((m) => [
        escapar(nomeAluno(m.alunoId)),
        escapar(m.descricao),
        escapar(m.prazo),
        m.cumprida
          ? '<span class="estado-ok">Cumprida</span>'
          : `<form method="post" action="/medidas/${escapar(m.id)}/cumprir" class="inline"><button type="submit">Marcar como cumprida</button></form>`,
      ]);
      const formMedida = PERFIS[user.perfil].escrever
        ? `<h3>Registar medida</h3><form method="post" action="/ocorrencias/${escapar(o.id)}/medidas" class="cartao">
            <div><label for="alunoId">Aluno</label><select id="alunoId" name="alunoId">${o.alunoIds.map((id) => `<option value="${escapar(id)}">${escapar(nomeAluno(id))}</option>`).join('')}</select></div>
            <div><label for="descricao">Medida/decisão</label><textarea id="descricao" name="descricao" rows="3" required></textarea></div>
            <div><label for="prazo">Prazo</label><input id="prazo" name="prazo" type="date" required></div>
            <button type="submit">Registar medida</button>
          </form>`
        : '';
      return enviar(res, 200, pagina(`<h2>${escapar(o.titulo)}</h2>
        <p><strong>Data:</strong> ${escapar(o.data)} · <strong>Gravidade:</strong> ${escapar(o.gravidade)}</p>
        <p><strong>Alunos envolvidos:</strong> ${o.alunoIds.map((id) => escapar(nomeAluno(id))).join(', ')}</p>
        <p><strong>Testemunhas:</strong> ${escapar(o.testemunhas || '—')}</p>
        <p><strong>Intervenientes:</strong> ${escapar(o.intervenientes || '—')}</p>
        <p><strong>Descrição:</strong> ${escapar(o.descricao)}</p>
        <h3>Medidas aplicadas</h3>${tabela(['Aluno', 'Medida', 'Prazo', 'Estado'], medidas, 'Medidas desta ocorrência')}
        ${formMedida}`, { titulo: o.titulo, user, erro }));
    }

    const criarMedida = rota.match(/^\/ocorrencias\/(o\d+)\/medidas$/);
    if (criarMedida && metodo === 'POST') {
      const user = autorizado(req, res, 'escrever');
      if (!user) return;
      const corpo = await lerCorpo(req);
      const descricao = (corpo.get('descricao') || '').trim();
      if (!descricao || !corpo.get('prazo')) {
        return redirecionar(res, `/ocorrencias/${criarMedida[1]}?erro=${encodeURIComponent('A medida e o prazo são obrigatórios.')}`);
      }
      db.medidas.push({
        id: dados.novoId(db.medidas, 'm'),
        ocorrenciaId: criarMedida[1],
        alunoId: corpo.get('alunoId'),
        descricao,
        prazo: corpo.get('prazo'),
        cumprida: false,
      });
      persistir();
      return redirecionar(res, `/ocorrencias/${criarMedida[1]}`);
    }

    const cumprirMedida = rota.match(/^\/medidas\/(m\d+)\/cumprir$/);
    if (cumprirMedida && metodo === 'POST') {
      const user = autorizado(req, res, 'escrever');
      if (!user) return;
      const medida = dados.encontrar(db.medidas, cumprirMedida[1]);
      if (medida) {
        medida.cumprida = true;
        persistir();
      }
      return redirecionar(res, `/ocorrencias/${medida?.ocorrenciaId || ''}`);
    }

    if (rota === '/relatorios' && metodo === 'GET') {
      const user = autorizado(req, res);
      if (!user) return;
      const linhas = db.turmas.map((t) => {
        const alunosIds = db.alunos.filter((a) => a.turmaId === t.id).map((a) => a.id);
        const total = db.ocorrencias.filter((o) => o.alunoIds.some((id) => alunosIds.includes(id))).length;
        return [escapar(t.nome), String(alunosIds.length), String(total)];
      });
      const porCumprir = db.medidas.filter((m) => !m.cumprida).length;
      return enviar(res, 200, pagina(`<h2>Relatórios e indicadores</h2>
        <p>Ocorrências: ${db.ocorrencias.length} · Medidas por cumprir: ${porCumprir}</p>
        ${tabela(['Turma', 'Alunos', 'Ocorrências'], linhas, 'Resumo por turma')}`, { titulo: 'Relatórios', user, erro }));
    }

    if (rota === '/utilizadores' && metodo === 'GET') {
      const user = autorizado(req, res, 'gerir');
      if (!user) return;
      const linhas = db.utilizadores.map((u) => [escapar(u.nome), escapar(u.username), escapar(u.perfil)]);
      return enviar(res, 200, pagina(`<h2>Utilizadores e perfis</h2>
        ${tabela(['Nome', 'Utilizador', 'Perfil'], linhas, 'Contas de demonstração')}`, { titulo: 'Utilizadores', user, erro }));
    }

    return enviar(res, 404, pagina('<h1>Página não encontrada</h1><p><a href="/">Voltar ao painel</a></p>', { titulo: 'Não encontrado', user: utilizador(req) }));
  }

  const servidor = http.createServer((req, res) => {
    rotear(req, res).catch((erro) => {
      // eslint-disable-next-line no-console
      console.error(erro);
      if (!res.headersSent) enviar(res, 500, pagina('<h1>Erro interno</h1><p>Tente novamente mais tarde.</p>'));
      else res.end();
    });
  });

  servidor.obterBase = () => db;
  servidor.recarregar = () => { db = dados.carregar(ficheiroDados); };
  return servidor;
}

if (require.main === module) {
  const porta = Number(process.env.PORT || 3000);
  const servidor = criarServidor();
  servidor.listen(porta, () => {
    // eslint-disable-next-line no-console
    console.log(`Caderneta Digital a executar em http://localhost:${porta}`);
  });
}

module.exports = { criarServidor, escapar };
