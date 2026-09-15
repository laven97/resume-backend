"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parfumeController = void 0;
const parfume_service_1 = require("../service/parfume.service");
class ParfumeController {
    async createParfume(req, res, next) {
        try {
            const dto = req.body;
            const result = await parfume_service_1.parfumeService.createParfume(dto);
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
            const result = await parfume_service_1.parfumeService.updateParfumeById(parfumeId, dto);
            res.status(201).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async getParfumeById(req, res, next) {
        try {
            const { parfumeId } = req.params;
            const result = await parfume_service_1.parfumeService.getParfumeById(parfumeId);
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async getParfumeList(req, res, next) {
        try {
            const result = await parfume_service_1.parfumeService.getAParfumeList();
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async deleteById(req, res, next) {
        try {
            const { parfumeId } = req.params;
            await parfume_service_1.parfumeService.deleteById(parfumeId);
            res.status(204);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.parfumeController = new ParfumeController();
