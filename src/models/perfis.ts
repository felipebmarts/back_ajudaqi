import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity("perfis")
export class Perfis {

  @PrimaryGeneratedColumn("uuid")
  idperfil: string; // chave primária, o ID do perfil gerado automaticamente

  @Column()
  nomeperfil: string; // nome do perfil

  @Column({ nullable: true })
  postarduvida: boolean; // permissão para postar dúvida

  @Column({ nullable: true })
  responderduvida: boolean; // permissão para responder dúvida

  @Column({ nullable: true })
  avaliarresposta: boolean; // permissão para avaliar resposta

  // Construtor para inicializar propriedades
  constructor() {
    this.idperfil = uuidv4(); // Gera um UUID para o perfil
  }
}
