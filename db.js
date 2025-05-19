async function connect() {
        const { Pool } = require("pg");
    
        if(global.connection)
            return global.connection.connect();
    
        const pool = new Pool({
            user: process.env.USER_NAME,
            host: process.env.HOST_NAME,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            dialect: process.env.DB_DIALECT,
            port: process.env.PORT_NUMBER
        })
        
        const client = await pool.connect(); // Conectandooo
        console.log("Conexão pool foi criada com sucesso!!!")
    
        const resdb = await client.query("SELECT now()");
        console.log(resdb.rows[0]); // Tomando a primeira posição do array de onde virá o tempo do banco de dados.
        client.release()
    
      // Podemos salvar nosso pool em uma conexão global. Então podemos executar o "if" como no início deste arquivo
        global.connection = pool;
    
        return pool.connect()
    }
    
    connect(); // Lembrando/Lembrete: temos que carregar/importar o arquivo db.js no nosso back-end index.js.
    
    async function insertCustomer(costmer){
        //connecta
        const client = await connect();

        //consulta sql
        const sql = "INSERT INTO clientes (cpf, nome, email, idade, profissao) VALUES ($1, $2, $3, $4, $5)";

        const values =[costmer.cpf, costmer.nome, costmer.email, costmer.idade, costmer.profissao];
        
        //agora sim nos vamos enviar od dados para o banco de dados
        await client.query(sql, values);

    }
    //exportando cada função para que a gente consiga as usar no nosso bacend!!!
    module.exports = {
        insertCustomer
    }