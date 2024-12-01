import { DevDataSource } from "../connections/dbDev";
import { Usuarios } from "../models/usuarios";

const cursor = DevDataSource.getRepository(Usuarios); // Conecta-se à tabela "usuarios"

// Interfaces para tipagem dos dados
type newUsuarioRequest = {
  matricula: string;
  nome: string;
  cpf: string;
  senha: string;
  email: string;
  fkperfil?: string; // Opcional, pois fkperfil pode ser nulo
};

type findUsuarioRequest = {
  matricula: string;
};

type updateUsuarioRequest = {
  matricula: string;
  nome: string;
  cpf: string;
  senha: string;
  email: string;
  fkperfil?: string; // Opcional
};

export class UsuariosService {
  // Método para criar um novo usuário
  async createUsuario({
    matricula,
    nome,
    cpf,
    senha,
    email,
    fkperfil,
  }: newUsuarioRequest): Promise<Usuarios | Error> {
    try {
      const usuario = cursor.create({
        matricula,
        nome,
        cpf,
        senha,
        email,
        fkperfil,
      });

      await cursor.save(usuario); // Salva o novo usuário na tabela
      return usuario; // Retorna o usuário recém-criado
    } catch (err) {
      return new Error("Unexpected error while saving user.");
    }
  }

  // Método para encontrar um usuário por matrícula
  async readOneUsuario({ matricula }: findUsuarioRequest): Promise<Usuarios | Error> {
    try {
      const usuario = await cursor.findOne({ where: { matricula } });

      if (!usuario) {
        return new Error("User not found.");
      }

      return usuario; // Retorna o usuário encontrado
    } catch (err) {
      return new Error("Unexpected error while fetching user.");
    }
  }

  // Método para encontrar todos os usuários
  async readAllUsuarios(): Promise<Usuarios[] | Error> {
    try {
      const usuarios = await cursor.find(); // Encontra todos os usuários
      return usuarios;
    } catch (err) {
      return new Error("Unexpected error while fetching users.");
    }
  }

  // Método para atualizar um usuário
  async updateUsuario({
    matricula,
    nome,
    cpf,
    senha,
    email,
    fkperfil,
  }: updateUsuarioRequest): Promise<Usuarios | Error> {
    try {
      const usuario = await cursor.findOne({ where: { matricula } });

      if (!usuario) {
        return new Error("User not found.");
      }

      // Atualiza os campos do usuário
      usuario.nome = nome ? nome : usuario.nome;
      usuario.cpf = cpf ? cpf : usuario.cpf;
      usuario.senha = senha ? senha : usuario.senha;
      usuario.email = email ? email : usuario.email;
      usuario.fkperfil = fkperfil ? fkperfil : usuario.fkperfil;

      await cursor.save(usuario); // Salva as alterações no banco

      return usuario; // Retorna o usuário atualizado
    } catch (err) {
      return new Error("Unexpected error while updating user.");
    }
  }

  // Método para deletar um usuário
  async deleteUsuario({ matricula }: findUsuarioRequest): Promise<string | Error> {
    try {
      const usuario = await cursor.findOne({ where: { matricula } });

      if (!usuario) {
        return new Error("User not found.");
      }

      await cursor.delete(usuario.matricula); // Deleta o usuário da tabela
      return "User removed successfully!";
    } catch (err) {
      return new Error("Unexpected error while deleting user.");
    }
  }
}
