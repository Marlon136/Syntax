import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { CreateFriendDto } from './dto/create-friend.dto';

@Controller()
export class FriendsController {
  constructor(private readonly service: FriendsService) {}

  @Post('friends')
  addFriend(@Body() dto: CreateFriendDto) {
    return this.service.addFriend(dto.userId, dto.friendId);
  }

  @Get('leaderboard/:userId')
  leaderboard(@Param('userId') userId: string) {
    return this.service.getFriendsLeaderboard(Number(userId));
  }
}
