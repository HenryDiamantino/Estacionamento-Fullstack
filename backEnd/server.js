const express = require("express");
const cors = require("cors");
// O cons vai fazer o projeto aceitar requisições externas xomo chamar outro arquivo
const PORT = 3000
const app = express();
app.use(express.json());
app.use(cors());

let veiculos = [{
    id: 1, 
    placa: "ABC-1234", 
    modelo: "Seden",
    hora_entrada: new Date().toISOString(),
    pago: true
},
{
    id: 2, 
    placa: "DEF-5678", 
    modelo: "SUV",
    hora_entrada: new Date().toISOString(),
    pago: false
}];


app.get("/", (req, res) => {
    res.status(200).json({ msg: "Hello" })
});

app.get("/lerveiculos", (req, res) => {
    res.status(200).json(veiculos)
})

app.get("/lerveiculos/:id", (req, res) => {
    const id = Number(req.params.id);
    const carro = veiculos.find(veiculo => veiculo.id === Number(id))
    res.status(200).json(carro)
})

app.patch("/atualizarpagamento/:id", (req, res) => {
    const veiculo = veiculos.find(x => x.id === Number(req.params.id));
    console.log(veiculo)
    if (!veiculo) return res.status(404).json({ erro: "Não achei" })

    const { pago } = req.body;

    if (pago !== undefined) veiculo.pago = pago;

    res.json(veiculo)
})

app.delete("/deletarveiculo/:id", (req, res) => {
    const id = Number(req.params.id)
    const index = veiculos.findIndex(v => v.id === id)
    if (index === -1) return res.status(404).json({ erro: "Não achei" })
    veiculos.splice(index, 1)
    res.status(200).json({ msg: "Veículo deletado" })
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta:${PORT}`);
    console.log(`Acesse: http://localhost:3000`)
})