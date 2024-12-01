import { Request, Response } from "express";
import { PerfisService } from "../services/perfisService";

const service = new PerfisService();

export class PerfisController {
  async createPerfil(req: Request, res: Response) {
    const { nomeperfil, postarduvida, responderduvida, avaliarresposta } = req.body;

    // Chamando o serviço com os dados fornecidos
    const result = await service.createPerfil({ nomeperfil, postarduvida, responderduvida, avaliarresposta });
    if (result instanceof Error) {
      return res.status(500).json(result.message);
    }

    return res.status(201).json(result);
  }

  async readAllPerfis(req: Request, res: Response) {
    const result = await service.readAllPerfis();
    if (result instanceof Error) {
      return res.status(500).json(result.message);
    }

    if (result.length === 0) {
      return res.status(200).json("No profiles found.");
    }

    return res.status(200).json(result);
  }

  async readOnePerfil(req: Request, res: Response) {
    const { idperfil } = req.params;

    const result = await service.readOnePerfil({ idperfil });
    if (result instanceof Error) {
      return res.status(404).json(result.message);
    }

    return res.status(200).json(result);
  }

  async updatePerfil(req: Request, res: Response) {
    const { idperfil } = req.params;
    const { nomeperfil, postarduvida, responderduvida, avaliarresposta } = req.body;

    const result = await service.updatePerfil({ idperfil, nomeperfil, postarduvida, responderduvida, avaliarresposta });
    if (result instanceof Error) {
      return res.status(404).json(result.message);
    }

    return res.status(200).json(result);
  }

  async deletePerfil(req: Request, res: Response) {
    const { idperfil } = req.params;

    const result = await service.deletePerfil({ idperfil });
    if (result instanceof Error) {
      return res.status(404).json(result.message);
    }

    return res.status(200).json("Profile deleted successfully!");
  }
}
