const express = require("express");
const router = express.Router();
const db = require('./../db/models');


router.get("/cadastros", async (req, res) => {

    const { page = 1 } = req.query;

    const limit = 10;

    var lastPage = 1;

    const countUser = await db.Cadastros.count();

    if (countUser !== 0) {
        lastPage = Math.ceil(countUser / limit);
    } else {
        return res.status(400).json({
            mensagem: "Erro: Nenhum usuário encontrado!"
        });
    }

    const users = await db.Cadastros.findAll({

        attributes: ['id', 'type', 'rg', 'name', 'empresa', 'apt', 'bloco', 'dataEntrada', 'veiculo', 'placa'],

        order: [['id', 'ASC']],

        offset: Number((page * limit) - limit),
        limit: limit
    });

    if (users) {
        var pagination = {
            path: '/cadastros',
            page,

            prev_page_url: page - 1 >= 1 ? page - 1 : false,
            next_page_url: Number(page) + Number(1) > lastPage ? false : Number(page) + Number(1),
            lastPage,
            total: countUser
        }

        return res.json({
            cadastros,
            pagination
        });
    } else {
        return res.status(400).json({
            mensagem: "Erro: Nenhum usuário encontrado!"
        });
    }
});

router.get("/cadastros/:id", async (req, res) => {

    const { id } = req.params;
    //console.log(id);

    const user = await db.Cadastros.findOne({
        attributes: ['id', 'type', 'rg', 'name', 'empresa', 'apt', 'bloco', 'dataEntrada', 'veiculo', 'placa', 'createdAt', 'updatedAt'],

        where: { id },
    });
    //console.log(user);

    if (user) {
        return res.json({
            user: user.dataValues
        });
    } else {
        return res.status(400).json({
            mensagem: "Erro: Usuário não encontrado!"
        });
    }
});


router.post("/cadastros", async (req, res) => {

    var dados = req.body;
    //console.log(dados);

    await db.Cadastros.create(dados).then((dadosUsuario) => {
        return res.json({
            mensagem: "Usuário cadastrado com sucesso!",
            dadosUsuario
        });
    }).catch(() => {
        return res.status(400).json({
            mensagem: "Erro: Usuário não cadastrado com sucesso!"
        });
    });
});

router.put("/cadastros", async (req, res) => {

    var dados = req.body;

    await db.Cadastros.update(dados, { where: { id: dados.id } })
        .then(() => {
            return res.json({
                mensagem: "Usuário editado com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                mensagem: "Erro: Usuário não editado com sucesso!"
            });
        });
});

router.delete("/cadastros/:id", async (req, res) => {

    const { id } = req.params;

    await db.Cadastros.destroy({
        where: {id} 
    }).then(() => {
        return res.json({
            mensagem: "Usuário apagado com sucesso!"
        });
    }).catch(() => {
        return res.status(400).json({
            mensagem: "Erro: Usuário não apagado com sucesso!"
        });
    });
});

module.exports = router;