import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity("materias")
export class Materias {

  @PrimaryGeneratedColumn("uuid")
  idmateria: string; // chave primária, o ID da matéria gerado automaticamente

  @Column()
  nomemateria: string; // nome da matéria

  @Column()
  nomeconteudo: string; // nome do conteúdo associado à matéria

  @Column()
  nomecurso: string; // nome do curso ao qual a matéria pertence

  @Column()
  periodo: string; // período da matéria

  duvidas: any; // Campo adicional

  // Construtor para inicializar propriedades
  constructor() {
    this.idmateria = uuidv4(); // Gera um UUID para a matéria
  }
}
