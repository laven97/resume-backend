"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPresenter = void 0;
class UserPresenter {
    toPublicResDto(entity) {
        return {
            _id: entity._id,
            name: entity.name,
            email: entity.email,
            role: entity.role,
            avatar: entity.avatar,
            isDeleted: entity.isDeleted,
            isVerified: entity.isVerified,
            createdAt: entity.createdAt,
        };
    }
}
exports.userPresenter = new UserPresenter();
