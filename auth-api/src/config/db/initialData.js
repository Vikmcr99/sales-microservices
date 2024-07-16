import bcrypt from "bcrypt";
import user from "../../modules/user/model/User.js";

export async function createInitialData() {

    try {

        await user.sync({ force: true });

        let password = await bcrypt.hash('123456', 10);

        await user.create({
            name: "Victor",
            email: "victor@gmail.com",
            password: password,
        });
    } catch (err) {
        console.log(err);
    }

}

