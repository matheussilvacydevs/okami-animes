const animeModel = require("../modells/anime.model");
class AnimeController {
    // Cadastrar
    async insertAnime(req, res) {
        const { id: anime_id, anime_name, anime_type, anime_description, anime_rated } = req.body;
        const animeAlreadExists = await animeModel.findOne({ anime_name });
        if (animeAlreadExists) {
            return res.status(404).json({ message: "Anime já cadastrado." });
        }
        if (!anime_name || !anime_type || !anime_description) {
            res.status(422).json({ msg: "Preencha todos os campos" })
        }
        const animeObject = {
            anime_id,
            anime_name,
            anime_type,
            anime_rated,
            anime_description,
        }
        try {
            const anime = await animeModel.create(animeObject)
            res.status(201).json(anime)
        } catch (error) {
            res.status(500).json({ msg: error })
            console.log(error);
        }
    }
    // Listar todos os animes
    async listAnimes(req, res) {
        try {
            const listAll = await animeModel.find();
            res.status(201).json(listAll)
            return;
        } catch (error) {
            res.status(500).json({ msg: error })
            console.log(error);
        }
    }
    // Listar um anime específico
    async listOneAnime(req, res) {
        const id = req.params.id;

        try {
            const listOne = await animeModel.findOne({ _id: id });
            if (!listOne) {
                res.status(422).json({ msg: "Anime não encontrado" })
                return;
            }
            res.status(201).json(listOne)
            return;
        } catch (error) {
            res.status(500).json({ msg: error })
            console.log(error);
        }
    }
    // Atualizar um anime
    async animeUpdate(req, res) {
        const id = req.params.id;
        const { anime_name, anime_type, anime_description, anime_rated } = req.body;
        const animeObject = {
            anime_name,
            anime_type,
            anime_rated,
            anime_description,
        }

        try {
            const updateOne = await animeModel.updateOne({ _id: id }, animeObject);
            if (!updateOne) {
                res.status(422).json({ msg: "Anime não encontrado" })
                return;
            }
            console.log(updateOne);
            if (updateOne.matchedCount === 0) {
                res.status(422).json({ msg: "Anime não atualizado" })
                return;
            }
            res.status(200).json(animeObject)
            return;
        } catch (error) {
            res.status(500).json({ msg: error })
            console.log(error);
        }

    }
    // Deletar um anime
    async animeDelete(req, res) {
        const id = req.params.id;
        const anime = await animeModel.findOne({ _id: id });
        if (!anime) {
            res.status(422).json({ msg: "anime não encontrado" })
            return;
        }
        try {
            await animeModel.deleteOne({ _id: id })
            res.status(200).json({ msg: "Anime removido com sucesso!" })
            return;
        } catch (error) {
            res.status(500).json({ msg: error })
            console.log(error);
        }
    }
}

module.exports = new AnimeController;
