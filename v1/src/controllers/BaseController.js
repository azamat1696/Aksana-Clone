
class BaseController {
    constructor(service) {
        this.service = service;
    }

    async index(req, res) {
        try {
        const data = await this.service.index();
        res.json(data);
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    }

    async show(req, res) {
        try {
        const data = await this.service.show(req.params.id);
        res.json(data);
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    }

    async store(req, res) {
        try {
        const data = await this.service.store(req.body);
        res.json(data);
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
        const data = await this.service.update(req.params.id, req.body);
        res.json(data);
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    }

    async destroy(req, res) {
        try {
        const data = await this.service.destroy(req.params.id);
        res.json(data);
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    }
}
