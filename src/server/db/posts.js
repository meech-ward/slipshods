
const posts = {
  async findManyWithCreator({ skip = 0, take = 20, lastId, where, orderBy, currentUser } = {}) {
    return this.findMany({
      skip: lastId ? 1 : skip,
      take,
      where,
      orderBy: orderBy || {
        id: 'desc'
      },
      cursor: lastId ? {
        id: lastId
      } : undefined,
      include: {
        user: {
          select: {
            name: true,
            image: true,
          }
        },
        likes: currentUser ? {
          select: {
            id: true,
          },
          where: {
            userId: currentUser.id
          }
        } : false
      },
    })
  }
}
export default posts