import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("usuarios")
export class Usuarios {

  @PrimaryColumn()
  matricula: string; // chave primária, a matrícula do usuário

  @Column()
  nome: string; // nome do usuário

  @Column()
  cpf: string; // CPF do usuário

  @Column()
  senha: string; // senha do usuário

  @Column()
  email: string; // email do usuário

  @Column({ nullable: true })
  fkperfil: string; // chave estrangeira para a tabela perfis (opcional, pois pode ser nulo)
  duvidas: any;

}
