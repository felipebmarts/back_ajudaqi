import { Request, Response } from "express";
import { UsuariosService } from "../services/usuariosService";

const service = new UsuariosService();

export class UsuariosController {
  // Método para criar um novo usuário
  async createUsuario(req: Request, res: Response): Promise<Response> {
    const { matricula, nome, cpf, senha, email, fkperfil } = req.body;

    // Chama o serviço para criar o usuário
    const result = await service.createUsuario({ matricula, nome, cpf, senha, email, fkperfil });

    if (result instanceof Error) {
      // Se ocorreu algum erro, retorna um erro 500 com a mensagem
      return res.status(500).json(result.message);
    }

    // Se o usuário foi criado com sucesso, retorna o usuário com status 201 (created)
    return res.status(201).json(result);
  }

  // Método para buscar todos os usuários
  async readAllUsuarios(req: Request, res: Response): Promise<Response> {
    const result = await service.readAllUsuarios();

    if (result instanceof Error) {
      // Se ocorreu algum erro, retorna um erro 500 com a mensagem
      return res.status(500).json(result.message);
    }

    // Se encontrou usuários, retorna a lista de usuários com status 200
    return res.status(200).json(result);
  }

  // Método para buscar um único usuário pelo id
  async readOneUsuario(req: Request, res: Response): Promise<Response> {
    const { matricula } = req.params;

    // Chama o serviço para buscar o usuário
    const result = await service.readOneUsuario({ matricula });

    if (result instanceof Error) {
      // Se o usuário não for encontrado ou ocorrer um erro, retorna erro 404
      return res.status(404).json(result.message);
    }

    // Se o usuário for encontrado, retorna o usuário com status 200
    return res.status(200).json(result);
  }

  // Método para atualizar um usuário
  async updateUsuario(req: Request, res: Response): Promise<Response> {
    const { matricula } = req.params;
    const { nome, cpf, senha, email, fkperfil } = req.body;

    // Chama o serviço para atualizar o usuário
    const result = await service.updateUsuario({
      matricula,
      nome,
      cpf,
      senha,
      email,
      fkperfil,
    });

    if (result instanceof Error) {
      // Se ocorreu algum erro, retorna um erro 404 com a mensagem
      return res.status(404).json(result.message);
    }

    // Se o usuário for atualizado com sucesso, retorna o usuário atualizado com status 200
    return res.status(200).json(result);
  }

  // Método para excluir um usuário
  async deleteUsuario(req: Request, res: Response): Promise<Response> {
    const { matricula } = req.params;

    // Chama o serviço para excluir o usuário
    const result = await service.deleteUsuario({ matricula });

    if (result instanceof Error) {
      // Se o usuário não for encontrado ou ocorrer um erro, retorna erro 404
      return res.status(404).json(result.message);
    }

    // Se o usuário for excluído com sucesso, retorna a mensagem de sucesso com status 200
    return res.status(200).json(result);
  }
}
