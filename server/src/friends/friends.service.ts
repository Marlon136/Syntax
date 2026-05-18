import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FriendsService {
  constructor(private readonly prisma: PrismaService) {}

  async addFriend(userId: number, friendId: number) {
    // Ensure both users exist
    const [user, friend] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: userId } }),
      this.prisma.user.findUnique({ where: { id: friendId } }),
    ]);
    if (!user || !friend) throw new NotFoundException('User or friend not found');

    return this.prisma.friendship.create({ data: { userId, friendId, status: 'accepted' } });
  }

  async getFriendsLeaderboard(userId: number) {
    // Get friends where user is either sender or receiver
    const sent = await this.prisma.friendship.findMany({ where: { userId }, select: { friendId: true } });
    const received = await this.prisma.friendship.findMany({ where: { friendId: userId }, select: { userId: true } });

    const friendIds = Array.from(new Set([
      ...sent.map((s) => s.friendId),
      ...received.map((r) => r.userId),
    ]));

    // Include the user themselves in the leaderboard
    friendIds.push(userId);

    // Aggregate total points per friend
    const scores = await this.prisma.user.findMany({
      where: { id: { in: friendIds } },
      select: {
        id: true,
        name: true,
        email: true,
        scores: { select: { points: true, courseId: true } },
      },
    });

    return scores.map((s) => ({
      id: s.id,
      name: s.name,
      email: s.email,
      totalPoints: s.scores.reduce((acc, x) => acc + x.points, 0),
      perCourse: s.scores,
    })).sort((a, b) => b.totalPoints - a.totalPoints);
  }
}
