const express = require ('express');
const app = express();
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');
const Lembrete = require('./models/lembrete');
mongoose.connect('mongodb+srv://user:user@cluster0.iud3g.mongodb.net/lembretes?retryWrites=true&w=majority')
.then(() =>  console.log ("Conexao OK")).catch(() => console.log ("Conexão Falhou"));
app.use(express.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT,  OPTIONS');
  next()
});


app.delete('/api/lembretes/:id', (req, res, next) => {
  Lembrete.deleteOne({ _id: req.params.id }).then((resultado) => {
    console.log(resultado);
    res.status(200).json({ mensagem: "Lembrete removido" });
  })
})


app.get('/api/lembretes', (req, res, next) => {
  Lembrete.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      mensagem: "Tudo OK",
      lembretes: documents
    });
  })
});

app.get('/api/lembretes/:id', (req, res, next) => {
  Lembrete.findById(req.params.id).then(cli => {
    if (cli) {
      res.status(200).json(cli);
    }
    else
      res.status(404).json({ mensagem: "Lembrete não encontrado!" })
  })
});


app.post('/api/lembretes', (req, res, next) => {
  const lembrete = new Lembrete({
    nome: req.body.nome,
    fone: req.body.fone,
    datainicio: req.body.datainicio
  })
  lembrete.save().then(lembreteInserido => {
    console.log(lembreteInserido);
    res.status(201).json({ mensagem: 'Lembrete inserido', id: lembreteInserido._id })
  });
});



app.put("/api/lembretes/:id", (req, res, next) => {
  const lembrete = new Lembrete({
    _id: req.params.id,
    nome: req.body.nome,
    fone: req.body.fone,
    datainicio: req.body.datainicio
  });
  Lembrete.updateOne({ _id: req.params.id }, lembrete)
    .then((resultado) => {
      console.log(resultado)
    });
  res.status(200).json({ mensagem: 'Atualização realizada com sucesso' })
});

module.exports = app

