//importando o pacote
const mongoose = require('mongoose');
//definindo o "schema"
//note a semelhança com recursos de bases relacionais
const lembreteSchema = mongoose.Schema({
  nome: { type: String, required: true },
  fone: { type: String, required: false, default: '00000000' },
  datainicio: { type: String, required: true }
});
//criamos o modelo associado ao nome Cliente e exportamos
//tornando acessível para outros módulos da aplicação
module.exports = mongoose.model('Lembrete', lembreteSchema);
