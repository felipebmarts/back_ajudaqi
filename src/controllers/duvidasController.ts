import { Request, Response } from "express";
import { DuvidasService } from "../services/duvidasService";

const service = new DuvidasService();

export class DuvidasController {
  // Método para criar uma nova dúvida
  async createDuvida(req: Request, res: Response): Promise<Response> {
    const { descricao, avaliacao, fkusuario, fkmateria } = req.body;

    try {
      // Chama o serviço para criar a dúvida
      const result = await service.createDuvida({ descricao, avaliacao, fkusuario, fkmateria });

      if ('error' in result && result.error) {
        // Se ocorreu algum erro, retorna um erro 500 com a mensagem
        return res.status(500).json(result.error);
      }

      // Se a dúvida foi criada com sucesso, retorna a dúvida com status 201 (created)
      return res.status(201).json(result);
    } catch (err) {
      console.error("Erro ao criar a dúvida:", err); // Log dos detalhes do erro
      return res.status(500).json({ error: "Erro no servidor ao criar a dúvida." });
    }
  }

  // Método para buscar todas as dúvidas
  async readAllDuvidas(req: Request, res: Response): Promise<Response> {
    try {
      const result = await service.readAllDuvidas();

      if ('error' in result && result.error) {
        // Se ocorreu algum erro, retorna um erro 500 com a mensagem
        return res.status(500).json(result.error);
      }

      // Se encontrou dúvidas, retorna a lista de dúvidas com status 200
      return res.status(200).json(result);
    } catch (err) {
      console.error("Erro ao buscar todas as dúvidas:", err); // Log dos detalhes do erro
      return res.status(500).json({ error: "Erro no servidor ao buscar todas as dúvidas." });
    }
  }

  // Método para buscar uma única dúvida por ID
  async readOneDuvida(req: Request, res: Response): Promise<Response> {
    const { idduvida } = req.params;

    try {
      // Chama o serviço para buscar a dúvida
      const result = await service.readOneDuvida({ idduvida });

      if ('error' in result && result.error) {
        // Se a dúvida não for encontrada ou ocorrer um erro, retorna erro 404
        return res.status(404).json(result.error);
      }

      // Se a dúvida for encontrada, retorna a dúvida com status 200
      return res.status(200).json(result);
    } catch (err) {
      console.error("Erro ao buscar a dúvida:", err); // Log dos detalhes do erro
      return res.status(500).json({ error: "Erro no servidor ao buscar a dúvida." });
    }
  }

  // Método para atualizar uma dúvida
  async updateDuvida(req: Request, res: Response): Promise<Response> {
    const { idduvida } = req.params;
    const { descricao, avaliacao, fkusuario, fkmateria } = req.body;

    try {
      // Chama o serviço para atualizar a dúvida
      const result = await service.updateDuvida({ idduvida, descricao, avaliacao, fkusuario, fkmateria });

      if ('error' in result && result.error) {
        // Se ocorreu algum erro, retorna um erro 404 com a mensagem
        return res.status(404).json(result.error);
      }

      // Se a dúvida for atualizada com sucesso, retorna a dúvida atualizada com status 200
      return res.status(200).json(result);
    } catch (err) {
      console.error("Erro ao atualizar a dúvida:", err); // Log dos detalhes do erro
      return res.status(500).json({ error: "Erro no servidor ao atualizar a dúvida." });
    }
  }

  // Método para excluir uma dúvida
  async deleteDuvida(req: Request, res: Response): Promise<Response> {
    const { idduvida } = req.params;

    try {
      // Chama o serviço para excluir a dúvida
      const result = await service.deleteDuvida({ idduvida });

      if (typeof result !== 'string' && 'error' in result && result.error) {
        // Se a dúvida não for encontrada ou ocorrer um erro, retorna erro 404
        return res.status(404).json(result.error);
      }

      // Se a dúvida for excluída com sucesso, retorna a mensagem de sucesso com status 200
      return res.status(200).json({ message: "Dúvida deletada com sucesso!" });
    } catch (err) {
      console.error("Erro ao deletar a dúvida:", err); // Log dos detalhes do erro
      return res.status(500).json({ error: "Erro no servidor ao deletar a dúvida." });
    }
  }
}
