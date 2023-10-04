// Incluir as bibliotecas
// Gerencia as requisições, rotas e URLs, entre outra funcionalidades
const express = require("express");
// Chamar a função express
const router = express.Router();
// Incluir o arquivo que possui a conexão com banco de dados
const db = require('./../db/models');

// Criar a rota listar 
// Endereço para acessar através da aplicação externa: http://localhost:8080/users?page=3
router.get("/users", async (req, res) => {

    // Receber o número da página, quando não é enviado o número da página é atribuido página 1
    const { page = 1 } = req.query;
    //console.log(page);

    // Limite de registros em cada página
    const limit = 10;

    // Variável com o número da última página
    var lastPage = 1;

    // Contar a quantidade de registro no banco de dados
    const countUser = await db.Users.count();
    //console.log(countUser);

    // Acessa o IF quando encontrar registro no banco de dados
    if (countUser !== 0) {
        // Calcular a última página
        lastPage = Math.ceil(countUser / limit);
        //console.log(lastPage);
    } else {
        // Pausar o processamento e retornar a mensagem de erro
        return res.status(400).json({
            mensagem: "Erro: Nenhum usuário encontrado!"
        });
    }

    //console.log((page * limit) - limit); // 3 * 10 - 10 = 20
    // Recuperar todos os usuário do banco de dados
    const users = await db.Users.findAll({

        // Indicar quais colunas recuperar
        attributes: ['id', 'name', 'email'],

        // Ordenar os registros pela coluna id na forma decrescente
        order: [['id', 'ASC']],

        // Calcular a partir de qual registro deve retornar e o limite de registros
        offset: Number((page * limit) - limit),
        limit: limit
    });

    // Acessa o IF se encontrar o registro no banco de dados
    if (users) {
        // Criar objeto com as informações para paginação
        var pagination = {
            // Caminho
            path: '/users',
            // Página atual
            page,
            // URL da página anterior
            prev_page_url: page - 1 >= 1 ? page - 1 : false,
            // URL da próxima página
            next_page_url: Number(page) + Number(1) > lastPage ? false : Number(page) + Number(1),
            // Última página
            lastPage,
            // Quantidade de registros
            total: countUser
        }

        // Pausar o processamento e retornar os dados em formato de objeto
        return res.json({
            users,
            pagination
        });
    } else {
        // Pausar o processamento e retornar a mensagem de erro
        return res.status(400).json({
            mensagem: "Erro: Nenhum usuário encontrado!"
        });
    }
});

// Criar a rota visualizar e receber o parâmentro id enviado na URL 
// Endereço para acessar através da aplicação externa: http://localhost:8080/users/7
router.get("/users/:id", async (req, res) => {

    // Receber o parâmetro enviado na URL
    const { id } = req.params;
    //console.log(id);

    // Recuperar o registro do banco de dados
    const user = await db.Users.findOne({
        // Indicar quais colunas recuperar
        attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],

        // Acrescentado condição para indicar qual registro deve ser retornado do banco de dados
        where: { id },
    });
    //console.log(user);

    // Acessa o IF se encontrar o registro no banco de dados
    if (user) {
        // Pausar o processamento e retornar os dados
        return res.json({
            user: user.dataValues
        });
    } else {
        // Pausar o processamento e retornar a mensagem de erro
        return res.status(400).json({
            mensagem: "Erro: Usuário não encontrado!"
        });
    }
});

// Criar a rota cadastrar
// Endereço para acessar através da aplicação externa: http://localhost:8080/users
/*
// A aplicação externa deve indicar que está enviado os dados em formato de objeto
Content-Type: application/json

// Dados em formato de objeto
{
    "name": "Cesar",
    "email": "cesar@celke.com.br"
}
*/
router.post("/users", async (req, res) => {

    // Receber os dados enviados no corpo da requisição
    var dados = req.body;
    //console.log(dados);

    // Salvar no banco de dados
    await db.Users.create(dados).then((dadosUsuario) => {
        // Pausar o processamento e retornar os dados em formato de objeto
        return res.json({
            mensagem: "Usuário cadastrado com sucesso!",
            dadosUsuario
        });
    }).catch(() => {
        // Pausar o processamento e retornar a mensagem de erro
        return res.status(400).json({
            mensagem: "Erro: Usuário não cadastrado com sucesso!"
        });
    });
});

// Criar a rota editar 

// Endereço para acessar através da aplicação externa: http://localhost:8080/users

/*
// A aplicação externa deve indicar que está enviado os dados em formato de objeto
Content-Type: application/json

// Dados em formato de objeto
{
    "id": 2,
    "name": "Cesar 2a",
    "email": "cesar2a@celke.com.br"
}
*/
router.put("/users", async (req, res) => {

    // Receber os dados enviados no corpo da requisição
    var dados = req.body;

    // Editar no banco de dados
    await db.Users.update(dados, { where: { id: dados.id } })
        .then(() => {
            // Pausar o processamento e retornar a mensagem
            return res.json({
                mensagem: "Usuário editado com sucesso!"
            });
        }).catch(() => {
            // Pausar o processamento e retornar a mensagem
            return res.status(400).json({
                mensagem: "Erro: Usuário não editado com sucesso!"
            });
        });
});

// Criar a rota apagar e receber o parâmentro id enviado na URL 
// Endereço para acessar através da aplicação externa: http://localhost:8080/users/3
router.delete("/users/:id", async (req, res) => {

    // Receber o parâmetro enviado na URL
    const { id } = req.params;

    // Apagar usuário no banco de dados utilizando a MODELS users
    await db.Users.destroy({
        // Acrescentar o WHERE na instrução SQL indicando qual registro excluir no BD
        where: {id} 
    }).then(() => {
        // Pausar o processamento e retornar a mensagem
        return res.json({
            mensagem: "Usuário apagado com sucesso!"
        });
    }).catch(() => {
        // Pausar o processamento e retornar a mensagem
        return res.status(400).json({
            mensagem: "Erro: Usuário não apagado com sucesso!"
        });
    });
});

// Exportar a instrução que está dentro da constante router 
module.exports = router;