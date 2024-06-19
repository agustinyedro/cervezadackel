const mysql = require('mysql2/promise');
/* https://www.clever-cloud.com */
const config = {
    host: 'databases.000webhost.com',
    user: 'id22295146_node4',
    password: 'Gruponode4.-',
    database: 'id22295146_node4',
    connectTimeout: 10000
};

async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection(config);
        console.log('Conexión exitosa a la base de datos');
        return connection;
    } catch (error) {
        console.error('Error al conectar a la base de datos:')
        throw error;
    }
}

module.exports = connectToDatabase;

class contactoModel {
    static async getAll({ genre }) {
        const conn = await connectToDatabase();
        const [result] = await conn.query(
            'SELECT id_consulta, nombre, email, telefono, motivo, mensage, medio FROM consulta;'
        );
        console.log(result);
        // return result
    }

    static async getById({ id }) { }

    static async create({ input }) { }

    static async delete({ id }) { }

    static async update({ id, input }) { }
}

module.exports = contactoModel;
