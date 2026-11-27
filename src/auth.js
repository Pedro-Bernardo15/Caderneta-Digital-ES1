'use strict';

const crypto = require('node:crypto');

/** Hash de palavra-passe com scrypt e salt aleatório. */
function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(String(password), salt, 64).toString('hex');
  return { salt, hash };
}

/** Verificação em tempo constante. */
function verificarPassword(password, salt, hashEsperado) {
  const { hash } = hashPassword(password, salt);
  const a = Buffer.from(hash, 'hex');
  const b = Buffer.from(hashEsperado, 'hex');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/** Sessões em memória; em produção devem ser persistidas ou assinadas com chave secreta. */
function criarSessoes() {
  const sessoes = new Map();
  return {
    criar(userId) {
      const token = crypto.randomBytes(32).toString('hex');
      sessoes.set(token, { userId, criadaEm: Date.now() });
      return token;
    },
    obter(token) {
      return token ? sessoes.get(token) || null : null;
    },
    remover(token) {
      if (token) sessoes.delete(token);
    },
  };
}

function cookieSession(request, nome = 'caderneta_session') {
  const cabecalho = request.headers.cookie || '';
  for (const parte of cabecalho.split(';')) {
    const [chave, valor] = parte.trim().split('=');
    if (chave === nome) return valor;
  }
  return null;
}

module.exports = { hashPassword, verificarPassword, criarSessoes, cookieSession };
