import { DevDataSource } from "../connections/dbDev";
import { Materias } from "../models/materias";

const cursor = DevDataSource.getRepository(Materias); // Conecta-se à tabela "materias"

// Interfaces para tipagem dos dados
type NewMateriaRequest = {
  nomemateria: string;
  nomeconteudo: string;
  nomecurso: string;
  periodo: string;
};

type FindMateriaRequest = {
  idmateria: string;
};

type UpdateMateriaRequest = {
  idmateria: string;
  nomemateria?: string;
  nomeconteudo?: string;
  nomecurso?: string;
  periodo?: string;
};

export class MateriasService {
  // Método para criar uma nova matéria
  async createMateria({
    nomemateria,
    nomeconteudo,
    nomecurso,
    periodo,
  }: NewMateriaRequest): Promise<Materias | Error> {
    try {
      // Inicializa uma nova matéria com o construtor
      const materia = new Materias();
      materia.nomemateria = nomemateria;
      materia.nomeconteudo = nomeconteudo;
      materia.nomecurso = nomecurso;
      materia.periodo = periodo;

      await cursor.save(materia); // Salva a nova matéria na tabela
      console.log("Materia saved successfully:", materia);
      return materia; // Retorna a matéria recém-criada
    } catch (err) {
      console.error("Unexpected error while saving Materia.", err); // Log dos detalhes do erro
      return new Error("Unexpected error while saving Materia.");
    }
  }

  // Método para encontrar uma matéria por ID
  async readOneMateria({ idmateria }: FindMateriaRequest): Promise<Materias | Error> {
    try {
      const materia = await cursor.findOne({ where: { idmateria } });

      if (!materia) {
        return new Error("Materia not found.");
      }

      return materia; // Retorna a matéria encontrada
    } catch (err) {
      return new Error("Unexpected error while fetching Materia.");
    }
  }

  // Método para encontrar todas as matérias
  async readAllMaterias(): Promise<Materias[] | Error> {
    try {
      const materias = await cursor.find(); // Encontra todas as matérias
      return materias;
    } catch (err) {
      return new Error("Unexpected error while fetching Materias.");
    }
  }

  // Método para atualizar uma matéria
  async updateMateria({
    idmateria,
    nomemateria,
    nomeconteudo,
    nomecurso,
    periodo,
  }: UpdateMateriaRequest): Promise<Materias | Error> {
    try {
      const materia = await cursor.findOne({ where: { idmateria } });

      if (!materia) {
        return new Error("Materia not found.");
      }

      // Atualiza os campos da matéria
      materia.nomemateria = nomemateria ?? materia.nomemateria;
      materia.nomeconteudo = nomeconteudo ?? materia.nomeconteudo;
      materia.nomecurso = nomecurso ?? materia.nomecurso;
      materia.periodo = periodo ?? materia.periodo;

      await cursor.save(materia); // Salva as alterações no banco

      return materia; // Retorna a matéria atualizada
    } catch (err) {
      return new Error("Unexpected error while updating Materia.");
    }
  }

  // Método para deletar uma matéria
  async deleteMateria({ idmateria }: FindMateriaRequest): Promise<string | Error> {
    try {
      const materia = await cursor.findOne({ where: { idmateria } });

      if (!materia) {
        return new Error("Materia not found.");
      }

      await cursor.delete(materia.idmateria); // Deleta a matéria da tabela
      return "Materia removed successfully!";
    } catch (err) {
      return new Error("Unexpected error while deleting Materia.");
    }
  }
}
