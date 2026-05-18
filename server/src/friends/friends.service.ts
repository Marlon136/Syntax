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
    // Only consider accepted friendships
    const sent = await this.prisma.friendship.findMany({ where: { userId, status: 'accepted' }, select: { friendId: true } });
    const received = await this.prisma.friendship.findMany({ where: { friendId: userId, status: 'accepted' }, select: { userId: true } });

    const friendIds = Array.from(new Set([
      ...sent.map((s) => s.friendId),
      ...received.map((r) => r.userId),
    ]));

    // Include the user themselves in the leaderboard
    friendIds.push(userId);

    // Aggregate total points per friend using userScore groupBy
    const totals = await this.prisma.userScore.groupBy({
      by: ['userId'],
      where: { userId: { in: friendIds } },
      _sum: { points: true },
    });

    // Map totals by userId
    const totalsMap = new Map<number, number>();
    totals.forEach((t) => totalsMap.set(t.userId, t._sum?.points ?? 0));

    // Fetch user info
    const users = await this.prisma.user.findMany({ where: { id: { in: friendIds } }, select: { id: true, name: true, email: true } });

    // Fetch per-course scores for these users
    const perCourseScores = await this.prisma.userScore.findMany({ where: { userId: { in: friendIds } }, select: { userId: true, courseId: true, points: true } });

    const perCourseMap = new Map<number, { courseId: number; points: number }[]>();
    perCourseScores.forEach((s) => {
      if (!perCourseMap.has(s.userId)) perCourseMap.set(s.userId, []);
      perCourseMap.get(s.userId)!.push({ courseId: s.courseId ?? 0, points: s.points });
    });

    const result = users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      totalPoints: totalsMap.get(u.id) ?? 0,
      perCourse: perCourseMap.get(u.id) ?? [],
    }));

    return result.sort((a, b) => b.totalPoints - a.totalPoints);
  }
}
