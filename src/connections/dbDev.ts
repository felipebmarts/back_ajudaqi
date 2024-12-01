import { DataSource } from "typeorm";
import { Perfis } from "../models/perfis";
import { Usuarios } from "../models/usuarios";
import { Materias } from "../models/materias";
import { Duvidas } from "../models/duvidas"; // Importando a entidade Duvidas
import { Respostas } from "../models/respostas"; // Importando a entidade Respostas

export const DevDataSource = new DataSource({
    type: "postgres",
    host: "dpg-ct19l752ng1s73e50l9g-a.oregon-postgres.render.com",
    port: 5432,
    username: "ajudaqi_user",
    password: "ojCIwWnsDHijohii2tifTxfQsoxenwcM",
    database: "ajudaqi",
    extra: {
        ssl: {
            rejectUnauthorized: false, // Aceita certificados autoassinados
        },
        connectTimeoutMillis: 30000, // Define o timeout de conexão em 30 segundos
    },
    entities: [Perfis, Usuarios, Materias, Duvidas, Respostas], // Adicionando Respostas às entidades
});
