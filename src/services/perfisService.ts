import { DevDataSource } from "../connections/dbDev";
import { Perfis } from "../models/perfis";

// Cursor para a tabela perfis
const cursor = DevDataSource.getRepository(Perfis);

// Tipos para as operações
type NewPerfilRequest = {
  nomeperfil: string;
  postarduvida: boolean;
  responderduvida: boolean;
  avaliarresposta: boolean;
};

type FindPerfilRequest = {
  idperfil: string;
};

type UpdatePerfilRequest = {
  idperfil: string;
  nomeperfil?: string;
  postarduvida?: boolean;
  responderduvida?: boolean;
  avaliarresposta?: boolean;
};

export class PerfisService {
  // Criar um novo perfil
  async createPerfil({
    nomeperfil,
    postarduvida,
    responderduvida,
    avaliarresposta,
  }: NewPerfilRequest): Promise<Perfis | Error> {
    try {
      // Inicializa um novo perfil com o construtor
      const perfil = new Perfis();
      perfil.nomeperfil = nomeperfil;
      perfil.postarduvida = postarduvida !== undefined ? postarduvida : perfil.postarduvida;
      perfil.responderduvida = responderduvida !== undefined ? responderduvida : perfil.responderduvida;
      perfil.avaliarresposta = avaliarresposta !== undefined ? avaliarresposta : perfil.avaliarresposta;

      await cursor.save(perfil); // Salva o novo perfil na tabela
      return perfil; // Retorna o perfil recém-criado
    } catch (err) {
      console.error("Unexpected error while saving Perfil.", err); // Log dos detalhes do erro
      return new Error("Unexpected error while saving Perfil.");
    }
  }

  // Ler um único perfil
  async readOnePerfil({ idperfil }: FindPerfilRequest): Promise<Perfis | Error> {
    try {
      const perfil = await cursor.findOne({ where: { idperfil } });
      if (!perfil) {
        return new Error("Perfil not found.");
      }
      return perfil;
    } catch (err) {
      console.error("Unexpected error while reading Perfil.", err); // Log dos detalhes do erro
      return new Error("Unexpected error while reading Perfil.");
    }
  }

  // Ler todos os perfis
  async readAllPerfis(): Promise<Perfis[] | Error> {
    try {
      const perfis = await cursor.find();
      return perfis;
    } catch (err) {
      console.error("Unexpected error while reading Perfis.", err); // Log dos detalhes do erro
      return new Error("Unexpected error while reading Perfis.");
    }
  }

  // Atualizar um perfil
  async updatePerfil({
    idperfil,
    nomeperfil,
    postarduvida,
    responderduvida,
    avaliarresposta,
  }: UpdatePerfilRequest): Promise<Perfis | Error> {
    try {
      const perfil = await cursor.findOne({ where: { idperfil } });
      if (!perfil) {
        return new Error("Perfil not found.");
      }

      // Atualiza somente os campos fornecidos
      perfil.nomeperfil = nomeperfil ?? perfil.nomeperfil;
      perfil.postarduvida = postarduvida ?? perfil.postarduvida;
      perfil.responderduvida = responderduvida ?? perfil.responderduvida;
      perfil.avaliarresposta = avaliarresposta ?? perfil.avaliarresposta;

      await cursor.save(perfil);
      return perfil;
    } catch (err) {
      console.error("Unexpected error while updating Perfil.", err); // Log dos detalhes do erro
      return new Error("Unexpected error while updating Perfil.");
    }
  }

  // Deletar um perfil
  async deletePerfil({ idperfil }: FindPerfilRequest): Promise<string | Error> {
    try {
      const perfil = await cursor.findOne({ where: { idperfil } });
      if (!perfil) {
        return new Error("Perfil not found.");
      }
      await cursor.delete({ idperfil });
      return "Perfil removed successfully!";
    } catch (err) {
      console.error("Unexpected error while deleting Perfil.", err); // Log dos detalhes do erro
      return new Error("Unexpected error while deleting Perfil.");
    }
  }
}
