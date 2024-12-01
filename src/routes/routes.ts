import { Router } from "express";
import { PerfisController } from "../controllers/perfisController";
import { UsuariosController } from "../controllers/usuariosController";
import { MateriasController } from "../controllers/materiasController";
import { DuvidasController } from "../controllers/duvidasController"; 
import { RespostasController } from "../controllers/respostasController";

const router = Router();

// Instanciando os controladores
const perfisController = new PerfisController();
const usuariosController = new UsuariosController();
const materiasController = new MateriasController();
const duvidasController = new DuvidasController();
const respostasController = new RespostasController();

// Rota da tela principal
router.get("/", (request, response) => {
  return response.json("home page");
});

// ======== R O T A S  D E  P E R F I S ========

// Rota Read All - Perfis
router.get("/perfis", perfisController.readAllPerfis);
// Rota Read One - Perfis
router.get("/perfis/:idperfil", perfisController.readOnePerfil);
// Rota Create - Perfis
router.post("/perfis", perfisController.createPerfil);
// Rota Update - Perfis
router.put("/perfis/:idperfil", perfisController.updatePerfil);
// Rota Delete - Perfis
router.delete("/perfis/:idperfil", perfisController.deletePerfil);

// ======== R O T A S  D E  U S U A R I O S ========

// Rota para criar um novo usuário
router.post("/usuarios", usuariosController.createUsuario);
// Rota para buscar todos os usuários
router.get("/usuarios", usuariosController.readAllUsuarios);
// Rota para buscar um usuário específico por matrícula
router.get("/usuarios/:matricula", usuariosController.readOneUsuario);
// Rota para atualizar um usuário específico por matrícula
router.put("/usuarios/:matricula", usuariosController.updateUsuario);
// Rota para excluir um usuário específico por matrícula
router.delete("/usuarios/:matricula", usuariosController.deleteUsuario);

// ======== R O T A S  D E  M A T E R I A S ========

// Rota para criar uma nova matéria
router.post("/materias", materiasController.createMateria);
// Rota para buscar todas as matérias
router.get("/materias", materiasController.readAllMaterias);
// Rota para buscar uma matéria específica por ID
router.get("/materias/:idmateria", materiasController.readOneMateria);
// Rota para atualizar uma matéria específica por ID
router.put("/materias/:idmateria", materiasController.updateMateria);
// Rota para excluir uma matéria específica por ID
router.delete("/materias/:idmateria", materiasController.deleteMateria);

// ======== R O T A S  D E  D U V I D A S ========

// Rota para criar uma nova dúvida
router.post("/duvidas", duvidasController.createDuvida);
// Rota para buscar todas as dúvidas
router.get("/duvidas", duvidasController.readAllDuvidas);
// Rota para buscar uma dúvida específica por ID
router.get("/duvidas/:idduvida", duvidasController.readOneDuvida);
// Rota para atualizar uma dúvida específica por ID
router.put("/duvidas/:idduvida", duvidasController.updateDuvida);
// Rota para excluir uma dúvida específica por ID
router.delete("/duvidas/:idduvida", duvidasController.deleteDuvida);

// ======== R O T A S  D E  R E S P O S T A S ========

// Rota para criar uma nova resposta
router.post("/respostas", respostasController.createResposta);
// Rota para buscar todas as respostas
router.get("/respostas", respostasController.readAllRespostas);
// Rota para buscar uma resposta específica por ID
router.get("/respostas/:idresposta", respostasController.readOneResposta);
// Rota para atualizar uma resposta específica por ID
router.put("/respostas/:idresposta", respostasController.updateResposta);
// Rota para excluir uma resposta específica por ID
router.delete("/respostas/:idresposta", respostasController.deleteResposta);

export default router;
