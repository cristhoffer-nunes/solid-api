import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProvider"
import { PostgresUsersRepositorys } from "../../repositories/implementations/PostgresUsersRepository"
import { CreateUserController } from "./CreateUserController"
import { CreateUserUseCase } from "./CreateUserUseCase"

const mailTrapProvider = new MailtrapMailProvider()
const postgresUsersRepository = new PostgresUsersRepositorys()

const createUserUseCase = new CreateUserUseCase(
	postgresUsersRepository,
	mailTrapProvider
)

const createUserController = new CreateUserController(createUserUseCase)

export { createUserUseCase, createUserController }
