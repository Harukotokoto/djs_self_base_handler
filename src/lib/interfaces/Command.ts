import { Message } from 'discord.js-selfbot-v13';
import { Client } from '../modules/Client';

type MessageExecuteType = ({
  client,
  message,
  args,
}: {
  client: Client;
  message: Message;
  args: string[];
}) => any;

type CommandBase = {
  name: string;
  requiredPermissions?: ['OWNER', 'DEVELOPER', 'USER', 'ALL'];
  ephemeral?: boolean;
  aliases?: string[];
  isOwnerCommand?: boolean;
};

type CommandWithDefault = {
  type?: never;
  execute: MessageExecuteType;
};

export type CommandType = CommandBase & CommandWithDefault;
