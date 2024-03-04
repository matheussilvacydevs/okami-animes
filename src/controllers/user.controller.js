const userModel = require("../modells/user.model");
class UserController {
    // Login
    async userLogin(req, res){
        try{
            const {user_email, password} = req.body;
            const userOne = await userModel.findOne({user_email, password});
            if(userOne){
                res.json({error: false, userOne});
            }
        }
        catch (error) {
            res.status(500).json({ msg: error })
            console.log(error);
        }
    }
    // Cadastrar
    async insertUser(req, res) {
        const { id: user_id, user_name, user_email,user_birthday, password } = req.body;
        const userAlreadExists = await userModel.findOne({ user_email });
        if (userAlreadExists) {
            return res.status(404).json({ message: "Email já cadastrado." });
        }
        if (!user_name || !user_email || !password) {
            res.status(422).json({ msg: "Preencha todos os campos" })
        }
        const usuario = {
            user_id,
            user_name,
            user_email,
            user_birthday,
            password,
        }
        try {
            const user = await userModel.create(usuario)
            res.status(201).json(user)
            return;
        } catch (error) {
            res.status(500).json({ msg: error })
            console.log(error);
        }
    }
    // Listar usuarios
    async listUsers(req, res) {
        try {
            const usuariosAll = await userModel.find();
            res.status(201).json(usuariosAll)
            return;
        } catch (error) {
            res.status(500).json({ msg: error })
            console.log(error);
        }
    }
    // Listar um usuário específico
    async listOneUser(req, res) {
        const id = req.params.id;     
        const {user_email, password} = req.body;     
        try {
            const usuarioOne = await userModel.findOne({user_email, password });
            if (!usuarioOne) {
                res.status(422).json({ msg: "Usuário não encontrado" })
                return;
            }
            res.status(201).json(usuarioOne)
            return;
        } catch (error) {
            res.status(500).json({ msg: error })
            console.log(error);
        }
    }
    // Atualizar um usuário
    async userUpdate(req, res) {
        const id = req.params.id;
        const { user_name, user_email,user_birthday, password } = req.body;
        const usuario = {            
            user_name,
            user_email,
            user_birthday,
            password,
        }

        try {
            const usuarioOne = await userModel.updateOne({ _id: id }, usuario);
            if (!usuarioOne) {
                res.status(422).json({ msg: "Usuário não encontrado" })
                return;
            }
            console.log(usuarioOne);
            if(usuarioOne.matchedCount === 0){
                res.status(422).json({ msg: "Usuário não atualizado" })
                return;
            }
            res.status(200).json(usuario)
            return;
        } catch (error) {
            res.status(500).json({ msg: error })
            console.log(error);
        }

    }
    // Deletar um usuário
    async userDelete(req, res) { 
        const id = req.params.id;
        const user = await userModel.findOne({_id: id});
        if(!user){
            res.status(422).json({ msg: "Usuário não encontrado" })
            return;            
        }
        try {
            await userModel.deleteOne({_id: id})    
            res.status(200).json({msg: "Usuário removido com sucesso!"})
            return;
        } catch (error) {
            res.status(500).json({ msg: error })
            console.log(error);
        }
    }

}

module.exports = new UserController;
