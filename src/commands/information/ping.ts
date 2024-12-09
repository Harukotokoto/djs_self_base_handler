import { Command } from '../../lib/modules/Command';

export default new Command({
  name: 'ping',
  ephemeral: false,
  execute: async ({ client, message }) => {
    const response = Date.now() - message.createdTimestamp;

    await message.reply({
      content:
        '**🏓 Pong!**\n' +
        `- **WebSocket:** ${client.ws.ping} **ms**\n` +
        `- **Response:** ${response} **ms**`,
    });
  },
});
