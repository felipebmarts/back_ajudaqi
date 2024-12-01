import { Request, Response } from "express";
import { RespostasService } from "../services/respostasService";

const service = new RespostasService();

export class RespostasController {
  // Método para criar uma nova resposta
  async createResposta(req: Request, res: Response): Promise<Response> {
    const { idresposta, descricaoresposta, fkusuario, fkduvida } = req.body;

    // Chama o serviço para criar a resposta
    const result = await service.createResposta({ descricaoresposta, fkusuario, fkduvida });

    if (result instanceof Error) {
      // Se ocorreu algum erro, retorna um erro 500 com a mensagem
      return res.status(500).json(result.message);
    }

    // Se a resposta foi criada com sucesso, retorna a resposta com status 201 (created)
    return res.status(201).json(result);
  }

  // Método para buscar todas as respostas
  async readAllRespostas(req: Request, res: Response): Promise<Response> {
    const result = await service.readAllRespostas();

    if (result instanceof Error) {
      // Se ocorreu algum erro, retorna um erro 500 com a mensagem
      return res.status(500).json(result.message);
    }

    // Se encontrou respostas, retorna a lista de respostas com status 200
    return res.status(200).json(result);
  }

  // Método para buscar uma única resposta pelo id
  async readOneResposta(req: Request, res: Response): Promise<Response> {
    const { idresposta } = req.params;

    // Chama o serviço para buscar a resposta
    const result = await service.readOneResposta({ idresposta });

    if (result instanceof Error) {
      // Se a resposta não for encontrada ou ocorrer um erro, retorna erro 404
      return res.status(404).json(result.message);
    }

    // Se a resposta for encontrada, retorna a resposta com status 200
    return res.status(200).json(result);
  }

  // Método para atualizar uma resposta
  async updateResposta(req: Request, res: Response): Promise<Response> {
    const { idresposta } = req.params;
    const { descricaoresposta, fkusuario, fkduvida } = req.body;

    // Chama o serviço para atualizar a resposta
    const result = await service.updateResposta({
      idresposta,
      descricaoresposta,
      fkusuario,
      fkduvida,
    });

    if (result instanceof Error) {
      // Se ocorreu algum erro, retorna um erro 404 com a mensagem
      return res.status(404).json(result.message);
    }

    // Se a resposta for atualizada com sucesso, retorna a resposta atualizada com status 200
    return res.status(200).json(result);
  }

  // Método para excluir uma resposta
  async deleteResposta(req: Request, res: Response): Promise<Response> {
    const { idresposta } = req.params;

    // Chama o serviço para excluir a resposta
    const result = await service.deleteResposta({ idresposta });

    if (result instanceof Error) {
      // Se a resposta não for encontrada ou ocorrer um erro, retorna erro 404
      return res.status(404).json(result.message);
    }

    // Se a resposta for excluída com sucesso, retorna a mensagem de sucesso com status 200
    return res.status(200).json(result);
  }
}
