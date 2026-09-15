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
export const userPresenter = new UserPresenter();
