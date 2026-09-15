import { parfumeService } from '../service/parfume.service.js';
class ParfumeController {
    async createParfume(req, res, next) {
        try {
            const dto = req.body;
            const result = await parfumeService.createParfume(dto);
            res.status(201).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async updateParfumeById(req, res, next) {
        try {
            const { parfumeId } = req.params;
            const dto = req.body;
            const result = await parfumeService.updateParfumeById(parfumeId, dto);
            res.status(201).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async getParfumeById(req, res, next) {
        try {
            const { parfumeId } = req.params;
            const result = await parfumeService.getParfumeById(parfumeId);
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async getParfumeList(req, res, next) {
        try {
            const result = await parfumeService.getAParfumeList();
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async deleteById(req, res, next) {
        try {
            const { parfumeId } = req.params;
            await parfumeService.deleteById(parfumeId);
            res.status(204);
        }
        catch (err) {
            next(err);
        }
    }
}
export const parfumeController = new ParfumeController();
