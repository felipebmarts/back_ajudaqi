import { Request, Response } from "express";
import { MateriasService } from "../services/materiasService";

const service = new MateriasService();

export class MateriasController {
  // Método para criar uma nova matéria
  async createMateria(req: Request, res: Response): Promise<Response> {
    const { nomemateria, nomeconteudo, nomecurso, periodo } = req.body;

    // Chama o serviço para criar a matéria
    const result = await service.createMateria({
      nomemateria,
      nomeconteudo, // Incluído nomeconteudo
      nomecurso,
      periodo,
    });

    if (result instanceof Error) {
      // Se ocorreu algum erro, retorna um erro 500 com a mensagem
      return res.status(500).json(result.message);
    }

    // Se a matéria foi criada com sucesso, retorna a matéria com status 201 (created)
    return res.status(201).json(result);
  }

  // Método para buscar todas as matérias
  async readAllMaterias(req: Request, res: Response): Promise<Response> {
    const result = await service.readAllMaterias();

    if (result instanceof Error) {
      // Se ocorreu algum erro, retorna um erro 500 com a mensagem
      return res.status(500).json(result.message);
    }

    // Se encontrou matérias, retorna a lista de matérias com status 200
    return res.status(200).json(result);
  }

  // Método para buscar uma única matéria por ID
  async readOneMateria(req: Request, res: Response): Promise<Response> {
    const { idmateria } = req.params;

    // Chama o serviço para buscar a matéria
    const result = await service.readOneMateria({ idmateria });

    if (result instanceof Error) {
      // Se a matéria não for encontrada ou ocorrer um erro, retorna erro 404
      return res.status(404).json(result.message);
    }

    // Se a matéria for encontrada, retorna a matéria com status 200
    return res.status(200).json(result);
  }

  // Método para atualizar uma matéria
  async updateMateria(req: Request, res: Response): Promise<Response> {
    const { idmateria } = req.params;
    const { nomemateria, nomeconteudo, nomecurso, periodo } = req.body;

    // Chama o serviço para atualizar a matéria
    const result = await service.updateMateria({
      idmateria,
      nomemateria,
      nomeconteudo, // Incluído nomeconteudo
      nomecurso,
      periodo,
    });

    if (result instanceof Error) {
      // Se ocorreu algum erro, retorna um erro 404 com a mensagem
      return res.status(404).json(result.message);
    }

    // Se a matéria for atualizada com sucesso, retorna a matéria atualizada com status 200
    return res.status(200).json(result);
  }

  // Método para excluir uma matéria
  async deleteMateria(req: Request, res: Response): Promise<Response> {
    const { idmateria } = req.params;

    // Chama o serviço para excluir a matéria
    const result = await service.deleteMateria({ idmateria });

    if (result instanceof Error) {
      // Se a matéria não for encontrada ou ocorrer um erro, retorna erro 404
      return res.status(404).json(result.message);
    }

    // Se a matéria for excluída com sucesso, retorna a mensagem de sucesso com status 200
    return res.status(200).json("Materia deleted successfully!");
  }
}
