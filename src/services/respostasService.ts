import { DevDataSource } from "../connections/dbDev";
import { Respostas } from "../models/respostas";

const cursor = DevDataSource.getRepository(Respostas); // Conecta-se à tabela "respostas"

// Interfaces para tipagem dos dados
type NewRespostaRequest = {
  descricaoresposta: string;
  fkusuario: string;
  fkduvida: string;
};

type FindRespostaRequest = {
  idresposta: string;
};

type UpdateRespostaRequest = {
  idresposta: string;
  descricaoresposta?: string;
  fkusuario?: string;
  fkduvida?: string;
};

type ServiceResponse<T> = T | { error: string };

// Classe do Service
export class RespostasService {
  // Método para criar uma nova resposta
  async createResposta({
    descricaoresposta,
    fkusuario,
    fkduvida,
  }: NewRespostaRequest): Promise<ServiceResponse<Respostas>> {
    try {
      // Criação da nova resposta usando o método create do repositório
      const resposta = cursor.create({
        descricaoresposta,
        fkusuario,
        fkduvida,
      });

      await cursor.save(resposta); // Salva a nova resposta na tabela
      return resposta; // Retorna a resposta recém-criada
    } catch (err) {
      console.error("Unexpected error while saving answer:", err); // Log dos detalhes do erro
      return { error: "Unexpected error while saving answer." };
    }
  }

  // Método para encontrar uma resposta por ID
  async readOneResposta({ idresposta }: FindRespostaRequest): Promise<ServiceResponse<Respostas>> {
    try {
      const resposta = await cursor.findOne({ where: { idresposta } });

      if (!resposta) {
        return { error: "Answer not found." };
      }

      return resposta; // Retorna a resposta encontrada
    } catch (err) {
      console.error("Unexpected error while fetching answer:", err); // Log dos detalhes do erro
      return { error: "Unexpected error while fetching answer." };
    }
  }

  // Método para encontrar todas as respostas
  async readAllRespostas(): Promise<ServiceResponse<Respostas[]>> {
    try {
      const respostas = await cursor.find(); // Encontra todas as respostas
      return respostas;
    } catch (err) {
      console.error("Unexpected error while fetching answers:", err); // Log dos detalhes do erro
      return { error: "Unexpected error while fetching answers." };
    }
  }

  // Método para atualizar uma resposta
  async updateResposta({
    idresposta,
    descricaoresposta,
    fkusuario,
    fkduvida,
  }: UpdateRespostaRequest): Promise<ServiceResponse<Respostas>> {
    try {
      const resposta = await cursor.findOne({ where: { idresposta } });

      if (!resposta) {
        return { error: "Answer not found." };
      }

      // Atualiza os campos da resposta
      resposta.descricaoresposta = descricaoresposta ?? resposta.descricaoresposta;
      resposta.fkusuario = fkusuario ?? resposta.fkusuario;
      resposta.fkduvida = fkduvida ?? resposta.fkduvida;

      await cursor.save(resposta); // Salva as alterações no banco

      return resposta; // Retorna a resposta atualizada
    } catch (err) {
      console.error("Unexpected error while updating answer:", err); // Log dos detalhes do erro
      return { error: "Unexpected error while updating answer." };
    }
  }

  // Método para deletar uma resposta
  async deleteResposta({ idresposta }: FindRespostaRequest): Promise<ServiceResponse<string>> {
    try {
      const resposta = await cursor.findOne({ where: { idresposta } });

      if (!resposta) {
        return { error: "Answer not found." };
      }

      await cursor.delete(resposta.idresposta); // Deleta a resposta da tabela
      return "Answer removed successfully!";
    } catch (err) {
      console.error("Unexpected error while deleting answer:", err); // Log dos detalhes do erro
      return { error: "Unexpected error while deleting answer." };
    }
  }
}
