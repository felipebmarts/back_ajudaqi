import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Usuarios } from "./usuarios";
import { Duvidas } from "./duvidas";
import { v4 as uuidv4 } from 'uuid';

@Entity("respostas")
export class Respostas {
  @PrimaryGeneratedColumn("uuid")
  idresposta: string; // chave primária, o ID da resposta gerado automaticamente

  @Column()
  descricaoresposta: string; // descrição da resposta

  @Column({ type: "uuid" })
  fkusuario: string; // chave estrangeira para a tabela usuarios

  @Column({ type: "uuid" })
  fkduvida: string; // chave estrangeira para a tabela duvidas

  @ManyToOne(() => Usuarios)
  @JoinColumn({ name: "fkusuario" })
  usuario: Usuarios;

  @ManyToOne(() => Duvidas)
  @JoinColumn({ name: "fkduvida" })
  duvida: Duvidas;

  // Construtor para inicializar propriedades
  constructor() {
    this.idresposta = uuidv4(); // Gera um UUID para a resposta
  }
}
