import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";

@Entity({ name: "users" })
export class UserEntity {
	@PrimaryGeneratedColumn("increment")
	public id: number;
	
	@Index({ unique: true })
	@Column({ unique: true })
	public username: string;
	
	@Column()
	public password: string;
	
	@CreateDateColumn()
	public createdAt: Date;
	
	@UpdateDateColumn()
	public updatedAt: Date;
	
	@Column()
	public salt: string;
	
	@Column({ nullable: true })
	public avatar: string;
	
	@Column({ nullable: true })
	public refreshToken: string;
	
	@ManyToMany(type => UserEntity)
	@JoinTable()
	friends: UserEntity[];
}
