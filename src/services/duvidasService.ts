import { DevDataSource } from "../connections/dbDev";
import { Duvidas } from "../models/duvidas";
import { Usuarios } from "../models/usuarios";  // Importando a tabela Usuarios
import { Materias } from "../models/materias";  // Importando a tabela Materias

const cursor = DevDataSource.getRepository(Duvidas); // Conecta-se à tabela "duvidas"

// Interfaces para tipagem dos dados
type NewDuvidaRequest = {
  descricao?: string;
  avaliacao?: string;
  fkusuario?: string;
  fkmateria?: string;
};

type FindDuvidaRequest = {
  idduvida: string;
};

type UpdateDuvidaRequest = {
  idduvida: string;
  descricao?: string;
  avaliacao?: string;
  fkusuario?: string;
  fkmateria?: string;
};

type ServiceResponse<T> = T | { error: string };

// Classe do Service
export class DuvidasService {

  // Método para criar uma nova dúvida
  async createDuvida({
    descricao,
    avaliacao,
    fkusuario,
    fkmateria
  }: NewDuvidaRequest): Promise<ServiceResponse<Duvidas>> {
    try {
      // Verificação de usuário e matéria
      const usuario = fkusuario ? await DevDataSource.getRepository(Usuarios).findOne({ where: { matricula: fkusuario } }) : null;
      const materia = fkmateria ? await DevDataSource.getRepository(Materias).findOne({ where: { idmateria: fkmateria } }) : null;

      if (fkusuario && !usuario) {
        return { error: "Usuario não encontrado" };
      }
      if (fkmateria && !materia) {
        return { error: "Materia não encontrada" };
      }

      // Criação da nova dúvida usando o método create do repositório
      const duvida = cursor.create({
        descricao,
        avaliacao,
        fkusuario,
        fkmateria
      });

      await cursor.save(duvida); // Salva a nova dúvida na tabela
      return duvida; // Retorna a dúvida recém-criada
    } catch (err) {
      console.error("Error details:", err); // Log dos detalhes do erro
      return { error: "Erro inesperado ao salvar a dúvida." };
    }
  }

  // Método para encontrar uma dúvida por ID
  async readOneDuvida({ idduvida }: FindDuvidaRequest): Promise<ServiceResponse<Duvidas>> {
    try {
      const duvida = await cursor.findOne({ where: { idduvida }, relations: ["usuario", "materia"] });

      if (!duvida) {
        return { error: "Dúvida não encontrada." };
      }

      return duvida; // Retorna a dúvida encontrada
    } catch (err) {
      console.error("Error details:", err); // Log dos detalhes do erro
      return { error: "Erro inesperado ao buscar a dúvida." };
    }
  }

  // Método para encontrar todas as dúvidas
  async readAllDuvidas(): Promise<ServiceResponse<Duvidas[]>> {
    try {
      const duvidas = await cursor.find({ relations: ["usuario", "materia"] }); // Encontra todas as dúvidas, incluindo os relacionamentos

      return duvidas;
    } catch (err) {
      console.error("Error details:", err); // Log dos detalhes do erro
      return { error: "Erro inesperado ao buscar as dúvidas." };
    }
  }

  // Método para atualizar uma dúvida
  async updateDuvida({
    idduvida,
    descricao,
    avaliacao,
    fkusuario,
    fkmateria
  }: UpdateDuvidaRequest): Promise<ServiceResponse<Duvidas>> {
    try {
      const duvida = await cursor.findOne({ where: { idduvida }, relations: ["usuario", "materia"] });

      if (!duvida) {
        return { error: "Dúvida não encontrada." };
      }

      // Verifica se o usuário e a matéria existem, se forem fornecidos
      if (fkusuario) {
        const usuario = await DevDataSource.getRepository(Usuarios).findOne({ where: { matricula: fkusuario } });
        if (!usuario) {
          return { error: "Usuário não encontrado." };
        }
        duvida.fkusuario = fkusuario;
      }

      if (fkmateria) {
        const materia = await DevDataSource.getRepository(Materias).findOne({ where: { idmateria: fkmateria } });
        if (!materia) {
          return { error: "Matéria não encontrada." };
        }
        duvida.fkmateria = fkmateria;
      }

      // Atualiza os campos da dúvida
      duvida.descricao = descricao ? descricao : duvida.descricao;
      duvida.avaliacao = avaliacao ? avaliacao : duvida.avaliacao;

      await cursor.save(duvida); // Salva as alterações no banco

      return duvida; // Retorna a dúvida atualizada
    } catch (err) {
      console.error("Error details:", err); // Log dos detalhes do erro
      return { error: "Erro inesperado ao atualizar a dúvida." };
    }
  }

  // Método para deletar uma dúvida
  async deleteDuvida({ idduvida }: FindDuvidaRequest): Promise<ServiceResponse<string>> {
    try {
      const duvida = await cursor.findOne({ where: { idduvida } });

      if (!duvida) {
        return { error: "Dúvida não encontrada." };
      }

      await cursor.delete(duvida.idduvida); // Deleta a dúvida da tabela
      return { error: "" }; // Retorna sucesso
    } catch (err) {
      console.error("Error details:", err); // Log dos detalhes do erro
      return { error: "Erro inesperado ao deletar a dúvida." };
    }
  }
}
