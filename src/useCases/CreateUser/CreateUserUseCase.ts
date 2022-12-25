import { User } from "../../entities/User"
import { IMailProvider } from "../../providers/IMailProvider"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { ICreateUserRequestDTO } from "./CreateUserDTO"

export class CreateUserUseCase {
	constructor(
		private usersRepository: IUsersRepository,
		private mailProvider: IMailProvider
	) {}

	async execute(data: ICreateUserRequestDTO) {
		const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

		if (userAlreadyExists) {
			throw new Error("User already exists")
		}

		const user = new User(data)

		await this.usersRepository.save(user)

		await this.mailProvider.sendEmail({
			to: {
				name: data.name,
				email: data.email,
			},
			from: {
				name: "Equipe do Meu App",
				email: "equipe@meuapp.com",
			},
			subject: "Seja bem-vindo à plaaforma",
			body: "Você já pode efetuar o login em nossa plataforma.",
		})
	}
}
