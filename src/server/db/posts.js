
const posts = {
  async findManyWithUser({skip = 0, take = 20, lastId, where, orderBy} = {}) {
    return this.findMany({
      skip: lastId ? 1 : skip,
      take,
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
        }
      }
    })
  },
  async findUniqueWithUser({where}) {
    return this.findUnique({
      where,
      include: {
        user: {
          select: {
            name: true,
            image: true,
          }
        }
      }
    })
  }
}
export default posts