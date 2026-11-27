'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { hashPassword } = require('./auth');

/**
 * Base de dados em ficheiro JSON.
 * Todos os dados de demonstração são fictícios (Lei n.º 22/11).
 */
function criarBase() {
  return {
    utilizadores: [],
    turnos: [
      { id: 't1', nome: 'Manhã' },
      { id: 't2', nome: 'Tarde' },
    ],
    cursos: [
      { id: 'c1', nome: 'Eletromecânica' },
      { id: 'c2', nome: 'Informática' },
    ],
    classes: [
      { id: 'cl1', nome: '10.º' },
      { id: 'cl2', nome: '11.º' },
    ],
    turmas: [
      { id: 'tur1', nome: '10.º A', turnoId: 't1', cursoId: 'c1', classeId: 'cl1' },
      { id: 'tur2', nome: '11.º B', turnoId: 't2', cursoId: 'c2', classeId: 'cl2' },
    ],
    alunos: [
      { id: 'a1', nome: 'Ana Silva (fictícia)', numero: '2026001', turmaId: 'tur1', contacto: '900000001' },
      { id: 'a2', nome: 'Bruno Costa (fictício)', numero: '2026002', turmaId: 'tur2', contacto: '900000002' },
      { id: 'a3', nome: 'Carla Nunes (fictícia)', numero: '2026003', turmaId: 'tur1', contacto: '900000003' },
    ],
    encarregados: [
      { id: 'e1', nome: 'Maria Fictícia', alunoId: 'a1', parentesco: 'Mãe', contacto: '910000001' },
    ],
    ocorrencias: [
      {
        id: 'o1',
        titulo: 'Discussão no intervalo',
        descricao: 'Três alunos discutiram no pátio; um professor e um funcionário testemunharam.',
        data: '2026-11-24',
        gravidade: 'Média',
        alunoIds: ['a1', 'a2'],
        testemunhas: 'Professor João Fictício; Funcionário Paulo Fictício',
        intervenientes: 'Coordenador de turno (fictício)',
        registadoPor: 'coord',
      },
    ],
    medidas: [
      {
        id: 'm1',
        ocorrenciaId: 'o1',
        alunoId: 'a1',
        descricao: 'Pedido de desculpa por escrito e conversa de acompanhamento.',
        prazo: '2026-12-01',
        cumprida: false,
      },
    ],
    contactos: [],
    reunioes: [],
  };
}

function prepararUtilizadores(db) {
  const pessoas = [
    { username: 'coord', nome: 'Coordenador de Turno (fictício)', perfil: 'coordenador' },
    { username: 'direcao', nome: 'Direção (fictícia)', perfil: 'direcao' },
    { username: 'func', nome: 'Funcionário (fictício)', perfil: 'funcionario' },
  ];
  db.utilizadores = pessoas.map((p, i) => {
    const { salt, hash } = hashPassword('senha123');
    return { id: `u${i + 1}`, ...p, salt, hash };
  });
  return db;
}

function carregar(caminho) {
  if (fs.existsSync(caminho)) {
    return JSON.parse(fs.readFileSync(caminho, 'utf8'));
  }
  const db = prepararUtilizadores(criarBase());
  guardar(caminho, db);
  return db;
}

function guardar(caminho, db) {
  fs.mkdirSync(path.dirname(caminho), { recursive: true });
  const temporario = `${caminho}.tmp`;
  fs.writeFileSync(temporario, JSON.stringify(db, null, 2), 'utf8');
  fs.renameSync(temporario, caminho);
}

function novoId(lista, prefixo) {
  const numeros = lista
    .map((item) => Number(String(item.id).replace(prefixo, '')))
    .filter(Number.isFinite);
  const proximo = numeros.length ? Math.max(...numeros) + 1 : 1;
  return `${prefixo}${proximo}`;
}

function encontrar(lista, id) {
  return lista.find((item) => item.id === id);
}

module.exports = { carregar, guardar, criarBase, prepararUtilizadores, novoId, encontrar };
