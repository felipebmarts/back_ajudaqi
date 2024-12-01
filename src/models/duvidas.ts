import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Usuarios } from "./usuarios";
import { Materias } from "./materias";
import { v4 as uuidv4 } from 'uuid';

@Entity("duvidas")
export class Duvidas {

  @PrimaryGeneratedColumn("uuid")
  idduvida: string; // chave primária, o ID da dúvida gerado automaticamente

  @Column({ type: "varchar", length: 500, nullable: true })
  descricao: string; // descrição da dúvida (opcional)

  @Column({ type: "varchar", length: 255, nullable: true })
  avaliacao: string; // avaliação da dúvida (opcional, pode ser texto ou número)

  @Column({ type: "uuid" })
  fkusuario: string; // chave estrangeira para a tabela usuarios

  @Column({ type: "uuid" })
  fkmateria: string; // chave estrangeira para a tabela materias

  // Relacionamento com a tabela usuarios
  @ManyToOne(() => Usuarios, usuario => usuario.duvidas, { nullable: false })
  @JoinColumn({ name: "fkusuario" })
  usuario: Usuarios;

  // Relacionamento com a tabela materias
  @ManyToOne(() => Materias, materia => materia.duvidas, { nullable: false })
  @JoinColumn({ name: "fkmateria" })
  materia: Materias;

  // Construtor para inicializar propriedades
  constructor() {
    this.idduvida = uuidv4(); // Gera um UUID para a dúvida
  }
}
